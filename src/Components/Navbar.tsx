import { AiOutlineLogin } from "react-icons/ai"
import { FaCar, FaHome, FaInfo, FaPhone } from "react-icons/fa"
import { MdOutlineQuiz, MdOutlineSecurity } from "react-icons/md"
import { Link } from "react-router-dom"


export const Navbar = () => {
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
    </div>
    <a className="font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent"><FaCar/>CARGURU</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to='/'><FaHome className=" text-[#b7701a]"/>Home</Link></li>
       <li><Link to='/contact'><FaPhone className=" text-[#b7701a]"/>Contact</Link></li>
        <li><Link to='/about'><FaInfo className=" text-[#b7701a]"/>About</Link></li>
         <li><Link to='/faq'><MdOutlineQuiz className=" text-[#b7701a]"/>FAQ</Link></li>
           
             

    </ul>
  </div>
  <div className="navbar-end">
     <ul>
    <Link to='/register' className="btn btn-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white border-none"><AiOutlineLogin/>Register</Link>
    <Link to='/login' className="btn btn-sm btn-ghost text-gray-700 hover:text-orange-600 hover:bg-[#aea382]"><MdOutlineSecurity />Login</Link>
     </ul>

  </div>
</div>
  )
}
