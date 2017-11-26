const { validateString } = require('../../utils');

const post = {
  title: {
    regex: /.{2,100}/,
    error: new Error('Invalid title'),
  },
  content: {
    regex: /.{1,400}/,
    error: new Error('Invalid content'),
  },
  category: {
    regex: /.{1,}/,
    error: new Error('Invalid category'),
  },
};

class Post {
  constructor(author, title, content, category) {
    this.author = author;
    validateString(title, post.title);
    this.title = title;
    validateString(content, post.content);
    this.content = content;
    validateString(category, post.category);
    this.category = category;
    this.id = Post.generateId(title);
  }

  static generateId(title) {
    return `${Math.floor(Math.random() * 10000)}-${+title
      .toLowerCase()
      .trim()
      .split(/\s+/g)
      .join('-')
      .replace(/[^a-zA-Z0-9-]/ig, '')}`;
  }

  static get(author, title, content, category) {
    return new Post(author, title, content, category);
  }
}

module.exports = { Post };
