import { Outlet } from "react-router";
import { Card } from "./AdminCard";
import { SideNav } from "./AdminSideNav";

export const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0C1729]">
      {/* Sidebar */}
      <div className="w-full md:w-[20%] border-r border-gray-700">
        <SideNav />
      </div>

      {/* Main content area */}
      <div className="w-full md:w-[80%] p-4">
        <Card className="rounded-lg border-4 border-[#574f1f] bg-[#2D4974] text-white">
          <p className="text-green-400 font-semibold mb-4">🚀 Admin</p>
          <Outlet />
        </Card>
      </div>
    </div>
  );
};
