const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up session middleware
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

// Set up Handlebars.js
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const homeRoutes = require('./all-controllers/homeController');
const postRoutes = require('./all-controllers/postController');
const userRoutes = require('./all-controllers/userController');

app.use('/', homeRoutes);
app.use('/post', postRoutes());
app.use('/user', userRoutes());

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
