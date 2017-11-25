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

  const getByThreadId = (req, res, next) => {
    const threadId = req.params.threadId;
    data.comments.getByThreadId(threadId)
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
    const threadId = req.params.threadId;
    const author = req.user.username;
    if (!author) {
      throw new Error('You must be logged in for that!');
    }
    data.comments.delete(author, commentId, threadId)
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
    getByThreadId,
    delete: deleteComment,
  };
};

module.exports = { init };
