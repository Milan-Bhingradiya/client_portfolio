// "use client"
import Image from "next/image";
import React from "react";
import branding from "/public/branding.png";
import ux from "/public/UIUX.png";
import ui from "/public/UI.png";
import development from "/public/devlopment.png";

const img = [branding, ux, ui, development];
let i = 0;
const features = [
  {
    title: "Branding",
  },
  {
    title: "UX Design",
  },
  {
    title: "UI Design",
  },
  {
    title: "Development",
  },
];

const ScopeOfWork = () => {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mb-4  flex justify-center items-center">
              <Image
                priority={true}
                src={img[index]}
                alt={feature.title}
                width={100}
                height={100}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScopeOfWork;
