const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Movie } = require("../models.js");

router.get(
  "/:Name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const director = await Movie.findOne({ "Director.Name": req.params.Name });
      res.json(director);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

module.exports = router;