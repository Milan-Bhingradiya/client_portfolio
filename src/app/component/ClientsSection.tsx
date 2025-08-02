"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ClientsSectionProps {
  logos: any[];
}

export default function ClientsSection({ logos }: ClientsSectionProps) {
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
            Our Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by leading brands across industries
          </p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center"
            >
              <Image
                className="grayscale hover:grayscale-0 transition-all duration-300"
                src={logo || "/placeholder.svg"}
                alt="Client logo"
                width={80}
                height={80}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
