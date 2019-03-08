const express = require('express');

module.exports.router = (conn) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    return res.sendStatus(200);
  });

  return router;
}