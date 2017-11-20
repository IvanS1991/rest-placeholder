const attach = (Router, app, data) => {
  const router = new Router();
  const userController = require('./user.controller').init(data);

  router.get('/:username', userController.getProfile);
  router.post('/register', userController.register);

  app.use('/users', router);
};

module.exports = { attach };
