const { Post } = require('../models');

const blogData = [
  {
    title: 'First Blog Post',
    content: 'This is the content of the first blog post.',
    user_id: 1 // Assuming user with ID 1 is the author
  },
  {
    title: 'Second Blog Post',
    content: 'This is the content of the second blog post.',
    user_id: 2 // Assuming user with ID 2 is the author
  },
  // Add more blog post objects as needed
];

const seedBlogData = () => Post.bulkCreate(blogData);

module.exports = seedBlogData;
