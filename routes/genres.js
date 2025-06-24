const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');

router.get('/', async (req, res, next) => {
  res.json(await Genre.find());
});

router.get('/:name', async (req, res, next) => {
  const g = await Genre.findOne({ name: req.params.name });
  if (!g) return res.status(404).json({ error: 'Not found' });
  res.json(g);
});

router.post('/', async (req, res, next) => {
  const newG = await Genre.create(req.body);
  res.status(201).json(newG);
});

module.exports = router;
