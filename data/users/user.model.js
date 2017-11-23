const assert = require('assert');
const sha1 = require('sha1');

const user = {
  username: {
    regex: /[a-zA-Z0-9_-]{2,20}/,
    error: new Error('Invalid username'),
  },
  passHash: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    error: new Error('Invalid password'),
  },
};

const validate = (string, options) => {
  const { regex, error } = options;
  const isInvalid = !regex.test(string);
  if (isInvalid) {
    throw error;
  }
};

class User {
  constructor(username, passHash) {
    validate(username, user.username);
    this.username = username;
    this.usernameLC = username.toLowerCase();
    validate(passHash, user.passHash);
    this.passHash = passHash;
    this.authKey = User.generateKey(username);
  }

  static generateKey(username) {
    return sha1(username + Math.random());
  }

  static get(username, passHash) {
    return new User(username, passHash);
  }
}

module.exports = { User };
