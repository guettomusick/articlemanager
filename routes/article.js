const express = require('express');

module.exports.router = (conn) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    return res.sendStatus(200);
  });

  router.get('/', async (req, res) => {
    return res.sendStatus(200);
  });

  router.put('/:id', async (req, res) => {
    return res.sendStatus(200);
  });
  
  router.delete('/:id', async (req, res) => {
    return res.sendStatus(200);
  });


  return router;
}