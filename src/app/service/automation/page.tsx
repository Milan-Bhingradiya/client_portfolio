"use client";
import { motion } from "framer-motion";
import {
  Settings,
  Zap,
  Repeat,
  TrendingUp,
  BarChart2,
  Mail,
  Users,
  CheckCircle,
  PhoneCall,
  Sparkles,
  Cpu,
  Workflow,
  Database,
} from "lucide-react";

const stats = [
  {
    icon: <BarChart2 className="w-8 h-8 text-blue-600" />,
    text: "80% of marketing automation users saw an increase in lead generation",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-green-600" />,
    text: "77% experienced higher conversions",
  },
  {
    icon: <Users className="w-8 h-8 text-purple-600" />,
    text: "Businesses that nurture leads with automation generate 50% more sales-ready leads at 33% lower cost",
  },
  {
    icon: <Mail className="w-8 h-8 text-pink-600" />,
    text: "Personalized emails deliver 6x higher transaction rates",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-yellow-600" />,
    text: "Companies using automation grow revenue 1.5x faster than those that don’t",
  },
];

const approach = [
  {
    icon: <Settings className="w-12 h-12 text-blue-500" />,
    title: "Automation Strategy & Planning",
    desc: "We start by aligning automation strategies with your overall marketing and business objectives. By mapping your customer journey and analyzing existing capabilities, we design a roadmap that maximizes automation’s impact.",
    iconBg: "bg-blue-100",
  },
  {
    icon: <Cpu className="w-12 h-12 text-purple-500" />,
    title: "Platform Selection & Implementation",
    desc: "Whether you're starting from scratch or upgrading systems, we help you select the right platform (e.g., HubSpot, Salesforce, Klaviyo, Active Campaign) and integrate it seamlessly with your CRM, CMS, and other tech tools to build a strong automation infrastructure.",
    iconBg: "bg-purple-100",
  },
  {
    icon: <Workflow className="w-12 h-12 text-pink-500" />,
    title: "Workflow & Campaign Design",
    desc: "From lead nurturing and abandoned cart recovery to onboarding and re-engagement, we build intelligent workflows that deliver the right message to the right person at the right time—automatically.",
    iconBg: "bg-pink-100",
  },
  {
    icon: <Zap className="w-12 h-12 text-green-500" />,
    title: "Optimization & Advancement",
    desc: "Automation is never set-it-and-forget-it. We constantly test, refine, and enhance your automation programs with new logic, dynamic content, and behavioural triggers to boost performance and ROI over time.",
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

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="w-4 h-4" />
              Scaling Personalized Experiences with Intelligent Technology
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Marketing Automation
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Expert
              </span>
            </motion.h1>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Scaling Personalized Experiences with Intelligent Technology
            </motion.h2>

            <motion.p
              className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              In today’s fast-moving digital environment, marketing automation is the key to scaling personalized engagement without sacrificing efficiency. At <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Kpitotal</span>, we help you harness the full potential of automation to streamline processes, nurture leads, convert customers, and accelerate revenue.
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
                Our Marketing Automation Approach
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Four pillars to automate, optimize, and scale your marketing
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
              <h3 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Why Marketing Automation Matters
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The numbers prove the power of automation for modern marketing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  Make Marketing Work Smarter, Not Harder
                </h3>
                <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Whether you're just getting started or scaling complex automation workflows, we’re here to help you unlock the power of automation to transform how you market.
                </p>
                <motion.a
                  href="#contact-us"
                  className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 text-xl relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10">
                    Contact us today to learn how we can streamline and elevate your marketing operations with automation
                  </span>
                  <PhoneCall className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
