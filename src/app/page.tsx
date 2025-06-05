"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Animated_text from "./component/Animated_text";
import Link from "next/link";
import Loading from "./component/Loading";
import {
  ArrowRight,
  Users,
  Award,
  Zap,
  Palette,
  Code,
  Smartphone,
  Globe,
  CheckCircle,
  Play,
  Heart,
  Coffee,
  Lightbulb,
  Brain,
  Rocket,
  RotateCcw,
  Handshake,
  Target,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";
import Section1 from "./work/component/Section1";

import TestimonialSlider from "./component/TestimonialSlider";
import one from "../../public/1.png";
import two from "../../public/2.png";
import three from "../../public/3.png";
import four from "../../public/4.png";
import six from "../../public/6.png";
import seven from "../../public/7.png";
import smit from "../../public/smit.jpeg";

function Page() {
  const [homeProjects, setHomeProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeService, setActiveService] = useState(0);
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    years: 0,
    awards: 0,
  });

  // Background animation colors
  const colors = useMemo(
    () => ["#FF5F6D", "#FFC371", "#4158D0", "#C850C0", "#38ef7d"],
    []
  );
  const [bgColor, setBgColor] = useState(colors[0]);

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    // Change background color every 3 seconds
    const colorInterval = setInterval(() => {
      setBgColor(colors[Math.floor(Math.random() * colors.length)]);
    }, 3000);
    return () => clearInterval(colorInterval);
  }, [colors]);

  useEffect(() => {
    const getHomeProjects = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://smit-shah-backend-80da1d71856d.herokuapp.com/home-projects"
        );
        const data = await res.json();
        setHomeProjects(data.projects || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching home projects:", error);
        setIsLoading(false);
      }
    };
    getHomeProjects();
  }, []);

  // Animate stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ projects: 260, clients: 150, years: 8, awards: 25 });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
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

  const services = [
    {
      icon: Palette,
      title: "Brand Identity",
      desc: "Creating memorable brand experiences",
    },
    {
      icon: Code,
      title: "Web Development",
      desc: "Modern, responsive websites",
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      desc: "Native and cross-platform solutions",
    },
    {
      icon: Globe,
      title: "Digital Strategy",
      desc: "Comprehensive digital transformation",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "Exceptional work! They transformed our vision into reality.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Michael Chen",
      role: "Founder, InnovateCorp",
      content: "Professional, creative, and delivered beyond expectations.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emily Davis",
      role: "Marketing Director",
      content: "Their attention to detail and creativity is unmatched.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ];

  const team = [
    {
      name: "Alex Rivera",
      role: "Creative Director",
      image: smit,
    },
    {
      name: "Jordan Smith",
      role: "Lead Developer",
      image: smit,
    },
    {
      name: "Casey Wong",
      role: "UX Designer",
      image: smit,
    },
    {
      name: "Taylor Brown",
      role: "Project Manager",
      image: smit,
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      desc: "Understanding your vision and goals",
    },
    { step: "02", title: "Strategy", desc: "Crafting the perfect approach" },
    {
      step: "03",
      title: "Design",
      desc: "Creating beautiful, functional designs",
    },
    {
      step: "04",
      title: "Development",
      desc: "Building with cutting-edge technology",
    },
    { step: "05", title: "Launch", desc: "Delivering exceptional results" },
  ];

  // Kpitotal core offerings
  const coreOfferings = [
    {
      icon: Target,
      title: "Brand Building",
      desc: "Craft a distinct, memorable identity that resonates with both customers and stakeholders. We transform businesses into brands that command loyalty and market share.",
    },
    {
      icon: TrendingUp,
      title: "Marketing Strategy",
      desc: "Your growth deserves more than ad-hoc tactics. We build comprehensive, data-backed marketing strategies that align with your business goals and unlock sustainable results.",
    },
    {
      icon: ShoppingCart,
      title: "Cracking D2C",
      desc: "We specialize in helping legacy and B2B brands crack the D2C code — from channel strategy and digital shelf optimization to performance marketing and retention.",
    },
    {
      icon: Zap,
      title: "Marketing Automation",
      desc: "Increase marketing ROI by automating repetitive tasks, integrating tools, and streamlining workflows — freeing your team to focus on what moves the needle.",
    },
  ];

  // Kpitotal why work with us
  const whyWorkWithUs = [
    {
      icon: Brain,
      title: "Strategic Mindset",
      desc: "We don&apos;t just execute — we guide.",
    },
    {
      icon: Rocket,
      title: "Growth-Obsessed",
      desc: "Your next 100 crores is our focus.",
    },
    {
      icon: RotateCcw,
      title: "Efficiency Experts",
      desc: "Automation and optimization are baked into our DNA.",
    },
    {
      icon: Handshake,
      title: "Trusted Partners",
      desc: "We work like an extension of your internal team.",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Animated background gradient */}
      <motion.div
        className="fixed inset-0 -z-10 opacity-20"
        animate={{
          background: [
            `linear-gradient(45deg, ${bgColor} 0%, #ffffff 100%)`,
            `linear-gradient(45deg, #ffffff 0%, ${bgColor} 100%)`,
            `linear-gradient(45deg, ${bgColor} 0%, #ffffff 100%)`,
          ],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <Section1></Section1>

      {/* //////////////////////////////// */}
      <div className=" flex justify-center text-4xl m-10 mt-20 superBold">
        {" "}
        Our Clients
      </div>

      <div className=" grid grid-cols-3 sm:grid-cols-6 gap-14 md:gap-16 lg:gap-24 m-10 ">
        <motion.div whileHover={{ scale: 1.2 }}>
          <Image
            className="blackfilter"
            src={one || "/placeholder.svg"}
            alt="ms"
            width={80}
            height={80}
          ></Image>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }}>
          <Image
            className="blackfilter"
            src={two || "/placeholder.svg"}
            alt="ms"
            width={80}
            height={80}
          ></Image>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }}>
          <Image
            className="blackfilter"
            src={three || "/placeholder.svg"}
            alt="ms"
            width={80}
            height={80}
          ></Image>
        </motion.div>
        <motion.div className="block" whileHover={{ scale: 1.2 }}>
          <Image
            className="blackfilter"
            src={four || "/placeholder.svg"}
            alt="ms"
            width={80}
            height={80}
          ></Image>
        </motion.div>
        <motion.div className="block" whileHover={{ scale: 1.2 }}>
          <Image
            className="blackfilter"
            src={six || "/placeholder.svg"}
            alt="ms"
            width={80}
            height={80}
          ></Image>
        </motion.div>
        <motion.div className="block" whileHover={{ scale: 1.2 }}>
          <Image
            className="blackfilter"
            src={seven || "/placeholder.svg"}
            alt="ms"
            width={60}
            height={80}
          ></Image>
        </motion.div>
      </div>
      {/* //////////////////////////////// */}

      {/* Section 1: Hero */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Animated_text
              text={"We Have Designed Experiences For Over 260 Projects."}
              mode={"multi"}
              weight={"font-extrabold"}
              size={"text-4xl sm:text-5xl md:text-6xl lg:text-7xl"}
              space={true}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Transforming ideas into exceptional digital experiences through
              innovative design and cutting-edge technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/contactus">
                <motion.button
                  className="group bg-black text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <motion.button
                className="group border-2 border-black text-black px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4" />
                Watch Our Story
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-60"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-60"
          animate={{ y: [0, 20, 0], rotate: [0, -180, -360] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
      </section>

      {/* Section 2: Stats */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {stats.projects}+
              </motion.div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {stats.clients}+
              </motion.div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {stats.years}+
              </motion.div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <motion.div
                className="text-4xl md:text-5xl font-bold mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {stats.awards}+
              </motion.div>
              <div className="text-gray-400">Awards Won</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 11: Contact CTA */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Let&apos;s collaborate to bring your vision to life. Get in touch
              with us today!
            </p>
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
            >
              <h3 className="text-xl font-semibold mb-6">
                Let&apos;s Talk Growth
              </h3>
              <p className="text-blue-100 mb-8">
                Whether you&apos;re restructuring your marketing engine or
                preparing for your next leap, we&apos;re ready to help.
              </p>
              <Link href="#contact">
                <motion.button
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book a consultation →
                </motion.button>
              </Link>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Coffee className="w-4 h-4" />
                Schedule a Call
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 12: Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">DesignStudio</h3>
              <p className="text-gray-400 mb-4">
                Creating exceptional digital experiences that drive results.
              </p>
              <div className="flex gap-4">
                {/* Social media icons would go here */}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Web Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Branding
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Strategy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div>hello@designstudio.com</div>
                <div>+1 (555) 123-4567</div>
                <div>
                  123 Design Street
                  <br />
                  Creative City, CC 12345
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DesignStudio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Page;
