const { Post } = require('./post.model');

const init = (db) => {
  const postsCollection = db.collection('posts');

  const create = (postData) => {
    const post = Post.get(
      postData.author,
      postData.title,
      postData.content,
      postData.category
    );
    return postsCollection.insert(post)
      .then((result) => {
        return result.ops[0];
      });
  };

  const getAll = () => {
    return postsCollection.find()
      .toArray();
  };

  const getById = (id) => {
    return postsCollection.findOne({ id: id })
      .then((post) => {
        if (!post) {
          throw new Error('This post does not exist!');
        }
        return post;
      });
  };

  const getByCategory = (category) => {
    return postsCollection.find({ category: category })
      .toArray();
  };

  return {
    create,
    getAll,
    getById,
    getByCategory,
  };
};

module.exports = { init };
