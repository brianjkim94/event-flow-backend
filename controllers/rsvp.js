const express = require('express');
const { RSVP } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

router.post('/:eventId/rsvp', isLoggedIn, async (req, res) => {
  try {
    const { userId } = req.body;
    const rsvp = new RSVP({ user: userId, event: req.params.eventId });
    await rsvp.save();
    res.status(200).json({ message: 'RSVP successful', rsvp });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const rsvps = await RSVP.find().populate('user event');
    res.status(200).json(rsvps);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/myrsvp', isLoggedIn, async (req, res) => {
  try {
    const rsvps = await RSVP.find({ user: req.user._id }).populate('user event');
    res.status(200).json(rsvps);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.id).populate('user event');
    res.status(200).json(rsvp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const { user, event } = req.body;
    const rsvp = await RSVP.findByIdAndUpdate(req.params.id, { user, event }, { new: true }).populate('user event');
    res.status(200).json({ message: 'RSVP updated', rsvp });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    await RSVP.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'RSVP deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
