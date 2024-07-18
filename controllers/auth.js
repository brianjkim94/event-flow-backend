const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { User } = require('../models');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role });
  await user.save();
  res.status(201).send('User registered');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
