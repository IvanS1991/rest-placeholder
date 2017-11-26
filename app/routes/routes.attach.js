const userRouter = require('./users');
const postRouter = require('./posts');
const commentRouter = require('./comments');

const attach = (Router, app, data) => {
  userRouter.attach(Router, app, data);
  postRouter.attach(Router, app, data);
  commentRouter.attach(Router, app, data);
};

module.exports = { attach };
