const express = require('express');
const { Tag } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const { name } = req.body;
    const tag = new Tag({ name });
    await tag.save();
    res.status(201).json({ message: 'Tag created', tag });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await Tag.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.status(200).json({ message: 'Tag updated', tag });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
