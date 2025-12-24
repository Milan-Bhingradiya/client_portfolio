"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCreative,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchHighlights, type Highlight } from "@/lib/api";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Fallback slides when no highlights are available
const fallbackSlides = [
  {
    _id: "1",
    imageDesktop:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    imageMobile:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop",
    title: "Mountain Dreams",
    subtitle: "Confidence is the best outfit. Wear it and own it!",
  },
  {
    _id: "2",
    imageDesktop:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop",
    imageMobile:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1080&h=1920&fit=crop",
    title: "Ocean Vibes",
    subtitle: "Glow differently. Shine unapologetically.",
  },
  {
    _id: "3",
    imageDesktop:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1920&h=1080&fit=crop",
    imageMobile:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1080&h=1920&fit=crop",
    title: "Tech Innovation",
    subtitle: "Elegance is an attitude.",
  },
];

export default function ExpoSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { data: highlights = [], isLoading } = useQuery({
    queryKey: ["highlights"],
    queryFn: fetchHighlights,
  });

  useEffect(() => {
    setIsClient(true);
    // Check if mobile on mount
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use highlights if available, otherwise use fallback
  const slides =
    highlights.length > 0
      ? highlights
      : fallbackSlides.map((s) => ({
          ...s,
          order: 0,
          isActive: true,
          createdAt: new Date().toISOString(),
        }));

  if (!isClient) {
    return (
      <section className="relative w-full py-20 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="h-[600px] flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute left-1/2 -translate-x-1/2 -top-4 w-32 h-32 bg-gradient-to-r from-violet-600/30 via-fuchsia-500/30 to-cyan-400/30 rounded-full blur-3xl"
        />

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <span className="block text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 mb-4">
            ✦ Featured Work ✦
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-200 to-white">
              Spot
            </span>
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400">
                lights
              </span>
              {/* Sparkle effect */}
              <motion.span
                className="absolute -top-2 -right-6 text-2xl"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </span>
          </h2>

          {/* Animated underline */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-6"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "auto" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500" />
            <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-white">Loading highlights...</div>
        </div>
      ) : (
        /* Swiper Slider */
        <div className="relative px-4 md:px-8">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[EffectCreative, Autoplay, Navigation, Pagination]}
            effect="creative"
            creativeEffect={{
              limitProgress: 2,
              prev: {
                translate: ["-110%", 0, -200],
                rotate: [0, 0, -15],
                scale: 0.8,
                opacity: 0.6,
              },
              next: {
                translate: ["110%", 0, -200],
                rotate: [0, 0, 15],
                scale: 0.8,
                opacity: 0.6,
              },
            }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.15}
            spaceBetween={15}
            speed={600}
            loop={slides.length > 1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "expo-bullet",
              bulletActiveClass: "expo-bullet-active",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.25,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1.35,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 1.45,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 1.5,
                spaceBetween: 50,
              },
            }}
            className="expo-swiper !overflow-visible"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide._id} className="!h-auto">
                <div
                  className={`relative w-full rounded-3xl overflow-hidden transition-all duration-500 ${
                    activeIndex === index
                      ? "shadow-[0_0_80px_rgba(59,130,246,0.4)]"
                      : "shadow-2xl"
                  }`}
                  style={{
                    // Mobile: Portrait (9:16), Desktop: Big Landscape (16:10 for bigger cards)
                    aspectRatio: isMobile ? "9/16" : "16/10",
                    minHeight: isMobile ? "auto" : "500px",
                  }}
                >
                  {/* Desktop Image - Horizontal/Landscape */}
                  <Image
                    src={isMobile ? slide.imageMobile : slide.imageDesktop}
                    alt={slide.title}
                    fill
                    className={`object-contain bg-black transition-all duration-500 ${
                      activeIndex === index ? "" : "grayscale"
                    }`}
                    sizes={
                      isMobile ? "100vw" : "(max-width: 1024px) 80vw, 60vw"
                    }
                    priority={index < 3}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Content */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 transition-all duration-500 ${
                      activeIndex === index
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-md">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Slide number badge */}
                  <div
                    className={`absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                      activeIndex === index
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75"
                    }`}
                  >
                    <span className="text-white font-bold text-sm md:text-base">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        .expo-swiper {
          padding: 40px 0 60px !important;
        }

        .expo-swiper .swiper-slide {
          transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        .expo-swiper .swiper-pagination {
          bottom: 0 !important;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .expo-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .expo-bullet:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .expo-bullet-active {
          width: 32px;
          background: linear-gradient(90deg, #3b82f6, #a855f7);
        }

        .expo-swiper .swiper-slide-active {
          z-index: 10;
        }

        .expo-swiper .swiper-slide-prev,
        .expo-swiper .swiper-slide-next {
          z-index: 5;
        }
      `}</style>
    </section>
  );
}
