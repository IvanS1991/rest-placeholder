const { User } = require('./user.model');

const init = (db) => {
  const usersCollection = db.collection('users');

  const create = (userData) => {
    // Check if passwords match
    if (userData.passHash !== userData.passHashRepeat) {
      throw new Error('Passwords must match!');
    }
    // Check if user exists
    return usersCollection.findOne({ '_username': userData.username })
      .then((match) => {
        if (match) {
          throw new Error('User already exists!');
        }
        // Create user
        const user = User.get(userData.username, userData.passHash);
        return usersCollection.insert(user);
      })
      .then((result) => {
        // Pass user to controller
        const user = result.ops[0];
        return {
          username: user.username,
        };
      });
  };

  const authenticate = (userData) => {

  };

  const update = (userData) => {

  };

  const profile = (username, profileOwner) => {
    return usersCollection.findOne({ '_username': username })
      .then((match) => {
        if (profileOwner) {
          return match;
        }
        return {
          username: match._username,
        };
      });
  };

  return {
    create,
    authenticate,
    update,
    profile,
  };
};

module.exports = { init };
