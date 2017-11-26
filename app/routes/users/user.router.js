let userController = require('./user.controller');

const attach = (Router, app, data) => {
  const router = new Router();
  userController = userController.init(data);

  router
    .get('/', userController.getProfile)
    .post('/', userController.register)
    .put('/', userController.authenticate)
    .get('/:username', userController.getProfile);

  app.use('/users', router);
};

module.exports = { attach };
