const userRouter = require('./users');
const postRouter = require('./posts');
const commentRouter = require('./comments');
const todoRouter = require('./todos/');

const attach = (Router, app, data) => {
  userRouter.attach(Router, app, data);
  postRouter.attach(Router, app, data);
  commentRouter.attach(Router, app, data);
  todoRouter.attach(Router, app, data);
};

module.exports = { attach };
