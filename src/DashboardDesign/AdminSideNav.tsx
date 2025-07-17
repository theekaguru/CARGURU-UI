import { CiBookmarkPlus, CiLocationOn } from "react-icons/ci"
import { FaUsersCog } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import { LuTickets } from "react-icons/lu"
import { MdSettingsInputComposite } from "react-icons/md"
import { TbDeviceDesktopAnalytics } from "react-icons/tb"
import { Link, useLocation } from "react-router-dom" // ⬅️ Added

export const SideNav = () => {
  const location = useLocation(); // ⬅️ Added

  return (
    <ul className="menu  bg-gradient-to-br from-[#7c786b] via-[#8e9288] to-[#5f5d5c] min-w-full gap-2 text-base-content min-h-full">
      <li>
        <Link
          to='analytics'
          className={`${location.pathname.includes('analytics') ? 'border-l-4 border-yellow-400' : ''}`}
        >
          <TbDeviceDesktopAnalytics /> Activities
        </Link>
      </li>
      <li>
        <Link
          to='users'
          className={`${location.pathname.includes('users') ? 'border-l-4 border-yellow-400' : ''}`}
        >
          <CiBookmarkPlus /> Users
        </Link>
      </li>
      <li>
        <Link
          to='bookings'
          className={`${location.pathname.includes('bookings') ? 'border-l-4 border-yellow-400' : ''}`}
        >
          <CiBookmarkPlus /> Bookings
        </Link>
      </li>
      <li>
        <Link
          to='location'
          className={`${location.pathname.includes('location') ? 'border-l-4 border-yellow-400' : ''}`}
        >
          <CiLocationOn/> Location
        </Link>
      </li>
      <li>
        <Link
          to='cars'
          className={`${location.pathname.includes('cars') ? 'border-l-4 border-yellow-400' : ''}`}
        >
          <IoCarSport /> Cars
        </Link>
      </li>
      <li>
        <Link
          to='carSpecifications'
          className={`${location.pathname.includes('carSpecifications') ? 'border-l-4 border-yellow-400' : ''}`}
        >
          <MdSettingsInputComposite /> CarSpecifications
        </Link>
      </li>
      <li>
        <Link
          to='adminSupport'
          className={`${location.pathname.includes('adminSupport') ? 'border-l-4 border-yellow-400' : ''}`}
        >
          <LuTickets /> Support
        </Link>
      </li>
      <li>
        <Link
          to='profile'
          className={`${location.pathname.includes('profile') ? 'border-l-4 border-yellow-400' : ''}`}
        >
          <FaUsersCog /> Profile
        </Link>
      </li>
    </ul>
  )
}
