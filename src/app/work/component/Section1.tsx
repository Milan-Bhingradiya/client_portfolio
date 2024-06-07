import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import triangle from "../../../../public/triangle.json";
import one from "../../../../public/1.png";
import two from "../../../../public/2.png";
import three from "../../../../public/3.png";
import four from "../../../../public/4.png";
import five from "../../../../public/5.png";
import Animated_text from "../../component/Animated_text";
import { motion } from "framer-motion";
import Image from "next/image";
function Section1() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center sm:flex-row  ">
        {/* section one */}

        <div className="mt-10 h-1/2 w-1/2 sm:h-1/3 sm:w-1/3 ">
          <Player
            // src='https://lottie.host/bc9da579-94ae-4970-a4e9-06f11848e96f/Vv6ttESKhP.json'
            src={triangle}
            className="player"
            loop
            autoplay
          />
        </div>

        <div className="flex flex-col mt-10 justify-center superBold">
          <div>
            <Animated_text
              text={"Ideate | Connect | Automate"}
              mode="single"
              weight="superBold"
              size={"text-4xl sm:text-5xl "}
              space={false}
            >
              {" "}
            </Animated_text>
          </div>

          <div className="my-6   sm:my-8 ">
            <Animated_text
              text={"We Help You Reach From Zero To Millions."}
              mode={"multi"}
              weight={"font-normal"}
              size={" text-lg sm:text-lg"}
              space={true}
            ></Animated_text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
