import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddMovie() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
const [watchedAt, setWatchedAt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/movies",
        {
          title,
    poster,
    genre,
    rating,
    watchedAt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to add movie");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h1 className="text-2xl text-white font-bold">Add Movie</h1>

        <input
          className="w-full p-3 rounded bg-slate-800 text-white"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-slate-800 text-white"
          placeholder="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-slate-800 text-white"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        
        <input
  className="w-full p-3 rounded bg-slate-800 text-white"
  placeholder="Genre"
  value={genre}
  onChange={(e) => setGenre(e.target.value)}
/>

<input
  type="date"
  className="w-full p-3 rounded bg-slate-800 text-white"
  value={watchedAt}
  onChange={(e) => setWatchedAt(e.target.value)}
/>
        <button className="w-full bg-purple-600 p-3 rounded text-white">
          Save Movie
        </button>
      </form>
    </div>
  );
}

export default AddMovie;