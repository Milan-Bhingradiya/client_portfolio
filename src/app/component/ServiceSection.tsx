"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import {
  Palette,
  TrendingUp,
  ShoppingCart,
  Zap,
  Sparkles,
  Target,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";

const services = [
  {
    title: "Brand Building",
    slug: "building",
    description:
      "Craft a distinct, memorable identity that resonates with both customers and stakeholders. We transform businesses into brands that command loyalty and market share.",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-900/20 to-pink-900/20",
    borderColor: "border-purple-500/30",
  },
  {
    title: "Marketing Strategy",
    slug: "marketing",
    description:
      "Your growth deserves more than ad-hoc tactics. We build comprehensive, data-backed marketing strategies that align with your business goals and unlock sustainable results.",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500",
    bgGradient: "from-orange-900/20 to-red-900/20",
    borderColor: "border-orange-500/30",
  },
  {
    title: "Cracking D2C",
    slug: "d2c",
    description:
      "We specialize in helping legacy and B2B brands crack the D2C code — from channel strategy and digital shelf optimization to performance marketing and retention.",
    icon: ShoppingCart,
    color: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-900/20 to-cyan-900/20",
    borderColor: "border-blue-500/30",
  },
  {
    title: "Marketing Automation",
    slug: "automation",
    description:
      "Increase marketing ROI by automating repetitive tasks, integrating tools, and streamlining workflows — freeing your team to focus on what moves the needle.",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    bgGradient: "from-green-900/20 to-emerald-900/20",
    borderColor: "border-green-500/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
  },
};

export default function ServiceSection() {
  return (
    <section className="relative bg-black text-white py-24 px-6 md:px-12 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Our Expertise
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Our Services
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Strategy meets creativity. Explore how we scale your brand with
            cutting-edge solutions and proven methodologies.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group cursor-pointer"
            >
              <Link href={`/service/${service.slug}`}>
                <div
                  className={`relative h-full rounded-3xl p-8 border ${service.borderColor} bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 overflow-hidden`}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                  ></div>

                  {/* Floating particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full group-hover:animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/30 rounded-full group-hover:animate-ping"></div>

                  {/* Icon */}
                  <motion.div
                    variants={iconVariants}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <service.icon className="w-8 h-8" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Bottom section with arrow */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                        Learn More
                      </span>
                      <motion.div
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors duration-300"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Decorative corner element */}
                  <div
                    className={`absolute top-4 right-4 w-8 h-8 bg-gradient-to-br ${service.color} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                  ></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-500/30">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mb-6"
            >
              <Target className="w-10 h-10 text-white" />
            </motion.div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Scale Your Business?
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Let&apos;s discuss how our strategic services can transform your
              brand and drive sustainable growth.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl"
            >
              <Users className="w-5 h-5" />
              Explore Services
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
