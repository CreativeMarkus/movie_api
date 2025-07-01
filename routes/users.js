const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { User } = require("../models.js");
const bcrypt = require("bcrypt");

router.get("/:Username", async (req, res) => {
  try {
    const user = await User.findOne({ Username: req.params.Username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const userObj = user.toObject();
    delete userObj.Password;

    res.json(userObj);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  }
});


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

    try {
      const existingUser = await User.findOne({ Username: req.body.Username });
      if (existingUser) {
        return res.status(400).send(req.body.Username + " already exists");
      }

      const hashedPassword = await bcrypt.hash(req.body.Password, 10);

      const newUser = await User.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      });

      const userObj = newUser.toObject();
      delete userObj.Password;

      res.status(201).json(userObj);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    }
  }
);

router.put(
  "/:Username",
  [
    check("Username").optional().isLength({ min: 5 }).withMessage("Username must be at least 5 characters long"),
    check("Username").optional().isAlphanumeric().withMessage("Username must be alphanumeric"),
    check("Password").optional().not().isEmpty().withMessage("Password cannot be empty"),
    check("Email").optional().isEmail().withMessage("Email must be valid"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      const updateData = { ...req.body };

      if (updateData.Password) {
        updateData.Password = await bcrypt.hash(updateData.Password, 10);
      }

      const updatedUser = await User.findOneAndUpdate(
        { Username: req.params.Username },
        { $set: updateData },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send("User not found");
      }

      const userObj = updatedUser.toObject();
      delete userObj.Password;

      res.json(userObj);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    }
  }
);

module.exports = router;
