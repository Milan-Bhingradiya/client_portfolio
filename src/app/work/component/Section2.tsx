import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Animated_text from "../../component/Animated_text";

import design from "../../../../public/design_loti.json";
import technology from "../../../../public/technology.json";
import business from "../../../../public/business.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { mystore } from "@/app/store/mystore";

function Section2({
  designRef,
  technologyRef,
  businessRef,
  designPointRef,
  technologyPointRef,
  businessPointRef,
}: any) {
  // console.log("useEffect");

  const setballShouldFollow = mystore(
    (state: any) => state.setballShouldFollow
  );
  const setBallSize = mystore((state: any) => state.setballSize);
  const ballShouldFollow = mystore((state: any) => state.ballShouldFollow);
  const setballVisible = mystore((state: any) => state.setballVisible);
  const setstaticTitleBallVisible = mystore(
    (state: any) => state.setstaticTitleBallVisible
  );

  const [showSubText, setshowSubText] = useState(false);
  const [showTechnology, setshowTechnology] = useState(false);
  const [showBusiness, setshowBusiness] = useState(false);

  const [showImg, setshowImg] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(0);

  const [imgIndex, setimgIndex] = useState(0);

  const images = [design, technology, business];

  const staticTitleBallVisible = mystore(
    (state: any) => state.staticTitleBallVisible
  );

  const arr = [
    " UI Design ",
    " UX Consultancy ",
    " Design System ",
    " Animation ",
    " Illustrations",
  ];
  useEffect(() => {
    // console.log("useEffect");

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight; // Get window height

      if (designRef.current) {
        const rect = designRef.current.getBoundingClientRect();
        const isScrollingDown = currentScrollY > lastScrollY;

        if (isScrollingDown && rect.top <= 200) {
          setshowImg(true);

          setstaticTitleBallVisible(true);
          //imp
          // if (ballShouldFollow === "kpi") {
          //     setballShouldFollow("titles")
          //     setBallSize({ height: 50, width: 50 })
          //     setstaticTitleBallVisible(true);
          // }
        }

        // ball animation start karo...
        if (isScrollingDown && rect.top <= 250 && rect.top >= 0) {
          setballVisible(true);
        }

        if (isScrollingDown && rect.top <= windowHeight / 2 && rect.top >= 0) {
          setshowSubText(true);

          setimgIndex(0);
        } else if (!isScrollingDown && rect.top >= 200) {
          setshowImg(false);
          setshowSubText(false);
        }

        // if (!isScrollingDown && rect.top < 300 && rect.top >= 0) {
        //     if (ballShouldFollow === "titles") {
        //         setBallSize({ height: 100, width: 100 })
        //         setballShouldFollow("kpi")
        //         setstaticTitleBallVisible(false)

        //     }
        // }
        setLastScrollY(currentScrollY);
      }

      if (technologyRef.current) {
        const rect = technologyRef.current.getBoundingClientRect();
        const isScrollingDown = currentScrollY > lastScrollY;

        if (isScrollingDown && rect.top <= windowHeight / 2 && rect.top >= 0) {
          setshowTechnology(true);

          setimgIndex(1);
        } else if (
          !isScrollingDown &&
          rect.top >= 200 &&
          rect.top < window.innerHeight
        ) {
          setimgIndex(0);

          setshowTechnology(false);
        }
        setLastScrollY(currentScrollY);
      }

      if (businessRef.current) {
        const rect = businessRef.current.getBoundingClientRect();
        const isScrollingDown = currentScrollY > lastScrollY;

        if (isScrollingDown && rect.top <= 1) {
          setshowImg(false);
        }

        if (isScrollingDown && rect.top <= windowHeight / 2 && rect.top >= 0) {
          setimgIndex(2);

          setshowBusiness(true);
        } else if (
          !isScrollingDown &&
          rect.top >= 200 &&
          rect.top < window.innerHeight
        ) {
          setimgIndex(1);

          setshowBusiness(false);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="">
      {/* 11----------------------------------------------------------------------------------- */}
      <div className=" flex flex-row    mt-10   sm:px-28 ">
        <div
          className={`flex flex-col w-[100%] sm:w-[50%]    ${
            showSubText ? "sm:m-10" : "sm:m-4"
          } `}
        >
          <div
            ref={designRef}
            className=" text-4xl sm:text-5xl superBold flex flex-row"
          >
            {/* <div ref={designPointRef} className={`${staticTitleBallVisible ? '' : 'opacity-0'} rounded-[50%] h-[50px] w-[50px] m-2 ${true ? "bg-red-300" : ""}`}> { }</div> */}
            <div
              className={`border-dotted animate-spin  border-red-800 border-4 rounded-[50%] p-3 m-4  `}
            >
              <div className={`h-10 w-10 rounded-[50%] bg-red-300`}></div>
            </div>

            <div className="flex flex-row justify-center items-center">
              Design
            </div>
          </div>

          <ul
            className={`list-disc mt-10 ml-12 space-y-2 h-[50vh] sm:h-[80vh] expandable ${
              showSubText ? "show" : ""
            }`}
          >
            {showSubText && (
              <Animated_text
                text={
                  " UI Design | UX Consultancy | Design System | Animation | Illustrations"
                }
                mode={"multi"}
                weight={"  "}
                size={" text-[25px]"}
                space={true}
              ></Animated_text>
            )}
          </ul>
        </div>
      </div>

      {/* ----------------------------------------------------------------------------------- */}

      {/*22 ----------------------------------------------------------------------------------- */}
      <div className="flex flex-row    sm:px-28">
        <div
          className={`flex flex-col w-[100%] sm:w-[50%]    ${
            showTechnology ? "sm:m-10" : "sm:m-4"
          } `}
        >
          <div
            ref={technologyRef}
            className="text-4xl sm:text-5xl superBold mt-6 flex flex-row"
          >
            {/* <div ref={technologyPointRef} className={`${staticTitleBallVisible ? '' : 'opacity-0'} rounded-[50%] h-[50px] w-[50px] m-2 ${true ? "bg-blue-300" : ""}`}> { }</div> */}

            <div
              className={`border-dotted animate-spin  border-blue-800 border-4 rounded-[50%] p-3 m-4  `}
            >
              <div className={`h-10 w-10 rounded-[50%] bg-blue-300`}></div>
            </div>
            <div className="flex flex-row justify-center items-center">
              Technology
            </div>
          </div>

          <ul
            className={`list-disc space-y-2 mt-10 ml-12 h-[50vh]  sm:h-[80vh] expandable ${
              showTechnology ? "show" : ""
            }`}
          >
            {showTechnology && (
              <Animated_text
                text={
                  "    web Design | Softwares (Custom Software Development) | Mobile Apps | Web Apps | Front-End Development | Back-End Development"
                }
                mode={"multi"}
                weight={"ont-extrabold  "}
                size={"text-lg sm:text-[25px]"}
                space={true}
              ></Animated_text>
            )}
          </ul>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------------- */}

      {/* 33----------------------------------------------------------------------------------- */}
      <div className="flex flex-row sm:px-28">
        <div
          className={`flex flex-col w-[100%] sm:w-[50%]    ${
            showBusiness ? "sm:m-10" : "sm:m-4"
          } `}
        >
          <div
            ref={businessRef}
            className="text-4xl sm:text-5xl superBold mt-6 flex flex-row"
          >
            {/* <div ref={businessPointRef} className={` ${staticTitleBallVisible ? '' : 'opacity-0'} rounded-[50%] h-[50px] w-[50px] m-2 ${true ? "bg-green-300" : ""}`}> { }</div> */}

            <div
              className={`border-dotted animate-spin  border-green-800 border-4 rounded-[50%] p-3 m-4  `}
            >
              <div className={`h-10 w-10 rounded-[50%] bg-green-300`}></div>
            </div>

            <div className="flex flex-row justify-center items-center">
              {/* before it was busniness */}
              Maketing
            </div>
          </div>
          <ul
            className={`list-disc space-y-2 h-[30vh] mt-10 ml-12 sm:h-[60vh] expandable ${
              showBusiness ? "show" : ""
            }`}
          >
            {showBusiness && (
              <Animated_text
                text={
                  "Branding Strategy | Brand Name Development | Brand Guidelines Creation | Digital Marketing Services | SEO (Search Engine Optimization)"
                }
                mode={"multi"}
                // weight={"font-extrabold"}
                size={"text-lg sm:text-[25px]"}
                space={true}
              />
            )}
          </ul>
        </div>
      </div>

      {showImg && (
        <motion.div className=" hidden md:block md:fixed top-[50px] right-[200px]  z-10 h-1/4   flex-row justify-center  m-10">
          <div className="block h-1/4 w-[280px]  m-10">
            <Player
              // src='https://lottie.host/6ee4d5fc-4a27-4f56-96c2-40c5c0440fbf/jvysS84Gc9.json'
              // src='https://lottie.host/3dac4db4-374a-48d1-a3e2-e705001a512e/FA8Be7ZiIf.json'
              src={images[imgIndex]}
              className="player"
              loop
              autoplay
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Section2;
