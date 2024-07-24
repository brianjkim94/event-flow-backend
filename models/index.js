const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Database error:', err));

const User = require('./user');
const Event = require('./event');
const Tag = require('./tag');
const RSVP = require('./rsvp');

const db = mongoose.connection;

db.once('open', () => console.log(`Connected to MongoDB at ${db.host}.${db.port}`));
db.on('error', (error) => console.log('Database error \n', error));

module.exports = {
  User,
  Event,
  Tag,
  RSVP
};
