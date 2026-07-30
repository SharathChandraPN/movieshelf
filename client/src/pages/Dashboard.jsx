import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieGrid from "../components/MovieGrid";
import api from "../services/api";

function Dashboard() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/movies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies(res.data.movies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Recently Watched 🎬
        </h1>

        {movies.length === 0 ? (
          <p className="text-gray-400">
            No movies added yet.
          </p>
        ) : (
          <MovieGrid movies={movies} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;