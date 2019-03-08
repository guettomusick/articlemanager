const request = require('request-promise');
require('../index.js');

const baseUrl = 'http://localhost:3000/api/v1/article';

describe("articleManager API - Article Routes", () => {
  it("should return 200 when posting new article", async (done) => {
    try {
      await request.post(baseUrl, {
          userId: 1,
          title: 'An Artcile',
          text: 'Praesent tempor vitae nisl eu pellentesque. Donec in lorem vitae ligula convallis laoreet.',
          tags: ['Tag1']
        });
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });

  it("should return 200 when getting all articles", async (done) => {
    try {
      await request.get(baseUrl, {qs: 'Tag1', json: true});
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });

  it("should return 200 when updating an article", async (done) => {
    try {
      await request.put(`${baseUrl}/1`, {
          userId: 1,
          title: 'An Artcile 2',
          text: 'Praesent tempor vitae nisl eu pellentesque. Donec in lorem vitae ligula convallis laoreet.',
          tags: ['Tag1', 'Tag2']
        });
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });

  it("should return 200 when deleting an article", async (done) => {
    try {
      await request.delete(`${baseUrl}/1`);
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });
});