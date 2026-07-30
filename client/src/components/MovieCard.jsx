import api from "../services/api";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {

  const deleteMovie = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/movies/${movie._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();

    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };


  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden">

     <img
  src={movie.poster}
  alt={movie.title}
  className="w-full aspect-[9/16] object-cover rounded-xl"
/>

      <div className="p-3">

        <h2 className="font-bold">
          {movie.title}
        </h2>

        <p className="text-yellow-400">
          ⭐ {movie.rating}
        </p>
    

     

       <Link
 to={`/edit-movie/${movie._id}`}
 className="bg-purple-600 px-3 py-1 rounded mr-2"
>
 Edit
</Link>



        <button
          onClick={deleteMovie}
          className="mt-3 bg-red-600 px-3 py-1 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default MovieCard;