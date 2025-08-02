"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s create a measurable
            <br />
            impact on your business.
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Ready to transform your business with our strategic approach and
            proven methodologies?
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl"
          >
            <Coffee className="w-5 h-5" />
            Start Your Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
