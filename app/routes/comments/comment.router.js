let commentController = require('./comment.controller');

const attach = (Router, app, data) => {
  commentController = commentController.init(data);
  const router = new Router();

  router
    .post('/', commentController.create)
    .delete('/:postId/:commentId', commentController.delete);

  app.use('/comments', router);
};

module.exports = { attach };
