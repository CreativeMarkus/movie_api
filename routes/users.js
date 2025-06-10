const express = require("express");
const router = express.Router();

let users = [
  {
    username: "john_doe",
    email: "john@example.com",
    favorites: []
  }
];

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:username", (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

router.post("/", (req, res) => {
  const { username, email } = req.body;
  users.push({ username, email, favorites: [] });
  res.status(201).json({ message: "User registered successfully", user: { username, email } });
});

router.put("/:username", (req, res) => {
  const user = users.find(u => u.username === req.params.username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.email = req.body.email || user.email;
  res.json({ message: "User updated", user });
});

router.post("/login", (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);
  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
