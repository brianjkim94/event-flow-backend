const express = require('express');
const { Event } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();



router.get('/',isLoggedIn, async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({events});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

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

router.post('/', isLoggedIn, async (req, res) => {
  try { 
    console.log('request', req.body)
    const { title, description, date, time, state, country, category, } = req.body;
    const event = await Event.create({ title, description, date, time, country, state, category});
    
    res.status(201).json({event});
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
