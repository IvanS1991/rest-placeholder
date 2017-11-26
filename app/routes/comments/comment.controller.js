const init = (data) => {
  const create = (req, res, next) => {
    const commentData = req.body;
    if (!req.user.username) {
      throw new Error('You must be logged in for that!');
    }
    commentData.author = req.user.username;
    data.comments.create(commentData)
      .then((comment) => {
        res.status(200)
          .json(comment);
      })
      .catch((err) => {
        next(err);
      });
  };

  const deleteComment = (req, res, next) => {
    const commentId = +req.params.commentId;
    const { postId } = req.params;
    const author = req.user.username;
    if (!author) {
      throw new Error('You must be logged in for that!');
    }
    data.comments.delete(author, commentId, postId)
      .then(() => {
        res.status(200)
          .json({
            msg: 'OK',
          });
      })
      .catch((err) => {
        next(err);
      });
  };

  return {
    create,
    delete: deleteComment,
  };
};

module.exports = { init };
