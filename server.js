const process = require('process');
const config = require('./config.json');

const port = process.env.PORT || config.PORT;

Promise.resolve()
  .then(() => {
    return require('./db').init(config.CONNECTION_STRING);
  })
  .then((db) => {
    return require('./data').init(db);
  })
  .then((data) => {
    return require('./app').init(data);
  })
  .then((app) => {
    app.listen(port, () => {
      console.log(`Listening on :${port}...`);
    });
  });
