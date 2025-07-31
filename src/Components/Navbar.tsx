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
    <nav className="navbar flex flex-wrap items-center justify-between px-4 py-3 shadow-md bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-500 text-white">
      {/* Brand */}
      <div className="flex items-center justify-between w-full lg:w-auto">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-white px-4 py-2 rounded-xl shadow-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:scale-105 transition-transform duration-300"
        >
          Levi It to Us™
        </Link>

        {/* Hamburger Icon */}
        <div className="lg:hidden dropdown dropdown-end">
          <button tabIndex={0} className="btn btn-ghost text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 w-56 rounded-xl shadow-xl bg-white/10 backdrop-blur text-white ring-1 ring-white/10"
          >
            <li><Link to="/" className="hover:text-sky-200"><FaHome /> Home</Link></li>
            <li><Link to="/contact" className="hover:text-sky-200"><FaPhone /> Contact</Link></li>
            <li><Link to="/about" className="hover:text-sky-200"><FaInfo /> About</Link></li>
            <li><Link to="/faq" className="hover:text-sky-200"><MdOutlineQuiz /> FAQ</Link></li>
            {!isAuthenticated ? (
              <>
                <li><Link to="/register" className="hover:text-green-200"><AiOutlineLogin /> Register</Link></li>
                <li><Link to="/login" className="hover:text-blue-200"><MdOutlineSecurity /> Login</Link></li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard/activities" className="hover:text-sky-300">
                    <MdDashboard /> Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-left hover:text-red-300"
                  >
                    <RiLogoutCircleRLine /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
        <ul className="menu menu-horizontal gap-6 font-medium text-sm">
          <li><Link to="/" className="hover:underline"><FaHome /> Home</Link></li>
          <li><Link to="/contact" className="hover:underline"><FaPhone /> Contact</Link></li>
          <li><Link to="/about" className="hover:underline"><FaInfo /> About</Link></li>
          <li><Link to="/faq" className="hover:underline"><MdOutlineQuiz /> FAQ</Link></li>
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className="hidden lg:flex lg:items-center lg:gap-3">
        {!isAuthenticated ? (
          <>
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
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-sm px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/20 hover:border-white/40 hover:ring-2 hover:ring-white/30 active:bg-white/20 focus:bg-white/20 transition-all flex items-center gap-2 shadow-sm"
            >
              <span className="font-semibold tracking-wide bg-gradient-to-r from-yellow-200 via-white to-green-300 bg-clip-text text-transparent">
                {user?.firstname || "User"}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm hover:bg-white/20"
                >
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 w-full text-left rounded-md text-sm hover:bg-red-500/20"
                >
                  <RiLogoutCircleRLine className="text-red-300" />
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
