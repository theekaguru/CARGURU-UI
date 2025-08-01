import { useEffect, useState } from "react";
import { FaUsers, FaUsersCog } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoBookmark, IoCarSport } from "react-icons/io5";
import { LuTickets } from "react-icons/lu";
import { MdSettingsInputComposite } from "react-icons/md";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export const SideNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-collapse on mobile after 3 seconds
  useEffect(() => {
    if (isMobile && isExpanded) {
      const timer = setTimeout(() => setIsExpanded(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isMobile]);

  // Handle expanding sidebar only on mobile
  const handleSidebarClick = () => {
    if (isMobile) {
      setIsExpanded(true);
    }
  };

  const navItemClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${
      location.pathname.includes(path)
        ? "bg-[#2D4974]/60 border-l-4 border-yellow-400 text-[#6896C0]"
        : "text-[#C5C7C9] hover:bg-[#1D3C6E] hover:text-[#6896C0]"
    }`;

  const items = [
    { to: "analytics", label: "Activities", icon: <TbDeviceDesktopAnalytics /> },
    { to: "users", label: "Users", icon: <FaUsers /> },
    { to: "bookings", label: "Bookings", icon: <IoBookmark /> },
    { to: "location", label: "Location", icon: <FaLocationDot /> },
    { to: "cars", label: "Cars", icon: <IoCarSport /> },
    { to: "carSpecifications", label: "Specifications", icon: <MdSettingsInputComposite /> },
    { to: "adminSupport", label: "Support", icon: <LuTickets /> },
    { to: "profile", label: "Profile", icon: <FaUsersCog /> },
  ];

  const shouldExpand = isExpanded || !isMobile;

  return (
    <div
      className={clsx(
        "fixed sm:static z-50 bg-[#0C1729] text-white h-full transition-all duration-500 ease-in-out",
        shouldExpand ? "w-64 rounded-tr-3xl" : "w-16"
      )}
      onClick={handleSidebarClick}
    >
      <ul className="menu px-2 py-6 gap-3 h-full overflow-hidden">
        {/* Avatar */}
        {/* Avatar Section */}
<div className="flex flex-col items-center transition-all duration-300 mb-6">
  {/* Online Status Dot */}
  <div className="w-3 h-3 bg-green-400 rounded-full shadow-md mb-2"></div>

  {shouldExpand && (
    <>
      <span className="text-lg font-bold tracking-widest text-yellow-300 font-[cursive]">
        {user?.firstname || "kaguru"}
      </span>
      <span className="text-xs text-orange-200 font-semibold">
        {user?.role || "Admin"}
      </span>
    </>
  )}
</div>


        {/* Nav Items */}
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className={navItemClass(item.to)}>
              {item.icon}
              {shouldExpand && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
