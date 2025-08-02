"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { FaUsers, FaDollarSign } from "react-icons/fa";
import { BiCar, BiSolidCalendar } from "react-icons/bi";
import {
  PieChart, Pie, Line, Cell, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, ResponsiveContainer,
} from "recharts";

import {
  useGetAllUsersQuery,
  useGetAllBookingsQuery,
  useGetAllVehiclesQuery,
} from "../../features/api/analyticsApi";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  height?: string;
}

interface MetricRowProps {
  label: string;
  value: string | number;
  color?: string;
}

interface StatCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

const cardVariants: Variants = {
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 },
  },
  tap: { scale: 0.98 },
};

export const Analytics = () => {
  const { data: users = [] } = useGetAllUsersQuery();
  const { data: cars = [] } = useGetAllVehiclesQuery();
  const { data: bookings = [] } = useGetAllBookingsQuery();
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const totalRevenue = bookings.reduce(
      (sum, booking) => sum + (parseFloat(booking.totalAmount) || 0),
      0
    );
    setRevenue(totalRevenue);
  }, [bookings]);

  const confirmed = bookings.filter(b => b.bookingStatus === "Confirmed").length;
  const pending = bookings.filter(b => b.bookingStatus === "Pending").length;
  const canceled = bookings.filter(b => b.bookingStatus === "Canceled").length;

  const pieData = [
    { name: "Confirmed", value: confirmed, color: "#10b981" },
    { name: "Pending", value: pending, color: "#f59e0b" },
    { name: "Canceled", value: canceled, color: "#ef4444" },
  ];

  const StatCard = ({ icon, title, value, subtitle, color = "#6896C0" }: StatCardProps) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="p-6 rounded-xl bg-[#2D4974] shadow-lg text-white"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-2xl" style={{ color }}>{icon}</div>
        {subtitle && <div className="text-right text-xs text-white/60">{subtitle}</div>}
      </div>
      <h3 className="text-lg font-semibold mb-1 text-white">{title}</h3>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </motion.div>
  );

  const ChartCard = ({ title, children, height = "300px" }: ChartCardProps) => (
    <div className="rounded-xl p-6 bg-[#2D4974] shadow-lg text-white">
      <h3 className="text-xl font-bold mb-6 text-[#facc15] text-center">{title}</h3>
      <div style={{ height }}>{children}</div>
    </div>
  );

  const MetricRow = ({ label, value, color = "#10b981" }: MetricRowProps) => (
    <div className="flex justify-between items-center py-2 border-b border-[#1D3C6E]">
      <span className="text-sm text-[#C5C7C9]">{label}</span>
      <span className="font-semibold" style={{ color }}>{value}</span>
    </div>
  );

  return (
    <section className="w-full px-4 py-10 min-h-screen bg-[#0C1729] text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#6896C0] mb-2">
          Car Guru <span className="text-yellow-400">Analytics</span>
        </h1>
        <div className="w-32 h-1 mx-auto bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500 rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<FaUsers />} title="Users" value={users.length} color="#10b981" />
          <StatCard icon={<BiSolidCalendar />} title="Bookings" value={bookings.length} color="#8b5cf6" />
          <StatCard icon={<BiCar />} title="Vehicles" value={cars.length} color="#06b6d4" />
          <StatCard icon={<FaDollarSign />} title="Revenue" value={`Ksh ${revenue.toLocaleString()}`} color="#facc15" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="Revenue & Booking Trends">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookings.map((b, i) => ({
                month: `#${i + 1}`,
                revenue: parseFloat(b.totalAmount) || 0,
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1D3C6E" />
                <XAxis dataKey="month" stroke="#C5C7C9" />
                <YAxis stroke="#C5C7C9" />
                <Tooltip contentStyle={{ background: "#1F1E1C", border: "1px solid #444", color: "#fff" }} />
                <Area type="monotone" dataKey="revenue" stroke="#facc15" fill="#facc15" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Booking Status Distribution">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#1F1E1C", border: "1px solid #333", color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </section>
  );
};
