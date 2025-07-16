import { FaHandHoldingDollar, FaUserGear } from "react-icons/fa6"
import { GiClick } from "react-icons/gi"
import { GoHistory } from "react-icons/go"
import { LuTickets } from "react-icons/lu"
import { TbActivityHeartbeat } from "react-icons/tb"
import { Link, useLocation } from "react-router-dom" // ✅ ADDED

export const SideNav = () => {
  const location = useLocation(); // ✅ ADDED

  return (
    <ul className="menu  bg-gradient-to-br from-[#7c786b] via-[#8e9288] to-[#5f5d5c] min-w-full gap-2 text-base-content min-h-full">
      <li>
        <Link
          to='activities'
          className={`${location.pathname.includes('activities') ? 'border-l-4 border-yellow-400' : ''}`} // ✅ ADDED
        >
          <TbActivityHeartbeat /> Activities
        </Link>
      </li>
      <li>
        <Link
          to='driveNow'
          className={`${location.pathname.includes('driveNow') ? 'border-l-4 border-yellow-400' : ''}`} // ✅ ADDED
        >
          <GiClick /> DriveNow
        </Link>
      </li>
      <li>
        <Link
          to='bookingHistory'
          className={`${location.pathname.includes('bookingHistory') ? 'border-l-4 border-yellow-400' : ''}`} // ✅ ADDED
        >
          <GoHistory /> BookingHistory
        </Link>
      </li>
      <li>
        <Link
          to='transactions'
          className={`${location.pathname.includes('transactions') ? 'border-l-4 border-yellow-400' : ''}`} // ✅ ADDED
        >
          <FaHandHoldingDollar /> Transactions
        </Link>
      </li>
      <li>
        <Link
          to='supportTickets'
          className={`${location.pathname.includes('supportTickets') ? 'border-l-4 border-yellow-400' : ''}`} // ✅ ADDED
        >
          <LuTickets /> SupportTickets
        </Link>
      </li>
      <li>
        <Link
          to='settings'
          className={`${location.pathname.includes('settings') ? 'border-l-4 border-yellow-400' : ''}`} // ✅ ADDED
        >
          <FaUserGear /> Settings
        </Link>
      </li>
    </ul>
  )
}
