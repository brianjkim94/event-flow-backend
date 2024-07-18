const express = require('express');
const { Event } = require('../models');
const router = express.Router();

router.post('/:eventId/rsvp', async (req, res) => {
  const { userId } = req.body;
  const event = await Event.findById(req.params.eventId);
  event.attendees.push(userId);
  await event.save();
  res.status(200).send('RSVP successful');
});

module.exports = router;
