
import { CiBookmarkPlus } from "react-icons/ci"
import { FaUsersCog } from "react-icons/fa"
import { IoCarSport } from "react-icons/io5"
import { LuTickets } from "react-icons/lu"
import { MdSettingsInputComposite } from "react-icons/md"
import { TbDeviceDesktopAnalytics } from "react-icons/tb"
import { Link } from "react-router-dom"

export const SideNav = () => {
  return (
    <ul className="menu  bg-gradient-to-br from-[#7c786b] via-[#8e9288] to-[#5f5d5c] min-w-full gap-2 text-base-content min-h-full">
      <li>
        <Link to='analytics'><TbDeviceDesktopAnalytics /> Activities </Link>
      </li>
      <li>
        <Link to='users'><CiBookmarkPlus/> Users </Link>
      </li>
      <li>
        <Link to='bookings'><CiBookmarkPlus/> Bookings</Link>
      </li>
      <li>
        <Link to='cars'><IoCarSport/> Cars </Link>
      </li>
      <li>
        <Link to='carSpecifications'><MdSettingsInputComposite />CarSpecifications</Link>
      </li>
      <li>
        <Link to='adminSupport'><LuTickets />Support</Link>
      </li>
      <li>
        <Link to='settings'><FaUsersCog />Settings</Link>
      </li>
    </ul>
  )
}