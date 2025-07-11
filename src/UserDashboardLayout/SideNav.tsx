import { Link } from "react-router-dom"

export const SideNav = () => {
  return (
    <ul className="menu  bg-gradient-to-br from-[#7c786b] via-[#8e9288] to-[#5f5d5c] min-w-full gap-2 text-base-content min-h-full">
      <li>
        <Link to='activities'> Activities </Link>
      </li>
      <li>
        <Link to='driveNow'> DriveNow </Link>
      </li>
      <li>
        <Link to='bookingHistory'> BookingHistory </Link>
      </li>
      <li>
        <Link to='transactions'>Transactions</Link>
      </li>
      <li>
        <Link to='supportTickets'>SupportTickets</Link>
      </li>
      <li>
        <Link to='settings'>Settings</Link>
      </li>
    </ul>
  )
}
