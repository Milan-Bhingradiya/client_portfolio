"use client";
import { FaChevronRight } from "react-icons/fa";
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
  handleSlideClick: (index: number) => void;
}

const Slide = ({ media, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { type, url } = media;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[95vw] h-[80vh] md:w-[80vmin] md:h-[80vmin] mx-0 md:mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          {type === "image" ? (
            <img
              className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
              style={{
                opacity: current === index ? 1 : 0.5,
              }}
              alt={`Slide ${index + 1}`}
              src={url}
              onLoad={imageLoaded}
              loading="eager"
              decoding="sync"
            />
          ) : (
            <video
              ref={videoRef}
              className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
              style={{
                opacity: current === index ? 1 : 0.5,
              }}
              src={url}
              autoPlay={current === index}
              muted
              loop
              playsInline
            />
          )}
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-12 h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 border-2 border-white/20 hover:border-white/40 rounded-full focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 backdrop-blur-sm ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <FaChevronRight className="text-white w-6 h-6" />
    </button>
  );
};

interface CarouselProps {
  mediaItems: MediaItem[];
}

export function Carousel({ mediaItems }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? mediaItems.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === mediaItems.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-[95vw] h-[80vh] md:w-[80vmin] md:h-[80vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-0 md:mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / mediaItems.length)}%)`,
        }}
      >
        {mediaItems.map((media, index) => (
          <Slide
            key={index}
            media={media}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      {/* Left Navigation Button - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block absolute left-[-80px] top-1/2 transform -translate-y-1/2">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />
      </div>

      {/* Right Navigation Button - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block absolute right-[-80px] top-1/2 transform -translate-y-1/2">
        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>

      {/* Mobile Navigation Buttons - Visible only on mobile */}
      <div className="md:hidden absolute inset-0 flex items-center justify-between px-4 z-20">
        <button
          onClick={handlePreviousClick}
          className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 border-2 border-white/20 hover:border-white/40 rounded-full focus:outline-none transition duration-200 backdrop-blur-sm"
          title="Previous slide"
        >
          <FaChevronRight className="text-white w-5 h-5 rotate-180" />
        </button>
        <button
          onClick={handleNextClick}
          className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 border-2 border-white/20 hover:border-white/40 rounded-full focus:outline-none transition duration-200 backdrop-blur-sm"
          title="Next slide"
        >
          <FaChevronRight className="text-white w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        {mediaItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
              current === index ? "bg-white" : "bg-white/30"
            }`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
