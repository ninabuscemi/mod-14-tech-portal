const router = require('express').Router();
const postController = require('../controllers/postController');

// Define routes

// Get all posts
router.get('/', postController.getAllPosts);

// Get a specific post by ID
router.get('/:id', postController.getPostById);

// Create post route
router.post('/', postController.createPost);

// Update post route
router.put('/:id', postController.updatePost);

// Delete post route
router.delete('/:id', postController.deletePost);

module.exports = router;
