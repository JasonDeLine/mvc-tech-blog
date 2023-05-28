// config/middleware/authentication.js

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User } = require('../../models'); // Assuming you have a User model defined

// Set up session and session store
const sessionOptions = {
  secret: 'yourSecretKey', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
  cookie: {
    // Set the desired cookie options, such as secure: true for HTTPS
  },
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, 
    expiration: 24 * 60 * 60 * 1000 // Session expiration time (in milliseconds)
  })
};

// Initialize session middleware
const authentication = session(sessionOptions);

//  middleware to check if user is logged in
const withAuth = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.redirect('/login'); 
    }

    // Fetch the user from  database based on the session userId
    const user = await User.findByPk(req.session.userId);

    if (!user) {
          return res.redirect('/login');
    }

    // User is authenticated, proceed to the next middleware
    req.user = user;

    const userPosts = await user.getPosts();
    console.log(user.username);
    console.log(userPosts);

    next();
  } catch (error) {
    // Handle any auth errors
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' }); // Update the error response as per your application's needs
  }
};

module.exports = { authentication, withAuth };
