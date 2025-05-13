const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { title: 'Inception', director: 'Christopher Nolan' },
    { title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski' }
  ]);
});

module.exports = router;