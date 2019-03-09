const request = require('request-promise');

module.exports = (url) => new Promise((resolve) => {
  async function check() {
    try {
      await request.get(url);
      resolve();
    } catch(err) {
      setTimeout(check, 1000);
    }
  }

  setTimeout(check, 1000);
});