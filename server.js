const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');
const routes = require('./all-controllers/homeRoutes');
const seedDatabase = require('./seeds/seed');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up session middleware
app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Adjust the options as needed
  })
);

// Set up Handlebars.js
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(routes);

console.log('Seeding the database...');

// Seed the database
seedDatabase()
  .then(() => {
    console.log('Seeding completed successfully.');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Seeding failed:', err);
    throw new Error('Seeding failed. Server cannot start.');
  });
