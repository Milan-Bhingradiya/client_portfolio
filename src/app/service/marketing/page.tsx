// src/components/ServiceList.js
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import branding from "../../../../public/branding.png";
import ux from "../../../../public/UIUX.png";
import ui from "../../../../public/UI.png";
import development from "../../../../public/devlopment.png";

const services = [
  "Email Marketing",
  "ASO",
  "Content Marketing",
  "Branding",
  "PPC Campaign",
  "Video Marketing",
  "SEO",
  "SMO",
  "SMM",
];

const steps = [
  {
    title: "Research",
    description:
      "At Leo9, we develop future-proof brands with meticulous research to define a business problem by assessing existing marketing collaterals.",
    imgSrc: "/path/to/empathise.png", // Replace with your image path
  },
  {
    title: "Positioning ",
    description:
      "With brands, we work to co-create the brand’s purpose, vision, platform, architecture, and brand message matrix by blending human behavioural patterns with data science.",
    imgSrc: "/path/to/define.png", // Replace with your image path
  },
  {
    title: "Creative",
    description:
      "Right from creating top-notch visual to verbal identity to guidelines, from brand assets to brand sprints, we help our clients deliver value-driven brand positioning outcomes.",
    imgSrc: "/path/to/ideation.png", // Replace with your image path
  },
  {
    title: "Marketing",
    description:
      "We create future-proof brand touchpoints and ensure seamless interaction between the brand and its users powered by security and performance.",
    imgSrc: "/path/to/prototype.png", // Replace with your image path
  },
  {
    title: "Management    ",
    description:
      "We unlock scalable and accessible solutions for effortless customer interactions to help brands manage their customers’ pain points by identifying the customer experience gaps and bringing the brand closer to customers.",
    imgSrc: "/path/to/prototype.png", // Replace with your image path
  },
];

function Page() {
  const [isScrolled, setIsScrolled] = useState(false);

  const { ref: textRef, inView: textInView } = useInView({
    threshold: 0,
  });
  const { ref: textRef1, inView: textInView1 } = useInView({
    threshold: 0.3,
  });
  const { ref: textRef2, inView: textInView2 } = useInView({
    threshold: 0.3,
  });
  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.3,
  });
  const { ref: stepsRef, inView: stepsInView } = useInView({
    threshold: 0.3,
  });

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className=" m-2 sm:m-10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div ref={textRef} className="text-container">
            <motion.div
              className="animated-text"
              initial={{ x: 0, opacity: 0 }}
              animate={{
                opacity: textInView && isScrolled ? 1 : 1,
                x: textInView && isScrolled ? 0 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <h2 className=" text-purple-500 text-lg font-semibold mb-2">
                What Do We Serve?
              </h2>
            </motion.div>
          </div>
          <div ref={textRef1} className="text-container">
            <motion.div
              className="animated-text"
              initial={{ x: -100, opacity: 0 }}
              animate={{
                opacity: textInView1 && isScrolled ? 1 : 0,
                x: textInView1 && isScrolled ? 0 : -100,
              }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                End-to-end neuromarketing services and branding strategies of
                the digital world.
              </h1>
            </motion.div>
          </div>
        </div>

        <div ref={servicesRef} className="text-container">
          <motion.div
            className="animated-text"
            initial={{ x: -100, opacity: 0 }}
            animate={{
              opacity: servicesInView && isScrolled ? 1 : 0,
              x: servicesInView && isScrolled ? 0 : -100,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative flex flex-col items-center">
              {/* <div className=' m-10 text-3xl text-blue-500 font-bold'>Web</div> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                {services.map((service, index) => (
                  <div key={index} className="relative">
                    <p className="font-semibold text-lg">{service}</p>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-24 border-b-2 border-dotted border-black mt-2"></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="animate-ping fixed  left-[28%] sm:left-[40%] top-[40%] w-48 h-48 bg-blue-200 rounded-full -z-10"></div>
      </div>

      <div ref={textRef2} className="text-container">
        <motion.div
          className="animated-text"
          initial={{ x: -100, opacity: 0 }}
          animate={{
            opacity: textInView2 && isScrolled ? 1 : 0,
            x: textInView2 && isScrolled ? 0 : -100,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className=" flex justify-center items-center m-10 text-3xl text-blue-500 font-bold">
            HOW WE DO IT ?
          </div>
        </motion.div>
      </div>

      <div ref={stepsRef} className="text-container">
        <motion.div
          className="animated-text"
          initial={{ x: -100, opacity: 0 }}
          animate={{
            opacity: stepsInView && isScrolled ? 1 : 0,
            x: stepsInView && isScrolled ? 0 : -100,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <Image
                    src={branding}
                    alt={step.title}
                    width={80}
                    height={80}
                  />
                  <h3 className="text-2xl font-bold mt-4 mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Page;
