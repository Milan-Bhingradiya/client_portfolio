"use client"


import Foundercard from "./component/Foundercard";
import Review from "./component/Review";
import Animated_text from "./component/Animated_text";

import { useCallback, useEffect, useRef, useState } from "react";
import Consultancy_card from "./work/component/Consultancy_card";

import Ball from "@/ball/page";
import Section1 from "./work/component/Section1";
import Section2 from "./work/component/Section2";
import { mystore } from "./store/mystore";

import one from "../../public/1.png"
import two from "../../public/2.png"
import three from "../../public/3.svg"
import four from "../../public/4.png"
import five from "../../public/5.svg" 
import { motion } from "framer-motion";
import Image from 'next/image';



export default function Home() {

  //   const isConnected = useConnect();

  // if (!isConnected) {png
  //   return <div>Connecting to database...</div>;
  // }


  const designPointRef = useRef<HTMLDivElement>(null);
  const technologyPointRef = useRef<HTMLDivElement>(null);
  const businessPointRef = useRef<HTMLDivElement>(null);


  const [animate, setAnimate] = useState(false);


  const [lastScrollY, setLastScrollY] = useState(0);


  const setballShouldFollow = mystore((state: any) => state.setballShouldFollow)
  const ballShouldFollow = mystore((state: any) => state.ballShouldFollow)

  // section 2 ma ue thay chhe
  const designRef = useRef<HTMLDivElement>(null);
  const technologyRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  
  
  
  
  
  
  const k = useRef<HTMLDivElement>(null);
  const p = useRef<HTMLDivElement>(null);
  const i = useRef<HTMLDivElement>(null);
  
    const [positions, setPositions] = useState({
      k: { top: -50, left: -50 },
      p: { top: -50, left: -50 },
      i: { top: -50, left: -50 },
    });


  useEffect(() => {
    // console.log("useEffect");
    const handleScroll = () => {


      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;



      const ktop = k?.current?.getBoundingClientRect().top;
      const ptop = p?.current?.getBoundingClientRect().top;
      const itop = i?.current?.getBoundingClientRect().top;

      const kleft = k?.current?.getBoundingClientRect().left;
      const pleft = p?.current?.getBoundingClientRect().left;
      const ileft = i?.current?.getBoundingClientRect().left;
      if (ballShouldFollow == "kpi") {
        // console.log("followinf " + ballShouldFollow)
        setPositions((prev): any => ({
          k: { top: ktop, left: kleft },
          p: { top: ptop, left: pleft },
          i: { top: itop, left: ileft },
        }));
        // setballShouldFollow("titles");
      }
      if (ballShouldFollow == "titles") {
        // console.log("followinf " + ballShouldFollow)
        setPositions((prev): any => ({
          k: { top: designPointRef.current?.getBoundingClientRect().top, left: designPointRef?.current?.getBoundingClientRect().left },
          p: { top: technologyPointRef.current?.getBoundingClientRect().top, left: technologyPointRef?.current?.getBoundingClientRect().left},
          i: { top: businessPointRef.current?.getBoundingClientRect().top, left: businessPointRef?.current?.getBoundingClientRect().left },
        }));
      }
      setLastScrollY(currentScrollY);
    }
    setAnimate(true);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);



  const [isColored, setIsColored] = useState(false);
useEffect(() => {
 const timer = setTimeout(() => {
      setIsColored(true);
    }, 1000); 

 
}, [])






  return (


    <div className="relative">

      {/* part 1 before footer all ting in this with mx-10 */}
      <div className=" mx-5 sm:mx-20 md:mx-26 lg:mx-32 " >
        {/* ----------------------------------------------------------------------------------- */}
        <Section1></Section1>

        {/* <button className='h-[100px] w-[100px] bg-red-500 rounded-full fixed bottom-10 right-10' onClick={() => {

setballShouldFollow("titles")
console.log(ballShouldFollow)
}}></button> */}
        {/* ----------------------------------------------------------------------------------- */}

        {/* <div className="flex flex-row w-[100%] justify-center  m-4 sm:m-10 mb-14 ">
          <div id="k" ref={k} className="text-3xl sm:text-5xl h-[100px] w-[100px] z-10 font-bold m-4 mx-6 px-6">k</div>
          <div id="p" ref={p} className="text-3xl sm:text-5xl h-[100px] w-[100px] z-10 font-bold m-4 mx-6 px-6">p</div>
          <div id="i" ref={i} className="text-3xl sm:text-5xl h-[100px] w-[100px] z-10 font-bold m-4 mx-6 px-6">i</div>
        </div> */}
        <div className="flex flex-row w-[100%] justify-center  m-4 sm:m-10 mb-14 ">
          <div id="k" ref={k} className={`text-3xl sm:text-5xl h-[100px] w-[100px] z-10 ${isColored ? "bg-red-300" : ""} font-bold rounded-[50%] m-4 mx-6 px-6 flex justify-center items-center`}>k</div>
          <div id="p"  ref={p} className={`text-3xl sm:text-5xl h-[100px] w-[100px] z-10  ${isColored ? "bg-blue-300" : ""}   rounded-[50%] font-bold m-4 mx-6 px-6 flex justify-center items-center `}>p</div>
          <div id="i" ref={i} className={`text-3xl sm:text-5xl h-[100px] w-[100px] z-10  ${isColored ? "bg-green-300" : ""}  rounded-[50%] font-bold m-4 mx-6 px-6 flex justify-center items-center`}>i</div>
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

        <Section2 designRef={designRef} technologyRef={technologyRef} businessRef={businessRef} designPointRef={designPointRef} technologyPointRef={technologyPointRef} businessPointRef={businessPointRef}></Section2>



        <div className="mx-6 sm:mx-20 mt-20 " >
          <Animated_text text={" We are a global creative agency that combines design expertise with technology and intelligence."} mode={"multi"} weight={"ont-extrabold  "} size={' text-lg sm:text-2xl'} space={true}></Animated_text>
        </div>


        {/* <div className="flex items-center justify-center h-screen">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 5,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="text-4xl font-bold"
          >
            Moving Text
          </motion.div> 
        </div> */}


        <Ball top={animate ? (positions.k.top) - 0 : -50} left={animate ? positions.k.left - 0 : -50} delay={0} color={'bg-red-300'} />
        <Ball top={animate ? positions.p.top - 0 : -50} left={animate ? positions.p.left - 0 : -50} delay={0} color={'bg-blue-300'} />
        <Ball top={animate ? positions.i.top - 0 : -50} left={animate ? positions.i.left - 0 : -50} delay={0} color={'bg-green-300'} />


        <div className="ml-4 sm:ml-14 mt-10 text-3xl superBold mt-6 m-2">
          Consultant
        </div>


        <Consultancy_card></Consultancy_card>

        {/* ---------------------- */}
        <div className="m-10 mt-20">
          <Animated_text text={"As global leaders in UX UI, technology, and business solutions, we partner with clients to simplify, strengthen, and transform their businesses.  "} mode={"multi"} weight={"font-bold"} size={'text-lg sm:text-2xl'} space={true}></Animated_text>

        </div>
        {/* ---------------------- */}

        {/* <div className=" flex justify-center text-4xl m-10 mt-20 superBold"> Our Project</div>
        <div className="flex flex-row justify-center flex-wrap  ">

          <Card></Card>
          <Card></Card>
        </div>
 */}

        <div className=" flex justify-center text-4xl m-10 mt-20 superBold"> 30+ Projects Delivered</div>


        <div className="flex flex-row flex-wrap justify-center gap-10  ">

          {/* project card... pela founder card hatu.. */}
          <Foundercard></Foundercard>
          <Foundercard></Foundercard>
          <Foundercard></Foundercard>

        </div>



        <Review></Review>


      </div>
      {/* part 2  footer in this with mx-0 */}


    </div>
  );
}
