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

// Import controllers
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const commentController = require('./controllers/commentController');

// Define routes

// Home route
app.get('/', postController.getAllPosts);

// Individual post route
app.get('/posts/:id', postController.getPostById);

// Signup route
app.post('/signup', userController.signup);

// Login route
app.post('/login', userController.login);

// Logout route
app.get('/logout', userController.logout);

// Dashboard route
app.get('/dashboard', userController.dashboard);

// Create post route
app.post('/posts', postController.createPost);

// Update post route
app.put('/posts/:id', postController.updatePost);

// Delete post route
app.delete('/posts/:id', postController.deletePost);

// Create comment route
app.post('/comments', commentController.createComment);

// Update comment route
app.put('/comments/:id', commentController.updateComment);

// Delete comment route
app.delete('/comments/:id', commentController.deleteComment);

sequelize.sync({ force: false }).then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
