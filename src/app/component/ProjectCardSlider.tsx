"use client";

import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const ProjectCardSlider = ({ response }: { response: any }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleSwipe = (direction: any) => {
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

  const handleMouseDown = (event: any) => {
    if (typeof window === "undefined") return;
    event.preventDefault();
    const startX = event.clientX;

    const handleMouseMove = (moveEvent: any) => {
      const deltaX = moveEvent.clientX - startX;
      if (Math.abs(deltaX) > 50) {
        handleSwipe(deltaX > 0 ? "RIGHT" : "LEFT");
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    if (window.innerWidth <= 100) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
  };
  const { ref: cardsRef, inView: cardInView } = useInView({
    threshold: 0.4,
  });

  return (
    <div
      onMouseDown={handleMouseDown}
      className="  mx-auto sm:mx-0   h-[700px]  overflow-hidden sm:block "
      {...handlers}
    >
      {/* <div className="text-2xl sm:text-3xl sm:ml-20 mt-10 mb-4 sm:mb-0 font-bold">
        What client says
        </div> */}
      <div ref={cardsRef}>
        <div
          className="flex   transition-transform duration-500  gap-4"
          style={{ transform: `translateX(-${currentSlide * 105}%)` }}
        >
          {response &&
            response.map((project: any, index: number) => (
              <div
                key={index}
                className="rounded-lg  min-w-full sm:min-w-[350px]  border-2 border-gray-200 overflow-hidden "
              >
                <Link href={"./work/" + project.id} className="  ">
                  {/*  */}
                  <div className=" ">
                    <div
                      className={` 
                      rounded-xl  `}
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
                      <div className="  rounded-lg relative w-[350px] h-[500px]  ">
                        <Image
                          src={project.thumbnail}
                          alt="BMW X1"
                          className="object-fill h-full  p-2 mb-2 rounded-b-xl "
                          layout="fill"
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
    </div>
  );
};

export default ProjectCardSlider;
