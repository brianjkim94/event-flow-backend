const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./controllers/auth');
const eventRoutes = require('./controllers/events');
const rsvpRoutes = require('./controllers/rsvp');
const usersRoutes = require('./controllers/users');
const isLoggedIn = require('./middleware/isLoggedIn');

const app = express();

mongoose.connect(process.env.MONGO_URI_LOCAL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Database error:', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/rsvp', rsvpRoutes);
app.use('/users', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
