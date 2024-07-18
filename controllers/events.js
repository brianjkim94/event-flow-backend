const express = require('express');
const { Event } = require('../models');
const router = express.Router();

router.post('/', async (req, res) => {
  const { title, description, date, time, location, category, organizer } = req.body;
  const event = new Event({ title, description, date, time, location, category, organizer });
  await event.save();
  res.status(201).send('Event created');
});

module.exports = router;
