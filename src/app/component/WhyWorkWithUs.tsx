"use client";
import { motion } from "framer-motion";
import fire from "../../../public/fire.json";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  Brain,
  Rocket,
  RotateCcw,
  Handshake,
  Sparkles,
  Target,
  Users,
  ArrowRight,
  Star,
  Zap,
  TrendingUp,
  Shield,
  Award,
} from "lucide-react";

const items = [
  {
    icon: Brain,
    title: "Strategic Mindset",
    desc: "We don't just execute — we guide with data-driven insights and strategic thinking that transforms your business vision into reality.",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    glowColor: "shadow-blue-500/20",
  },
  {
    icon: Rocket,
    title: "Growth-Obsessed",
    desc: "Your next 100 crores is our focus. We're obsessed with scaling your business through innovative strategies and proven methodologies.",
    color: "from-emerald-600 to-teal-600",
    bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    glowColor: "shadow-emerald-500/20",
  },
  {
    icon: RotateCcw,
    title: "Efficiency Experts",
    desc: "Automation and optimization are baked into our DNA. We streamline processes to maximize your ROI and minimize waste.",
    color: "from-purple-600 to-pink-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    glowColor: "shadow-purple-500/20",
  },
  {
    icon: Handshake,
    title: "Trusted Partners",
    desc: "We work like an extension of your internal team, building long-term relationships based on trust, transparency, and results.",
    color: "from-orange-600 to-red-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    borderColor: "border-orange-200",
    glowColor: "shadow-orange-500/20",
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

export default function WhyWorkWithUs() {
  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50 to-white text-gray-900 py-24 px-6 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl"></div>

        {/* Animated floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-80"></div>
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Why Choose Us
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Why Work With Us?
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine strategic thinking with execution excellence to deliver
            results that exceed expectations and drive sustainable growth.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
              className={`relative group cursor-pointer ${item.bgColor} rounded-3xl p-8 border ${item.borderColor} shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
              ></div>

              {/* Floating particles effect */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/60 rounded-full group-hover:animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-emerald-400/80 rounded-full group-hover:animate-ping"></div>

              {/* Icon */}
              <motion.div
                variants={iconVariants}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
              >
                <item.icon className="w-8 h-8" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {item.desc}
                </p>
              </div>

              {/* Decorative corner element */}
              <div
                className={`absolute top-4 right-4 w-8 h-8 bg-gradient-to-br ${item.color} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
