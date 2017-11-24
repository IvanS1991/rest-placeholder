const { Comment } = require('./comment.model');

const init = (db) => {
  const commentsCollection = db.collection('comments');

  const create = (commentData) => {
    const comment = Comment.get(
      commentData.author,
      commentData.content,
      commentData.threadId,
    );
    return commentsCollection.insert(comment);
  };

  return {
    create,
  };
};

module.exports = { init };
