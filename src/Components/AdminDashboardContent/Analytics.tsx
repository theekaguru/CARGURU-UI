import { FaUsers, FaDollarSign } from 'react-icons/fa';
import { BiCar, BiSolidCalendar } from 'react-icons/bi';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, LineChart, Line, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import type { Variants } from "framer-motion";

const cardVariants: Variants = {
  hover: {
    scale: 1.04,
    transition: { type: "spring", stiffness: 300 },
  },
  tap: { scale: 0.97 },
};

const HERO_THEME = {
  TEXT: '#76726f',
  HIGHLIGHT: '#b4a125',
  BG: '#1a1a1a',
  CARD: '#222222',
  BORDER: '#2f2f2f',
  SHADOW: '0 0 16px rgba(180, 161, 37, 0.1)'
};

const pieData = [
  { name: 'Confirmed', value: 45 },
  { name: 'Pending', value: 25 },
  { name: 'Canceled', value: 10 },
];

const lineData = [
  { name: 'Jan', value: 100000 },
  { name: 'Feb', value: 85000 },
  { name: 'Mar', value: 91000 },
  { name: 'Apr', value: 120000 },
  { name: 'May', value: 110000 },
];

const usersCount = 120;
const bookingsCount = 80;
const carsCount = 25;
const totalRevenue = 480000;

export const Analytics = () => {
  return (
    <section className="w-full px-4 py-10 min-h-[80vh] flex flex-col items-center justify-center" style={{ backgroundColor: HERO_THEME.BG }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold" style={{ color: HERO_THEME.TEXT }}>
          ℂ₳Ɽ ₲ɄⱤɄ <span style={{ color: HERO_THEME.HIGHLIGHT }}>Analytics</span>
        </h1>
        <div className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-[#14aa2d] via-[#b4a125] to-[#62320c] rounded-full animate-pulse" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {[
          { label: 'Users', icon: <FaUsers size={36} />, value: usersCount },
          { label: 'Bookings', icon: <BiSolidCalendar size={36} />, value: bookingsCount },
          { label: 'Cars', icon: <BiCar size={36} />, value: carsCount },
          { label: 'Revenue', icon: <FaDollarSign size={36} />, value: `Ksh ${totalRevenue.toLocaleString()}` },
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
        <div className="rounded-xl p-8 shadow-md flex flex-col items-center" style={{
          backgroundColor: HERO_THEME.CARD,
          border: `1px solid ${HERO_THEME.BORDER}`,
          boxShadow: HERO_THEME.SHADOW
        }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: HERO_THEME.HIGHLIGHT }}>Booking Status</h3>
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
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#b4a125', '#76726f', '#333'][index % 3]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Line Chart */}
        <div className="rounded-xl p-8 shadow-md flex flex-col items-center" style={{
          backgroundColor: HERO_THEME.CARD,
          border: `1px solid ${HERO_THEME.BORDER}`,
          boxShadow: HERO_THEME.SHADOW
        }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: HERO_THEME.TEXT }}>Monthly Revenue</h3>
          <LineChart width={350} height={220} data={lineData}>
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
