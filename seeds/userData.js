const { User } = require('../models');

const userData = [
  {
    username: 'johnDoe',
    password: 'password123'
  },
  {
    username: 'janeSmith',
    password: 'password456'
  },
  // Add more user objects as needed
];

const seedUserData = async () => {
  try {
    for (let i = 0; i < userData.length; i++) {
      const { username, password } = userData[i];
      await User.create({ username, password });
    }
  } catch (error) {
    console.error('Error seeding user data:', error);
  }
};

module.exports = seedUserData;
