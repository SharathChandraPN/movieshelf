import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    poster: "",
    genre: "",
    rating: "",
    watchedAt: "",
  });

  const updateMovie = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/movies/${id}`,
        movie,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">

      <form
        onSubmit={updateMovie}
        className="bg-slate-900 p-8 rounded-xl w-96 space-y-4"
      >

        <h1 className="text-white text-2xl font-bold">
          Edit Movie
        </h1>

        <input
          className="w-full p-3 bg-slate-800 text-white rounded"
          placeholder="Title"
          value={movie.title}
          onChange={(e)=>setMovie({...movie,title:e.target.value})}
        />

        <input
          className="w-full p-3 bg-slate-800 text-white rounded"
          placeholder="Poster URL"
          value={movie.poster}
          onChange={(e)=>setMovie({...movie,poster:e.target.value})}
        />

        <input
          className="w-full p-3 bg-slate-800 text-white rounded"
          placeholder="Genre"
          value={movie.genre}
          onChange={(e)=>setMovie({...movie,genre:e.target.value})}
        />

        <input
          className="w-full p-3 bg-slate-800 text-white rounded"
          placeholder="Rating"
          value={movie.rating}
          onChange={(e)=>setMovie({...movie,rating:e.target.value})}
        />


        <button className="w-full bg-purple-600 p-3 rounded text-white">
          Update
        </button>

      </form>

    </div>
  );
}

export default EditMovie;