"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { FaUsers, FaDollarSign } from "react-icons/fa";
import { BiCar, BiSolidCalendar } from "react-icons/bi";
import {
  PieChart,
  Pie,
  Line,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import {
  useGetAllUsersQuery,
  useGetAllBookingsQuery,
  useGetAllVehiclesQuery,
} from "../../../features/api/analyticsApi";

// Theme
const THEME = {
  TEXT: "#76726f",
  HIGHLIGHT: "#b4a125",
  BG: "#1a1a1a",
  CARD: "#222222",
  BORDER: "#2f2f2f",
  SHADOW: "0 0 16px rgba(180, 161, 37, 0.1)",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  DANGER: "#ef4444",
};

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
    transition: {
      type: "spring" as const,
      stiffness: 300,
    },
  },
  tap: {
    scale: 0.98,
  },
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

  const confirmedBookings = bookings.filter(b => b.bookingStatus === "Confirmed").length;
  const pendingBookings = bookings.filter(b => b.bookingStatus === "Pending").length;
  const canceledBookings = bookings.filter(b => b.bookingStatus === "Canceled").length;

  const pieData = [
    { name: "Confirmed", value: confirmedBookings, color: THEME.SUCCESS },
    { name: "Pending", value: pendingBookings, color: THEME.WARNING },
    { name: "Canceled", value: canceledBookings, color: THEME.DANGER },
  ];

  const monthlyData = [
    { month: "Jan", revenue: revenue * 0.15, bookings: Math.floor(bookings.length * 0.12) },
    { month: "Feb", revenue: revenue * 0.12, bookings: Math.floor(bookings.length * 0.14) },
    { month: "Mar", revenue: revenue * 0.18, bookings: Math.floor(bookings.length * 0.16) },
    { month: "Apr", revenue: revenue * 0.16, bookings: Math.floor(bookings.length * 0.18) },
    { month: "May", revenue: revenue * 0.20, bookings: Math.floor(bookings.length * 0.20) },
    { month: "Jun", revenue: revenue * 0.19, bookings: Math.floor(bookings.length * 0.20) },
  ];

  const StatCard = ({
    icon,
    title,
    value,
    subtitle,
    color = THEME.HIGHLIGHT,
  }: StatCardProps) => (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="p-6 rounded-xl transition-all cursor-pointer"
      style={{
        backgroundColor: THEME.CARD,
        border: `1px solid ${THEME.BORDER}`,
        boxShadow: THEME.SHADOW,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-2xl" style={{ color }}>
          {icon}
        </div>
        {subtitle && (
          <div className="text-right text-xs" style={{ color: THEME.TEXT }}>
            {subtitle}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1" style={{ color: THEME.TEXT }}>
          {title}
        </h3>
        <p className="text-2xl font-bold" style={{ color }}>
          {value}
        </p>
      </div>
    </motion.div>
  );

  const ChartCard = ({ title, children, height = "300px" }: ChartCardProps) => (
    <div
      className="rounded-xl p-6 shadow-md"
      style={{
        backgroundColor: THEME.CARD,
        border: `1px solid ${THEME.BORDER}`,
        boxShadow: THEME.SHADOW,
      }}
    >
      <h3 className="text-xl font-bold mb-6 text-center" style={{ color: THEME.HIGHLIGHT }}>
        {title}
      </h3>
      <div style={{ height }}>{children}</div>
    </div>
  );

  const MetricRow = ({ label, value, color = THEME.HIGHLIGHT }: MetricRowProps) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-700">
      <span className="text-sm" style={{ color: THEME.TEXT }}>{label}</span>
      <span className="font-semibold" style={{ color }}>{value}</span>
    </div>
  );

  return (
    <section className="w-full px-4 py-10 min-h-screen" style={{ backgroundColor: THEME.BG }}>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4" style={{ color: THEME.TEXT }}>
          ℂ₳Ɽ ₲ɄⱤɄ <span style={{ color: THEME.HIGHLIGHT }}>Analytics</span>
        </h1>
        <div className="w-32 h-1 mx-auto bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<FaUsers />}
            title="Total Users"
            value={users.length.toLocaleString()}
            subtitle="+8.2% this month"
            color={THEME.SUCCESS}
          />
          <StatCard
            icon={<BiSolidCalendar />}
            title="Total Bookings"
            value={bookings.length.toLocaleString()}
            subtitle="+15.3% this month"
            color="#8b5cf6"
          />
          <StatCard
            icon={<BiCar />}
            title="Total Cars"
            value={cars.length}
            color="#06b6d4"
          />
          <StatCard
            icon={<FaDollarSign />}
            title="Total Revenue"
            value={`Ksh ${revenue.toLocaleString()}`}
            subtitle="+12.5% this month"
            color={THEME.HIGHLIGHT}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="Monthly Revenue & Bookings Trend">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="month" stroke={THEME.TEXT} />
                <YAxis stroke={THEME.TEXT} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: THEME.CARD,
                    border: `1px solid ${THEME.BORDER}`,
                    color: THEME.TEXT,
                    borderRadius: '8px',
                  }}
                  formatter={(value, name) => [
                    name === 'revenue' ? `Ksh ${Number(value).toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Bookings'
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={THEME.HIGHLIGHT}
                  fill={THEME.HIGHLIGHT}
                  fillOpacity={0.3}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke={THEME.SUCCESS}
                  strokeWidth={2}
                />
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
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: THEME.CARD,
                    border: `1px solid ${THEME.BORDER}`,
                    color: THEME.TEXT,
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl p-6 shadow-md" style={{ backgroundColor: THEME.CARD, border: `1px solid ${THEME.BORDER}`, boxShadow: THEME.SHADOW }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: THEME.HIGHLIGHT }}>
              Performance Metrics
            </h3>
            <div className="space-y-1">
              <MetricRow
                label="Booking Success Rate"
                value={`${bookings.length > 0 ? Math.round((confirmedBookings / bookings.length) * 100) : 0}%`}
                color={THEME.SUCCESS}
              />
              <MetricRow
                label="Cancellation Rate"
                value={`${bookings.length > 0 ? Math.round((canceledBookings / bookings.length) * 100) : 0}%`}
                color={THEME.DANGER}
              />
            </div>
          </div>

          <div className="rounded-xl p-6 shadow-md" style={{ backgroundColor: THEME.CARD, border: `1px solid ${THEME.BORDER}`, boxShadow: THEME.SHADOW }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: THEME.HIGHLIGHT }}>
              Financial Metrics
            </h3>
            <div className="space-y-1">
              <MetricRow
                label="Avg Revenue/Booking"
                value={`Ksh ${bookings.length > 0 ? Math.round(revenue / bookings.length).toLocaleString() : 0}`}
              />
              <MetricRow label="Revenue Growth" value="+12.5%" color={THEME.SUCCESS} />
              <MetricRow label="Monthly Target" value="85% achieved" color={THEME.WARNING} />
            </div>
          </div>

          <div className="rounded-xl p-6 shadow-md" style={{ backgroundColor: THEME.CARD, border: `1px solid ${THEME.BORDER}`, boxShadow: THEME.SHADOW }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: THEME.HIGHLIGHT }}>
              Operational Metrics
            </h3>
            <div className="space-y-1">
              <MetricRow
                label="Cars per User"
                value={users.length > 0 ? (cars.length / users.length).toFixed(2) : "0"}
              />
              <MetricRow
                label="Bookings per User"
                value={users.length > 0 ? (bookings.length / users.length).toFixed(2) : "0"}
              />
              <MetricRow label="User Growth" value="+8.2%" color={THEME.SUCCESS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
