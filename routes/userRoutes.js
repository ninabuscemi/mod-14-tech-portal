const router = require('express').Router();
const userController = require('../controllers/userController');

// Define routes

// Signup route
router.post('/signup', userController.signup);

// Login route
router.post('/login', userController.login);

// Logout route
router.get('/logout', userController.logout);

// Dashboard route
router.get('/dashboard', userController.dashboard);

module.exports = router;
