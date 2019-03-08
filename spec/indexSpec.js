const request = require('request-promise');
require('../index.js');

const baseUrl = 'http://localhost:3000';

describe("articleManager API", () => {
  it("should get the root endpoint", async (done) => {
    const result = await request.get(baseUrl, {resolveWithFullResponse: true});
    expect(result.statusCode).toBe(200);
    done();
  });
});