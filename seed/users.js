const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { User } = require('../models');

User.create({
    email: 'admin@example.com',
    password: bcrypt.hashSync('adminpassword', 10),
    role: 'admin'
})
.then(user => {
    console.log('---- NEW USER ----\n', user);
})
.catch(error => {
    console.log('---- ERROR CREATING USER ----\n', error);
});
