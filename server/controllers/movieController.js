const Movie = require("../models/Movie");
const asyncHandler = require("../middleware/asyncHandler");

// Create Movie
const createMovie = asyncHandler(async (req, res) => {
  const { title, poster, genre, rating, watchedAt } = req.body;

  // Validation
  if (!title || !poster || !genre || !rating || !watchedAt) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const movie = await Movie.create({
    title,
    poster,
    genre,
    rating,
    watchedAt,
    owner: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Movie added successfully",
    movie,
  });
});

// Get My Movies
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({
    owner: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: movies.length,
    movies,
  });
});

// Update Movie
const updateMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }

  const { title, poster, genre, rating, watchedAt } = req.body;

  movie.title = title || movie.title;
  movie.poster = poster || movie.poster;
  movie.genre = genre || movie.genre;
  movie.rating = rating || movie.rating;
  movie.watchedAt = watchedAt || movie.watchedAt;

  await movie.save();

  res.status(200).json({
    success: true,
    message: "Movie updated successfully",
    movie,
  });
});

// Delete Movie
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findOne({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }

  await movie.deleteOne();

  res.status(200).json({
    success: true,
    message: "Movie deleted successfully",
  });
});

module.exports = {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
};