const express = require('express');
const app = express();
const process = require('process');
const config = require('./config.json');

const port = process.env.PORT || config.PORT;

app.get('/test', (req, res, next) => {
  res
    .status(200)
    .json({
      msg: 'WORKS',
    });
});

app.listen(port, () => {
  console.log(`Listening on :${port}...`);
});
