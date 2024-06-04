// src/components/ServiceList.js
import Image from "next/image";
import React from "react";

import branding from "../../../../public/branding.png";
import ux from "../../../../public/UIUX.png";
import ui from "../../../../public/UI.png";
import development from "../../../../public/devlopment.png";

const services = [
  "UI Design",
  "UI Development",
  "UI Guidelines",
  "Design System",
  "UX Design",
  "User Research",
  "UX Consultancy",
  "UX Writing",
  "Animations",
  "Iconography",
  "Illustrations",
];

const steps = [
  {
    title: "Empathise",
    description:
      "As a thriving UI UX agency, we harness the proven empathy-driven human-focused design process to craft the best digital solutions mapping the users preferences.",
    imgSrc: "/path/to/empathise.png", // Replace with your image path
  },
  {
    title: "Define (the Problem)",
    description:
      "Apt logic and detailing is incorporated precisely with elements like design functions, features, functionalities, workflow and beyond to solve complex issues with minimal snags.",
    imgSrc: "/path/to/define.png", // Replace with your image path
  },
  {
    title: "Ideation",
    description:
      "With Proven ideation techniques combined with a client-centric approach at the core, we ideate roadmaps while mapping your business journey to decode human-focused problem statements.",
    imgSrc: "/path/to/ideation.png", // Replace with your image path
  },
  {
    title: "Prototype",
    description:
      "We develop a results-focused prototype meant to build an authentic digital connection with the utmost level of detail and quality based on diversified experiments.",
    imgSrc: "/path/to/prototype.png", // Replace with your image path
  },
  {
    title: "Testing",
    description:
      "We finetune our designs using state-of-the-art testing techniques by testing the overall product usability at Omni-channel platforms to impart a clear big picture of design experience benchmarking, blueprints, personas, and journey maps of ideal consumers.",
    imgSrc: "/path/to/prototype.png", // Replace with your image path
  },
];

function page() {
  return (
    <div>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-red-500 text-lg font-semibold mb-2">
            What Do We Serve?
          </h2>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            We help you translate a simple idea into an exotic Digital design
            transformation vision.
          </h1>
        </div>
        <div className="relative flex flex-col items-center">
          <div className="animate-ping fixed  left-[28%] sm:left-[40%] top-[40%] w-48 h-48 bg-pink-200 rounded-full -z-10"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <p className="font-semibold text-lg">{service}</p>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-24 border-b-2 border-dotted border-black mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Image src={branding} alt={step.title} width={80} height={80} />
              <h3 className="text-2xl font-bold mt-4 mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
