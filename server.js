// Import required modules
const express = require('express');
const session = require('express-session');
const path = require('path');

// Import Sequelize instance from config.js
const sequelize = require('./config');

// Create an instance of Express app
const app = express();

// Set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure express-session middleware
app.use(session({
  secret: 'your_secret_key', // Change this to a random string
  resave: false,
  saveUninitialized: false,
  // You can configure other options as needed
}));
// Define routes
// Example:
// const userRoutes = require('./routes/userRoutes');
// const postRoutes = require('./routes/postRoutes');
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

// Set up the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Define a basic route for the homepage
app.get('/', (req, res) => {
  res.render('home', { /* Data to pass to the view */ });
});

// Start the server after syncing with the database
sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
