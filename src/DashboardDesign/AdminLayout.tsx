import { useEffect, useRef, useState } from "react";
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
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsExpanded(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Click outside to collapse on mobile
  useEffect(() => {
    if (!isMobile || !isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded, isMobile]);

  const toggleSidebar = () => {
    if (isMobile) setIsExpanded((prev) => !prev);
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
      ref={sidebarRef}
      className={clsx(
        "bg-[#0C1729] text-white h-full transition-all duration-500 ease-in-out overflow-hidden",
        shouldExpand ? "w-64" : "w-16"
      )}
    >
      <ul className="menu px-2 py-6 gap-3 h-full">
        {/* Avatar Section */}
        <div
          className="flex flex-col items-center transition-all duration-300 mb-6 cursor-pointer"
          onClick={toggleSidebar}
        >
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
