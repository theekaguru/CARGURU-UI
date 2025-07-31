import { useState } from "react";
import { FaBars, FaHandHoldingDollar, FaUserGear } from "react-icons/fa6";
import { GiClick } from "react-icons/gi";
import { GoHistory } from "react-icons/go";
import { LuTickets } from "react-icons/lu";
import { TbActivityHeartbeat } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

export const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItemClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
     ${
       location.pathname.includes(path)
         ? "bg-[#2D4974]/60 border-l-4 border-yellow-400 text-[#6896C0]"
         : "text-[#C5C7C9] hover:bg-[#1D3C6E] hover:text-[#6896C0]"
     }`;

  return (
    <>
      {/* Mobile Header Toggle */}
      <div className="sm:hidden p-4 bg-[#0C1729] flex justify-between items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#6896C0] text-2xl"
        >
          <FaBars />
        </button>
        <span className="text-yellow-300 font-bold font-[cursive]">₲ɄⱤɄ User</span>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed sm:static z-50 bg-[#0C1729] text-white w-64 h-full transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <ul className="menu min-w-full min-h-full gap-2 px-3 py-6 shadow-md">
          {/* Avatar */}
          <div className="mb-10 flex flex-col items-center">
            <div className="rounded-full bg-gradient-to-tr from-yellow-400 to-orange-400 p-2 shadow-lg mb-2">
              <span className="text-3xl font-extrabold text-white font-[cursive]">₭₳</span>
            </div>
            <span className="text-lg font-bold tracking-widest text-yellow-300 font-[cursive]">₲ɄⱤɄ</span>
            <span className="text-xs text-orange-200 font-semibold">User</span>
          </div>

          {/* Navigation */}
          <li>
            <Link to="activities" className={navItemClass("activities")}>
              <TbActivityHeartbeat /> Activities
            </Link>
          </li>
          <li>
            <Link to="driveNow" className={navItemClass("driveNow")}>
              <GiClick /> DriveNow
            </Link>
          </li>
          <li>
            <Link to="bookingHistory" className={navItemClass("bookingHistory")}>
              <GoHistory /> BookingHistory
            </Link>
          </li>
          <li>
            <Link to="payments" className={navItemClass("payments")}>
              <FaHandHoldingDollar /> Payments
            </Link>
          </li>
          <li>
            <Link to="supportTickets" className={navItemClass("supportTickets")}>
              <LuTickets /> SupportTickets
            </Link>
          </li>
          <li>
            <Link to="settings" className={navItemClass("settings")}>
              <FaUserGear /> Settings
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
