const init = (data) => {
  const create = (req, res, next) => {
    const owner = req.user.username;
    if (!owner) {
      throw new Error('You must be logged in for that!');
    }
    const todoData = req.body;
    todoData.owner = owner;
    data.todos.create(todoData)
      .then((todo) => {
        res.status(200)
          .json(todo);
      })
      .catch((err) => {
        next(err);
      });
  };

  const update = (req, res, next) => {
    const { id } = req.params;
    const updateData = {
      completed: req.body.completed || false,
    };
    if (req.body.description) {
      updateData.description = req.body.description;
    }
    data.todos.update(id, updateData)
      .then((result) => {
        res.status(200)
          .json(result);
      })
      .catch((err) => {
        next(err);
      });
  };

  const getOwn = (req, res, next) => {
    const owner = req.user.username;
    if (!owner) {
      throw new Error('You must be logged in for that!');
    }
    data.todos.getOwn(owner)
      .then((todos) => {
        res.status(200)
          .json(todos);
      })
      .catch((err) => {
        next(err);
      });
  };

  return {
    create,
    update,
    getOwn,
  };
};

module.exports = { init };
