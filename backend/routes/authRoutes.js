const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const router = express.Router();
const JWT_SECRET = 'your-secret-key';

// Register User
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Email already exists' });

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token , user: {
            id: user._id,
            name: user.name, // Include user's name
            email: user.email
        }});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
