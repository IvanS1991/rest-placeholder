const attach = (Router, app, data) => {
  require('./users').attach(Router, app, data);
};

module.exports = { attach };
