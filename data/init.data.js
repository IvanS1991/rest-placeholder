const init = (db) => {
  return {
    users: require('./users').init(db),
  };
};

module.exports = { init };
