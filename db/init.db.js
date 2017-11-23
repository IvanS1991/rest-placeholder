const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const init = (dbString) => {
  return MongoClient.connect(dbString);
};

module.exports = { init };
