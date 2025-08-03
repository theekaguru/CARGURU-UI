"use client";

import { motion } from "framer-motion";
import { FaUsers, FaDollarSign } from "react-icons/fa";
import { BiCar, BiSolidCalendar } from "react-icons/bi";
import { MdOutlineMessage, MdOutlineManageAccounts } from "react-icons/md";

const UserAnalytics = () => {
  return (
    <div className="min-h-screen bg-[#0C1729] text-[#1F1E1C] p-6">
      <h1 className="text-3xl font-bold text-[#1D3C6E] mb-6">User Analytics Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#2D4974] rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaUsers size={28} className="text-[#6896C0]" />
            <div>
              <h2 className="text-lg font-semibold">Users</h2>
              <p className="text-2xl font-bold">250</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2D4974] rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <FaDollarSign size={28} className="text-[#6896C0]" />
            <div>
              <h2 className="text-lg font-semibold">Total Payments</h2>
              <p className="text-2xl font-bold">KES 450,000</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2D4974] rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <BiCar size={28} className="text-[#6896C0]" />
            <div>
              <h2 className="text-lg font-semibold">Car Bookings</h2>
              <p className="text-2xl font-bold">38</p>
            </div>
          </div>
        </div>

        <div className="bg-[#2D4974] rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <BiSolidCalendar size={28} className="text-[#6896C0]" />
            <div>
              <h2 className="text-lg font-semibold">Events</h2>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#2D4974] rounded-xl p-6 shadow-md mb-8">
        <h2 className="text-xl font-semibold text-[#1D3C6E] mb-4">Recent Activities</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>User John booked a car on August 2nd.</li>
          <li>User Mary paid KES 10,000 for rental fees.</li>
          <li>User Alex updated their profile information.</li>
          <li>User Jane canceled her event reservation.</li>
          <li>New user Michael signed up.</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button className="bg-[#6896C0] hover:bg-[#5f88b3] text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-2">
          <MdOutlineMessage size={20} /> Message Users
        </button>
        <button className="bg-[#6896C0] hover:bg-[#5f88b3] text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-2">
          <BiCar size={20} /> View Bookings
        </button>
        <button className="bg-[#6896C0] hover:bg-[#5f88b3] text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-2">
          <MdOutlineManageAccounts size={20} /> Manage Accounts
        </button>
      </div>
    </div>
  );
};

export default UserAnalytics;