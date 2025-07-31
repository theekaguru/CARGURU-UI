import { useEffect, useState } from "react";
import { GiClick } from "react-icons/gi";
import { GoHistory } from "react-icons/go";
import { LuTickets } from "react-icons/lu";
import { FaHandHoldingDollar, FaUserGear } from "react-icons/fa6";
import { TbActivityHeartbeat } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && isExpanded) {
      const timer = setTimeout(() => setIsExpanded(false), 20000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isMobile]);

  const handleSidebarClick = () => {
    if (isMobile) {
      setIsExpanded(true);
    }
  };

  const shouldExpand = isExpanded || !isMobile;

  const navItemClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
      location.pathname === `/dashboard/${path}`
        ? "bg-[#2D4974]/60 border-l-4 border-yellow-400 text-[#6896C0]"
        : "text-[#C5C7C9] hover:bg-[#1D3C6E] hover:text-[#6896C0]"
    }`;

  const items = [
    { to: "activities", label: "Activities", icon: <TbActivityHeartbeat /> },
    { to: "driveNow", label: "DriveNow", icon: <GiClick /> },
    { to: "bookingHistory", label: "Booking History", icon: <GoHistory /> },
    { to: "payments", label: "Payments", icon: <FaHandHoldingDollar /> },
    { to: "supportTickets", label: "Support Tickets", icon: <LuTickets /> },
    { to: "settings", label: "Settings", icon: <FaUserGear /> },
  ];

  return (
    <div
      className={clsx(
        "fixed sm:static z-50 bg-[#0C1729] text-white h-full transition-all duration-500 ease-in-out",
        shouldExpand ? "w-64 rounded-tr-3xl" : "w-16"
      )}
      onClick={handleSidebarClick}
    >
      <ul className="menu px-2 py-6 gap-3 h-full overflow-hidden">
        {/* Avatar Section */}
        <div className="flex flex-col items-center transition-all duration-300 mb-6">
          <div className="rounded-full bg-gradient-to-tr from-yellow-400 to-orange-400 p-2 shadow-lg mb-2">
            <span className="text-3xl font-extrabold text-white font-[cursive]">₭₳</span>
          </div>
          {shouldExpand && (
            <>
              <span className="text-lg font-bold tracking-widest text-yellow-300 font-[cursive]">
                {user?.firstname || "User"}
              </span>
              <span className="text-xs text-orange-200 font-semibold">Client</span>
            </>
          )}
        </div>

        {/* Navigation Items */}
        {items.map((item) => (
          <li key={item.to}>
            <Link to={`/dashboard/${item.to}`} className={navItemClass(item.to)}>
              {item.icon}
              {shouldExpand && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
