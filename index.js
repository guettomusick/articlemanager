const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser');
const morgan = require('morgan')

const app = express();
const auth = require('./lib/auth');

const port = process.env.PORT || 3000;

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api/v1/user', auth.isAuthorized, require('./routes/user').router());
app.use('/api/v1/article', auth.isAuthorized, require('./routes/article').router());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`ArticleManager listening on port ${port}`);
});