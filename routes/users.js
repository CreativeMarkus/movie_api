const express = require("express");
const router = express.Router();
const Models = require('../models');



router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  }
});

router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email, favorites: [] });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.put("/:username", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      { email: req.body.email },
      { new: true }
    );
    if (updatedUser) {
      res.json({ message: "User updated", user: updatedUser });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

module.exports = router;
