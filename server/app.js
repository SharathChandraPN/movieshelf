const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "MovieShelf API",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;