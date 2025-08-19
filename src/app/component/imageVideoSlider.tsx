"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface MediaItem {
  id: number;
  type: "image" | "video";
  url: string;
  title: string;
  description?: string;
}

// Sample data - replace with your actual media items
const sampleMedia: MediaItem[] = [
  {
    id: 1,
    type: "image",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    title: "Creative Design",
    description: "Innovative design solutions for modern businesses",
  },
  {
    id: 2,
    type: "video",
    url: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761",
    title: "Product Demo",
    description: "See our products in action",
  },
  {
    id: 3,
    type: "image",
    url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
    title: "UI/UX Excellence",
    description: "Beautiful and functional user interfaces",
  },
  {
    id: 4,
    type: "image",
    url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=800&fit=crop",
    title: "Brand Identity",
    description: "Strong brand presence in the market",
  },
  {
    id: 5,
    type: "video",
    url: "https://player.vimeo.com/external/371433808.sd.mp4?s=6f1b7bf8b3c7aa4b8c6322464cc2a8b3d710fbbd&profile_id=139&oauth2_token_id=57447761",
    title: "Technology Showcase",
    description: "Cutting-edge technology solutions",
  },
  {
    id: 6,
    type: "image",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop",
    title: "Digital Innovation",
    description: "Transforming ideas into digital reality",
  },
  {
    id: 7,
    type: "image",
    url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop",
    title: "Team Collaboration",
    description: "Working together to achieve excellence",
  },
  {
    id: 8,
    type: "video",
    url: "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761",
    title: "Creative Process",
    description: "Behind the scenes of our creative work",
  },
];

export default function ImageVideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentMedia = sampleMedia[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleMedia.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + sampleMedia.length) % sampleMedia.length
    );
    setIsPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (currentMedia.type === "video") {
      if (isPlaying) {
        videoRef.current?.pause();
      } else {
        videoRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Auto-advance for images
  useEffect(() => {
    if (currentMedia.type === "image") {
      const timer = setTimeout(() => {
        nextSlide();
      }, 5000); // 5 seconds for images

      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentMedia.type]);

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
    nextSlide();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          prevSlide();
          break;
        case "ArrowRight":
          nextSlide();
          break;
        case " ":
          e.preventDefault();
          togglePlayPause();
          break;
        case "f":
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, isPlaying]);

  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden p-8 md:p-12 lg:p-20"
      ref={containerRef}
    >
      {/* Main Media Display */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            {/* Spotlight Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />

            {/* Media Content */}
            {currentMedia.type === "image" ? (
              <Image
                src={currentMedia.url}
                alt={currentMedia.title}
                fill
                className="object-cover"
                priority={currentIndex === 0}
                sizes="100vw"
              />
            ) : (
              <video
                ref={videoRef}
                src={currentMedia.url}
                className="w-full h-full object-cover"
                onEnded={handleVideoEnd}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                muted
                loop={false}
              />
            )}

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 lg:p-12 text-white">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 drop-shadow-2xl">
                  {currentMedia.title}
                </h2>
                {currentMedia.description && (
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl drop-shadow-lg">
                    {currentMedia.description}
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 z-30 flex items-center justify-between p-4 md:p-6 lg:p-8">
        {/* Left Arrow */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 group"
        >
          <ChevronLeftIcon className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
        </motion.button>

        {/* Right Arrow */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 group"
        >
          <ChevronRightIcon className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>

      {/* Play/Pause Button for Videos */}
      {currentMedia.type === "video" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlayPause}
          className="absolute top-8 md:top-12 lg:top-20 right-8 md:right-12 lg:right-20 z-30 bg-black/30 hover:bg-black/50 text-white p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300"
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <PlayIcon className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </motion.button>
      )}

      {/* Fullscreen Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleFullscreen}
        className="absolute top-8 md:top-12 lg:top-20 left-8 md:left-12 lg:left-20 z-30 bg-black/30 hover:bg-black/50 text-white p-3 md:p-4 rounded-full backdrop-blur-sm transition-all duration-300"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </motion.button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-black/30">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentIndex + 1) / sampleMedia.length) * 100}%`,
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Story Navigation Dots */}
      <div className="absolute bottom-8 md:bottom-12 lg:bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 md:space-x-3">
        {sampleMedia.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 md:top-12 lg:top-20 left-1/2 transform -translate-x-1/2 z-30 bg-black/30 text-white px-3 md:px-4 py-1 md:py-2 rounded-full backdrop-blur-sm">
        <span className="text-xs md:text-sm font-medium">
          {currentIndex + 1} / {sampleMedia.length}
        </span>
      </div>

      {/* Mobile Touch Hints */}
      <div className="md:hidden absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 z-30 text-white/70 text-center">
        <p className="text-xs md:text-sm">Swipe left/right to navigate</p>
      </div>
    </div>
  );
}
