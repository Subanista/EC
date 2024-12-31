const express = require('express');
const { getUsers, deleteUser } = require('../controllers/userController');
const router = express.Router();

// Fetch all users
router.get('/users', getUsers);

// Delete a user
router.delete('/users/:id', deleteUser);

module.exports = router;
