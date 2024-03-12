const { Post } = require('../models');

const postController = {
  // Method to get all posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  },

  // Method to get a specific post by ID
  getPostById: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch post' });
    }
  },

  // Method to create a new post
  createPost: async (req, res) => {
    const { title, content, user_id } = req.body;
    try {
      const post = await Post.create({ title, content, user_id });
      res.status(201).json(post);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to create post' });
    }
  },

  // Method to update a post
  updatePost: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      post.title = title;
      post.content = content;
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update post' });
    }
  },

  // Method to delete a post
  deletePost: async (req, res) => {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      await post.destroy();
      res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  }
};

module.exports = postController;
