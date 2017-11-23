const assert = require('assert');
const sha1 = require('sha1');

const validateUsername = (username) => {
  // Validate username
  const regex = /[a-zA-Z0-9_-]{2,20}/;
  const error = new Error('Invalid username');

  assert(username.match(regex), error);
};

const validatePassHash = (passHash) => {
  // Validate passHash
};

class User {
  constructor(username, passHash) {
    validateUsername(username);
    this.username = username;
    validatePassHash(passHash);
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
