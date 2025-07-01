const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { User } = require("../models.js");

router.post(
  "/",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check("Username", "Username contains non-alphanumeric characters - not allowed.")
      .isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const hashedPassword = User.hashPassword(req.body.Password);

    try {
      const existingUser = await User.findOne({ Username: req.body.Username });
      if (existingUser) {
        return res.status(400).send(req.body.Username + " already exists");
      }

      const newUser = await User.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      });

      // Sanitize response
      const userObj = newUser.toObject();
      delete userObj.Password;

      res.status(201).json(userObj);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    }
  }
);

module.exports = router;
