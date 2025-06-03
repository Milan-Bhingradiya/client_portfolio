"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import design1 from "../../../../public/design_loti.json";

import { Sparkles } from "lucide-react";

const services = [
  { name: "UI/UX Design", icon: "🖌️" },
  { name: "Wireframing", icon: "📝" },
  { name: "Prototyping", icon: "📐" },
  { name: "Design Systems", icon: "🧩" },
  { name: "Brand Identity", icon: "🏷️" },
  { name: "Interaction Design", icon: "🤝" },
  { name: "User Research", icon: "🔬" },
  { name: "Usability Testing", icon: "🧪" },
  { name: "Design Audits", icon: "🔎" },
  { name: "Accessibility", icon: "♿" },
];

const tools = [
  {
    name: "Figma",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  },
  {
    name: "Sketch",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg",
  },
  {
    name: "Adobe XD",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg",
  },
  {
    name: "Zeplin",
    img: "https://seeklogo.com/images/Z/zeplin-logo-CA3C558C6B-seeklogo.com.png",
  },
  {
    name: "InVision",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/InVision-logo.svg",
  },
];

const steps = [
  {
    title: "Discover",
    description:
      "We start by understanding your business, users, and goals through research and workshops.",
    icon: "🔍",
  },
  {
    title: "Define",
    description:
      "We synthesize insights, define user personas, and map user journeys to clarify the project scope.",
    icon: "🗺️",
  },
  {
    title: "Ideate",
    description:
      "We brainstorm, sketch, and prototype creative solutions to solve user problems.",
    icon: "💡",
  },
  {
    title: "Design",
    description:
      "We craft high-fidelity UI designs, design systems, and interactive prototypes for a seamless experience.",
    icon: "🎨",
  },
  {
    title: "Deliver",
    description:
      "We hand off assets, provide design specs, and support development for a smooth launch.",
    icon: "🚀",
  },
];

function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3 });
  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.2,
  });
  const { ref: stepsRef, inView: stepsInView } = useInView({ threshold: 0.1 });
  const { ref: toolsRef, inView: toolsInView } = useInView({ threshold: 0.1 });

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));
  // Geometric shapes
  const shapes = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 80 + 40,
    rotation: Math.random() * 360,
    duration: Math.random() * 25 + 15,
  }));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden relative">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {/* Floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none">
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute border border-gray-200/30 rounded-lg"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative"
      >
        <motion.div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-purple-100/40"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
                "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
                "radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
                "radial-gradient(circle at 60% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </motion.div>
        <div className="container mx-auto px-4 py-16 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.div
              className="mb-8"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-16 h-16 mx-auto text-blue-500" />
            </motion.div>
            <motion.h2
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-2xl font-bold mb-8"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Design that Delivers Results
            </motion.h2>
            <motion.h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-12 text-gray-900 leading-tight">
              UI/UX & Brand <span className="text-blue-500">Design</span> for
              Modern Businesses
            </motion.h1>
            <motion.p
              className="text-2xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              We craft beautiful, functional, and accessible digital experiences
              that help brands stand out and connect with their audience.
            </motion.p>
          </motion.div>
        </div>
        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-60"
          animate={{
            y: [0, -50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-lg opacity-60"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.7, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-20 w-16 h-16 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-60"
          animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </section>
      {/* Services Section */}
      <section ref={servicesRef} className="py-32 relative bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: servicesInView ? 1 : 0,
              y: servicesInView ? 0 : 100,
            }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-6xl sm:text-7xl font-black text-gray-900 mb-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Our Design Services
            </motion.h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              From research to delivery, we offer a full spectrum of design
              services for digital products and brands.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 border border-blue-100"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.05 * index,
                  duration: 0.6,
                  type: "spring",
                }}
              >
                <span className="text-5xl mb-4">{service.icon}</span>
                <p className="font-bold text-lg text-blue-600 mb-2 tracking-wide drop-shadow">
                  {service.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Tools Section */}
      <section ref={toolsRef} className="py-32 relative bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: toolsInView ? 1 : 0, y: toolsInView ? 0 : 100 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-6xl sm:text-7xl font-black text-blue-700 mb-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Our Design Tools
            </motion.h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              We use industry-leading tools to deliver pixel-perfect designs and
              seamless handoffs.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-center items-center">
            {tools.map((tool, idx) => (
              <div key={tool.name} className="flex flex-col items-center">
                <Image
                  src={tool.img}
                  alt={tool.name}
                  width={60}
                  height={60}
                  className="rounded-xl shadow-lg"
                  unoptimized
                />
                <span className="mt-4 text-lg font-semibold text-gray-700">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Steps Section */}
      <section ref={stepsRef} className="py-32 relative bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: stepsInView ? 1 : 0, y: stepsInView ? 0 : 100 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-6xl sm:text-7xl font-black text-blue-700 mb-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Our Design Process
            </motion.h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Our proven process ensures every project is user-centered,
              collaborative, and results-driven.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 via-white to-pink-100 rounded-2xl shadow-lg p-10 hover:scale-105 transition-transform duration-300 border border-purple-100"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 * index,
                  duration: 0.7,
                  type: "spring",
                }}
              >
                <div className="mb-6 text-5xl">{step.icon}</div>
                <h3 className="text-2xl font-bold mt-4 mb-2 text-blue-700 drop-shadow-lg">
                  {step.title}
                </h3>
                <p className="text-gray-700 text-lg font-medium drop-shadow-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
