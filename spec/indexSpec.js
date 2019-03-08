const request = require('request-promise');
require('../index.js');

const baseUrl = 'http://localhost:3000';

describe("articleManager API", () => {
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