// config/middleware/authentication.js

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User } = require('../models'); // Assuming you have a User model defined

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

// Custom middleware to check if the user is logged in
const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    // If user is not logged in, redirect to the login page or send an error response
    return res.redirect('/login'); // TO DO: Modify the route as per application's routes
  }
  next();
};

module.exports = { authentication, withAuth };
