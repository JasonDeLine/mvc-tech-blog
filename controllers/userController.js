const { User } = require('../models'); 

const userController = {
  // POST /api/users - Create a new user
  createUser: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Create a new user in the database
      const user = await User.create({ username, password });

      // Send a success response with the created user data
      res.status(201).json(user);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error and send an appropriate response
      res.status(500).json({ message: 'Failed to create the user.' });
    }
  },

  // POST /api/users/login - Log in a user
  loginUser: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find the user with the provided username
      const user = await User.findOne({ where: { username } });

      if (!user || !user.comparePassword(password)) {
        // If the user is not found or the password is incorrect,
        // handle the error and send an appropriate response
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      // Set the user ID in the session to establish the user's session
      req.session.userId = user.id;

      // Send a success response with the logged-in user data
      res.json(user);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error and send an appropriate response
      res.status(500).json({ message: 'Failed to log in.' });
    }
  },

  // POST /api/users/logout - Log out a user
  logoutUser: (req, res) => {
    // Clear the user ID from the session to end the user's session
    req.session.userId = null;
    res.status(204).send();
  }
};

module.exports = userController;
