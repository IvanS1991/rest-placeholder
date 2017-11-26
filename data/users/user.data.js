const { User } = require('./user.model');

const init = (db) => {
  const usersCollection = db.collection('users');

  const checkIfAuthenticated = (req) => {
    const authKey = req.headers['x-auth-key'];
    req.user = {};
    if (!authKey) {
      return Promise.resolve();
    }

    return usersCollection.findOne({ authKey })
      .then((match) => {
        req.user = match;
        return match;
      });
  };

  const create = (userData) => {
    // Check if passwords match
    if (userData.passHash !== userData.passHashRepeat) {
      throw new Error('Passwords must match!');
    }
    // Check if user exists
    return usersCollection.findOne({ username: userData.username })
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
          authKey: user.authKey,
        };
      });
  };

  const authenticate = (userData) => {
    const user = User.get(userData.username, userData.passHash);
    return usersCollection.findOne({
      usernameLC: user.username.toLowerCase(),
      passHash: user.passHash,
    })
      .then((match) => {
        if (!match) {
          throw new Error('Wrong username or password!');
        }
        return {
          username: match.username,
          authKey: match.authKey,
        };
      });
  };

  const profile = (username) => {
    const promise = usersCollection.findOne({ username })
      .then((match) => {
        const profileData = {
          username: match.username,
        };
        return profileData;
      });
    return promise;
  };

  return {
    create,
    checkIfAuthenticated,
    authenticate,
    profile,
  };
};

module.exports = { init };
