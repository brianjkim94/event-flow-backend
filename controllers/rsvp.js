const express = require('express');
const { RSVP } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

router.post('/:eventId/rsvp', isLoggedIn, async (req, res) => {
  const { userId } = req.body;
  const rsvp = new RSVP({ user: userId, event: req.params.eventId });
  await rsvp.save();
  res.status(200).send('RSVP successful');
});

module.exports = router;
