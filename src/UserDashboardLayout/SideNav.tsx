

import { FaHandHoldingDollar, FaUserGear } from "react-icons/fa6"
import { GiClick } from "react-icons/gi"
import { GoHistory } from "react-icons/go"
import { LuTickets } from "react-icons/lu"
import { TbActivityHeartbeat } from "react-icons/tb"
import { Link } from "react-router-dom"

export const SideNav = () => {
  return (
    <ul className="menu  bg-gradient-to-br from-[#7c786b] via-[#8e9288] to-[#5f5d5c] min-w-full gap-2 text-base-content min-h-full">
      <li>
        <Link to='activities'><TbActivityHeartbeat /> Activities </Link>
      </li>
      <li>
        <Link to='driveNow'><GiClick/> DriveNow </Link>
      </li>
      <li>
        <Link to='bookingHistory'><GoHistory/> BookingHistory </Link>
      </li>
      <li>
        <Link to='transactions'><FaHandHoldingDollar />Transactions</Link>
      </li>
      <li>
        <Link to='supportTickets'><LuTickets />SupportTickets</Link>
      </li>
      <li>
        <Link to='settings'><FaUserGear />Settings</Link>
      </li>
    </ul>
  )
}