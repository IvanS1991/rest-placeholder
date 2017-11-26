const errorHandler = (err, req, res) => {
  res.status(404)
    .json({
      msg: err.message,
      stack: err.stack,
    });
};

module.exports = errorHandler;
