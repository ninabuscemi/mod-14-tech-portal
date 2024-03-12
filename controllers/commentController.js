const { Comment } = require('../models');

const commentController = {
  // Method to get all comments
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.findAll();
      res.json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  },

  // Method to create a new comment
  createComment: async (req, res) => {
    const { comment_text, post_id, user_id } = req.body;
    try {
      const comment = await Comment.create({ comment_text, post_id, user_id });
      res.status(201).json(comment);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to create comment' });
    }
  },

  // Method to update a comment
  updateComment: async (req, res) => {
    const { id } = req.params;
    const { comment_text } = req.body;
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      comment.comment_text = comment_text;
      await comment.save();
      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update comment' });
    }
  },

  // Method to delete a comment
  deleteComment: async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      await comment.destroy();
      res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  }
};

module.exports = commentController;
