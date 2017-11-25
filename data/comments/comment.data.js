const { Comment } = require('./comment.model');

const init = (db) => {
  const commentsCollection = db.collection('comments');

  const create = (commentData) => {
    const comment = Comment.get(
      commentData.author,
      commentData.content,
      commentData.threadId,
    );
    return commentsCollection.insert(comment)
      .then((result) => {
        return result.ops[0];
      });
  };

  const getByThreadId = (threadId) => {
    return commentsCollection.find({ threadId })
      .toArray();
  };

  const deleteComment = (author, id, threadId) => {
    return commentsCollection.remove({ author, id, threadId })
      .then((result) => {
        if (result.result.n !== 1) {
          throw new Error(`Couldn't delete comment.`);
        }
        return result;
      });
  };

  return {
    create,
    getByThreadId,
    delete: deleteComment,
  };
};

module.exports = { init };
