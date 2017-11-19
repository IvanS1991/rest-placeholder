const test = (req, res, next) => {
  res.status(200)
    .json({
      msg: 'WORKS',
    });
};

module.exports = {
  test,
};
