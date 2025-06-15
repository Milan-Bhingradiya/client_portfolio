"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const services = [
  {
    title: "Brand Building",
    slug: "building",
    description:
      "Craft a distinct, memorable identity that resonates with both customers and stakeholders. We transform businesses into brands that command loyalty and market share.",
  },
  {
    title: "Marketing Strategy",
    slug: "marketing",
    description:
      "Your growth deserves more than ad-hoc tactics. We build comprehensive, data-backed marketing strategies that align with your business goals and unlock sustainable results.",
  },
  {
    title: "Cracking D2C",
    slug: "d2c",
    description:
      "We specialize in helping legacy and B2B brands crack the D2C code — from channel strategy and digital shelf optimization to performance marketing and retention.",
  },
  {
    title: "Marketing Automation",
    slug: "automation",
    description:
      "Increase marketing ROI by automating repetitive tasks, integrating tools, and streamlining workflows — freeing your team to focus on what moves the needle.",
  },
];

export default function ServiceSection() {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
        <p className="text-gray-400 text-lg">
          Strategy meets creativity. Explore how we scale your brand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href={`/service/${service.slug}`}>
              <div className="bg-white text-black rounded-2xl p-6 md:p-8 shadow-xl hover:bg-gray-900 hover:text-white transition duration-300 group h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-white transition">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-300 transition text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-medium group-hover:underline">
                    Learn More
                  </span>
                  <FaArrowRight className="text-base group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
