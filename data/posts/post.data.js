const { Post } = require('./post.model');

const init = (db) => {
  const postsCollection = db.collection('posts');
  const commentsCollection = db.collection('comments');

  const create = (postData) => {
    const post = Post.get(
      postData.author,
      postData.title,
      postData.content,
      postData.category,
    );
    return postsCollection.insert(post)
      .then(result => result.ops[0]);
  };

  const getAll = () => {
    const promise = postsCollection.find()
      .toArray();
    return promise;
  };

  const getById = (id) => {
    let post;
    return postsCollection.findOne({ id })
      .then((match) => {
        if (!match) {
          throw new Error('This post does not exist!');
        }
        post = match;
        return commentsCollection.find({ postId: match.id })
          .toArray();
      })
      .then((comments) => {
        post.comments = comments;
        return post;
      });
  };

  const getByCategory = (category) => {
    const promise = postsCollection.find({ category })
      .toArray();
    return promise;
  };

  const deletePost = (author, id) => {
    const promise = postsCollection.remove({ author, id })
      .then((result) => {
        if (result.result.n !== 1) {
          throw new Error('Couldn\'t delete post.');
        }
        return commentsCollection.remove({ postId: id });
      });
    return promise;
  };

  return {
    create,
    getAll,
    getById,
    getByCategory,
    delete: deletePost,
  };
};

module.exports = { init };
