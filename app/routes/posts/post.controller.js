const init = (data) => {
  const getById = (req, res, next) => {
    const id = req.params.id;
    data.posts.getById(id)
      .then((post) => {
        res.status(200)
          .json(post);
      })
      .catch((err) => {
        next(err);
      });
  };

  const getByCategory = (req, res, next) => {
    const category = req.params.category;
    data.posts.getByCategory(category)
      .then((posts) => {
        res.status(200)
          .json(posts);
      })
      .catch((err) => {
        next(err);
      });
  };

  const getAll = (req, res, next) => {
    data.posts.getAll()
      .then((posts) => {
        res.status(200)
          .json(posts);
      })
      .catch((err) => {
        next(err);
      });
  };

  const create = (req, res, next) => {
    const postData = req.body;
    if (!req.user.username) {
      throw new Error('You must be logged in for that!');
    }
    postData.author = req.user.username;
    data.posts.create(postData)
      .then((post) => {
        res.status(200)
          .json(post);
      })
      .catch((err) => {
        next(err);
      });
  };

  const deletePost = (req, res, next) => {
    const postId = req.params.postId;
    const author = req.user.username;
    if (!author) {
      throw new Error('You must be logged in for that!');
    }
    data.posts.delete(author, postId)
      .then(() => {
        res.status(200)
          .json({
            msg: 'Post deleted!',
          });
      })
      .catch((err) => {
        next(err);
      });
  };

  return {
    getById,
    getByCategory,
    getAll,
    create,
    delete: deletePost,
  };
};

module.exports = { init };
