const process = require('process');
const config = require('./config.json');

const dbModule = require('./db');
const dataModule = require('./data');
const appModule = require('./app');

const port = process.env.PORT || config.PORT;

Promise.resolve()
  .then(() => dbModule.init(config.CONNECTION_STRING))
  .then(db => dataModule.init(db))
  .then(data => appModule.init(data))
  .then((app) => {
    app.listen(port, () => {
      console.log(`Listening on :${port}...`);
    });
  });
