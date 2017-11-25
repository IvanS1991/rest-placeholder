const { Comment } = require('./comment.model');

const init = (db) => {
  const commentsCollection = db.collection('comments');

  const create = (commentData) => {
    const comment = Comment.get(
      commentData.author,
      commentData.content,
      commentData.postId,
    );
    return commentsCollection.insert(comment)
      .then((result) => {
        return result.ops[0];
      });
  };

  const deleteComment = (author, id, postId) => {
    return commentsCollection.remove({ author, id, postId })
      .then((result) => {
        if (result.result.n !== 1) {
          throw new Error(`Couldn't delete comment.`);
        }
        return result;
      });
  };

  return {
    create,
    delete: deleteComment,
  };
};

module.exports = { init };
