"use client";

import { motion } from "framer-motion";

interface IndustriesSectionProps {
  topRow: string[];
  bottomRow: string[];
}

export default function IndustriesSection({
  topRow,
  bottomRow,
}: IndustriesSectionProps) {
  return (
    <section className="py-20 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Industries We Serve
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {topRow.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center py-4 border-b border-gray-200 lg:border-none"
            >
              <div className="font-bold text-lg lg:text-2xl text-gray-900">
                {item}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {bottomRow.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 4) * 0.1 }}
              className="text-center py-4"
            >
              <div className="font-bold text-lg lg:text-2xl text-gray-900">
                {item}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
