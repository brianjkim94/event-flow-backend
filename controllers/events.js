const express = require('express');
const { Event } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  const { title, description, date, time, location, category, organizer } = req.body;
  const event = new Event({ title, description, date, time, location, category, organizer });
  await event.save();
  res.status(201).send('Event created');
});

router.get('/', async (req, res) => {
  const events = await Event.find();
  res.status(200).json(events);
});

router.put('/:id', isLoggedIn, async (req, res) => {
  const { title, description, date, time, location, category } = req.body;
  const event = await Event.findByIdAndUpdate(req.params.id, { title, description, date, time, location, category }, { new: true });
  res.status(200).send('Event updated');
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(200).send('Event deleted');
});

module.exports = router;
