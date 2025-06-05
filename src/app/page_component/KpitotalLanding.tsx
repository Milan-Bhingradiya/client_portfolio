"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Rocket,
  RotateCcw,
  Handshake,
  Target,
  TrendingUp,
  ShoppingCart,
  Zap,
} from "lucide-react";

export default function KpitotalLanding() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const coreOfferings = [
    {
      icon: Target,
      title: "Brand Building",
      description:
        "Craft a distinct, memorable identity that resonates with both customers and stakeholders. We transform businesses into brands that command loyalty and market share.",
    },
    {
      icon: TrendingUp,
      title: "Marketing Strategy",
      description:
        "Your growth deserves more than ad-hoc tactics. We build comprehensive, data-backed marketing strategies that align with your business goals and unlock sustainable results.",
    },
    {
      icon: ShoppingCart,
      title: "Cracking D2C",
      description:
        "We specialize in helping legacy and B2B brands crack the D2C code — from channel strategy and digital shelf optimization to performance marketing and retention.",
    },
    {
      icon: Zap,
      title: "Marketing Automation",
      description:
        "Increase marketing ROI by automating repetitive tasks, integrating tools, and streamlining workflows — freeing your team to focus on what moves the needle.",
    },
  ];

  const whyWorkWithUs = [
    {
      icon: Brain,
      title: "Strategic Mindset",
      description: "We don't just execute — we guide.",
    },
    {
      icon: Rocket,
      title: "Growth-Obsessed",
      description: "Your next 100 crores is our focus.",
    },
    {
      icon: RotateCcw,
      title: "Efficiency Experts",
      description: "Automation and optimization are baked into our DNA.",
    },
    {
      icon: Handshake,
      title: "Trusted Partners",
      description: "We work like an extension of your internal team.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden ">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Scaling Ambitious Brands with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Strategy, Structure, and Smart Marketing
              </span>
            </motion.h1>

            <motion.p
              className="mt-8 text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We help growth-stage companies build powerful brands, engineer
              high-impact marketing strategies, and automate for efficiency — so
              you can scale without limits.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="#contact">
                <motion.button
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg flex items-center justify-center gap-3 shadow-lg"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book a consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-60"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-60"
          animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              What We Do
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-600 leading-relaxed">
                At Kpitotal, we partner with companies crossing the ₹100 Cr
                threshold to accelerate their next phase of growth. Our work
                isn't about guesswork or fluff — it's rooted in strategic
                clarity, operational efficiency, and bold execution.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Offerings Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core Offerings
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {coreOfferings.map((offering, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <offering.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {offering.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {offering.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Work With Us?
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {whyWorkWithUs.map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <reason.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{reason.title}</h3>
                <p className="text-blue-100 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Let's Talk Growth
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Whether you're restructuring your marketing engine or preparing
              for your next leap, we're ready to help.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#" className="inline-block">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Book a consultation →
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
