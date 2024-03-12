const express = require('express');
const session = require('express-session');
const path = require('path');
const sequelize = require('./config/config');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Define routes

// Home route
app.get('/', (req, res) => {
  // Render the home page with list of posts
  res.render('home', { /* Data to pass to the view */ });
});

// Individual post route
app.get('/posts/:id', (req, res) => {
  // Render the individual post page
});

// Signup route
app.post('/signup', (req, res) => {
  // Handle user signup
});

// Login route
app.post('/login', (req, res) => {
  // Handle user login
});

// Logout route
app.get('/logout', (req, res) => {
  // Handle user logout
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  // Render the dashboard
});

sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
