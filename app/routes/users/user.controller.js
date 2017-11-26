const init = (data) => {
  const register = (req, res, next) => {
    const userData = req.body;
    data.users.create(userData)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        next(err);
      });
  };

  const authenticate = (req, res, next) => {
    const userData = req.body;
    data.users.authenticate(userData)
      .then((user) => {
        res.status(200)
          .json(user);
      })
      .catch((err) => {
        next(err);
      });
  };

  const getProfile = (req, res, next) => {
    const username = req.params.username || req.user.username;
    data.users.profile(username)
      .then((profile) => {
        res.status(200).json(profile);
      })
      .catch((err) => {
        next(err);
      });
  };

  return {
    register,
    getProfile,
    authenticate,
  };
};

module.exports = { init };
