let todosController = require('./todo.controller');

const attach = (Router, app, data) => {
  todosController = todosController.init(data);

  const router = new Router();

  router
    .get('/', todosController.getOwn)
    .post('/', todosController.create)
    .put('/:id', todosController.update);

  app.use('/todos', router);
};

module.exports = { attach };
