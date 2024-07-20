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

router.get('/', async (req, res) => {
  const rsvps = await RSVP.find();
  res.status(200).json(rsvps);
});

router.get('/:id', async (req, res) => {
  const rsvp = await RSVP.findById(req.params.id);
  res.status(200).json(rsvp);
});

router.put('/:id', isLoggedIn, async (req, res) => {
  const { user, event } = req.body;
  const rsvp = await RSVP.findByIdAndUpdate(req.params.id, { user, event }, { new: true });
  res.status(200).send('RSVP updated');
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  await RSVP.findByIdAndDelete(req.params.id);
  res.status(200).send('RSVP deleted');
});

module.exports = router;
