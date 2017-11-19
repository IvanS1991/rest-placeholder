const process = require('process');
const config = require('./config.json');

const port = process.env.PORT || config.PORT;

Promise.resolve()
  .then(() => {
    return require('./app').init();
  })
  .then((app) => {
    app.listen(port, () => {
      console.log(`Listening on :${port}...`);
    });
  });
