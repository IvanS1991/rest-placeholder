const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const init = (data) => {
  const app = express();
  const Router = express.Router;
  const routes = require('./routes');

  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  routes.attach(Router, app, data);

  return app;
};

module.exports = { init };
