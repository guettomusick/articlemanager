const express = require('express');

module.exports.router = (conn) => {
  const router = express.Router();

  /**
  @api {post} /api/v1/article Create a new Article
  @apiVersion 1.0.0
  @apiName CreateArticle
  @apiGroup Article
  @apiPermission token
  @apiDescription Create a new Article

  @apiParam (Request body) {String} userId Id of the creator (User)
  @apiParam (Request body) {String} title title of the article
  @apiParam (Request body) {String} text body of the article
  @apiParam (Request body) {String[]} tags list of tags related to the article
  */
  router.post('/', async (req, res) => {
    return res.sendStatus(200);
  });

  /**
  @api {get} /api/v1/article Get all Articles by Tag
  @apiVersion 1.0.0
  @apiName GetArticles
  @apiGroup Article
  @apiPermission token
  @apiDescription Get all Articles by Tag

  @apiParam (Query String) {String[]} tags to filter articles
  */
  router.get('/', async (req, res) => {
    return res.sendStatus(200);
  });

  /**
  @api {put} /api/v1/article/:id Update an Article
  @apiVersion 1.0.0
  @apiName UpdateArticle
  @apiGroup Article
  @apiPermission token
  @apiDescription Update an Article

  @apiParam {Number} id Article Id

  @apiParam (Request body) {String} userId Id of the creator (User)
  @apiParam (Request body) {String} title title of the article
  @apiParam (Request body) {String} text body of the article
  @apiParam (Request body) {String[]} tags list of tags related to the article
  */
  router.put('/:id', async (req, res) => {
    return res.sendStatus(200);
  });
  
  /**
  @api {delete} /api/v1/article/:id Delete an Article
  @apiVersion 1.0.0
  @apiName DeleteArticle
  @apiGroup Article
  @apiPermission token
  @apiDescription Delete an Article

  @apiParam {Number} id Article Id
  */
  router.delete('/:id', async (req, res) => {
    return res.sendStatus(200);
  });


  return router;
}