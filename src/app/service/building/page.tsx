"use client";
import { motion } from "framer-motion";
import {
  Search,
  Palette,
  Puzzle,
  Rocket,
  Users,
  DollarSign,
  Star,
  Heart,
  CheckCircle,
  PhoneCall,
} from "lucide-react";

const stats = [
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    text: "81% of consumers need to trust a brand before making a purchase",
  },
  {
    icon: <DollarSign className="w-8 h-8 text-green-600" />,
    text: "46% are willing to pay more for brands they trust",
  },
  {
    icon: <Palette className="w-8 h-8 text-pink-600" />,
    text: "80% boost in brand recognition when using a signature color",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
    text: "60% of companies report that consistent branding contributes to 10–20% revenue growth",
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-600" />,
    text: "88% of buyers become loyal after three or more positive brand experiences",
  },
];

const approach = [
  {
    icon: <Search className="w-12 h-12 text-blue-500" />,
    title: "Strategic Brand Foundation",
    desc: "We dive deep into research to understand your business goals, audience behavior, market dynamics, and competitors. This insight-driven approach ensures we craft a brand rooted in strategy—not guesswork.",
    iconBg: "bg-blue-100",
  },
  {
    icon: <Palette className="w-12 h-12 text-pink-500" />,
    title: "Brand Identity Development",
    desc: "From logo design and color systems to voice, messaging, and style guides—our creative team turns strategy into a distinctive brand identity that stands out and speaks clearly to your audience.",
    iconBg: "bg-pink-100",
  },
  {
    icon: <Puzzle className="w-12 h-12 text-purple-500" />,
    title: "Brand Experience Design",
    desc: "A strong brand isn’t just what you say—it&apos;s how customers feel. We create cohesive, multi-platform brand experiences across websites, packaging, social media, and customer touchpoints to strengthen engagement and loyalty.",
    iconBg: "bg-purple-100",
  },
  {
    icon: <Rocket className="w-12 h-12 text-green-500" />,
    title: "Brand Activation & Management",
    desc: "We support the rollout of your brand with strategic campaigns and tools to ensure consistency. As your business evolves, we help adapt your brand to remain relevant, fresh, and competitive.",
    iconBg: "bg-green-100",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Star className="w-4 h-4" />
              Transforming Visions into Iconic Identities
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Brand
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Building
              </span>
            </motion.h1>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transforming Visions into Iconic Identities
            </motion.h2>

            <motion.p
              className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              In today’s competitive marketplace, a powerful brand isn’t a
              luxury—it’s a necessity. At{" "}
              <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Kpitotal
              </span>
              , we help you connect with audiences and fuel long-term success.
            </motion.p>
          </div>

          {/* Approach Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="text-center mb-16">
              <h3 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Our Brand Building Approach
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Four pillars to create, launch, and grow iconic brands
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {approach.map((item, i) => (
                <motion.div
                  key={i}
                  className={`group relative p-8 rounded-3xl bg-white/40 bg-opacity-60 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm"></div>
                  <div className="relative z-10">
                    <div
                      className={`inline-flex p-4 rounded-2xl ${item.iconBg} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="text-center mb-16">
              <h3 className="text-4xl   p-4 sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Why Strong Branding Matters
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The numbers prove the power of a strong brand
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="group relative p-6 rounded-2xl bg-white/60 bg-opacity-70 backdrop-blur-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl p-12 border border-white/40 shadow-2xl">
                <h3 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                  Let’s Build Your Iconic Brand
                </h3>
                <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Whether you&apos;re launching, evolving, or redefining your
                  brand, our experienced team is ready to help you lead your
                  market with clarity and confidence.
                </p>
                <motion.a
                  href="#contact-us"
                  className="group inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-10 sm:py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold sm:font-bold rounded-full shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 text-base sm:text-xl relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Mobile Text */}
                  <span className="relative z-10 sm:hidden">Contact Us</span>

                  {/* Desktop Text */}
                  <span className="relative z-10 hidden sm:inline">
                    Contact us today to start your brand transformation journey
                  </span>

                  {/* Icon - hidden on mobile */}
                  <PhoneCall className="hidden sm:block w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
