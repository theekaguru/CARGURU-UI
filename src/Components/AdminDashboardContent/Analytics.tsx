"use client";

import { useEffect, useState } from "react";
import { FaUsers, FaDollarSign } from "react-icons/fa";
import { BiCar, BiSolidCalendar } from "react-icons/bi";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type { Variants } from "framer-motion";

import {
  useGetAllUsersQuery,
 useGetAllBookingsQuery,
   useGetAllVehiclesQuery
} from "../../../features/api/analyticsApi";

// Theme + Animation
const HERO_THEME = {
  TEXT: "#76726f",
  HIGHLIGHT: "#b4a125",
  BG: "#1a1a1a",
  CARD: "#222222",
  BORDER: "#2f2f2f",
  SHADOW: "0 0 16px rgba(180, 161, 37, 0.1)",
};

const cardVariants: Variants = {
  hover: {
    scale: 1.04,
    transition: { type: "spring", stiffness: 300 },
  },
  tap: { scale: 0.97 },
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

  const pieData = [
    { name: "Confirmed", value: bookings.filter(b => b.bookingStatus === "Confirmed").length },
    { name: "Pending", value: bookings.filter(b => b.bookingStatus === "Pending").length },
    { name: "Canceled", value: bookings.filter(b => b.bookingStatus === "Canceled").length },
  ];

  return (
    <section
      className="w-full px-4 py-10 min-h-[80vh] flex flex-col items-center justify-center"
      style={{ backgroundColor: HERO_THEME.BG }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold" style={{ color: HERO_THEME.TEXT }}>
          ℂ₳Ɽ ₲ɄⱤɄ <span style={{ color: HERO_THEME.HIGHLIGHT }}>Analytics</span>
        </h1>
        <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-[#14aa2d] via-[#b4a125] to-[#62320c] rounded-full animate-pulse" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {[
          { label: "Users", icon: <FaUsers size={36} />, value: users.length },
          { label: "Bookings", icon: <BiSolidCalendar size={36} />, value: bookings.length },
          { label: "Cars", icon: <BiCar size={36} />, value: cars.length },
          { label: "Revenue", icon: <FaDollarSign size={36} />, value: `Ksh ${revenue.toLocaleString()}` },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            className="p-6 rounded-xl flex items-center gap-4 transition-all"
            style={{
              backgroundColor: HERO_THEME.CARD,
              border: `1px solid ${HERO_THEME.BORDER}`,
              boxShadow: HERO_THEME.SHADOW,
              color: HERO_THEME.TEXT,
            }}
          >
            <div className="text-[#b4a125]">{item.icon}</div>
            <div>
              <p className="text-xl font-semibold">{item.label}</p>
              <p className="text-2xl font-bold text-[#b4a125]">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl mt-12">
        {/* Pie Chart */}
        <div
          className="rounded-xl p-8 shadow-md flex flex-col items-center"
          style={{
            backgroundColor: HERO_THEME.CARD,
            border: `1px solid ${HERO_THEME.BORDER}`,
            boxShadow: HERO_THEME.SHADOW,
          }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: HERO_THEME.HIGHLIGHT }}>
            Booking Status
          </h3>
          <PieChart width={320} height={220}>
            <Pie
              data={pieData}
              cx={150}
              cy={100}
              innerRadius={40}
              outerRadius={80}
              fill={HERO_THEME.HIGHLIGHT}
              paddingAngle={3}
              dataKey="value"
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={["#b4a125", "#76726f", "#333"][index % 3]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Line Chart Placeholder */}
        <div
          className="rounded-xl p-8 shadow-md flex flex-col items-center"
          style={{
            backgroundColor: HERO_THEME.CARD,
            border: `1px solid ${HERO_THEME.BORDER}`,
            boxShadow: HERO_THEME.SHADOW,
          }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: HERO_THEME.TEXT }}>
            Monthly Revenue
          </h3>
          <LineChart width={350} height={220} data={[]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke={HERO_THEME.TEXT} />
            <YAxis stroke={HERO_THEME.TEXT} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={HERO_THEME.HIGHLIGHT}
              strokeWidth={3}
              dot={{ r: 6, fill: HERO_THEME.TEXT }}
            />
          </LineChart>
        </div>
      </div>
    </section>
  );
};
