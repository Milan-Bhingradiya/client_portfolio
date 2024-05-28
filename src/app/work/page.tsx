
"use client"
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import { motion } from "framer-motion"
import T from '../component/Animated_text';
import Animated_text from '../component/Animated_text';
import Project from '../api/model/Project';
import connectDB from '../api/utility/connectDB';
import { cp } from 'fs';
import useConnect from '../api/utility/useConnect';
import Link from 'next/link';


function page() {
    const [response, setResponse] = useState([]);


    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };



    const apiCall = async () => {



        try {
            const response = await fetch('/api/getproject', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (result.success) {
                setResponse(result.data)
                console.log(result);

            } else {
                alert('else error' + result);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Server error');
        }
    };

    useEffect(() => {

        apiCall();
    }, []);

    return (

        <div className=' m-5 sm:mx-28 sm:mt-10 '>


            {/* <motion.span
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 1 }}
            >
                {text.split('').map((char, index) => (
                    <motion.span key={index} variants={variants}>{char}</motion.span>
                ))}
            </motion.span> */}

            <Animated_text text={"We Have Designed Experiences For Over 260 Projects."} mode={"multi"} weight={"font-extrabold"} size={'text-3xl'} space={true}></Animated_text>

            {/* <div
                className='flex flex-col text-4xl font-extrabold'>
                <motion.div 
                    whileHover={{ scale: 1.005}} >
                    We Have

                    Designed Experiences

                    For Over 260 Projects.
                </motion.div>
            </div> */}  


            <div className='flex flex-row flex-wrap mt-5' >
                {response && response.map((project: any, index: number) =>


                    <div className=' m-3  w-[350px]'>

                        <Link href={"./work/" + project._id} key={index} >

                            <article className="relative  isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 ">
                                <img src={"https://picsum.photos/200/300"} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" width={200} height={200} />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{project.title}</h3>
                                <div className="z-10 gap-y-1 text-red-400 overflow-hidden text-sm leading-6 text- font-bold"> {"for " + project.projectCompanyName + " company"} </div>
                            </article>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page