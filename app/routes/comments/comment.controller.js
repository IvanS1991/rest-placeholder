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

  const getByPostId = (req, res, next) => {
    const postId = req.params.postId;
    data.comments.getByPostId(postId)
      .then((comments) => {
        res.status(200)
          .json(comments);
      })
      .catch((err) => {
        next(err);
      });
  };

  const deleteComment = (req, res, next) => {
    const commentId = +req.params.commentId;
    const postId = req.params.postId;
    const author = req.user.username;
    if (!author) {
      throw new Error('You must be logged in for that!');
    }
    data.comments.delete(author, commentId, postId)
      .then((result) => {
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
    getByPostId,
    delete: deleteComment,
  };
};

module.exports = { init };
