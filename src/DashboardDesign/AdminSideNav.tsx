import { Outlet } from "react-router";
import { Card } from "./AdminCard";
import { SideNav } from "./AdminLayout";

export const Layout = () => {
  return (
    <div className="flex flex-row min-h-screen bg-[#0C1729] relative">
      {/* Sidebar */}
      <div className="transition-all duration-500 ease-in-out">
        <SideNav />
      </div>

      {/* Content section */}
      <div className="flex-1 p-4 overflow-auto">
        <Card className="rounded-lg border-4 border-[#574f1f] bg-[#2D4974] text-white">
          <p className="text-green-400 font-semibold mb-4">🚀 Admin</p>
          <Outlet />
        </Card>
      </div>
    </div>
  );
};
