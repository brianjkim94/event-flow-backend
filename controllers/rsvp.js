const express = require('express');
const { Event } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

router.post('/:eventId/rsvp', isLoggedIn, async (req, res) => {
  const { userId } = req.body;
  const event = await Event.findById(req.params.eventId);
  event.attendees.push(userId);
  await event.save();
  res.status(200).send('RSVP successful');
});

module.exports = router;
