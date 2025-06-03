"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  mode?: "single" | "multi";
  weight?: string;
  size?: string;
  space?: boolean;
}

const Animated_text = ({
  text,
  mode = "single",
  weight = "font-bold",
  size = "text-4xl",
  space = false,
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Split text into words
  const words = text.split(" ");

  // Animation variants for words
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Animation variants for characters
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // For multi-line text with colorful gradients
  if (mode === "multi") {
    return (
      <AnimatePresence>
        {isVisible && (
          <h1 className={`${size} ${weight} leading-tight`}>
            <div className="flex flex-wrap">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className={`inline-block ${space ? "mr-2 mb-2" : ""}`}
                >
                  <span
                    className={
                      index % 3 === 0
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
                        : index % 3 === 1
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-500"
                        : "bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
                    }
                  >
                    {word}
                  </span>
                </motion.span>
              ))}
            </div>
          </h1>
        )}
      </AnimatePresence>
    );
  }

  // For single-line text with character-by-character animation
  return (
    <AnimatePresence>
      {isVisible && (
        <h1 className={`${size} ${weight}`}>
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={charVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
      )}
    </AnimatePresence>
  );
};

export default Animated_text;
