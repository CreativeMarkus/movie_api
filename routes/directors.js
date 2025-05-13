const express = require('express');
const router = express.Router();

router.get('/:name', (req, res) => {
  res.send(`Details for director: ${req.params.name}`);
});

module.exports = router;