"use client";

import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const ProjectCardSlider = ({ response }: { response: any }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const handleSwipe = (direction) => {
    if (direction === "LEFT") {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % response.length);
    } else if (direction === "RIGHT") {
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + response.length) % response.length
      );
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("LEFT"),
    onSwipedRight: () => handleSwipe("RIGHT"),
  });

  const handleMouseDown = (event) => {
    event.preventDefault();
    const startX = event.clientX;

    const handleMouseMove = (moveEvent) => {
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
    if (window.innerWidth <= 100) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };
  const { ref: cardsRef, inView: cardInView } = useInView({
    threshold: 0.3,
  });
  return (
    <div
      onMouseDown={handleMouseDown}
      className="  mx-auto sm:mx-0 overflow-hidden relative sm:flex"
      {...handlers}
    >
      {/* <div className="text-2xl sm:text-3xl sm:ml-20 mt-10 mb-4 sm:mb-0 font-bold">
        What client says
      </div> */}
      <div
        className="flex transition-transform duration-500 gap-4"
        style={{ transform: `translateX(-${currentSlide * 111}%)` }}
      >
        {response &&
          response.map((project: any, index: number) => (
            <div key={index} className="  min-w-full sm:min-w-[300px] ">
              <Link href={"./work/" + project.id} className="">
                {/*  */}
                <div className=" ">
                  <div
                    id="xx"
                    className={` ${
                      cardInView ? "card" + (Number(index) + 1) + "inview" : ""
                    } rounded-xl ${"card" + (Number(index) + 1)}  `}
                  >
                    <div className="p-4 pl-0 flex flex-col items-center justify-center bottom-2 border-black">
                      <h1 className="text-2xl font-bold text-center mb-4">
                        {project.projectCompanyName}
                      </h1>
                      <p className="text-center mb-8">
                        Optimized the effortless on-the-go lifestyle
                      </p>
                      <div className="flex justify-center space-x-4 ">
                        <span className="text-gray-600">UX-UI</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-600">Web</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-gray-600">Mobile</span>
                      </div>
                    </div>
                    <div className="  rounded-lg  h-[500px] ">
                      <Image
                        src={project.thumbnail}
                        alt="BMW X1"
                        className="w-full h-full  object-cover mb-2 rounded-b-xl "
                        width={300}
                        height={550}
                      />
                    </div>
                  </div>
                </div>
                {/*  */}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectCardSlider;
