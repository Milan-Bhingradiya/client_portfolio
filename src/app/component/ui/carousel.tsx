"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useRef, useId, useEffect } from "react";

interface MediaItem {
  id: number;
  type: "image" | "video";
  url: string;
}

interface SlideProps {
  media: MediaItem;
  index: number;
  current: number;
}

const Slide = ({ media, index, current }: SlideProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { type, url } = media;

  useEffect(() => {
    if (videoRef.current) {
      if (current === index) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [current, index]);

  return (
    <div className="flex-shrink-0 w-full h-full">
      <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        {type === "image" ? (
          <img
            className="w-full h-full object-cover transition-all duration-500 ease-out"
            alt={`Slide ${index + 1}`}
            src={url}
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover transition-all duration-500 ease-out"
            src={url}
            muted
            loop
            playsInline
          />
        )}
      </div>
    </div>
  );
};

interface CarouselControlProps {
  direction: "left" | "right";
  handleClick: () => void;
}

const CarouselControl = ({ direction, handleClick }: CarouselControlProps) => {
  return (
    <button
      className="w-14 h-14 flex items-center justify-center bg-white/80 hover:bg-white border border-gray-200 hover:border-gray-300 rounded-full focus:outline-none transition-all duration-300 shadow-lg hover:scale-110 group"
      onClick={handleClick}
      aria-label={`Go to ${direction === "left" ? "previous" : "next"} slide`}
    >
      {direction === "left" ? (
        <FaChevronLeft className="text-gray-700 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      ) : (
        <FaChevronRight className="text-gray-700 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      )}
    </button>
  );
};

interface CarouselProps {
  mediaItems: MediaItem[];
}

export function Carousel({ mediaItems }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePreviousClick = () => {
    setCurrent(prev => prev === 0 ? mediaItems.length - 1 : prev - 1);
  };

  const handleNextClick = () => {
    setCurrent(prev => prev === mediaItems.length - 1 ? 0 : prev + 1);
  };

  const handleSlideClick = (index: number) => {
    setCurrent(index);
  };

  // Touch/Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setPrevTranslate(currentTranslate);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const translate = prevTranslate + diff;
    setCurrentTranslate(translate);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const threshold = 100;
    
    if (Math.abs(currentTranslate - prevTranslate) > threshold) {
      if (currentTranslate > prevTranslate) {
        // Swiped right - go to previous
        handlePreviousClick();
      } else {
        // Swiped left - go to next
        handleNextClick();
      }
    }
    
    setCurrentTranslate(0);
    setPrevTranslate(0);
  };

  const id = useId();

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main Carousel Container - Square aspect ratio on all screens */}
      <div
        ref={carouselRef}
        className="relative w-full aspect-square overflow-hidden rounded-3xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {mediaItems.map((media, index) => (
            <Slide
              key={index}
              media={media}
              index={index}
              current={current}
            />
          ))}
        </div>

        {/* Desktop Navigation Arrows - Hidden on mobile */}
        <div className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2">
          <CarouselControl
            direction="left"
            handleClick={handlePreviousClick}
          />
        </div>

        <div className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2">
          <CarouselControl
            direction="right"
            handleClick={handleNextClick}
          />
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 text-gray-600 text-sm bg-white/80 px-3 py-2 rounded-full shadow-sm">
            <span>←</span>
            <span className="text-xs">Swipe</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center mt-6 space-x-3">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index 
                ? "bg-blue-500 scale-125" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => handleSlideClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      {/* <div className="text-center mt-4 text-white/60 text-sm">
        {current + 1} / {mediaItems.length}
      </div> */}
    </div>
  );
}
