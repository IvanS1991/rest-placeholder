const userData = require('./users');
const postData = require('./posts');
const commentData = require('./comments');

const init = (db) => {
  const data = {
    users: userData.init(db),
    posts: postData.init(db),
    comments: commentData.init(db),
  };
  return data;
};

module.exports = { init };
