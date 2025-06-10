"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import smit from "../../../public/smit.jpeg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TestimonialSection() {
  // Testimonial data
  const testimonials = [
    {
      text: "Kpitotal is indeed marketing and branding partner to reckon with. Professionalism, creativity and understanding different marketing concepts are their USP. Very satisfied with the quality of work they have done for my company/brands. Endorsed & recommended with 5 star ratings. I wish them very good luck.",
      name: "Sagar Patel",
      country: "🇮🇳 India",
      initials: "SP",
      color: "from-red-400 to-red-600",
      company: "Customer",
    },
    {
      text: "Got my business card designed for my USA business with KPI total, and was very pleased with the professionalism, timing, and their inputs in getting the final product ready. Now used them again for another business need. Great work at very affordable rate.",
      name: "Bhavi Patel",
      country: "🇺🇸 USA",
      initials: "BP",
      color: "from-blue-400 to-blue-600",
      company: "Customer",
    },
    {
      text: "Thanks Mr Shah for your lovely friendly approach. The designs are unique and appealing. Your basic concept conversion of our thoughts are really best in this industry. Best wishes for your future endeavors and wish for future associations.",
      name: "Bikash Garabadu",
      country: "🇮🇳 India",
      initials: "BG",
      color: "from-purple-400 to-purple-600",
      company: "Customer",
    },
    {
      text: "I am from Gujarat and we approached them for Packaging design. Much satisfied with their creative designs and dedication towards customer.",
      name: "Tejash Patel",
      country: "🇮🇳 India",
      initials: "TP",
      color: "from-green-400 to-green-600",
      company: "Customer",
    },
    {
      text: "Professional and innovative approach for Brand Management. Keep it up.",
      name: "Pramit R Jethwa",
      country: "🇮🇳 India",
      initials: "PJ",
      color: "from-indigo-400 to-indigo-600",
      company: "Customer",
    },
    {
      text: "Good work with minute detailing. If you want some one to take care of entire branding and positioning side, KPI total are the best partners to rely upon..",
      name: "Smit Rathod",
      country: "🇮🇳 India",
      initials: "SR",
      color: "from-orange-400 to-orange-600",
      company: "Customer",
    },
  ];

  // Carousel logic
  const carouselRef = useRef<HTMLDivElement>(null);

  // Scroll handler for arrows
  const scroll = (dir: "left" | "right") => {
    if (typeof window === "undefined" || !carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const scrollAmount = clientWidth * 0.8;
    carouselRef.current.scrollTo({
      left:
        dir === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // Touch/drag support
  let startX = 0;
  let scrollStart = 0;
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    startX = e.touches[0].clientX;
    scrollStart = carouselRef.current.scrollLeft;
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    const dx = e.touches[0].clientX - startX;
    carouselRef.current.scrollLeft = scrollStart - dx;
  };

  return (
    <div className="relative z-20 py-20 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by companies worldwide
          </p>
        </div>
        {/* Carousel Row */}
        <div className="relative">
          {/* Left Arrow (desktop only) */}
          <button
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition"
            onClick={() => scroll("left")}
            aria-label="Scroll testimonials left"
            type="button"
          >
            <FaChevronLeft size={24} />
          </button>
          {/* Testimonial Cards Row */}
          <div
            ref={carouselRef}
            className="flex flex-col lg:flex-row gap-8 overflow-x-auto lg:overflow-x-scroll snap-x snap-mandatory px-1 hide-scrollbar"
            style={{ scrollBehavior: "smooth" }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-0 w-full lg:w-[350px] flex-shrink-0 snap-center"
              >
                <div className="flex space-x-1 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <p className="text-gray-700 mb-6 italic">{`"${t.text}"`}</p>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${t.color} rounded-full flex items-center justify-center text-white font-bold`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <span className="text-xs">{t.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right Arrow (desktop only) */}
          <button
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition"
            onClick={() => scroll("right")}
            aria-label="Scroll testimonials right"
            type="button"
          >
            <FaChevronRight size={24} />
          </button>
        </div>
        {/* Meet The Founder Section */}
        <div className="mt-20 border-2 border-gray-200 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                Meet
                <br />
                The
                <br />
                Founder
              </h2>
            </div>
            <div className="flex flex-col-reverse gap-4 lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-6">
              <div>
                <div className="flex space-x-1 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Smit Shah</h3>
                <p className="text-gray-600 mb-2">
                  Founder, Head of KPI Total.
                </p>
                <p className="text-gray-600 mb-4">SEO and Marketing expert.</p>
                <div className="text-blue-600 mb-4">in</div>
                <div className="flex space-x-2">
                  <div className="px-3 py-1 bg-gray-100 rounded text-sm">
                    SEO
                  </div>
                  <div className="px-3 py-1 bg-gray-100 rounded text-sm">
                    Marketing
                  </div>
                </div>
              </div>
              <div className="w-48 h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden sm:mb-4 sm:w-40 sm:h-52 md:w-48 md:h-64 lg:w-48 lg:h-64 min-w-0 min-h-0 max-w-full max-h-full  lg:mb-0">
                <img
                  src={smit.src}
                  alt="Founder Smit Shah"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
