const request = require('request-promise');
const { MongoClient, ObjectId } = require('mongodb');
const waitForConn = require('./waitForConn');

const mongoHost = 'mongodb://localhost:27017';
const dbName = 'articleman';

const client = new MongoClient(mongoHost);

require('../index.js');

const baseUrl = 'http://localhost:3000/api/v1/user';
const authKey = '5CD4ED173E1C95FE763B753A297D5';
const headers = {
  'x-access-token': authKey
}

describe('articleManager API - User Routes', () => {
  let db, id;
  // Wait until server is available
  beforeAll(async (done) => {
    await waitForConn('http://localhost:3000');

    client.connect((err) => {
      if (err) {
        return fail('Failed to connect to MongoDB server, shutting down');
      }
    
      db = client.db(dbName);
      done();
    });
  });

  it('should return 403 if no token is provided', async(done) => {
    try {
      await request.post(baseUrl, {
        name: 'Test User',
        avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png'
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
      await request.post(baseUrl, {
        body: {
          name: 'Test User',
          avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png'
        },
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

  it('should return 200 when posting new user and return userId', async (done) => {
    try {
      const response = await request.post(baseUrl, {
        body: {
          name: 'Test User',
          avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png'
        },
        json: true,
        headers
      });
      expect(response).toBeDefined();
      expect(response).not.toBeNull();
      expect(response.length).toBe(24);
      id = response;
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });

  it('should insert user to DB', async (done) => {
    const result = await db.collection('users').findOne({_id: new ObjectId(id)});
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(result.name).toBe('Test User');
    expect(result.avatar).toBe('https://api.adorable.io/avatars/285/abott@adorable.png');
    done();
  });

  // Cleanup DB
  afterAll(async (done) => {
    await db.collection('users').deleteOne({_id: new ObjectId(id)});
    client.close();
    done();
  })
});