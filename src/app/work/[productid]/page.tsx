"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Target,
  Lightbulb,
  Trophy,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProject,
  fetchProjects,
  getAllProjectImages,
  type Project,
} from "@/lib/api";

interface RouteParams {
  params: {
    productid: string;
  };
}

// Color themes
const projectThemes = [
  {
    primary: "from-violet-600 to-purple-700",
    secondary: "from-violet-500/20 to-purple-500/20",
    accent: "violet",
    glow: "rgba(139, 92, 246, 0.4)",
    text: "text-violet-400",
    bg: "bg-violet-500",
    border: "border-violet-500/30",
  },
  {
    primary: "from-rose-600 to-pink-700",
    secondary: "from-rose-500/20 to-pink-500/20",
    accent: "rose",
    glow: "rgba(244, 63, 94, 0.4)",
    text: "text-rose-400",
    bg: "bg-rose-500",
    border: "border-rose-500/30",
  },
  {
    primary: "from-amber-500 to-orange-600",
    secondary: "from-amber-500/20 to-orange-500/20",
    accent: "amber",
    glow: "rgba(245, 158, 11, 0.4)",
    text: "text-amber-400",
    bg: "bg-amber-500",
    border: "border-amber-500/30",
  },
  {
    primary: "from-emerald-500 to-teal-600",
    secondary: "from-emerald-500/20 to-teal-500/20",
    accent: "emerald",
    glow: "rgba(16, 185, 129, 0.4)",
    text: "text-emerald-400",
    bg: "bg-emerald-500",
    border: "border-emerald-500/30",
  },
  {
    primary: "from-cyan-500 to-blue-600",
    secondary: "from-cyan-500/20 to-blue-500/20",
    accent: "cyan",
    glow: "rgba(6, 182, 212, 0.4)",
    text: "text-cyan-400",
    bg: "bg-cyan-500",
    border: "border-cyan-500/30",
  },
];

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030014]">
      <div className="relative">
        <motion.div
          className="w-24 h-24 rounded-full border-2 border-violet-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 w-24 h-24 rounded-full border-t-2 border-fuchsia-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Sparkles className="w-8 h-8 text-violet-400" />
        </div>
      </div>
    </div>
  );
}

// Single showcase image with cool hover effect
function ShowcaseImage({
  src,
  alt,
  index,
  theme,
}: {
  src: string;
  alt: string;
  index: number;
  theme: (typeof projectThemes)[0];
}) {
  return (
    <motion.div
      className="relative group overflow-hidden rounded-3xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative h-[50vh] md:h-[70vh]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-60" />

        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Image number badge */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <span
            className={`px-4 py-2 rounded-full bg-gradient-to-r ${theme.secondary} border ${theme.border} text-sm font-medium ${theme.text}`}
          >
            #{String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectPage({ params }: RouteParams) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [theme, setTheme] = useState(projectThemes[0]);

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project", params.productid],
    queryFn: () => fetchProject(params.productid),
  });

  const { data: allProjects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  useEffect(() => {
    if (project && allProjects.length > 0) {
      const projectIndex = allProjects.findIndex(
        (p: Project) => p._id === project._id
      );
      const themeIndex = projectIndex % projectThemes.length;
      setTheme(projectThemes[themeIndex >= 0 ? themeIndex : 0]);
    }
  }, [project, allProjects]);

  const currentIndex = allProjects.findIndex(
    (p: Project) => p._id === params.productid
  );
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  if (isLoading) return <LoadingState />;

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#030014]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Project not found
          </h1>
          <p className="text-zinc-400 mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 text-white font-medium hover:bg-violet-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Work
          </Link>
        </motion.div>
      </div>
    );
  }

  const allDisplayImages = getAllProjectImages(project);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#030014] overflow-hidden"
      >
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <motion.div
            className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
              filter: "blur(100px)",
            }}
            animate={{
              x: ["10%", "-10%", "10%"],
              y: ["-10%", "10%", "-10%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
              filter: "blur(100px)",
              opacity: 0.5,
            }}
            animate={{
              x: ["-10%", "10%", "-10%"],
              y: ["10%", "-10%", "10%"],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Back Button */}
        <motion.div
          className="fixed top-6 left-6 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/work"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>
        </motion.div>

        {/* Hero Section */}
        <section className="relative min-h-screen">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="absolute inset-0">
              <Image
                src={project.heroImage || "/projectbanner.jpg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/60 via-[#030014]/40 to-[#030014]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030014]/80 to-transparent" />
            </div>
          </motion.div>

          <div className="relative z-10 min-h-screen flex items-end">
            <div className="w-full px-6 md:px-12 lg:px-20 pb-24">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${theme.secondary} border ${theme.border} mb-6`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Sparkles className={`w-4 h-4 ${theme.text}`} />
                    <span className={`text-sm font-medium ${theme.text}`}>
                      {project.industryName || "Design"}
                    </span>
                  </motion.div>

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                    {project.title || project.client}
                  </h1>

                  <motion.p
                    className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-sm text-zinc-300">
                        {project.companyName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                      <span className={`w-2 h-2 rounded-full ${theme.bg}`} />
                      <span className="text-sm text-zinc-300">
                        {project.client}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="absolute bottom-8 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">
                      Scroll
                    </span>
                    <ChevronDown className="w-5 h-5 text-zinc-500" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Two Square Images Side by Side */}
        {project.squareImages && project.squareImages.length === 2 && (
          <section className="py-16 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span
                  className={`text-sm font-medium ${theme.text} uppercase tracking-widest`}
                >
                  Featured Work
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                  Project Highlights
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.squareImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className="relative aspect-square rounded-3xl overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - Feature ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badge */}
                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span
                        className={`px-4 py-2 rounded-full bg-gradient-to-r ${theme.secondary} border ${theme.border} text-sm font-medium ${theme.text}`}
                      >
                        Feature #{index + 1}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Challenges Section */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="relative py-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <motion.div
                  className="lg:sticky lg:top-32"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${theme.secondary} border ${theme.border} mb-6`}
                  >
                    <Target className={`w-4 h-4 ${theme.text}`} />
                    <span className={`text-sm font-medium ${theme.text}`}>
                      Challenges
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Obstacles We
                    <br />
                    <span
                      className={`bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}
                    >
                      Overcame
                    </span>
                  </h2>
                  <p className="text-lg text-zinc-400">
                    Every great project comes with its unique set of challenges.
                  </p>
                </motion.div>

                <div className="space-y-6">
                  {project.challenges.map((challenge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all"
                    >
                      <div
                        className={`absolute -left-3 -top-3 w-10 h-10 rounded-xl bg-gradient-to-br ${theme.primary} flex items-center justify-center font-bold text-white shadow-lg`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="text-zinc-300 leading-relaxed pl-4">
                        {challenge}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Solution Section */}
        {project.solution && (
          <section className="relative py-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${theme.secondary} border ${theme.border} mb-6`}
                >
                  <Lightbulb className={`w-4 h-4 ${theme.text}`} />
                  <span className={`text-sm font-medium ${theme.text}`}>
                    Our Approach
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  The Solution
                </h2>
                <p className="text-xl text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Gallery Images - Individual Showcase */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <section className="py-12 px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span
                  className={`text-sm font-medium ${theme.text} uppercase tracking-widest`}
                >
                  Visual Journey
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                  Project Gallery
                </h2>
              </motion.div>

              {/* Show each gallery image separately */}
              <div className="space-y-8">
                {project.galleryImages.map((img, index) => (
                  <ShowcaseImage
                    key={index}
                    src={img}
                    alt={`${project.title} - Gallery ${index + 1}`}
                    index={index + 2}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Results Section */}
        <section className="relative py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${theme.secondary} border ${theme.border} mb-6`}
              >
                <Trophy className={`w-4 h-4 ${theme.text}`} />
                <span className={`text-sm font-medium ${theme.text}`}>
                  Impact
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Measurable Results
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "/m_1.png",
                  title: "Brand Awareness",
                  description: "Significant growth in brand recognition",
                  stat: "150%",
                  statLabel: "Increase",
                },
                {
                  icon: "/m_2.png",
                  title: "User Engagement",
                  description: "Improved interaction rates",
                  stat: "3x",
                  statLabel: "Higher",
                },
                {
                  icon: "/m_3.png",
                  title: "Business Growth",
                  description: "Enhanced conversion rates",
                  stat: "200%",
                  statLabel: "ROI",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 relative">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="mb-4">
                    <span
                      className={`text-4xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}
                    >
                      {item.stat}
                    </span>
                    <span className="text-zinc-500 text-sm ml-2">
                      {item.statLabel}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Catalog - Interactive Gallery */}
        {allDisplayImages.length > 1 && (
          <section className="relative py-24 px-6 md:px-12 lg:px-20 bg-zinc-900/30">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span
                  className={`text-sm font-medium ${theme.text} uppercase tracking-widest`}
                >
                  Product Catalog
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                  Browse All Images
                </h2>
                <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
                  Click on any thumbnail to view full size
                </p>
              </motion.div>

              {/* Main Image Viewer */}
              <motion.div
                className="relative aspect-video rounded-3xl overflow-hidden mb-8 bg-zinc-900"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={allDisplayImages[activeImageIndex]}
                      alt={`${project.title} - Image ${activeImageIndex + 1}`}
                      fill
                      className="object-contain bg-zinc-950"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === 0 ? allDisplayImages.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveImageIndex((prev) =>
                      prev === allDisplayImages.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md">
                  <span className="text-white text-sm font-medium">
                    {activeImageIndex + 1} / {allDisplayImages.length}
                  </span>
                </div>
              </motion.div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {allDisplayImages.map((img, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                      activeImageIndex === index
                        ? `ring-2 ring-offset-2 ring-offset-[#030014] ${
                            theme.accent === "violet"
                              ? "ring-violet-500"
                              : theme.accent === "rose"
                              ? "ring-rose-500"
                              : theme.accent === "amber"
                              ? "ring-amber-500"
                              : theme.accent === "emerald"
                              ? "ring-emerald-500"
                              : "ring-cyan-500"
                          }`
                        : "opacity-60 hover:opacity-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {activeImageIndex === index && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${theme.secondary} opacity-30`}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="relative py-24 px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="relative overflow-hidden rounded-3xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${theme.primary}`}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                }}
              />

              <div className="relative z-10 py-20 px-8 md:px-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to create something amazing?
                </h2>
                <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                  Let&apos;s collaborate and bring your vision to life.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contactus"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-gray-900 font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-xl"
                  >
                    Start a Project
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
                  >
                    View More Work
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Project Navigation */}
        <section className="relative py-12 px-6 md:px-12 lg:px-20 border-t border-zinc-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                {prevProject && (
                  <Link
                    href={`/work/${prevProject._id}`}
                    className="group flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                      <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <div className="hidden md:block">
                      <span className="text-sm text-zinc-500">Previous</span>
                      <p className="text-white font-medium group-hover:text-violet-400 transition-colors">
                        {prevProject.title}
                      </p>
                    </div>
                  </Link>
                )}
              </div>

              <Link
                href="/work"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors"
              >
                <span className="hidden md:inline">All Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <div>
                {nextProject && (
                  <Link
                    href={`/work/${nextProject._id}`}
                    className="group flex items-center gap-4"
                  >
                    <div className="hidden md:block text-right">
                      <span className="text-sm text-zinc-500">Next</span>
                      <p className="text-white font-medium group-hover:text-violet-400 transition-colors">
                        {nextProject.title}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
                      <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}
