const { Todo } = require('./todo.model');

const init = (db) => {
  const todosCollection = db.collection('todos');

  const getOwn = (username) => {
    const promise = todosCollection.find({ owner: username })
      .toArray();
    return promise;
  };

  const create = (todoData) => {
    const todo = Todo.get(todoData.owner, todoData.description);
    return todosCollection.insert(todo)
      .then(result => result.ops[0]);
  };

  const update = (id, newState) => {
    const promise = todosCollection.findOneAndUpdate(
      { id },
      { $set: newState },
      { returnNewDocument: true },
    )
      .then(result => result.value);
    return promise;
  };

  return {
    getOwn,
    create,
    update,
  };
};

module.exports = { init };
