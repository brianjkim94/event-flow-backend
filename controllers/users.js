const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

const SALT_LENGTH = 12;

router.post('/signup', async (req, res) => {
    try {
        console.log('Received signup request:', req.body);
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.status(400).json({ error: 'Username already taken.' });
        }
        const user = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
            name: req.body.firstName +' '+req.body.lastName,
            phoneNumber: req.body.phone,
            location: req.body.state,
            email: req.body.email
        });
        const token = jwt.sign(
            { username: user.username, _id: user._id },
            process.env.JWT_SECRET
        );
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
            const token = jwt.sign(
                { username: user.username, _id: user._id },
                process.env.JWT_SECRET
            );
            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
