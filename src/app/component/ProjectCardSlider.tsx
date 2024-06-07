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
    if (window.innerWidth <= 100) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };
  const { ref: cardsRef, inView: cardInView } = useInView({
    threshold: 0.4,
  });

  let x = ["#E94772", "#5a87c5", "#219f89"];
  return (
    <div
      onMouseDown={handleMouseDown}
      className="  mx-auto sm:mx-0   h-[600px]  overflow-hidden sm:block "
      {...handlers}
    >
      {/* <div className="text-2xl sm:text-3xl sm:ml-20 mt-10 mb-4 sm:mb-0 font-bold">
        What client says
        </div> */}
      <div ref={cardsRef}>
        <div
          className="flex  transition-transform duration-500 gap-6"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {response &&
            response.map((project: any, index: number) => (
              <div
                key={index}
                className="rounded-lg relative min-w-full sm:min-w-[300px] h-[600px] overflow-hidden "
              >
                <div
                  className={`absolute twosec top-[-80px] rounded-[50%]    ${
                    cardInView
                      ? "bg" + index + " w-[500px] h-[400px] left-[-47px]  "
                      : "w-[0px] h-[0px]"
                  }`}
                ></div>

                <Link
                  href={"./work/" + project.id}
                  className="absolute min-w-full "
                >
                  {/*  */}
                  <div className=" ">
                    <div
                      id="xx"
                      className={` ${
                        cardInView
                          ? "card" + (Number(index) + 1) + "inview"
                          : ""
                      } rounded-xl ${"card" + (Number(index) + 1)}  `}
                    >
                      <div className="p-2  pl-0 flex flex-col items-center justify-center bottom-2 border-black">
                        <h1 className="  text-lg sm:text-2xl font-bold text-center ">
                          {project.projectCompanyName}
                        </h1>
                        <div className="text-sm flex flex-row justify-center pl-4 ">
                          Optimized the effortless on-the-go lifestyle
                        </div>
                      </div>
                      <div className="  rounded-lg relative h-[500px]  ">
                        <Image
                          src={project.thumbnail}
                          alt="BMW X1"
                          className="object-fill h-full   mb-2 rounded-b-xl "
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
