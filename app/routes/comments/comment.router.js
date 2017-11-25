const attach = (Router, app, data) => {
  const commentController = require('./comment.controller').init(data);
  const router = new Router();

  router
    .post('/', commentController.create)
    .get('/:threadId', commentController.getByThreadId)
    .delete('/:threadId/:commentId', commentController.delete);

  app.use('/comments', router);
};

module.exports = { attach };
