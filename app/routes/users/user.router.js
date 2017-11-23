const attach = (Router, app, data) => {
  const router = new Router();
  const userController = require('./user.controller').init(data);

  router.get('/', userController.getProfile)
        .post('/', userController.register)
        .put('/', userController.authenticate)
        .get('/:username', userController.getProfile);

  app.use('/users', router);
};

module.exports = { attach };
