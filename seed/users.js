const mongoose = require('mongoose');
require('dotenv').config();
const { User } = require('../models');

User.create({
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin'
})
.then(user => {
    console.log('---- NEW USER ----\n', user);
})
.catch(error => {
    console.log('---- ERROR CREATING USER ----\n', error);
});
