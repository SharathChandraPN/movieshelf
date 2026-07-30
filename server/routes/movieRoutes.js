const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

router.use(protect);

// Create movie & Get all movies
router
  .route("/")
  .post(createMovie)
  .get(getMovies);

// Update & Delete a movie
router
  .route("/:id")
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;