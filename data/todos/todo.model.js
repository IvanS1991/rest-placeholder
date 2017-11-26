const { validateString } = require('../../utils/');

const todo = {
  description: {
    regex: /.{1,}/i,
    error: new Error('Invalid description'),
  },
};

class Todo {
  constructor(owner, description) {
    this.owner = owner;
    validateString(description, todo.description);
    this.description = description;
    this.completed = false;
    this.id = `todo-${Math.floor(Math.random() * 1000000)}-${owner}`;
  }

  static get(owner, description) {
    return new Todo(owner, description);
  }
}

module.exports = { Todo };
