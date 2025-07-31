import { AiOutlineLogin } from "react-icons/ai";
import { FaHome, FaInfo, FaPhone } from "react-icons/fa";
import { MdDashboard, MdOutlineQuiz, MdOutlineSecurity } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../features/auth/authSlice";
import type { RootState } from "../app/store";

export const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/");
  };

  return (
    <nav className="navbar px-6 py-3 shadow-md bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-500 text-white">
      {/* Branding */}
      <div className="navbar-start">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white px-4 py-2 rounded-xl shadow-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:scale-105 transition-transform duration-300"
        >
          Levi It to Us™
        </Link>

        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden ml-4">
          <button tabIndex={0} className="btn btn-ghost text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-3 shadow rounded-box bg-white/10 backdrop-blur text-white w-52 ring-1 ring-white/10"
          >
            <li><Link to="/" className="hover:text-sky-200"><FaHome /> Home</Link></li>
            <li><Link to="/contact" className="hover:text-sky-200"><FaPhone /> Contact</Link></li>
            <li><Link to="/about" className="hover:text-sky-200"><FaInfo /> About</Link></li>
            <li><Link to="/faq" className="hover:text-sky-200"><MdOutlineQuiz /> FAQ</Link></li>
            {!isAuthenticated && (
              <>
                <li><Link to="/register" className="hover:text-green-200"><AiOutlineLogin /> Register</Link></li>
                <li><Link to="/login" className="hover:text-blue-200"><MdOutlineSecurity /> Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Links for large screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5 text-sm font-medium">
          <li><Link to="/" className="hover:underline"><FaHome /> Home</Link></li>
          <li><Link to="/contact" className="hover:underline"><FaPhone /> Contact</Link></li>
          <li><Link to="/about" className="hover:underline"><FaInfo /> About</Link></li>
          <li><Link to="/faq" className="hover:underline"><MdOutlineQuiz /> FAQ</Link></li>
        </ul>
      </div>

      {/* Auth buttons */}
      <div className="navbar-end">
        {!isAuthenticated ? (
          <div className="flex gap-3">
            <Link
              to="/register"
              className="btn btn-sm bg-white text-sky-700 font-bold hover:bg-sky-100 border-none transition"
            >
              <AiOutlineLogin /> Register
            </Link>
            <Link
              to="/login"
              className="btn btn-sm border-white text-white hover:bg-white hover:text-blue-600 transition"
            >
              <MdOutlineSecurity /> Login
            </Link>
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-sm px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/20 hover:border-white/40 hover:ring-2 hover:ring-white/30 active:bg-white/20 focus:bg-white/20 transition-all duration-200 ease-in-out flex items-center gap-2 shadow-sm"
            >
              <span className="font-semibold tracking-wide bg-gradient-to-r from-yellow-200 via-white to-green-300 bg-clip-text text-transparent">
                {user?.firstname || "User"}
              </span>
              <svg
                className="w-4 h-4 text-white transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content mt-2 w-48 rounded-xl bg-white/10 backdrop-blur-md text-white shadow-lg ring-1 ring-white/10"
            >
              <li>
                <Link
                  to="/dashboard/activities"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm hover:bg-white/20 transition-all"
                >
                  <MdDashboard className="text-lg" />
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 w-full rounded-md text-sm hover:bg-red-500/20 text-left transition-all"
                >
                  <RiLogoutCircleRLine className="text-lg text-red-300" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
