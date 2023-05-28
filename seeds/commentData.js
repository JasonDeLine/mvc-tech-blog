const { Comment } = require('../models');

const commentData = [
  {
    text: 'Great post!',
    user_id: 1,
    post_id: 1
  },
  {
    text: 'Nice work!',
    user_id: 2,
    post_id: 1
  },
  // Add more comment objects as needed
];

const seedCommentData = async () => {
  try {
    for (let i = 0; i < commentData.length; i++) {
      await Comment.create(commentData[i]);
    }
  } catch (error) {
    console.error('Error seeding comment data:', error);
  }
};

module.exports = seedCommentData;
