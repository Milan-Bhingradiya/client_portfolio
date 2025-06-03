"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Sparkles,
  ArrowRight,
  Heart,
  Target,
  Lightbulb,
  Settings,
  Award,
  Palette,
  Code,
  Brain,
  Eye,
  Mic,
  Star,
  Camera,
  Layers,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Rocket,
  Coffee,
  Globe,
  Users,
  Zap,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

const services = [
  {
    name: "UI Design",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    emoji: "🎨",
    delay: 0,
  },
  {
    name: "UI Development",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    emoji: "💻",
    delay: 0.1,
  },
  {
    name: "UI Guidelines",
    icon: Target,
    color: "from-purple-500 to-violet-500",
    emoji: "📋",
    delay: 0.2,
  },
  {
    name: "Design System",
    icon: Layers,
    color: "from-green-500 to-emerald-500",
    emoji: "🔧",
    delay: 0.3,
  },
  {
    name: "UX Design",
    icon: Brain,
    color: "from-orange-500 to-amber-500",
    emoji: "🧠",
    delay: 0.4,
  },
  {
    name: "User Research",
    icon: Eye,
    color: "from-red-500 to-pink-500",
    emoji: "🔍",
    delay: 0.5,
  },
  {
    name: "UX Consultancy",
    icon: Lightbulb,
    color: "from-indigo-500 to-blue-500",
    emoji: "💡",
    delay: 0.6,
  },
  {
    name: "UX Writing",
    icon: Mic,
    color: "from-teal-500 to-cyan-500",
    emoji: "✍️",
    delay: 0.7,
  },
  {
    name: "Animations",
    icon: Sparkles,
    color: "from-yellow-500 to-orange-500",
    emoji: "✨",
    delay: 0.8,
  },
  {
    name: "Iconography",
    icon: Star,
    color: "from-purple-500 to-pink-500",
    emoji: "🎯",
    delay: 0.9,
  },
  {
    name: "Illustrations",
    icon: Camera,
    color: "from-green-500 to-blue-500",
    emoji: "🎭",
    delay: 1.0,
  },
];

const steps = [
  {
    title: "Empathise",
    subtitle: "Understanding Human Emotions",
    description:
      "As a thriving UI UX agency, we harness the proven empathy-driven human-focused design process to craft the best digital solutions mapping the users preferences.",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    emoji: "❤️",
    percentage: 95,
    devices: [Smartphone, Tablet, Monitor],
  },
  {
    title: "Define (the Problem)",
    subtitle: "Precision in Problem Solving",
    description:
      "Apt logic and detailing is incorporated precisely with elements like design functions, features, functionalities, workflow and beyond to solve complex issues with minimal snags.",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    emoji: "🎯",
    percentage: 88,
    devices: [Monitor, Tablet, Smartphone],
  },
  {
    title: "Ideation",
    subtitle: "Creative Innovation Process",
    description:
      "With Proven ideation techniques combined with a client-centric approach at the core, we ideate roadmaps while mapping your business journey to decode human-focused problem statements.",
    icon: Lightbulb,
    color: "from-yellow-500 to-orange-500",
    emoji: "💡",
    percentage: 92,
    devices: [Tablet, Monitor, Smartphone],
  },
  {
    title: "Prototype",
    subtitle: "Building Digital Dreams",
    description:
      "We develop a results-focused prototype meant to build an authentic digital connection with the utmost level of detail and quality based on diversified experiments.",
    icon: Settings,
    color: "from-green-500 to-emerald-500",
    emoji: "🔧",
    percentage: 97,
    devices: [Smartphone, Monitor, Tablet],
  },
  {
    title: "Testing",
    subtitle: "Quality Assurance Excellence",
    description:
      "We finetune our designs using state-of-the-art testing techniques by testing the overall product usability at Omni-channel platforms to impart a clear big picture of design experience benchmarking, blueprints, personas, and journey maps of ideal consumers.",
    icon: Award,
    color: "from-purple-500 to-violet-500",
    emoji: "✅",
    percentage: 99,
    devices: [Monitor, Smartphone, Tablet],
  },
];

const stats = [
  {
    number: 500,
    label: "Projects Completed",
    icon: Rocket,
    color: "from-pink-500 to-rose-500",
  },
  {
    number: 250,
    label: "Happy Clients",
    icon: Heart,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: 10,
    label: "Years Experience",
    icon: Award,
    color: "from-green-500 to-emerald-500",
  },
  {
    number: 50,
    label: "Team Members",
    icon: Users,
    color: "from-purple-500 to-violet-500",
  },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized for speed and performance",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Enterprise-grade security standards",
  },
  {
    icon: CheckCircle,
    title: "Quality Assured",
    desc: "Rigorous testing and validation",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    desc: "Built to grow with your business",
  },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance" },
  { icon: Globe, title: "Global Reach", desc: "Worldwide accessibility" },
];

function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const containerRef = useRef(null);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Spring animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  // Intersection observers
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.3 });
  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.2,
  });
  const { ref: processRef, inView: processInView } = useInView({
    threshold: 0.1,
  });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 });
  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.3,
  });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate services
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Auto-rotate steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Floating particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  // Geometric shapes
  const shapes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 80 + 40,
    rotation: Math.random() * 360,
    duration: Math.random() * 25 + 15,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden relative">
      {/* Custom cursor */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: x,
          y: y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-full h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"
          animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 via-cyan-500 to-green-500 z-40 origin-left"
        style={{ scaleX }}
      />

      {/* Control panel */}
      <motion.div
        className="fixed top-4 right-4 z-40 flex gap-2"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          className="p-3 bg-white/80 backdrop-blur-lg rounded-full text-gray-800 border border-gray-200 shadow-lg"
          onClick={() => setIsPlaying(!isPlaying)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </motion.button>
        <motion.button
          className="p-3 bg-white/80 backdrop-blur-lg rounded-full text-gray-800 border border-gray-200 shadow-lg"
          onClick={() => setSoundEnabled(!soundEnabled)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </motion.button>
      </motion.div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-pink-400/30 to-purple-400/30"
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
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-100/40 to-purple-100/40"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
                "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
                "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
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
              <Sparkles className="w-16 h-16 mx-auto text-yellow-500" />
            </motion.div>

            <motion.h2
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 text-2xl font-bold mb-8"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              What Do We Serve?
            </motion.h2>

            <motion.h1
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-12 text-gray-900 leading-tight"
              style={{ y: textY }}
            >
              We help you translate a{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                simple idea
              </motion.span>{" "}
              into an{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                  rotate: [0, 2, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                exotic Digital
              </motion.span>{" "}
              design transformation{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-blue-500"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, -2, 0],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                vision
              </motion.span>
              .
            </motion.h1>

            <motion.p
              className="text-2xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Transforming ideas into extraordinary digital experiences through
              cutting-edge design, innovative technology, and human-centered
              creativity.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: heroInView ? 1 : 0, y: heroInView ? 0 : 50 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.button
                className="group relative px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 rounded-full text-white font-bold text-xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Journey{" "}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                className="flex items-center gap-3 text-gray-800 border-2 border-gray-300 px-12 py-6 rounded-full hover:bg-gray-50 transition-all text-xl font-bold shadow-lg"
                whileHover={{ scale: 1.05, borderColor: "rgb(156, 163, 175)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-6 h-6" />
                Explore Portfolio
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-60"
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
              Our{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Magical
              </motion.span>{" "}
              Services
            </motion.h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Discover our comprehensive suite of design and development
              services that bring your vision to life.
            </p>
          </motion.div>

          {/* Central rotating hub */}
          <div className="relative flex justify-center items-center mb-20">
            <motion.div
              className="w-64 h-64 bg-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 rounded-full opacity-40"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-32 h-32 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-50"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-purple-600" />
            </motion.div>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`relative group cursor-pointer ${
                  activeService === index ? "scale-110 z-10" : ""
                } transition-all duration-500`}
                initial={{ opacity: 0, y: 100, rotateY: -90 }}
                animate={{
                  opacity: servicesInView ? 1 : 0,
                  y: servicesInView ? 0 : 100,
                  rotateY: servicesInView ? 0 : -90,
                }}
                transition={{ duration: 0.8, delay: service.delay }}
                whileHover={{ scale: 1.1, rotateY: 10, z: 50 }}
                onHoverStart={() => setActiveService(index)}
              >
                <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 overflow-hidden h-80 shadow-xl">
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10`}
                    initial={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: 1.5, rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Floating particles for active service */}
                  {activeService === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-gray-400 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -30, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Service content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <motion.div
                        className="text-6xl mb-6"
                        animate={
                          activeService === index
                            ? { scale: [1, 1.3, 1], rotate: [0, 15, 0] }
                            : { scale: [1, 1.1, 1] }
                        }
                        transition={{ duration: 1 }}
                      >
                        {service.emoji}
                      </motion.div>

                      <motion.div
                        className="mb-4"
                        animate={
                          activeService === index ? { scale: [1, 1.1, 1] } : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        <service.icon className="w-12 h-12 text-gray-700 mb-4" />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {service.name}
                      </h3>
                    </div>

                    {/* Animated progress bar */}
                    <motion.div
                      className={`h-2 bg-gradient-to-r ${service.color} rounded-full`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeService === index ? 1 : 0.5 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Glow effect */}
                  {activeService === index && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-3xl blur-xl opacity-20`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-32 relative bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: statsInView ? 1 : 0, y: statsInView ? 0 : 50 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8">
              Our{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Impact
              </motion.span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: statsInView ? 1 : 0,
                  y: statsInView ? 0 : 100,
                }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <motion.div
                  className="relative mb-8"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`w-32 h-32 mx-auto bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center shadow-xl`}
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <stat.icon className="w-16 h-16 text-white" />
                  </motion.div>
                  <motion.div
                    className={`absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-r ${stat.color} rounded-full blur-xl opacity-30`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                <motion.div
                  className="text-6xl font-black text-gray-900 mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: statsInView ? 1 : 0 }}
                  transition={{
                    duration: 1,
                    delay: index * 0.2 + 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {stat.number}+
                </motion.div>

                <p className="text-xl text-gray-600 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-32 relative bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: processInView ? 1 : 0,
              y: processInView ? 0 : 100,
            }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 via-cyan-600 to-green-600 mb-8"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              HOW WE DO IT?
            </motion.h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Our proven 5-step process that transforms ideas into extraordinary
              digital experiences.
            </p>
          </motion.div>

          {/* Process timeline */}
          <div className="relative">
            {/* Central timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-pink-300 via-purple-300 via-cyan-300 to-green-300 opacity-50 rounded-full" />

            <div className="space-y-40">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } gap-20`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -300 : 300 }}
                  animate={{
                    opacity: processInView ? 1 : 0,
                    x: processInView ? 0 : index % 2 === 0 ? -300 : 300,
                  }}
                  transition={{ duration: 1.2, delay: index * 0.3 }}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <motion.div
                      className="relative p-10 bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 overflow-hidden shadow-xl"
                      whileHover={{
                        scale: 1.02,
                        rotateY: index % 2 === 0 ? 5 : -5,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Animated background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0`}
                        whileHover={{ opacity: 0.05 }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Floating particles */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-gray-400 rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              delay: i * 0.5,
                            }}
                          />
                        ))}
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center gap-6 mb-8">
                          <motion.div
                            className="text-6xl"
                            animate={
                              activeStep === index
                                ? { scale: [1, 1.4, 1], rotate: [0, 360, 0] }
                                : { scale: [1, 1.1, 1] }
                            }
                            transition={{ duration: 2 }}
                          >
                            {step.emoji}
                          </motion.div>
                          <div>
                            <h3 className="text-4xl font-black text-gray-900 mb-2">
                              {step.title}
                            </h3>
                            <p className="text-xl text-gray-600 font-semibold">
                              {step.subtitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                          {step.description}
                        </p>

                        {/* Stats and devices */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <motion.div
                              className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}
                              animate={{ rotate: [0, 360] }}
                              transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <span className="text-white font-bold text-lg">
                                {step.percentage}%
                              </span>
                            </motion.div>
                            <div>
                              <p className="text-gray-900 font-semibold">
                                Success Rate
                              </p>
                              <motion.div
                                className={`w-40 h-2 bg-gray-200 rounded-full overflow-hidden`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                              >
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${step.percentage}%` }}
                                  transition={{ duration: 2, delay: 1.5 }}
                                />
                              </motion.div>
                            </div>
                          </div>

                          {/* Device icons */}
                          <div className="flex gap-3">
                            {step.devices.map((Device, deviceIndex) => (
                              <motion.div
                                key={deviceIndex}
                                className="p-3 bg-gray-100 rounded-lg"
                                animate={{ y: [0, -5, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: deviceIndex * 0.3,
                                }}
                              >
                                <Device className="w-6 h-6 text-gray-600" />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Central node */}
                  <div className="relative z-20">
                    <motion.div
                      className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-black text-2xl border-4 border-white shadow-xl`}
                      animate={
                        activeStep === index
                          ? { scale: [1, 1.3, 1], rotate: [0, 180, 0] }
                          : { scale: [1, 1.1, 1] }
                      }
                      transition={{ duration: 1 }}
                      whileHover={{ scale: 1.4 }}
                    >
                      {index + 1}
                    </motion.div>

                    {/* Pulsing rings */}
                    {activeStep === index && (
                      <>
                        <motion.div
                          className={`absolute inset-0 w-24 h-24 bg-gradient-to-r ${step.color} rounded-full`}
                          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className={`absolute inset-0 w-24 h-24 bg-gradient-to-r ${step.color} rounded-full`}
                          animate={{ scale: [1, 3, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5,
                          }}
                        />
                      </>
                    )}
                  </div>

                  {/* Image placeholder */}
                  <div className="flex-1">
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative overflow-hidden rounded-3xl bg-gray-100 h-96 flex items-center justify-center">
                        <motion.div
                          className={`w-32 h-32 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center`}
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <step.icon className="w-16 h-16 text-white" />
                        </motion.div>
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-t ${step.color} opacity-0 group-hover:opacity-10`}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      {/* Floating decorative elements */}
                      <motion.div
                        className="absolute -top-6 -right-6 w-12 h-12 bg-white rounded-full opacity-80 shadow-lg"
                        animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-80"
                        animate={{ y: [0, 15, 0], rotate: [0, -180, -360] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-32 relative bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: featuresInView ? 1 : 0,
              y: featuresInView ? 0 : 50,
            }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8">
              Why Choose{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Us
              </motion.span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group text-center p-8 bg-white rounded-3xl shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: featuresInView ? 1 : 0,
                  y: featuresInView ? 0 : 100,
                }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center"
                  animate={hoveredFeature === index ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 1 }}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 relative bg-white">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(236, 72, 153, 0.05) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(6, 182, 212, 0.05) 100%)",
              "linear-gradient(45deg, rgba(6, 182, 212, 0.05) 0%, rgba(236, 72, 153, 0.05) 50%, rgba(139, 92, 246, 0.05) 100%)",
              "linear-gradient(45deg, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-6xl sm:text-8xl font-black text-gray-900 mb-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Ready to Create{" "}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Magic
              </motion.span>
              ?
            </motion.h2>

            <motion.p
              className="text-2xl text-gray-600 max-w-4xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Let's transform your vision into an extraordinary digital
              experience that captivates, engages, and converts.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="group relative px-16 py-6 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 rounded-full text-white font-black text-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Project{" "}
                  <Rocket className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                className="px-16 py-6 border-2 border-gray-300 rounded-full text-gray-800 font-black text-2xl hover:bg-gray-50 transition-all shadow-lg"
                whileHover={{ scale: 1.05, borderColor: "rgb(156, 163, 175)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-3">
                  <Coffee className="w-8 h-8" />
                  Schedule a Call
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Page;
