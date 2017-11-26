const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const utils = require('../utils');
const routes = require('./routes');

const init = (data) => {
  const app = express();
  const { Router } = express;

  app.use('/', express.static('static'));

  app.use(cors());
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use((req, res, next) => {
    data.users.checkIfAuthenticated(req)
      .then(() => {
        next();
      });
  });

  routes.attach(Router, app, data);

  app.use(utils.errorHandler);

  return app;
};

module.exports = { init };
