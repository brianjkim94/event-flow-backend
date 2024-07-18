const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('./database');
const authRoutes = require('./controllers/auth');
const eventRoutes = require('./controllers/events');
const rsvpRoutes = require('./controllers/rsvp');
const passport = require('./config/passport-config');
const isLoggedIn = require('./middleware/isLoggedIn');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/rsvp', rsvpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
