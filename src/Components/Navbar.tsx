import { AiOutlineLogin } from "react-icons/ai"
import { FaHome, FaInfo, FaPhone, FaSignOutAlt } from "react-icons/fa"
import { MdOutlineQuiz, MdOutlineSecurity } from "react-icons/md"
import { Link , useNavigate} from "react-router-dom"
import type { RootState } from "../../app/store"
import { useDispatch, useSelector } from "react-redux"
import { GrDashboard } from "react-icons/gr"
import { clearCredentials } from "../../features/auth/authSlice"


export const Navbar = () => {

  const  {isAuthenticated , user} = useSelector((state:RootState)=>state.auth)

  const dispatch = useDispatch()

  const handleLogout = async()=>{
    dispatch(clearCredentials())
    navigate('/')
  }

  const navigate = useNavigate()


  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
      <li><Link to='/'><FaHome/>Home</Link></li>
       <li><Link to='/contact'><FaPhone/>Contact</Link></li>
        <li><Link to='/about'><FaInfo/>About</Link></li>
         <li><Link to='/faq'><MdOutlineQuiz />FAQ</Link></li>
           <li><Link to='/register'>Register</Link></li>
             <li><Link to='/login'>Login</Link></li>        
      </ul>
    </div ><a className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse">CARGURU</a></div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to='/' className="flex items-center gap-2  hover:text-yellow-500 transition-colors duration-300 hover:border-b-1 hover:border-black"><FaHome className=" text-[#b7701a]"/>Home</Link></li>
       <li><Link to='/contact' className="flex items-center gap-2  hover:text-yellow-500 transition-colors duration-300 hover:border-b-1 hover:border-black"><FaPhone className=" text-[#b7701a]"/>Contact</Link></li>
        <li><Link to='/about' className="flex items-center gap-2  hover:text-yellow-500 transition-colors duration-300 hover:border-b-1 hover:border-black" ><FaInfo className=" text-[#b7701a]"/>About</Link></li>
         <li><Link to='/faq' className="flex items-center gap-2  hover:text-yellow-500 transition-colors duration-300 hover:border-b-1 hover:border-black"><MdOutlineQuiz className=" text-[#b7701a] "/>FAQ</Link></li>
           
             

    </ul>
  </div>

  {/* navbar end - auth buttons */}

  {!isAuthenticated ? (
      <div className="navbar-end">
      <ul>
      <Link to='/register' className="btn btn-sm bg-gradient-to-r from-orange-400 to-blue-900 hover:from-orange-500 hover:to-amber-800 text-white border-none mr-5"><AiOutlineLogin/>Register</Link>
      <Link to='/login' className="btn btn-sm btn-ghost text-white hover:text-orange-950 hover:bg-[#40602a] animate-pulse  "><MdOutlineSecurity />Login</Link>
      </ul>
  </div>

  ):(
<div className="navbar-end hidden lg:flex gap-2">
                   <div className="dropdown dropdown-end bg-amber-200">
                    <button className="btn btn-ghost flex items-center">
                        <div className="flex items-center">
                            <span className="text-dark">Hey, {user.firstname}</span>
                            <svg
                                className="w-6 h-6 text-orange-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                           
                        </div>
                    </button>
                    <ul className="dropdown-content bg-neutral-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link
                                to="/dashboard/activities"
                                className="flex items-center text-slate-950 hover:text-gray-300 mb-2"
                            >
                                <GrDashboard className="mr-3 text-xl text-orange-600" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-slate-950 hover:text-gray-300"
                            >
                                <FaSignOutAlt className="text-xl text-orange-600 mr-3" />
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
                </div>
   )}


</div>
  )
}
