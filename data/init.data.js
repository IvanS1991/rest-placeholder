const init = (db) => {
  return {
    users: require('./users').init(db),
    posts: require('./posts').init(db),
  };
};

module.exports = { init };
