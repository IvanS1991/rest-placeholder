const { validateString } = require('../../utils');

const comment = {
  content: {
    regex: /.{1,400}/,
    error: new Error('Invalid content'),
  },
};

class Comment {
  constructor(author, content, postId) {
    this.author = author;
    this.postId = postId;
    validateString(content, comment.content);
    this.content = content;
    this.id = Math.floor(Math.random() * 100000);
  }

  static get(author, content, postId) {
    return new Comment(author, content, postId);
  }
}

module.exports = { Comment };
