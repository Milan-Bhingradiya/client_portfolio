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
import { ArrowRight, ChevronDown, Star, Award, TrendingUp } from "lucide-react";

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
  const [activeImage, setActiveImage] = useState(0);
  const { scrollYProgress } = useScroll();

  // Parallax effects
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

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
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            Project not found
          </h1>
          <p className="text-gray-600 mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all"
          >
            Return to home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative bg-white"
      >
        {/* Progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Hero section */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="relative h-[90vh] flex items-center justify-center overflow-hidden"
        >
          {/* Background image with minimal overlay */}
          <div className="absolute inset-0 z-0">
            {project.images && project.images[0] && (
              <Image
                src={project.images[0]}
                alt={project.title || "Project banner"}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content - positioned to bottom right */}
          <div className="absolute bottom-20 right-10 z-10 text-white max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-right"
            >
              {/* Industry badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium mb-4"
              >
                <Star className="w-3 h-3" />
                {project.industryName}
              </motion.div>

              {/* Title - smaller size */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
              >
                {project.client || project.companyName}
              </motion.h1>

              {/* Description - smaller size */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-sm md:text-base text-white/90 leading-relaxed"
              >
                {project.description}
              </motion.p>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              className="flex flex-col items-center gap-2 text-white/70"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Image Gallery Section */}
        {project.images && project.images.length > 1 && (
          <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  Project Gallery
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Explore the visual journey of this project
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.images.slice(1).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={image}
                        alt={`Project image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Challenges section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium text-sm mb-6"
                >
                  <Award className="w-4 h-4" />
                  Challenges We Overcame
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Turning Obstacles into Opportunities
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Every challenge presented an opportunity to innovate and
                  deliver exceptional results
                </p>
              </div>

              <div className="grid gap-8">
                {project.challenges &&
                  project.challenges.map((challenge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="flex gap-6 group hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-black text-white font-bold text-lg shadow-lg">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-lg leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors">
                          {challenge}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Solution section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium text-sm mb-6"
                >
                  <TrendingUp className="w-4 h-4" />
                  Our Solution
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Strategic Approach
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  How we transformed challenges into success
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              >
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-gray-700">
                    {project.solution}
                  </p>
                </div>
              </motion.div>
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
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium text-sm mb-6">
                <Star className="w-4 h-4" />
                Results
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Measurable Impact
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The tangible results that speak for themselves
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "/m_1.png",
                  title: "Increased Brand Awareness",
                  description:
                    "Significant growth in brand recognition and market presence",
                },
                {
                  icon: "/m_2.png",
                  title: "Improved Sales",
                  description:
                    "Substantial increase in conversion rates and revenue",
                },
                {
                  icon: "/m_3.png",
                  title: "Better Value",
                  description:
                    "Enhanced customer satisfaction and long-term loyalty",
                },
              ].map((result, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 bg-white border border-gray-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 relative">
                      <Image
                        src={result.icon}
                        alt={result.title}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {result.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-24 bg-black text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="relative overflow-hidden rounded-3xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black" />

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
                    className="text-4xl md:text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Ready to Start Your Project?
                  </motion.h2>

                  <motion.p
                    className="text-xl mb-8 text-white/90 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Let&apos;s collaborate to bring your vision to life with our
                    strategic approach and proven methodologies.
                  </motion.p>

                  <motion.button
                    className="group flex items-center gap-3 bg-white text-black font-semibold py-4 px-8 rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Let&apos;s Collaborate
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
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
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                More Amazing Work
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our portfolio of successful projects
              </p>
            </motion.div>

            <div className="text-center">
              <Link href="/work">
                <motion.button
                  className="group flex items-center gap-3 mx-auto bg-black text-white font-semibold py-4 px-8 rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View All Projects
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
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
