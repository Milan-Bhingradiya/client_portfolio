"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TestimonialSection() {
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

  const carouselRef = useRef<HTMLDivElement>(null);

  // Scroll handler for arrows (all screens)
  const scroll = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelector("div[data-card]");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 32 : 320; // 32 = gap-8
    carouselRef.current.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative z-20 py-20 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Testimonials</h2>
        </div>
        <div className="relative w-full">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition shadow"
            aria-label="Scroll left"
            style={{ transform: "translateY(-50%)" }}
          >
            <FaChevronLeft />
          </button>
          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition shadow"
            aria-label="Scroll right"
            style={{ transform: "translateY(-50%)" }}
          >
            <FaChevronRight />
          </button>
          <div
            ref={carouselRef}
            className="flex flex-row gap-8 overflow-x-auto snap-x snap-mandatory px-10 hide-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                data-card
                className="bg-white border-2 border-gray-200 rounded-2xl p-4 my-4 hover:shadow-lg transition-all duration-300 hover:scale-105 min-w-[85vw] max-w-[90vw] sm:min-w-[350px] sm:max-w-[400px] w-full flex-shrink-0 snap-center"
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
        </div>
      </div>
    </div>
  );
}
