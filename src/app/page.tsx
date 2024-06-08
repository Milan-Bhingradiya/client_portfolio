"use client";

import Foundercard from "./component/Foundercard";
import Review from "./component/Review";
import Animated_text from "./component/Animated_text";

import { useCallback, useEffect, useRef, useState } from "react";
import Consultancy_card from "./work/component/Consultancy_card";

import Ball from "@/ball/page";
import Section1 from "./work/component/Section1";
import Section2 from "./work/component/Section2";
import Loading from "./component/Loading";
import { mystore } from "./store/mystore";

import one from "../../public/1.png";
import two from "../../public/2.png";
import three from "../../public/3.png";
import four from "../../public/4.png";
import five from "../../public/5.png";
import { motion } from "framer-motion";
import Image from "next/image";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { firestoreInstance } from "../../firebase-config";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import TestimonialSlider from "./component/TestimonialSlider";
import Testimonial from "./component/Testimonial";
import ProjectCardSlider from "./component/ProjectCardSlider";
import ThreeCard from "./component/ThreeCard";

import CountUp from "react-countup";
export default function Home() {
  //   const isConnected = useConnect();

  // if (!isConnected) {png
  //   return <div>Connecting to database...</div>;
  // }

  // section 2 ma ue thay chhe
  const designRef = useRef<HTMLDivElement>(null);
  const technologyRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);

  const [isColored, setIsColored] = useState(false);

  const [isOneSecDone, setisOneSecDone] = useState(false);
  const [isTwoSecDone, setisTwoSecDone] = useState(false);

  const [response, setResponse] = useState<{ id: any }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("jjjjjjjjjjjjjjj");
      setIsColored(true);

      setisOneSecDone(true);
    }, 1000);

    const timer2 = setTimeout(() => {
      setisTwoSecDone(true);
    }, 2000);

    getProjectData();
  }, []);

  const getThreeProjectId = async () => {
    const docRef = doc(
      firestoreInstance,
      "homepageprojects",
      "JTq65eBOyyf8mMUSkR1S"
    );
    const docSnapshot = await getDoc(docRef);
    console.log(docSnapshot.data());

    if (docSnapshot.exists()) {
      let ids = [
        docSnapshot.data().first,
        docSnapshot.data().second,
        docSnapshot.data().third,
      ];
      console.log("ids");
      console.log(ids);
      return ids;
    } else {
      return false;
      console.log("Document not found");
    }
  };
  const getThreeDocuments = async (documentIdList: any) => {
    const documents = [];
    console.log(documentIdList);
    for (const documentId of documentIdList) {
      try {
        const docRef = doc(firestoreInstance, "projects", documentId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          documents.push({
            id: documentId,
            ...docSnapshot.data(),
          });
        } else {
          console.log("Document not found:", documentId);
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    }
    return documents;
  };

  const getProjectData = async () => {
    const documentIdList = await getThreeProjectId();
    if (!documentIdList) return;
    const documents = await getThreeDocuments(documentIdList);
    // console.log(documents)
    setResponse(documents);
  };

  const res = [
    { number: 250, description: "Projects Delivered" },
    { number: 100, description: "Clients" },
    { number: 6.5, description: "Years of Experience" },
  ];

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const statsSection = document.getElementById("stats-section");

      if (statsSection) {
        const sectionTop = statsSection.offsetTop;
        const sectionHeight = statsSection.offsetHeight;

        if (scrollY > sectionTop - windowHeight + sectionHeight / 2) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      {/* <div className="relative">
        <div className=" w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
        <div className="absolute top-[20px] left-[10px] flex items-center justify-center space-x-1">
          <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-600"></div>
          <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-600"></div>
          <div className="w-3 h-3 rounded-full animate-pulse dark:bg-violet-600"></div>
        </div>
      </div> */}

      {/* part 1 before footer all ting in this with mx-10 */}
      <div className=" mx-5 sm:mx-20 md:mx-26 lg:mx-32 ">
        {/* ----------------------------------------------------------------------------------- */}
        <Section1></Section1>

        {/* <button className='h-[100px] w-[100px] bg-red-500 rounded-full fixed bottom-10 right-10' onClick={() => {

// setballShouldFollow("titles")
// console.log(isclick)
setisOneSecDone(!isOneSecDone);
// console.log(isclick)

}}></button> */}
        {/* ----------------------------------------------------------------------------------- */}

        {/* <div className="flex flex-row w-[100%] justify-center  m-4 sm:m-10 mb-14 ">
          <div id="k" ref={k} className="text-3xl sm:text-5xl h-[100px] w-[100px] z-10 font-bold m-4 mx-6 px-6">k</div>
          <div id="p" ref={p} className="text-3xl sm:text-5xl h-[100px] w-[100px] z-10 font-bold m-4 mx-6 px-6">p</div>
          <div id="i" ref={i} className="text-3xl sm:text-5xl h-[100px] w-[100px] z-10 font-bold m-4 mx-6 px-6">i</div>
        </div> */}

        {/* <div className="flex flex-row w-[100%] justify-center  m-4 sm:m-10 mb-14  ">
          <div
            id="k"
            className={` text-3xl sm:text-5xl h-[60px] sm:h-[100px] w-[60px] sm:w-[100px] z-10  ${
              isOneSecDone ? "" : "move"
            }  ${isTwoSecDone ? "animate-bounce" : ""} mytransition ${
              isOneSecDone ? "bg-red-300" : ""
            } font-bold rounded-[50%] m-4 sm:mx-6 px-6 flex justify-center items-center`}
          >
            k
          </div>
          <div
            id="p"
            className={`  text-3xl sm:text-5xl h-[60px] sm:h-[100px] w-[60px] sm:w-[100px]  z-10 ${
              isOneSecDone ? "" : "move"
            } ${isTwoSecDone ? "animate-bounce" : ""} mytransition  ${
              isOneSecDone ? "bg-blue-300" : ""
            }   rounded-[50%] font-bold m-4 sm:mx-6 px-6 flex justify-center items-center `}
          >
            p
          </div>
          <div
            id="i"
            className={`  text-3xl sm:text-5xl h-[60px] sm:h-[100px] w-[60px] sm:w-[100px]  z-10 ${
              isOneSecDone ? "" : "move"
            }  ${isTwoSecDone ? "animate-bounce" : ""} mytransition ${
              isOneSecDone ? "bg-green-300" : ""
            }  rounded-[50%] font-bold m-4 sm:mx-6 px-6 flex justify-center items-center`}
          >
            i
          </div>
        </div> */}

        <div className=" flex justify-center text-4xl m-10 mt-20 superBold">
          {" "}
          Our Clients
        </div>

        <div className="  flex flex-row justify-center gap-8 md:gap-16 lg:gap-24 m-10 ">
          <motion.div whileHover={{ scale: 1.2 }}>
            <Image
              className="blackfilter"
              src={one}
              alt="ms"
              width={60}
              height={80}
            ></Image>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Image
              className="blackfilter"
              src={two}
              alt="ms"
              width={60}
              height={80}
            ></Image>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Image
              className="blackfilter"
              src={three}
              alt="ms"
              width={60}
              height={80}
            ></Image>
          </motion.div>
          <motion.div className="hidden sm:block" whileHover={{ scale: 1.2 }}>
            <Image
              className="blackfilter"
              src={four}
              alt="ms"
              width={60}
              height={80}
            ></Image>
          </motion.div>
          <motion.div className="hidden sm:block" whileHover={{ scale: 1.2 }}>
            <Image
              className="blackfilter"
              src={five}
              alt="ms"
              width={60}
              height={80}
            ></Image>
          </motion.div>
        </div>

        {/* <div className=" mb-32 flex flex-row justify-center gap-8 md:gap-16 lg:gap-24 m-10 ">
          <motion.div className="hidden sm:block" whileHover={{ scale: 1.2 }}>
            <Image src={five} alt="ms" width={60} height={80}></Image>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Image src={one} alt="ms" width={60} height={80}></Image>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Image src={three} alt="ms" width={60} height={80}></Image>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Image src={two} alt="ms" width={60} height={80}></Image>
          </motion.div>
          <motion.div className="hidden sm:block" whileHover={{ scale: 1.2 }}>
            <Image src={four} alt="ms" width={60} height={80}></Image>
          </motion.div>
        </div> */}

        <div className="mx-6 sm:mx-20 mt-20 ">
          <Animated_text
            text={
              " We are a global creative agency that combines design expertise with technology and intelligence."
            }
            mode={"multi"}
            weight={"ont-extrabold  "}
            size={" text-lg sm:text-2xl"}
            space={true}
          ></Animated_text>
        </div>

        <Section2
          designRef={designRef}
          technologyRef={technologyRef}
          businessRef={businessRef}
        ></Section2>
        {/* <ThreeCard></ThreeCard> */}

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

        {/* <Ball top={animate ? (positions.k.top) - 0 : -50} left={animate ? positions.k.left - 0 : -50} delay={0} color={'bg-red-300'} /> */}
        {/* <Ball top={animate ? positions.p.top - 0 : -50} left={animate ? positions.p.left - 0 : -50} delay={0} color={'bg-blue-300'} /> */}
        {/* <Ball top={animate ? positions.i.top - 0 : -50} left={animate ? positions.i.left - 0 : -50} delay={0} color={'bg-green-300'} /> */}

        <Consultancy_card></Consultancy_card>

        {/* ---------------------- */}
        <div className="m-10 mt-20">
          <Animated_text
            text={
              "As global leaders in UX UI, technology, and business solutions, we partner with clients to simplify, strengthen, and transform their businesses.  "
            }
            mode={"multi"}
            weight={"font-bold"}
            size={"text-lg sm:text-2xl"}
            space={true}
          ></Animated_text>
        </div>
        {/* ---------------------- */}

        {/* <div className=" flex justify-center text-4xl m-10 mt-20 superBold"> Our Project</div>
        <div className="flex flex-row justify-center flex-wrap  ">

          <Card></Card>
          <Card></Card>
        </div>
 */}

        {/* <div className=" flex justify-center gap-5 flex -col sm:flex-row">
          <div className=" flex justify-center text-2xl font-bold">
            260+ Projects Delivered
          </div>
          <div className=" flex justify-center   text-2xl   font-bold">
            100+ Clients
          </div>
          <div className=" flex justify-center  text-2xl   font-bold ">
            6.5 years of Experiences
          </div>
        </div> */}

        <div
          className="container mx-auto py-10 sm:py-20 px-4"
          id="stats-section"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {res.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <CountUp
                  end={isVisible ? stat.number : 0}
                  duration={3.5}
                  decimals={index == 2 ? 1 : 0}
                >
                  {({ countUpRef }) => (
                    <div>
                      <div>
                        <span
                          ref={countUpRef}
                          className="text-5xl font-bold text-red-500 mb-2"
                        ></span>
                        <span className="text-5xl font-bold text-red-500 mb-2">
                          +
                        </span>
                      </div>
                    </div>
                  )}
                </CountUp>
                <div className="text-gray-700 text-2xl font-bold">
                  {stat.description}
                </div>
              </div>
            ))}

            <div id="stats-section"></div>
          </div>
        </div>
        {/* start */}

        {/*  */}

        {/* <div className=" flex justify-center gap-5 flex-col sm:flex-row">
            <div className=" flex justify-center text-2xl font-bold">
              260+ Projects Delivered
            </div>
            <div className=" flex justify-center   text-2xl   font-bold">
              100+ Clients
            </div>
            <div className=" flex justify-center  text-2xl   font-bold ">
              6.5 years of Experiences
            </div>
          </div> */}

        <div className="flex flex-row justify-center sm:m-5  p-6 pb-32">
          <div className=" gap-4 sm:gap-10  grid grid-cols-2 sm:grid-cols-4 text-2xl sm:text-3xl font-semibold ">
            <div className="">Foodtech</div>
            <div className="ml-4 sm:ml-0">Fintech</div>
            <div>Healthtech</div>
            <div className="ml-4 sm:ml-0">Aibots</div>
            <div>ECom</div>
            <div className="ml-4 sm:ml-0">Realtech</div>
            <div>Edtech</div>
            <div className="ml-4 sm:ml-0">Others..</div>
          </div>
        </div>
        {/*  */}

        <ProjectCardSlider response={response}></ProjectCardSlider>

        {/* end */}

        {/*  */}

        {/*  */}

        {/* <div className="flex flex-row flex-wrap lg:grid lg:grid-cols-3 justify-center gap-4  ">
          {response &&
            response.map((project: any, index: number) => (
              <Link href={"./work/" + project.id} key={index}>
                <Foundercard
                  key={index}
                  img={project.thumbnail}
                  companyName={project.projectCompanyName}
                ></Foundercard>
              </Link>
            ))}
        </div> */}

        {/* part 2  footer in this with mx-0 */}
        <div className="transition mt-16 duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-8 space-y-2 md:mb-16 md:text-center">
            <div className="text-xl  md:text-center md:text-2xl">
              Words from Others
            </div>

            <h1 className="mb-2 text-3xl font-semibold  md:text-center md:text-5xl">
              Its not just us.
            </h1>
            <p className="text-xl  md:text-center md:text-2xl">
              Heres what others have to say about us.
            </p>
          </div>
        </div>
        <TestimonialSlider></TestimonialSlider>
        {/* <Review></Review> */}
      </div>
    </div>
  );
}
