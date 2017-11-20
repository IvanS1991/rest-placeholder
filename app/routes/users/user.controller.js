const init = (data) => {
  const register = (req, res, next) => {
    data.users.create({
        username: 'goshko321',
        passHash: 'asd1234',
        passHashRepeat: 'asd123',
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        next(err);
      });
  };

  const getProfile = (req, res, next) => {
    const username = req.user.username || req.params.username;
    const profileOwner = req.user.username ? true : false;
    data.users.profile(username, profileOwner)
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
  };
};

module.exports = { init };
