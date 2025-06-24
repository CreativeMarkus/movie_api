const express = require('express');
const router = express.Router();
const Director = require('../models/Director');

router.get('/', async (req, res, next) => {
  res.json(await Director.find());
});

router.get('/:name', async (req, res, next) => {
  const d = await Director.findOne({ name: req.params.name });
  if (!d) return res.status(404).json({ error: 'Not found' });
  res.json(d);
});

router.post('/', async (req, res, next) => {
  const newD = await Director.create(req.body);
  res.status(201).json(newD);
});


module.exports = router;
