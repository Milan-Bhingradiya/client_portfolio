"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface TiltedCardProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

export default function TiltedCard({
  imageSrc,
  title,
  subtitle,
  captionText,
  containerHeight = "400px",
  containerWidth = "100%",
  imageHeight = "400px",
  imageWidth = "100%",
  scaleOnHover = 1.05,
  rotateAmplitude = 14,
  showTooltip = false,
  overlayContent,
  displayOverlayContent = true,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const percentX = mouseX / (rect.width / 2);
    const percentY = mouseY / (rect.height / 2);

    setRotateX(-percentY * rotateAmplitude);
    setRotateY(percentX * rotateAmplitude);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer"
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? scaleOnHover : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Image container */}
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ height: imageHeight, width: imageWidth }}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? "opacity-80" : "opacity-60"
            }`}
            style={{
              background: `linear-gradient(
                180deg,
                transparent 0%,
                transparent 40%,
                rgba(0,0,0,0.4) 60%,
                rgba(0,0,0,0.95) 100%
              )`,
            }}
          />

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                ${105 + rotateY * 2}deg,
                transparent 40%,
                rgba(255,255,255,0.1) 45%,
                rgba(255,255,255,0.2) 50%,
                rgba(255,255,255,0.1) 55%,
                transparent 60%
              )`,
            }}
          />

          {/* Content overlay */}
          {displayOverlayContent && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
              style={{ transform: "translateZ(60px)" }}
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
            >
              {captionText && (
                <motion.span
                  className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/20 backdrop-blur-sm text-white/90"
                  animate={{
                    y: isHovered ? 0 : 5,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {captionText}
                </motion.span>
              )}

              <motion.h3
                className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg"
                animate={{
                  y: isHovered ? 0 : 5,
                }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.h3>

              {subtitle && (
                <motion.p
                  className="text-white/80 text-sm md:text-base line-clamp-2"
                  animate={{
                    y: isHovered ? 0 : 10,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  {subtitle}
                </motion.p>
              )}

              {overlayContent}
            </motion.div>
          )}

          {/* Tooltip */}
          {showTooltip && isHovered && (
            <motion.div
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-black text-xs font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              View Project →
            </motion.div>
          )}
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-1 rounded-3xl -z-10"
          animate={{
            opacity: isHovered ? 0.4 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(
              ellipse at center,
              rgba(139, 92, 246, 0.5) 0%,
              rgba(59, 130, 246, 0.3) 50%,
              transparent 70%
            )`,
            filter: "blur(20px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
