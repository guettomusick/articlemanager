const dummy = !process.argv.find(argv => argv === '--no-dummy');

const MongoClient = require('mongodb').MongoClient;

const mongoHost = process.env.MONGO || 'mongodb://localhost:27017';
const dbName = process.env.DB || 'articleman';

const client = new MongoClient(mongoHost);

client.connect(async (err) => {
  if (err) {
    console.error('Failed to connect to MongoDB server, shutting down');
    return process.exit(1);
  }
  
  console.log("Successfully to MongoDB server");

  const db = client.db(dbName);

  db.on('error', () => {
    console.error('Drop connection to MongoDB server, shutting down');
    return process.exit(1);
  });

  console.log('creating indexes...');
  await db.collection('articles').createIndex({tags: 1});

  if (dummy) {
    console.log('Adding dummy data...');
    const users = require('./dummy/users');
    const articles = require('./dummy/articles');

    await db.collection('users').insertMany(users);
    await db.collection('articles').insertMany(articles);
  }

  client.close();
});
