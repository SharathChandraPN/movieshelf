import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
function Navbar() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setName(res.data.user.name);

      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);


  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };


  return (
    <nav className="bg-zinc-900 px-8 py-4 flex justify-between items-center">

      <h1 className="text-3xl font-bold text-purple-500">
        🎬 MovieShelf
      </h1>


      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search movies..."
          className="bg-zinc-800 text-white px-4 py-2 rounded-lg w-80"
        />


        <Link
  to="/add-movie"
  className="bg-purple-600 px-4 py-2 rounded-lg"
>
  + Add
</Link>


        {/* Profile Dropdown */}
        <div className="relative">

          <button
            onClick={() => setOpen(!open)}
            className="bg-zinc-800 px-4 py-2 rounded-lg"
          >
            👤 {name || "User"} 
          </button>


          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-zinc-800 rounded-lg p-3">

              <p className="text-white mb-3">
                {name}
              </p>


              <button
                onClick={logout}
                className="text-red-400 hover:text-red-300"
              >
                🚪 Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;