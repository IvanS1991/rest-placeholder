const attach = (Router, app, data) => {
  const router = new Router();
  const postController = require('./post.controller').init(data);

  router.get('/', postController.getAll)
        .post('/', postController.create)
        .get('/id/:id', postController.getById)
        .get('/category/:category', postController.getByCategory);

  app.use('/posts', router);
};

module.exports = { attach };
