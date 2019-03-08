const request = require('request-promise');
require('../index.js');

const baseUrl = 'http://localhost:3000/api/v1/article';
const authKey = '5CD4ED173E1C95FE763B753A297D5';
const headers = {
  'x-access-token': authKey
}

describe('articleManager API - Article Routes', () => {
  // Wait until server is available
  beforeAll(async (done) => {
    while(1) {
      try {
        await request.get('http://localhost:3000');
        break;
      } catch(err) {
      }
    }
    done();
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
      await request.post(baseUrl, {
        method: 'POST',
        body: {
          userId: 1,
          title: 'An Artcile',
          text: 'Praesent tempor vitae nisl eu pellentesque. Donec in lorem vitae ligula convallis laoreet.',
          tags: ['Tag1']
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

  it('should return 200 when getting all articles', async (done) => {
    try {
      await request.get(baseUrl, {
        qs: {tags: 'Tag1'},
        json: true,
        headers
      });
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });

  it('should return 200 when updating an article', async (done) => {
    try {
      await request.put(`${baseUrl}/1`, {
        body: {
          userId: 1,
          title: 'An Artcile 2',
          text: 'Praesent tempor vitae nisl eu pellentesque. Donec in lorem vitae ligula convallis laoreet.',
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

  it('should return 200 when deleting an article', async (done) => {
    try {
      await request.delete(`${baseUrl}/1`, { headers });
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });
});