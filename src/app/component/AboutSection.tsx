"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-20 px-6 lg:px-12 ">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-gray-900"
        >
          We are a global creative agency that combines design expertise with
          technology and intelligence.
        </motion.h2>
      </div>
    </section>
  );
}
