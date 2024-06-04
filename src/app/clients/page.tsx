"use client";
import React from "react";
import Animated_text from "../component/Animated_text";
import { Player } from "@lottiefiles/react-lottie-player";
import client from "../../../public/client.json";
import { motion } from "framer-motion";
import one from "../../../public/1.png";
import two from "../../../public/2.png";
import three from "../../../public/3.png";
import four from "../../../public/4.png";
import five from "../../../public/5.png";
import six from "../../../public/6.png";
import seven from "../../../public/7.png";
import eight from "../../../public/8.png";
import nine from "../../../public/9.png";
import ten from "../../../public/10.png";
import eleven from "../../../public/11.png";
import twelve from "../../../public/12.png";
import thirteen from "../../../public/13.png";
import fourteen from "../../../public/14.png";
import fifteen from "../../../public/15.png";

import Image from "next/image";
import ReviewCard from "./component/ReviewCard";

const img = [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
  fourteen,
  fifteen,
];
function page() {
  return (
    <div className="flex flex-col justify-center items-center  ">
      <div className="  w-[70%]  my-10">
        <Animated_text
          text={
            "We make happy clients by interconnecting technology with business & art."
          }
          mode={"multi"}
          weight={"font-extrabold"}
          size={" text-2xl sm:text-3xl"}
          space={true}
        ></Animated_text>
      </div>

      <div className="hidden sm:block h-1/4 w-1/4 m-4 sm:m-10  ">
        <Player src={client} className="player" loop autoplay />
      </div>

      <div className="  w-[70%] ">
        <Animated_text
          text={"Our clients"}
          mode={"multi"}
          weight={"font-extrabold"}
          size={"text-2xl sm:text-3xl"}
          space={true}
        ></Animated_text>
      </div>

      <div className="grid grid-cols-3  md:grid-cols-5 gap-8 md:gap-16 lg:gap-24 m-10 ">
        {img.map((imgg, index) => (
          <motion.div key={index} whileHover={{ scale: 1.2 }}>
            <Image src={imgg} alt="ms" width={60} height={80}></Image>
          </motion.div>
        ))}
      </div>

      <div className="w-[80%]  sm:w-[50%] my-10">
        <Animated_text
          text={"Happy clients with 760+ successful Projects"}
          mode={"multi"}
          weight={"font-extrabold"}
          size={"text-2xl sm:text-3xl"}
          space={true}
        ></Animated_text>
      </div>

      <ReviewCard></ReviewCard>
    </div>
  );
}

export default page;
