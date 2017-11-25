const { validateString } = require('../../utils');

const comment = {
  content: {
    regex: /.{1,400}/,
    error: new Error('Invalid content'),
  },
};

class Comment {
  constructor(author, content, threadId) {
    this.author = author;
    this.threadId = threadId;
    validateString(content, comment.content);
    this.content = content;
    this.id = Math.floor(Math.random() * 100000);
  }

  static get(author, content, threadId) {
    return new Comment(author, content, threadId);
  }
}

module.exports = { Comment };
