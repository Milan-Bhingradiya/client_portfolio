import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import Testimonial from "./Testimonial";
import review1 from "../../../public/review1.jpeg";
import review2 from "../../../public/review2.jpeg";
import review3 from "../../../public/review3.jpeg";
import review4 from "../../../public/review4.jpeg";
import review5 from "../../../public/review5.jpeg";

const testimonials = [
  {
    image: review1,
    name: "Sandip ",
    title: "C.E.O. - Investica",
    text: "Leo9 Studio is one of the few Design agencies that understand the financial services industry's inner workings. They're an incredible agency that \"knows it\". The team Leo9 is killing it and bringing UI/UX Designs to the forefront of a whole industry's digital transformation.",
    rating: 5,
  },
  {
    image: review2,
    name: "Bhavi Patel",
    title: "C.T.O. - FinTech Inc.",
    text: "The team at Leo9 Studio is fantastic. They really understand the nuances of the fintech space and have helped us significantly improve our user interface and overall user experience.",
    rating: 5,
  },
  {
    image: review3,
    name: "Bikash Garabadu",
    title: "C.E.O. - Investica",
    text: "Leo9 Studio is one of the few Design agencies that understand the financial services industry's inner workings. They're an incredible agency that \"knows it\". The team Leo9 is killing it and bringing UI/UX Designs to the forefront of a whole industry's digital transformation.",
    rating: 5,
  },
  {
    image: review4,
    name: "Sudheesh K",
    title: "C.T.O. - FinTech Inc.",
    text: "The team at Leo9 Studio is fantastic. They really understand the nuances of the fintech space and have helped us significantly improve our user interface and overall user experience.",
    rating: 5,
  },
  {
    image: review5,
    name: "unknown",
    title: "C.E.O. - Investica",
    text: "Leo9 Studio is one of the few Design agencies that understand the financial services industry's inner workings. They're an incredible agency that \"knows it\". The team Leo9 is killing it and bringing UI/UX Designs to the forefront of a whole industry's digital transformation.",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleSwipe = (direction: any) => {
    if (direction === "LEFT") {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
    } else if (direction === "RIGHT") {
      setCurrentSlide(
        (prevSlide) =>
          (prevSlide - 1 + testimonials.length) % testimonials.length
      );
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
  });

  const handleMouseDown = (event: any) => {
    event.preventDefault();
    const startX = event.clientX;

    const handleMouseMove = (moveEvent: any) => {
      const deltaX = moveEvent.clientX - startX;
      if (Math.abs(deltaX) > 50) {
        handleSwipe(deltaX > 0 ? "RIGHT" : "LEFT");
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className="   mx-auto overflow-hidden relative mb-32  "
      {...handlers}
    >
      {/* <div className="text-2xl sm:text-3xl sm:ml-20 mt-10 mb-4 sm:mb-10 font-bold">
        What client says
      </div> */}

      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} data={testimonials[index]}></Testimonial>
        ))}
      </div>
      <div className="flex justify-center m-2 mb-10">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full mx-1 cursor-pointer ${
              currentSlide === index ? "bg-red-500" : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
