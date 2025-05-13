const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send(`New user created: ${JSON.stringify(req.body)}`);
});

router.put('/:id', (req, res) => {
  res.send(`User with ID ${req.params.id} updated`);
});

router.delete('/:id', (req, res) => {
  res.send(`User with ID ${req.params.id} deleted`);
});

module.exports = router;