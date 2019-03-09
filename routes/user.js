const express = require('express');

module.exports.router = (db) => {
  const router = express.Router();

  /**
  @api {post} /api/v1/user Create a new User
  @apiVersion 1.0.0
  @apiName CreateUser
  @apiGroup User
  @apiPermission token
  @apiDescription Create a new User

  @apiParam (Request body) {String} name User Name
  @apiParam (Request body) {String} avatar Avatar Url
  */
  router.post('/', async (req, res) => {
    // Make only name required
    if(!req.body.name) {
      return res.status(400).send('Missing required bodyParams (name)');
    }

    try {
      const { ops } = await db.collection('users').insertOne({
        name: req.body.name,
        avatar: req.body.avatar
      });

      if (ops && ops[0]) {
        res.send(ops[0]._id);
      } else {
        res.status(500).send('Error inserting to DB');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error inserting to DB');
    }
  });

  return router;
}