"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface MediaItem {
  id: number;
  type: "image" | "video";
  url: string;
}

// Sample data with free online URLs
const sampleMedia: MediaItem[] = [
  { id: 1, type: "image", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" },
  { id: 2, type: "image", url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop" },
  { id: 3, type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: 4, type: "image", url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop" },
  { id: 5, type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: 6, type: "image", url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop" },
  { id: 7, type: "image", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop" },
  { id: 8, type: "image", url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop" },
];

export default function ImageVideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleMedia.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sampleMedia.length) % sampleMedia.length);
    setIsPlaying(false);
  };

  // Auto-advance only for images, videos wait until they end
  useEffect(() => {
    const currentMedia = sampleMedia[currentIndex];
    
    if (currentMedia.type === "image") {
      const timer = setTimeout(() => {
        nextSlide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Video event handlers
  const handleVideoEnd = () => {
    setIsPlaying(false);
    nextSlide();
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  // Touch/swipe handlers
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevSlide();
      else nextSlide();
    }
    touchStartX.current = null;
  };

  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* Beautiful Theme Text */}
      <div className="relative z-30 text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Showcase
            </span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Discover the magic of our creative journey through stunning visuals and captivating stories
          </p>
        </motion.div>
       
      </div>

      <div 
        className="relative w-full flex items-center justify-center p-4"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Single Media (Image or Video) */}
        <div className="relative w-full m-10 max-w-md h-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              {sampleMedia[currentIndex].type === "image" ? (
                <Image
                  src={sampleMedia[currentIndex].url}
                  alt="Slide"
                  fill
                  className="object-cover rounded-lg"
                  sizes="384px"
                  priority
                />
              ) : (
                <video
                  ref={videoRef}
                  src={sampleMedia[currentIndex].url}
                  className="w-full h-full object-cover rounded-lg"
                  onEnded={handleVideoEnd}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  autoPlay
                  muted
                  loop={false}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 z-20 flex items-center justify-between px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-32 h-1 bg-white/30 rounded-full overflow-hidden">
          {sampleMedia[currentIndex].type === "image" ? (
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              key={currentIndex}
            />
          ) : (
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.1, ease: "linear" }}
              key={currentIndex}
            />
          )}
        </div>

        {/* Play/Pause Button for Videos */}
        {sampleMedia[currentIndex].type === "video" && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (videoRef.current) {
                if (isPlaying) {
                  videoRef.current.pause();
                } else {
                  videoRef.current.play();
                }
              }
            }}
            className="absolute top-4 left-4 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </motion.button>
        )}

        {/* Counter */}
        <div className="absolute top-4 right-4 z-20 bg-black/30 text-white px-2 py-1 rounded text-xs">
          {currentIndex + 1} / {sampleMedia.length}
        </div>
      </div>
    </div>
  );
}
