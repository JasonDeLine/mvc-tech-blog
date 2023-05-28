const sequelize = require('../config/connection');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

const blogData = require('./blogData');
const userData = require('./userData');
const commentData = require('./commentData');

module.exports = async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Blog.bulkCreate(blogData, {
      returning: true,
    });

    await Comment.bulkCreate(commentData, {
      returning: true,
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};
