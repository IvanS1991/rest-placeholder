const attach = (Router, app, data) => {
  const commentController = require('./comment.controller').init(data);
  const router = new Router();

  router
    .post('/', commentController.create)
    .delete('/:postId/:commentId', commentController.delete);

  app.use('/comments', router);
};

module.exports = { attach };
