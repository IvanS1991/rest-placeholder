const userController = require('./user.controller');

const attach = (Router, app, data) => {
  const router = new Router();

  router.get('/test', userController.test);

  app.use('/users', router);
};

module.exports = { attach };
