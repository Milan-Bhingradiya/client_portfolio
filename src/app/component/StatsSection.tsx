"use client";

import { motion } from "framer-motion";

interface StatsSectionProps {
  stats: {
    projects: number;
    clients: number;
    years: number;
    awards: number;
  };
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const statsData = [
    { number: stats.projects, label: "Projects Completed" },
    { number: stats.clients, label: "Happy Clients" },
    { number: stats.years, label: "Years Experience" },
    { number: stats.awards, label: "Awards Won" },
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {stat.number}+
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
