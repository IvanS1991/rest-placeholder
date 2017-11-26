const mongo = require('mongodb');

const { MongoClient } = mongo;

const init = (dbString) => {
  const promise = MongoClient.connect(dbString);
  return promise;
};

module.exports = { init };
