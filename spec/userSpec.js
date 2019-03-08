const request = require('request-promise');
require('../index.js');

const baseUrl = 'http://localhost:3000/api/v1/user';

describe("articleManager API", () => {
  it("should return 200 when posting new user", async (done) => {
    try {
      await request
        .post(baseUrl, {
          name: 'Test User',
          avatar: 'https://api.adorable.io/avatars/285/abott@adorable.png'
        });
    } catch(err) {
      fail('not 200');
    } finally {
      done();
    }
  });
});