"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Loading from "@/app/component/Loading";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

interface RouteParams {
  params: {
    [key: string]: string;
  };
}

interface IProject {
  title: string;
  client: string;
  description: string;
  images: string[];
  industryName: string;
  companyName: string;
  solution: string;
  show_in_home_page: boolean;
  challenges: string[];
}

function ProjectPage({ params }: RouteParams) {
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();

  // Parallax effects
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  // Color animation
  const gradientColors = [
    ["#FF5F6D", "#FFC371"],
    ["#4158D0", "#C850C0"],
    ["#3EECAC", "#EE74E1"],
    ["#FA8BFF", "#2BD2FF"],
    ["#FF3CAC", "#784BA0"],
  ];

  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % gradientColors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [gradientColors.length]);

  useEffect(() => {
    const getOneProject = async (id: string) => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://smit-shah-backend-80da1d71856d.herokuapp.com/getproject/${id}`,
          {
            cache: "no-store",
          }
        );
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProject(data.project as IProject);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };

    getOneProject(params.productid);
  }, [params.productid]);

  if (loading) {
    return <Loading />;
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        {/* Animated gradient background */}
        <motion.div
          className="fixed inset-0 -z-10"
          animate={{
            background: `linear-gradient(135deg, ${gradientColors[colorIndex][0]} 0%, ${gradientColors[colorIndex][1]} 100%)`,
          }}
          transition={{ duration: 2 }}
          style={{ opacity: 0.05 }}
        />

        {/* Hero section */}
        <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-blue-200/30 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 min-h-[90vh] lg:min-h-[80vh]">
              {/* Left side - Text content */}
              <motion.div
                className="flex-1 lg:pr-16 w-full"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-medium text-sm mb-6 border border-blue-200/50"
                >
                  Client
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight"
                >
                  {project.client || project.companyName}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-gray-600 leading-relaxed mb-8 max-w-xl"
                >
                  {project.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4 mb-8"
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="text-sm font-medium text-gray-700">
                      UI UX
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    <span className="text-sm font-medium text-gray-700">
                      Web
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm">
                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                    <span className="text-sm font-medium text-gray-700">
                      Development
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right side - Device Mockup */}
              <motion.div
                className="flex-1 relative w-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="relative w-full max-w-2xl mx-auto min-h-[350px] sm:min-h-[400px] lg:min-h-[500px] px-4 sm:px-0">
                  {/* Laptop Mockup */}
                  <motion.div
                    className="relative group cursor-pointer w-full"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{
                      scale: 1.02,
                      rotateY: 3,
                      rotateX: 2,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                    }}
                  >
                    {/* Laptop Screen */}
                    <div className="relative bg-gray-900 rounded-t-2xl p-2 sm:p-3 lg:p-4 shadow-2xl">
                      <div className="bg-black rounded-xl p-1 sm:p-1.5">
                        <div className="aspect-[16/10] relative bg-gray-100 rounded-lg overflow-hidden">
                          {project.images && project.images[0] && (
                            <Image
                              src={project.images[0] || "/placeholder.svg"}
                              alt={project.title || "Project main visual"}
                              layout="fill"
                              objectFit="cover"
                              className="transition-all duration-700 group-hover:scale-105"
                              priority
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Laptop Base */}
                    <div className="bg-gradient-to-b from-gray-200 to-gray-300 rounded-b-2xl h-8 sm:h-10 lg:h-12 shadow-lg"></div>

                    {/* Laptop Shadow */}
                    <div className="absolute -bottom-1 left-2 right-2 h-2 bg-black/20 rounded-full blur-sm"></div>
                  </motion.div>

                  {/* Mobile Mockup - Attached/Overlapping position */}
                  <motion.div
                    className="absolute -bottom-4 sm:-bottom-6 lg:-bottom-10 -right-2 sm:-right-8 lg:-right-10 w-24 sm:w-32 lg:w-36 group cursor-pointer z-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{
                      y: -10,
                      scale: 1.1,
                      rotateY: -8,
                      rotateX: -3,
                      zIndex: 50,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                    }}
                  >
                    {/* Phone Frame */}
                    <div className="relative bg-gray-900 rounded-3xl p-1.5 sm:p-2.5 lg:p-3 shadow-xl">
                      <div className="aspect-[9/19.5] relative bg-black rounded-2xl overflow-hidden">
                        {project.images && project.images[0] && (
                          <Image
                            src={project.images[0] || "/placeholder.svg"}
                            alt="Mobile view"
                            layout="fill"
                            objectFit="cover"
                            className="transition-all duration-700 group-hover:scale-110"
                          />
                        )}
                      </div>
                    </div>

                    {/* Mobile shadow */}
                    <div className="absolute -bottom-1 left-1 right-1 h-2 lg:h-3 bg-black/30 rounded-full blur-sm"></div>
                  </motion.div>

                  {/* Minimal floating elements - responsive positioning */}
                  <motion.div
                    className="absolute -top-6 lg:-top-12 -right-6 lg:-right-12 w-12 h-12 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className="absolute -bottom-4 lg:-bottom-8 -left-4 lg:-left-8 w-10 h-10 lg:w-20 lg:h-20 bg-gradient-to-br from-pink-400/30 to-orange-500/30 rounded-full blur-xl"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="flex flex-col items-center gap-2 text-gray-400"
              >
                <span className="text-xs font-medium tracking-wider uppercase">
                  Scroll
                </span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Challenges section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-500 font-medium text-sm mb-6">
                Challenges
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-12">
                Overcoming obstacles to deliver exceptional results
              </h2>

              <div className="space-y-8">
                {project.challenges &&
                  project.challenges.map((challenge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6 group"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-pink-500 text-white font-bold">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg leading-relaxed">{challenge}</p>
                        <motion.div
                          className="h-px bg-gray-200 mt-6"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            duration: 0.5,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Image gallery section 1 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6">
              <motion.div
                className="w-full md:w-1/2 h-[400px] relative rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {project.images && project.images[1] && (
                  <Image
                    src={project.images[1] || "/placeholder.svg"}
                    alt="Project visual"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 hover:scale-105"
                  />
                )}
              </motion.div>

              <motion.div
                className="w-full md:w-1/2 h-[400px] relative rounded-2xl overflow-hidden"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {project.images && project.images[2] && (
                  <Image
                    src={project.images[2] || "/placeholder.svg"}
                    alt="Project visual"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 hover:scale-105"
                  />
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Solution section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-500 font-medium text-sm mb-6">
                Solution
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Our approach
              </h2>

              <div className="prose prose-lg">
                <p className="text-lg leading-relaxed text-gray-700">
                  {project.solution}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Image gallery section 2 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="w-full h-[500px] relative rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {project.images && project.images[3] && (
                <Image
                  src={project.images[3] || "/placeholder.svg"}
                  alt="Project visual"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 hover:scale-105"
                />
              )}
            </motion.div>
          </div>
        </section>

        {/* Results section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-green-50 text-green-500 font-medium text-sm mb-6">
                Results
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">
                Measurable impact
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="flex flex-col items-center text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 mb-6">
                  <Image
                    src="/m_1.png"
                    alt="Brand Awareness"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Increased Brand Awareness
                </h3>
                <p className="text-gray-600">
                  Significant growth in brand recognition and market presence
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 mb-6">
                  <Image
                    src="/m_2.png"
                    alt="Improved Sales"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Improved Sales</h3>
                <p className="text-gray-600">
                  Substantial increase in conversion rates and revenue
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 mb-6">
                  <Image
                    src="/m_3.png"
                    alt="Better Value"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Better Value</h3>
                <p className="text-gray-600">
                  Enhanced customer satisfaction and long-term loyalty
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              className="relative overflow-hidden rounded-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600" />

              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fillOpacity="0.1" fillRule="evenodd"/%3E%3C/svg%3E")',
                  backgroundSize: "30%",
                }}
              />

              <div className="relative py-16 px-8 md:px-16 text-white">
                <div className="max-w-3xl">
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Make the Move
                  </motion.h2>

                  <motion.h3
                    className="text-xl font-semibold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    REACH OUT
                  </motion.h3>

                  <motion.p
                    className="text-lg mb-8 text-white/90 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    If you&apos;re looking for a holistic agency to work on your
                    big dream, just say the magic words!
                  </motion.p>

                  <motion.button
                    className="group flex items-center gap-2 bg-white text-pink-600 font-semibold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    LET&apos;S COLLABORATE
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* More projects section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold">More</h2>
              <h3 className="text-3xl text-gray-400 font-bold">Good Stuff</h3>
            </motion.div>

            {/* Here you would add a carousel or grid of other projects */}
            <div className="text-center py-8">
              <Link href="/work">
                <motion.button
                  className="group flex items-center gap-2 mx-auto bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View All Projects
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProjectPage;
