const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Movie } = require("../models.js");

router.get(
  "/:Name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const genre = await Movie.findOne({ "Genre.Name": req.params.Name });
      res.json(genre);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

module.exports = router;
