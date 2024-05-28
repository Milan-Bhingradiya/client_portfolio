"use client"
import React from 'react'
import Animated_text from '../component/Animated_text'
import { Player } from '@lottiefiles/react-lottie-player'
import client from '../../../public/client.json';
import { motion } from "framer-motion";
import one from '../../../public/1.png'
import two from '../../../public/2.png'
import three from '../../../public/3.svg'
import four from '../../../public/4.png'
import five from '../../../public/5.svg'
import Image from "next/image";
import ReviewCard from './component/ReviewCard';

function page() {
  return (
    <div className='flex flex-col justify-center items-center'>


      <div className='  w-[70%] my-10'>
        <Animated_text text={"We make happy clients by interconnecting technology with business & art."} mode={"multi"} weight={"font-extrabold"} size={'text-3xl'} space={true}></Animated_text>

      </div>

      <div className="hidden sm:block h-1/4 w-1/4  m-10  ">
        <Player
          src={client}
          className="player"
          loop
          autoplay

        />
      </div>

      <div className='  w-[70%] '>
        <Animated_text text={"Our clients"} mode={"multi"} weight={"font-extrabold"} size={'text-md sm:text-3xl'} space={true}></Animated_text>

      </div>

      <div className="flex  flex-row justify-center gap-8 md:gap-16 lg:gap-24 m-10 ">
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
          <Image src={two} alt="ms" width={60} height={80}></Image>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} >
          <Image src={one} alt="ms" width={60} height={80}></Image>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} >
          <Image className="hidden sm:block" src={four} alt="ms" width={60} height={80}></Image>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} >
          <Image src={three} alt="ms" width={60} height={80}></Image>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} >
          <Image className="hidden sm:block" src={five} alt="ms" width={60} height={80}></Image>
        </motion.div>
      </div>

      <div className="flex flex-row justify-center gap-8 md:gap-16 lg:gap-24 m-10 ">
        <motion.div whileHover={{ scale: 1.2 }} >
          <Image className="hidden sm:block" src={five} alt="ms" width={60} height={80}></Image>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} >
          <Image src={one} alt="ms" width={60} height={80}></Image>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} >
          <Image src={three} alt="ms" width={60} height={80}></Image>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} >
          <Image src={two} alt="ms" width={60} height={80}></Image>
        </motion.div>
        <motion.div whileHover={{ scale: 1.2 }} >
          <Image className="hidden sm:block" src={four} alt="ms" width={60} height={80}></Image>
        </motion.div>
      </div>


      <div className='w-[80%]  sm:w-[50%] my-10'>
        <Animated_text text={"Happy clients with 760+ successful Projects"} mode={"multi"} weight={"font-extrabold"} size={'text-3xl'} space={true}></Animated_text>

    </div>

<ReviewCard></ReviewCard>
  

    </div >
  )
}

export default page