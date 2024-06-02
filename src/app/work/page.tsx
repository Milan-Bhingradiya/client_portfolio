"use client"
import Image from "next/image"
import React, { Suspense, use, useEffect, useState } from "react"
import { motion } from "framer-motion"
import T from "../component/Animated_text"
import Animated_text from "../component/Animated_text"
import { cp } from "fs"
import Link from "next/link"
import { firestoreInstance } from "../../../firebase-config"
import { collection, getDocs, query } from "firebase/firestore"
import Loading from "../component/Loading"

function Page() {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  const [response, setResponse] = useState([])

  useEffect(() => {
    const getAllProject = async () => {
      const collectionref = collection(firestoreInstance, "projects")
      const q = query(collectionref)

      try {
        const querySnapshot = await getDocs(q)
        const allDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        console.log(allDocs)
        setResponse(allDocs)
      } catch (error) {
        console.error("Error fetching documents:", error)
      }
    }

    getAllProject()
  }, [])

  return (
    <div className=" m-5 sm:mx-28 sm:mt-10 ">
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

      <Animated_text
        text={"We Have Designed Experiences For Over 260 Projects."}
        mode={"multi"}
        weight={"font-extrabold"}
        size={"text-3xl"}
        space={true}
      ></Animated_text>

      {/* <div
                className='flex flex-col text-4xl font-extrabold'>
                <motion.div 
                    whileHover={{ scale: 1.005}} >
                    We Have
f
                    Designed Experiences

                    For Over 260 Projects.
                </motion.div>
            </div> */}

      <Suspense fallback={<Loading></Loading>}>
        <div className="flex flex-row flex-wrap mt-5">
          {response &&
            response.map((project: any, index: number) => (
              <div key={index} className=" m-3  w-[350px]">
                <Link href={"./work/" + project.id} key={index}>
                  <article className="relative  isolate flex flex-col just    ify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 ">
                    <Image
                      src={project.thumbnail}
                      alt="University of Southern California"
                      className="absolute inset-0 h-full w-full object-cover"
                      width={200}
                      height={200}
                    ></Image>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                    <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                      {project.title}
                    </h3>
                    <div className="z-10 gap-y-1 text-red-400 overflow-hidden text-sm leading-6 text- font-bold">
                      {" "}
                      {"for " + project.projectCompanyName + " company"}{" "}
                    </div>
                  </article>
                </Link>
              </div>
            ))}
        </div>
      </Suspense>
    </div>
  )
}

export default Page
