"use client"

import Image from "next/image";
import { Player } from '@lottiefiles/react-lottie-player';
import { Typography } from "@mui/material";
import one from '../../public/1.png'
import two from '../../public/2.png'
import three from '../../public/3.svg'
import four from '../../public/4.png'
import five from '../../public/5.svg'
import Card from "./component/Card";
import Foundercard from "./component/Foundercard";
import Review from "./component/Review";
import Sidebar from "./component/SIdebar";
import { motion } from "framer-motion";
import Animated_text from "./component/Animated_text";
import connectDB from "./api/utility/connectDB";
import useConnect from "./api/utility/useConnect";

export default function Home() {

  //   const isConnected = useConnect();

  // if (!isConnected) {
  //   return <div>Connecting to database...</div>;
  // }
  return (
    <div>
      {/* part 1 before footer all ting in this with mx-10 */}
      <div className=" mx-5 sm:mx-20 md:mx-26 lg:mx-32 " >
        <div className="flex flex-col justify-center items-center sm:flex-row  ">
          {/* section one */}

          <div className="mt-10 h-1/2 w-1/2 sm:h-1/3 sm:w-1/3 ">
            <Player
              src='https://lottie.host/bc9da579-94ae-4970-a4e9-06f11848e96f/Vv6ttESKhP.json'
              className="player"
              loop
              autoplay

            />  
          </div>

          <div className="flex flex-col mt-10 justify-center superBold">

            <div >

              <Animated_text text={"Design | Transform | Accelerate"} mode="single" weight="superBold" size={'text-4xl sm:text-5xl '} space={false}> </Animated_text>
            </div>


            <div className="h-4"></div>




            <Animated_text text={"We Revolutionize User Experience |  Using Behavioural Science."} mode={"multi"} weight={"font-extrabold"} size={' text-lg sm:text-2xl'} space={true}></Animated_text>

          </div>
        </div>

        <div className="flex flex-row justify-center gap-8 md:gap-16 lg:gap-24 m-10 ">
          <motion.div whileHover={{ scale: 1.2 }} >
            <Image src={one} alt="ms" width={60} height={80}></Image>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} >
            <Image src={two} alt="ms" width={60} height={80}></Image>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} >
            <Image src={three} alt="ms" width={60} height={80}></Image>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} >
            <Image className="hidden sm:block" src={four} alt="ms" width={60} height={80}></Image>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} >
            <Image className="hidden sm:block" src={five} alt="ms" width={60} height={80}></Image>
          </motion.div>


        </div>




        <div className="mx-6 sm:mx-20 mt-20 " >
          <Animated_text text={" We are a global creative agency that combines design expertise with technology and intelligence."} mode={"multi"} weight={"ont-extrabold  "} size={' text-lg sm:text-2xl'} space={true}></Animated_text>
        </div>


        <div className="flex flex-row   justify-evenly">


          <div className="flex flex-col  m-10">
            <div className="text-3xl superBold">
              Design
            </div>

            <ul className="list-disc space-y-2 mx-10 m-2">
            <Animated_text text={"    UI Design | UX Consultancy | Design System | Animation | Illustrations"} mode={"multi"} weight={"ont-extrabold  "} size={' text-lg'} space={true}></Animated_text>
      
              {/* <li>
                UI Design</li>
              <li>UX Consultancy
              </li>
              <li>
                Design System</li>
              <li>
                Design System</li>
              <li>
                Animation</li>
              <li>
                Illustrations</li> */}
            </ul>




            <div className="text-3xl superBold mt-6">
              Technology
            </div>
            <ul className="list-disc space-y-2 mx-10 m-2">
            <Animated_text text={"    web Design | Softwares (Custom Software Development) | Mobile Apps | Web Apps | Front-End Development | Back-End Development"} mode={"multi"} weight={"ont-extrabold  "} size={' text-lg'} space={true}></Animated_text>
      
              {/* <li>Web Design</li>
              <li>Softwares (Custom Software Development)</li>
              <li>Mobile Apps</li>
              <li>Web Apps</li>
              <li>Front-End Development</li>
              <li>Back-End Development</li> */}
            </ul>


            <div className="text-3xl superBold mt-6 m-2">
              Businees
            </div>
            <ul className="list-disc space-y-2 mx-10">
            <Animated_text text={"   Branding Strategy | Brand Name Development | Brand Guidelines Creation | Digital Marketing Services | SEO (Search Engine Optimization)"} mode={"multi"} weight={"ont-extrabold  "} size={' text-lg'} space={true}></Animated_text>
      
              {/* <li>Branding Strategy</li>
              <li>Brand Name Development</li>
              <li>Brand Guidelines Creation</li>
              <li>Digital Marketing Services</li>
              <li>SEO (Search Engine Optimization)</li> */}
            </ul>
          </div>



          <div className="hidden sm:block h-1/3 w-1/3  m-10">
            <Player
              // src='https://lottie.host/6ee4d5fc-4a27-4f56-96c2-40c5c0440fbf/jvysS84Gc9.json'
              src='https://lottie.host/3dac4db4-374a-48d1-a3e2-e705001a512e/FA8Be7ZiIf.json'
              className="player"
              loop
              autoplay

            />
          </div>
        </div>

        {/* ---------------------- */}
        <div className="m-10 mt-20">
        <Animated_text text={"As global leaders in UX UI, technology, and business solutions, we partner with clients to simplify, strengthen, and transform their businesses.  "} mode={"multi"} weight={"font-bold"} size={'text-lg sm:text-2xl'} space={true}></Animated_text>

          </div>
        {/* ---------------------- */}

        <div className=" flex justify-center text-4xl m-10 mt-20 superBold"> Our Project</div>
        <div className="flex flex-row justify-center flex-wrap  ">

          <Card></Card>
          <Card></Card>
        </div>


        <div className=" flex justify-center text-4xl m-10 mt-20 superBold"> 30+ Projects Delivered</div>


        <div className="flex flex-row flex-wrap justify-center gap-10  ">

          <Foundercard></Foundercard>
          <Foundercard></Foundercard>

        </div>



        <Review></Review>


      </div>
      {/* part 2  footer in this with mx-0 */}
 

    </div>
  );
}
