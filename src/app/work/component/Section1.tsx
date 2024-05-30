import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import triangle from "../../../../public/triangle.json"
import one from "../../../../public/1.png"
import two from "../../../../public/2.png"
import three from "../../../../public/3.svg"
import four from "../../../../public/4.png"
import five from "../../../../public/5.svg" 
import Animated_text from "../../component/Animated_text"
import { motion } from "framer-motion";
import Image from 'next/image';
function Section1() {
    return (
        <div>


            <div className="flex flex-col justify-center items-center sm:flex-row  ">
                {/* section one */}

                <div className="mt-10 h-1/4 w-1/4 sm:h-1/4 sm:w-1/4 ">
                    <Player
                        // src='https://lottie.host/bc9da579-94ae-4970-a4e9-06f11848e96f/Vv6ttESKhP.json'
                        src={triangle}
                        className="player"
                        loop
                        autoplay

                    />
                </div>

                <div className="flex flex-col mt-10 justify-center superBold">

                    <div >
                        <Animated_text text={"Design | Transform | Accelerate"} mode="single" weight="superBold" size={'text-4xl sm:text-5xl '} space={false}> </Animated_text>
                    </div>

                    <div className="m-4">
                        <Animated_text text={"We Revolutionize User Experience |  Using Behavioural Science."} mode={"multi"} weight={"font-extrabold"} size={' text-lg sm:text-2xl'} space={true}></Animated_text>
                    </div>
                </div>
            </div>
            
        
        </div>
    )
}

export default Section1