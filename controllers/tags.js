const express = require('express');
const { Tag } = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  const { name } = req.body;
  const tag = new Tag({ name });
  await tag.save();
  res.status(201).send('Tag created');
});

router.get('/', async (req, res) => {
  const tags = await Tag.find();
  res.status(200).json(tags);
});

router.get('/:id', async (req, res) => {
  const tag = await Tag.findById(req.params.id);
  res.status(200).json(tag);
});

router.put('/:id', isLoggedIn, async (req, res) => {
  const { name } = req.body;
  const tag = await Tag.findByIdAndUpdate(req.params.id, { name }, { new: true });
  res.status(200).send('Tag updated');
});

router.delete('/:id', isLoggedIn, async (req, res) => {
  await Tag.findByIdAndDelete(req.params.id);
  res.status(200).send('Tag deleted');
});

module.exports = router;
