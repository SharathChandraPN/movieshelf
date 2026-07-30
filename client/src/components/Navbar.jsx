import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Plus, LogOut } from "lucide-react";
import api from "../services/api";

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
    <>
      <nav className="bg-zinc-900 border-b border-zinc-800 px-5 md:px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="text-2xl md:text-3xl font-bold text-purple-500 tracking-wide"
          >
            🎬 MovieShelf
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Desktop Search */}
            <input
              type="text"
              placeholder="Search movies..."
              className="hidden md:block bg-zinc-800 text-white px-4 py-2 rounded-xl w-72 outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Mobile Search */}
            <button className="md:hidden w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center">
              <Search size={22} className="text-white" />
            </button>

            {/* Desktop Add */}
            <Link
              to="/add-movie"
              className="hidden md:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl text-white transition"
            >
              <Plus size={18} />
              Add
            </Link>

            {/* Profile */}
            <div className="relative">

              {/* Desktop */}
              <button
                onClick={() => setOpen(!open)}
                className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-zinc-800 hover:bg-zinc-700"
              >
                <User size={20} className="text-white" />
              </button>

              {/* Mobile */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
              >
                <User size={22} className="text-white" />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-60 bg-zinc-800 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden z-50">

                  {/* User Info */}
                  <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-700">
                    <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white text-lg font-bold">
                      {name ? name.charAt(0).toUpperCase() : "U"}
                    </div>

                    <div>
                      <p className="text-white font-semibold">
                        {name || "User"}
                      </p>

                      <p className="text-zinc-400 text-sm">
                        Welcome back 👋
                      </p>
                    </div>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-4 text-red-400 hover:bg-zinc-700 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>
      </nav>

      {/* Floating Add Button */}
      <Link
        to="/add-movie"
        className="md:hidden fixed bottom-6 right-6 w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 shadow-2xl flex items-center justify-center z-50"
      >
        <Plus size={30} className="text-white" />
      </Link>
    </>
  );
}

export default Navbar;