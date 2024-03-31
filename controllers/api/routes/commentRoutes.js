const router = require('express').Router();
const commentController = require('../controllers/commentController');

// Define routes

// Create comment route
router.post('/', commentController.createComment);

// Update comment route
router.put('/:id', commentController.updateComment);

// Delete comment route
router.delete('/:id', commentController.deleteComment);

module.exports = router;
