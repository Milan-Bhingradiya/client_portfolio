"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Zap,
  Heart,
} from "lucide-react";

// Stats Card
function StatCard({
  value,
  label,
  icon: Icon,
  color,
  delay,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative group"
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center">
        <div
          className={`w-14 h-14 rounded-xl ${color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <p className="text-4xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
    </motion.div>
  );
}

// Value Card
function ValueCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Icon className="w-7 h-7 text-violet-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Feature Item
function FeatureItem({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex items-start gap-3"
    >
      <CheckCircle2 className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
      <p className="text-gray-700">{text}</p>
    </motion.div>
  );
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-24">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-100/50 to-fuchsia-100/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 border border-violet-200 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-sm font-medium text-violet-700">
                  About Us
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                We&apos;re Your Partner in{" "}
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Digital Growth
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At KPI Total, we believe in transforming businesses through
                innovative digital strategies. Our team of experts combines
                creativity with data-driven insights to deliver exceptional
                results.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contactus"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-violet-200 transition-all"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/aboutteam"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border border-gray-200 hover:border-violet-300 hover:shadow-lg transition-all"
                  >
                    Meet the Team
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent" />
              </div>

              {/* Floating card */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-gray-100"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">160+</p>
                    <p className="text-sm text-gray-500">Projects Delivered</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-violet-50 to-fuchsia-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              value="150+"
              label="Projects Completed"
              icon={Award}
              color="bg-gradient-to-br from-violet-500 to-purple-600"
              delay={0}
            />
            <StatCard
              value="50+"
              label="Happy Clients"
              icon={Users}
              color="bg-gradient-to-br from-blue-500 to-cyan-600"
              delay={0.1}
            />
            <StatCard
              value="8+"
              label="Years Experience"
              icon={Zap}
              color="bg-gradient-to-br from-amber-500 to-orange-600"
              delay={0.2}
            />
            <StatCard
              value="99%"
              label="Client Satisfaction"
              icon={Heart}
              color="bg-gradient-to-br from-pink-500 to-rose-600"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-10 text-white relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  To empower businesses with innovative digital solutions that
                  drive growth, enhance brand visibility, and create meaningful
                  connections with their target audiences.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-fuchsia-600 to-pink-700 rounded-3xl p-10 text-white relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  To be the leading digital transformation partner, recognized
                  for our creative excellence, technical expertise, and
                  commitment to delivering measurable results.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine creativity, technology, and strategy to deliver
              exceptional results for our clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard
              icon={Target}
              title="Data-Driven Strategy"
              description="We leverage analytics and insights to create strategies that deliver measurable results and maximize your ROI."
              delay={0}
            />
            <ValueCard
              icon={Lightbulb}
              title="Creative Excellence"
              description="Our creative team crafts compelling narratives and designs that captivate audiences and build brand loyalty."
              delay={0.1}
            />
            <ValueCard
              icon={Users}
              title="Dedicated Support"
              description="We provide personalized attention and support throughout your journey, ensuring your success is our priority."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Features */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Everything You Need for{" "}
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Digital Success
                </span>
              </h2>

              <div className="space-y-4">
                <FeatureItem
                  text="Advanced SEO strategies to boost your search rankings"
                  delay={0}
                />
                <FeatureItem
                  text="Strategic marketing plans tailored to your business goals"
                  delay={0.1}
                />
                <FeatureItem
                  text="Targeted advertising campaigns with maximum ROI"
                  delay={0.2}
                />
                <FeatureItem
                  text="Custom web development solutions for your unique needs"
                  delay={0.3}
                />
                <FeatureItem
                  text="Brand identity design that resonates with your audience"
                  delay={0.4}
                />
                <FeatureItem
                  text="24/7 dedicated support and consultation"
                  delay={0.5}
                />
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800"
                  alt="Team working"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-12 md:p-20 text-center"
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Let&apos;s work together to create something extraordinary. Get
                in touch with us today.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contactus"
                  className="inline-flex items-center gap-2 px-10 py-5 bg-white text-violet-600 font-semibold rounded-full hover:shadow-xl transition-all text-lg"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
