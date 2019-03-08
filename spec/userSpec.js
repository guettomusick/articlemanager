const request = require('request-promise');
require('../index.js');

const baseUrl = 'http://localhost:3000/api/v1/user';
const authKey = '5CD4ED173E1C95FE763B753A297D5';
const headers = {
  'x-access-token': authKey
}

describe("articleManager API - User Routes", () => {
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

  it("should return 200 when posting new user", async (done) => {
    try {
      await request.post(baseUrl, {
        body: {
          name: 'Test User',
          avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png'
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
});