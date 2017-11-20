const assert = require('assert');

class User {
  constructor(username, passHash) {
    this.username = username;
    this.passHash = passHash;
  }

  static get(username, passHash) {
    return new User(username, passHash);
  }

  set username(username) {
    // Validate username
    const regex = /[a-zA-Z0-9_-]{2,20}/;
    const error = new Error('Invalid username');

    assert(username.match(regex), error);

    this._username = username;
  }

  get username() {
    return this._username;
  }

  set passHash(passHash) {
    // Validate passHash

    this._passHash = passHash;
  }

  get passHash() {
    return this._passHash;
  }
}

module.exports = { User };
