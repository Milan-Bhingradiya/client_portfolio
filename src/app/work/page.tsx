"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, type Project } from "@/lib/api";
import TiltedCard from "../component/TiltedCard";
import { ArrowUpRight, Sparkles, Grid3X3, LayoutList } from "lucide-react";

// Floating particles background
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated background mesh
function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-20">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-[#030014]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: ["-20%", "10%", "-20%"],
          y: ["-20%", "10%", "-20%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: ["20%", "-10%", "20%"],
          y: ["20%", "-10%", "20%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        <motion.div
          className="w-20 h-20 rounded-full border-2 border-violet-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 w-20 h-20 rounded-full border-t-2 border-fuchsia-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-violet-400" />
      </div>
    </div>
  );
}

export default function WorkPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <MeshBackground />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-zinc-400">Failed to load projects</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MeshBackground />
      <FloatingParticles />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">
                Our Portfolio
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
              <motion.span
                className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Crafted with
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Passion & Precision
              </motion.span>
            </h1>

            <motion.p
              className="text-lg md:text-xl text-zinc-400 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              We&apos;ve designed experiences for over 260+ projects, helping
              brands create meaningful connections with their audiences.
            </motion.p>
          </motion.div>

          {/* View Toggle */}
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-zinc-500">
              <span className="text-sm">{projects.length} Projects</span>
            </div>

            <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-violet-500/20 text-violet-400"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <LoadingState />
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {projects.map((project: Project, index: number) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      <Link href={`/work/${project._id}`}>
                        <TiltedCard
                          imageSrc={project.images?.[0] || "/placeholder.png"}
                          title={project.title || "Untitled Project"}
                          subtitle={project.description}
                          captionText={project.industryName}
                          containerHeight="420px"
                          showTooltip={true}
                          overlayContent={
                            <div className="flex items-center gap-2 mt-3">
                              <span className="text-xs text-white/60 font-medium">
                                {project.companyName}
                              </span>
                            </div>
                          }
                        />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {projects.map((project: Project, index: number) => (
                    <motion.div
                      key={project._id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      onMouseEnter={() => setHoveredProject(project._id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <Link href={`/work/${project._id}`}>
                        <div
                          className={`group relative flex items-center gap-8 p-6 rounded-2xl border transition-all duration-500 ${
                            hoveredProject === project._id
                              ? "bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border-violet-500/30"
                              : "bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700"
                          }`}
                        >
                          {/* Project Number */}
                          <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-xl bg-zinc-800/50 text-2xl font-bold text-zinc-500 group-hover:text-violet-400 transition-colors">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          {/* Project Image */}
                          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={project.images?.[0] || "/placeholder.png"}
                              alt={project.title || "Project"}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>

                          {/* Project Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
                                {project.industryName}
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-zinc-400 text-sm line-clamp-2 max-w-xl">
                              {project.description}
                            </p>
                          </div>

                          {/* Arrow */}
                          <div className="flex-shrink-0">
                            <motion.div
                              className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-violet-500 transition-colors"
                              animate={{
                                x: hoveredProject === project._id ? 5 : 0,
                              }}
                            >
                              <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                            </motion.div>
                          </div>

                          {/* Background glow on hover */}
                          {hoveredProject === project._id && (
                            <motion.div
                              className="absolute inset-0 -z-10 rounded-2xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              style={{
                                background: `radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)`,
                                filter: "blur(40px)",
                              }}
                            />
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-3xl p-12 md:p-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600" />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 40%)`,
              }}
            />

            <div className="relative z-10 text-center">
              <motion.h2
                className="text-3xl md:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Have a project in mind?
              </motion.h2>
              <motion.p
                className="text-lg text-white/80 mb-8 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Let&apos;s transform your vision into reality. We&apos;re here
                to help you create something extraordinary.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/contactus"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-violet-600 font-semibold hover:bg-white/90 transition-all hover:scale-105 active:scale-100"
                >
                  Start a Conversation
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
