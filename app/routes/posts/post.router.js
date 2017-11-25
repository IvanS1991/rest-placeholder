const attach = (Router, app, data) => {
  const router = new Router();
  const postController = require('./post.controller').init(data);

  router
    .get('/', postController.getAll)
    .post('/', postController.create)
    .get('/category/:category', postController.getByCategory)
    .get('/:id', postController.getById)
    .delete('/:postId', postController.delete);

  app.use('/posts', router);
};

module.exports = { attach };
