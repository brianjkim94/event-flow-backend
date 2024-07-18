const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./database');
const authRoutes = require('./controllers/auth');
const eventRoutes = require('./controllers/events');
const rsvpRoutes = require('./controllers/rsvp');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/rsvp', rsvpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
