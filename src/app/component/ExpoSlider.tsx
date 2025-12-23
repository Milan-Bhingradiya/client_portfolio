"use client";

import { useRef, useEffect, useState } from "react";
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
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
    title: "Mountain Dreams",
    subtitle: "Confidence is the best outfit. Wear it and own it!",
  },
  {
    _id: "2",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=1000&fit=crop",
    title: "Ocean Vibes",
    subtitle: "Glow differently. Shine unapologetically.",
  },
  {
    _id: "3",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=1000&fit=crop",
    title: "Tech Innovation",
    subtitle: "Elegance is an attitude.",
  },
];

export default function ExpoSlider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const { data: highlights = [], isLoading } = useQuery({
    queryKey: ["highlights"],
    queryFn: fetchHighlights,
  });

  useEffect(() => {
    setIsClient(true);
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
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Our Work Highlights
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full" />
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
            slidesPerView={1.4}
            spaceBetween={30}
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
                slidesPerView: 1.6,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 1.8,
                spaceBetween: 60,
              },
              1280: {
                slidesPerView: 2,
                spaceBetween: 80,
              },
            }}
            className="expo-swiper !overflow-visible"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide._id} className="!h-auto">
                <div
                  className={`relative w-full aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden transition-all duration-500 ${
                    activeIndex === index
                      ? "shadow-[0_0_80px_rgba(59,130,246,0.4)]"
                      : "shadow-2xl"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className={`object-cover transition-all duration-500 ${
                      activeIndex === index ? "" : "grayscale"
                    }`}
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
