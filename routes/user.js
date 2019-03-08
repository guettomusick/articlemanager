const express = require('express');

module.exports.router = (conn) => {
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
    return res.sendStatus(200);
  });

  return router;
}