const express = require('express');
const { ObjectId } = require('mongodb');

module.exports.router = (db) => {
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
    // Make only name and userId required
    if(!req.body.title || !req.body.userId) {
      return res.status(400).send('Missing required bodyParams (name, userId)');
    }

    try {
      const { ops } = await db.collection('articles').insertOne({
        userId: new ObjectId(req.body.userId),
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags
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
    if (!req.query.tags) {
      return res.status(400).send('Missing required queryParams (tags)');
    }

    if (!Array.isArray(req.query.tags)) {
      req.query.tags = [ req.query.tags ];
    }

    try {
      const results  = await db.collection('articles').find({tags: {$all: req.query.tags}});
      const resultsArr = await results.toArray()

      for(result of resultsArr) {
        const user = await db.collection('users').findOne({_id: result.userId});
        result.user = user;
      }
      
      res.send(resultsArr);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting from DB');
    }
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
    try {
      const { result } = await db.collection('articles').updateOne({_id: new ObjectId(req.params.id)}, {
        $set: {
          ...req.body.userId && {userId: new ObjectId(req.body.userId)},
          ...req.body.title && {title: req.body.title},
          ...req.body.text && {text: req.body.text},
          ...req.body.tags && {tags: req.body.tags},
        }
      });

      if (result.ok) {
        res.send(`Article ${req.params.id} updated OK`);
      } else {
        res.status(500).send('Error updating DB');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating DB');
    }
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
    try {
      const { result } = await db.collection('articles').deleteOne({_id: new ObjectId(req.params.id)});

      if (result.ok) {
        res.send(`Article ${req.params.id} deleted OK`);
      } else {
        res.status(500).send('Error updating DB');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting from DB');
    }
  });


  return router;
}