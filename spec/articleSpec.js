const request = require('request-promise');
const { MongoClient, ObjectId } = require('mongodb');
const waitForConn = require('./waitForConn');

const mongoHost = 'mongodb://localhost:27017';
const dbName = 'articleman';

const client = new MongoClient(mongoHost);

require('../index.js');

const baseUrl = 'http://localhost:3000/api/v1/article';
const authKey = '5CD4ED173E1C95FE763B753A297D5';
const headers = {
  'x-access-token': authKey
}

describe('articleManager API - Article Routes', () => {
  let db, users, articles = [];

  // Wait until server is available
  beforeAll(async (done) => {
    await waitForConn('http://localhost:3000');

    client.connect(async (err) => {
      if (err) {
        return fail('Failed to connect to MongoDB server, shutting down');
      }
    
      db = client.db(dbName);

      const { ops } = await db.collection('users').insertMany([
        { name: 'Test User 1' }, { name: 'Test User 2' }, { name: 'Test User 3' }
      ]);

      users = ops;
      done();
    });
  });

  it('should return 403 if no token is provided', async(done) => {
    try {
      await request.get(baseUrl, {
        qs: {tags: 'Tag1'},
        json: true
      });
      fail('not 403');
    } catch(err) {
      expect(err.statusCode).toBe(403);
    } finally {
      done();
    }
  });

  it('should return 403 if wrong token is provided', async(done) => {
    try {
      await request.get(baseUrl, {
        qs: {tags: 'Tag1'},
        json: true,
        headers: {
          'x-access-token': 'WRONG'
        }
      });
      fail('not 403');
    } catch(err) {
      expect(err.statusCode).toBe(403);
    } finally {
      done();
    }
  });

  it('should return 200 when posting new article', async (done) => {
    try {
      const response = await request.post(baseUrl, {
        method: 'POST',
        body: {
          userId: users[0]._id,
          title: 'An Artcile',
          text: 'Praesent tempor vitae nisl eu pellentesque. Donec in lorem vitae ligula convallis laoreet.',
          tags: ['Tag1']
        },
        json: true,
        headers
      });
      articles.push(response);
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });

  it('should insert article to DB', async (done) => {
    const result = await db.collection('articles').findOne({_id: new ObjectId(articles[0])});
    expect(result).toEqual({
      _id: new ObjectId(articles[0]),
      userId: users[0]._id,
      title: 'An Artcile',
      text: 'Praesent tempor vitae nisl eu pellentesque. Donec in lorem vitae ligula convallis laoreet.',
      tags: ['Tag1']
    });
    done();
  });

  it('should return 200 when getting all articles', async (done) => {
    try {
      const response = await request.get(baseUrl, {
        qs: {tags: 'Tag1'},
        json: true,
        headers
      });

      expect(response.length).toBe(1);
      expect(response[0]).toEqual({
        _id: articles[0],
        userId: users[0]._id.toString(),
        title: 'An Artcile',
        text: 'Praesent tempor vitae nisl eu pellentesque. Donec in lorem vitae ligula convallis laoreet.',
        tags: ['Tag1'],
        user: {
          _id: users[0]._id.toString(),
          name: users[0].name
        }
      });
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });

  it('should return 200 when updating an article', async (done) => {
    try {
      await request.put(`${baseUrl}/${articles[0]}`, {
        body: {
          userId: users[0]._id,
          title: 'An Artcile 2',
          tags: ['Tag1', 'Tag2']
        },
        json: true,
        headers
      });
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });

  it('should update article on DB', async (done) => {
    const result = await db.collection('articles').findOne({_id: new ObjectId(articles[0])});
    expect(result).toEqual({
      _id: new ObjectId(articles[0]),
      userId: users[0]._id,
      title: 'An Artcile 2',
      text: 'Praesent tempor vitae nisl eu pellentesque. Donec in lorem vitae ligula convallis laoreet.',
      tags: ['Tag1', 'Tag2']
    });
    done();
  });

  it('should return 200 when deleting an article', async (done) => {
    try {
      await request.delete(`${baseUrl}/${articles[0]}`, { headers });
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });

  it('should delete article from DB', async (done) => {
    const result = await db.collection('articles').findOne({_id: new ObjectId(articles[0])});
    expect(result).toBeNull();
    done();
  });

  afterAll(async (done) => {
    await db.collection('users').deleteMany({_id: {$in: users.map(user => user._id)}});
    client.close();
    done();
  })
});