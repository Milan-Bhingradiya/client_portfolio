"use client";
// src/components/ServiceList.js
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import branding from "../../../../public/branding.png";
import ux from "../../../../public/UIUX.png";
import ui from "../../../../public/UI.png";
import development from "../../../../public/devlopment.png";

const services = [
  "Development",
  "Web Design",
  "Front-End",
  "Back-End",
  "Javascript",
  "Css 3",
  "Animations",
  "CRM",
  "Angular",
  "React",
  "ERP",
  "Wordp,ress",
  "PHP",
  "Larave,l",
  "E-Comme,rce",
];

const steps = [
  {
    title: "Understand Objectives",
    description:
      "As a client-focused web and mobile app development company, we gain in-depth insights into your digital requirements, consumer behaviours, technology platforms, functionalities, etc., to help you gain a competitive edge. This is our approach for developing the right user experience, emphasising top-notch aesthetic sensibilities that engage your consumers.",
    imgSrc: "/path/to/empathise.png", // Replace with your image path
  },
  {
    title: "Choose Right ​​​​​​​Technology ",
    description:
      "Empowered with tech-heavy centricity, our solutions transcend the usual methods of solving problems. We ensure a sophisticated frontend experience and develop a user-friendly backend by considering the bigger picture for tech-focused digital transformation that was once impossible.",
    imgSrc: "/path/to/define.png", // Replace with your image path
  },
  {
    title: "Documented Coding",
    description:
      "From elegant designs to a custom-coded website, the radical development phase is driven by our digital mindfulness to translate your digital vision.",
    imgSrc: "/path/to/ideation.png", // Replace with your image path
  },
  {
    title: "Careful Testing",
    description:
      "With our great knowledge in tech engineering, we employ a rigorous QA testing process that encompasses testing speed, security, user-friendly interface experience, and overall functionality and eliminates flaws before the product goes live.",
    imgSrc: "/path/to/prototype.png", // Replace with your image path
  },
  {
    title: "Successful Deployment    ",
    description:
      "When you decide to work with a thriving web and mobile app development company like us, you unlock the best tech-driven solutions that stand the test of time across multiple environments, including staging and production.We finetune our designs using state-of-the-art testing techniques by testing the overall product usability at Omni-channel platforms to impart a clear big picture of design experience benchmarking, blueprints, personas, and journey maps of ideal consumers.",
    imgSrc: "/path/to/prototype.png", // Replace with your image path
  },
  {
    title: "AMC Support    ",
    description:
      "Our technology experts are conversant with cutting-edge technology and software trends, maintaining a website and ensuring smooth app performance. Moreover, our foolproof AMC support lends best-in-class customer assistance equipped with hassle-free backend integration for our esteemed patrons.",
    imgSrc: "/path/to/prototype.png", // Replace with your image path
  },
];

const webTechnologies = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Vue.js",
  "Next.js",
  "TailwindCSS",
  "Bootstrap",
  "WordPress",
  "PHP",
  "Laravel",
  "E-Commerce",
];
const mernStack = ["MongoDB", "Express.js", "React.js", "Node.js"];
const mobileTechnologies = [
  "Flutter",
  "React Native",
  "Android",
  "iOS",
  "PWA",
  "Firebase",
];

function Page() {
  const [isScrolled, setIsScrolled] = useState(false);

  const { ref: ref1, inView: ref1View } = useInView({
    threshold: 0.3,
  });
  const { ref: ref2, inView: ref2View } = useInView({
    threshold: 0.3,
  });
  const { ref: ref3, inView: ref3View } = useInView({
    threshold: 0.3,
  });

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Floating particles and shapes (same as design/marketing)
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));
  const shapes = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 80 + 40,
    rotation: Math.random() * 360,
    duration: Math.random() * 25 + 15,
  }));

  const variants = {
    initial: { x: -500, opacity: 0 },
    animate: { x: 0, opacity: 1 },
  };
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
      <section className="min-h-screen flex items-center justify-center relative">
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
            animate={{ opacity: 1, y: 0 }}
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
              What Do We Serve?
            </motion.h2>
            <motion.h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-12 text-gray-900 leading-tight">
              Comprehensive <span className="text-blue-500">technology</span>{" "}
              services that integrate digital craftsmanship and business goals.
            </motion.h1>
            <motion.p
              className="text-2xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              We deliver robust web, mobile, and cloud solutions using the
              latest technologies, including the MERN stack and Flutter, to help
              your business thrive in the digital era.
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
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </section>
      {/* Technologies Section */}
      <section className="py-32 relative bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-6xl sm:text-7xl font-black text-gray-900 mb-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Our Technologies
            </motion.h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              We specialize in a wide range of technologies for web and mobile
              development, including the MERN stack and Flutter.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div className="mb-4 text-3xl font-bold text-blue-500">
                MERN Stack
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {mernStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-lg shadow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center border border-green-100"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              <div className="mb-4 text-3xl font-bold text-green-500">
                Web Technologies
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {webTechnologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold text-lg shadow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col items-center border border-purple-100"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="mb-4 text-3xl font-bold text-purple-500">
                Mobile & Cross-Platform
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {mobileTechnologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold text-lg shadow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Steps Section */}
      <section className="py-32 relative bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-6xl sm:text-7xl font-black text-blue-700 mb-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              HOW WE DO IT?
            </motion.h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Our proven process for delivering robust, scalable, and innovative
              technology solutions.
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
                <div className="mb-6">
                  <Image
                    src={branding}
                    alt={step.title}
                    width={80}
                    height={80}
                    className="rounded-xl shadow-lg"
                  />
                </div>
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
