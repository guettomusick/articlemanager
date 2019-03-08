const request = require('request-promise');
require('../index.js');

const baseUrl = 'http://localhost:3000';

describe("articleManager API", () => {
  it("should get the root endpoint", async (done) => {
    try {
      await request.get(baseUrl, {resolveWithFullResponse: true});
    } catch(err) {
      fail('no response from server');
    } finally {
      done();
    }
  });
});