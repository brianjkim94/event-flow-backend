const mongoose = require('mongoose');
require('dotenv').config();
const { User } = require('../models');

User.create({
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin',
    name: 'Admin User',
    phoneNumber: '123-456-7890',
    location: 'Admin Location'
})
.then(user => {
    console.log('---- NEW USER ----\n', user);
})
.catch(error => {
    console.log('---- ERROR CREATING USER ----\n', error);
});
