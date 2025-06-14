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
  const names = [
    "John",
    "Jane",
    "Bob",
    "Alice",
    "Tom",
    "Lisa",
    "Mark",
    "Susan",
    "Paul",
    "Kate",
  ];

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
        const isScrollingUp = currentScrollY < lastScrollY;

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
          rect.top >= 100 &&
          rect.top < window.innerHeight
        ) {
          setimgIndex(1);

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
          console.log("xxxxx");
          setimgIndex(2);
          setshowImg(true);
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

  const designtext = [
    "UI Design",
    "UX Consultancy",
    "Design System",
    "Animation",
    "Illustrations",
  ];
  const technologytext = [
    "Web Design",
    "Softwares (Custom Software Development)",
    "Mobile Apps",
    "Web Apps",
    "Front-End Development",
    "Back-End Development",
  ];
  const businesstext = [
    "Branding Strategy",
    "Brand Name Development",
    "Brand Guidelines Creation",
    "Digital Marketing Services",
    "SEO (Search Engine Optimization)",
  ];

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    const listItems = document.querySelectorAll("#design-list li");
    const firstPlayer = document.getElementById("firstPlayer");

    if (showSubText) {
      listItems.forEach((item, index) => {
        const timeoutId = setTimeout(() => {
          item.classList.add("show-right");
        }, index * 200); // Adjust the delay as needed
        timeoutIds.push(timeoutId);
      });
      if (firstPlayer != null) {
        setTimeout(() => {
          firstPlayer.classList.add("show-right");
        }, 100); // Adjust the delay as needed
      }
    } else {
      // Clear timeouts and remove the class if hiding
      timeoutIds.forEach((id) => clearTimeout(id));
      listItems.forEach((item) => item.classList.remove("show-right"));
      firstPlayer!.classList.remove("show-right");
    }

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [showSubText]);

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    const listItems = document.querySelectorAll("#technology-list li");
    const secondPlayer = document.getElementById("secondPlayer");
    if (showTechnology) {
      listItems.forEach((item, index) => {
        const timeoutId = setTimeout(() => {
          item.classList.add("show-right");
        }, index * 200); // Adjust the delay as needed
        timeoutIds.push(timeoutId);
      });
      if (secondPlayer != null) {
        setTimeout(() => {
          secondPlayer.classList.add("show-right");
        }, 100); // Adjust the delay as needed
      }
    } else {
      // Clear timeouts and remove the class if hiding
      timeoutIds.forEach((id) => clearTimeout(id));
      listItems.forEach((item) => item.classList.remove("show-right"));
      secondPlayer!.classList.remove("show-right");
    }

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [showTechnology]);

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    const listItems = document.querySelectorAll("#marketing-list li");
    const thirdPlayer = document.getElementById("thirdPlayer");
    if (showBusiness) {
      listItems.forEach((item, index) => {
        const timeoutId = setTimeout(() => {
          item.classList.add("show-right");
        }, index * 200); // Adjust the delay as needed
        timeoutIds.push(timeoutId);
      });
      if (thirdPlayer != null) {
        setTimeout(() => {
          thirdPlayer.classList.add("show-right");
        }, 100); // Adjust the delay as needed
      }
    } else {
      // Clear timeouts and remove the class if hiding
      timeoutIds.forEach((id) => clearTimeout(id));
      listItems.forEach((item) => item.classList.remove("show-right"));
      thirdPlayer!.classList.remove("show-right");
    }

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [showBusiness]);

  return (
    <div className="">
      {/* 11----------------------------------------------------------------------------------- */}
      <div className="flex flex-row mt-10 mb-0 sm:px-36">
        <div
          className={`flex flex-col w-[100%] sm:w-[50%] ${
            showSubText ? "sm:m-10" : "sm:m-4"
          }`}
        >
          <div
            ref={designRef}
            className=" text-4xl sm:text-5xl superBold flex flex-row"
          >
            <div
              className={`border-dotted animate-spin  border-red-300 border-2 rounded-[50%] p-1 sm:p-2 m-4  `}
            >
              <div
                className={`h-6 w-6 sm:h-8 sm:w-8 rounded-[50%] bg-red-300`}
              ></div>
            </div>

            <div className="flex flex-row justify-center items-center">
              Design
            </div>
          </div>
          {/* Mobile: image first, then list. Desktop: list then image */}
          <div className="block sm:hidden">
            <div
              id="firstPlayer"
              className="notshow-left h-[300px] w-[280px] m-10"
            >
              <Player src={images[0]} className="player" loop autoplay />
            </div>
            <ul
              id="design-list"
              className="design mt-4 ml-12 space-y-2 h-[30vh] sm:h-[80vh]"
            >
              {designtext.map((name, index) => (
                <li className="notshow-left text-xl" key={index}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden sm:block">
            <ul
              id="design-list"
              className="design mt-10 ml-12 space-y-2 h-[30vh] sm:h-[80vh]"
            >
              {designtext.map((name, index) => (
                <li className="notshow-left text-xl" key={index}>
                  {name}
                </li>
              ))}
            </ul>
            <div
              id="firstPlayer"
              className="notshow-left h-[300px] w-[280px] m-10"
            >
              <Player src={images[0]} className="player" loop autoplay />
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------------------- */}

      {/*22 ----------------------------------------------------------------------------------- */}
      <div className="flex flex-row sm:px-36">
        <div
          className={`flex flex-col w-[100%] sm:w-[50%] ${
            showTechnology ? "sm:m-10" : "sm:m-4"
          }`}
        >
          <div
            ref={technologyRef}
            className="text-4xl sm:text-5xl superBold mt-6 flex flex-row"
          >
            <div
              className={`border-dotted animate-spin  border-blue-300 border-2 rounded-[50%] p-1 sm:p-2 m-4  `}
            >
              <div
                className={`h-6 w-6 sm:h-8 sm:w-8 rounded-[50%] bg-blue-300`}
              ></div>
            </div>
            <div className="flex flex-row justify-center items-center">
              Technology
            </div>
          </div>
          {/* Mobile: image first, then list. Desktop: list then image */}
          <div className="block sm:hidden">
            <div
              id="secondPlayer"
              className="notshow-left h-[300px] w-[280px] m-10"
            >
              <Player src={images[1]} className="player" loop autoplay />
            </div>
            <ul
              id="technology-list"
              className="mt-4 ml-12 space-y-2 h-[30vh] sm:h-[80vh]"
            >
              {technologytext.map((name, index) => (
                <li className="notshow-left text-xl" key={index}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden sm:block">
            <ul
              id="technology-list"
              className="mt-10 ml-12 space-y-2  h-[30vh] sm:h-[80vh]"
            >
              {technologytext.map((name, index) => (
                <li className="notshow-left text-xl" key={index}>
                  {name}
                </li>
              ))}
            </ul>
            <div
              id="secondPlayer"
              className="notshow-left h-[300px] w-[280px] m-10"
            >
              <Player src={images[1]} className="player" loop autoplay />
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------------- */}

      {/* 33----------------------------------------------------------------------------------- */}
      <div className="flex flex-row sm:px-36">
        <div
          className={`flex flex-col w-[100%] sm:w-[50%] ${
            showBusiness ? "sm:m-10" : "sm:m-4"
          }`}
        >
          <div
            ref={businessRef}
            className="text-4xl sm:text-5xl superBold mt-6 flex flex-row"
          >
            <div
              className={`border-dotted animate-spin  border-green-300 border-2 rounded-[50%] p-1 sm:p-2 m-4  `}
            >
              <div
                className={`h-6 w-6 sm:h-8 sm:w-8 rounded-[50%] bg-green-300`}
              ></div>
            </div>

            <div className="flex flex-row justify-center items-center">
              {/* before it was busniness */}
              Maketing
            </div>
          </div>
          {/* Mobile: image first, then list. Desktop: list then image */}
          <div className="block sm:hidden">
            <div
              id="thirdPlayer"
              className="notshow-left h-[300px] w-[280px] m-10"
            >
              <Player src={images[2]} className="player" loop autoplay />
            </div>
            <ul
              id="marketing-list"
              className="mt-4 ml-12 space-y-2 h-[30vh] sm:h-[80vh]"
            >
              {businesstext.map((name, index) => (
                <li className="notshow-left text-xl" key={index}>
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden sm:block">
            <ul
              id="marketing-list"
              className="mt-10 ml-12 space-y-2  h-[30vh] sm:h-[80vh]"
            >
              {businesstext.map((name, index) => (
                <li className="notshow-left text-xl" key={index}>
                  {name}
                </li>
              ))}
            </ul>
            <div
              id="thirdPlayer"
              className="notshow-left h-[300px] w-[280px] m-10"
            >
              <Player src={images[2]} className="player " loop autoplay />
            </div>
          </div>
        </div>
      </div>

      {showImg && (
        <motion.div className=" hidden md:block md:fixed top-[50px] right-[200px]  z-10 h-1/4   flex-row justify-center  m-10">
          <div className="block h-1/4 w-[280px]  m-10">
            <Player src={images[imgIndex]} className="player" loop autoplay />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Section2;
