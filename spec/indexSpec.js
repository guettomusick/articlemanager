const request = require('request-promise');
const waitForConn = require('./waitForConn');

require('../index.js');

const baseUrl = 'http://localhost:3000';

describe("articleManager API", () => {
  // Wait until server is available
  beforeAll(async (done) => {
    await waitForConn('http://localhost:3000');
    
    done();
  });

  it("should get the root endpoint", async (done) => {
    try {
      await request.get(baseUrl);
    } catch(err) {
      fail('no response from server');
    } finally {
      done();
    }
  });
});