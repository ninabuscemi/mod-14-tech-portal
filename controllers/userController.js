const { User } = require('../models');

const userController = {
  // Method to get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  // Method to get a specific user by ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  // Method to create a new user
  createUser: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({ username, email, password });
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Failed to create user' });
    }
  },

  // Method to update a user's information
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.username = username;
      user.email = email;
      user.password = password;
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  // Method to delete a user
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
};

module.exports = userController;
