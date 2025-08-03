"use client";

import { motion } from "framer-motion";
import { FaMoneyBillAlt, FaCalendarAlt, FaTicketAlt } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const UserAnalytics = () => {
  const staticData = [
    {
      title: "Total Bookings",
      value: 12,
      icon: <FaCalendarAlt size={24} />, 
      color: "bg-cyan-600",
    },
    {
      title: "Total Payments",
      value: 8,
      icon: <FaMoneyBillAlt size={24} />, 
      color: "bg-yellow-500",
    },
    {
      title: "Support Tickets",
      value: 5,
      icon: <FaTicketAlt size={24} />, 
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="w-full min-h-screen p-6 bg-gray-950 text-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-yellow-400">
        Welcome Daniel, Here's Your Analytics
      </h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {staticData.map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className={`rounded-xl shadow-xl w-64 h-36 flex flex-col justify-center items-center text-center ${card.color}`}
          >
            <div className="mb-2">{card.icon}</div>
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-3xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserAnalytics;
