const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const MongoClient = require('mongodb').MongoClient;

const app = express();
const auth = require('./lib/auth');

const port = process.env.PORT || 3000;
const mongoHost = process.env.MONGO || 'mongodb://localhost:27017';
const dbName = process.env.DB || 'articleman';

const client = new MongoClient(mongoHost);

client.connect((err) => {
  if (err) {
    console.error('Failed to connect to MongoDB server, shutting down');
    return process.exit(1);
  }
  
  console.log("Successfully to MongoDB server");

  const db = client.db(dbName);

  db.on('close', () => {
    console.error('Drop connection to MongoDB server, shutting down');
    return process.exit(1);
  })

  db.on('error', () => {
    console.error('Drop connection to MongoDB server, shutting down');
    return process.exit(1);
  })

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(morgan('dev'));

  app.use('/api/v1/api-docs', express.static('./api-docs'));
  app.use('/api/v1/user', auth.isAuthorized, require('./routes/user').router(db));
  app.use('/api/v1/article', auth.isAuthorized, require('./routes/article').router(db));

  app.get('/', (req, res) => {
    res.sendStatus(200);
  });

  app.listen(port, () => {
    console.log(`ArticleManager listening on port ${port}`);
  });
});