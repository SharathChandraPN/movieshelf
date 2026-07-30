const Joi = require("joi");

const movieSchema = Joi.object({
  title: Joi.string().min(1).required(),

  poster: Joi.string().uri().required(),

  genre: Joi.string().required(),

  rating: Joi.number().min(1).max(5).required(),

  watchedAt: Joi.date().required(),
});

module.exports = movieSchema;