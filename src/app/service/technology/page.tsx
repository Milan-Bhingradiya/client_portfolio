// src/components/ServiceList.js
import Image from 'next/image';
import React from 'react';

import branding from '../../../../public/branding.png';
import ux from '../../../../public/UIUX.png';
import ui from '../../../../public/UI.png';
import development from '../../../../public/devlopment.png';



const services = [
  "Development",
  "Web Design",
  "Front-End",
  "Back-End",
  "Javascript",
  "Css 3",
  "Animations",
  "CRM",
  "Angular",
  "React",
  "ERP",
  "Wordp,ress",
  "PHP",
  "Larave,l",
  "E-Comme,rce"
];

const steps = [
  {
    title: 'Understand Objectives',
    description: 'As a client-focused web and mobile app development company, we gain in-depth insights into your digital requirements, consumer behaviours, technology platforms, functionalities, etc., to help you gain a competitive edge. This is our approach for developing the right user experience, emphasising top-notch aesthetic sensibilities that engage your consumers.',
    imgSrc: '/path/to/empathise.png', // Replace with your image path
  },
  {
    title: 'Choose Right ​​​​​​​Technology ',
    description: 'Empowered with tech-heavy centricity, our solutions transcend the usual methods of solving problems. We ensure a sophisticated frontend experience and develop a user-friendly backend by considering the bigger picture for tech-focused digital transformation that was once impossible.',
    imgSrc: '/path/to/define.png', // Replace with your image path
  },
  {
    title: 'Documented Coding',
    description: 'From elegant designs to a custom-coded website, the radical development phase is driven by our digital mindfulness to translate your digital vision.',
    imgSrc: '/path/to/ideation.png', // Replace with your image path
  },
  {
    title: 'Careful Testing',
    description: 'With our great knowledge in tech engineering, we employ a rigorous QA testing process that encompasses testing speed, security, user-friendly interface experience, and overall functionality and eliminates flaws before the product goes live.',
    imgSrc: '/path/to/prototype.png', // Replace with your image path
  },
  {
    title: 'Successful Deployment    ',
    description: 'When you decide to work with a thriving web and mobile app development company like us, you unlock the best tech-driven solutions that stand the test of time across multiple environments, including staging and production.We finetune our designs using state-of-the-art testing techniques by testing the overall product usability at Omni-channel platforms to impart a clear big picture of design experience benchmarking, blueprints, personas, and journey maps of ideal consumers.',
    imgSrc: '/path/to/prototype.png', // Replace with your image path
  },
  {
    title: 'AMC Support    ',
    description: 'Our technology experts are conversant with cutting-edge technology and software trends, maintaining a website and ensuring smooth app performance. Moreover, our foolproof AMC support lends best-in-class customer assistance equipped with hassle-free backend integration for our esteemed patrons.',
    imgSrc: '/path/to/prototype.png', // Replace with your image path
  },
];

function page() {
  return (
    <div className=' m-2 sm:m-10'>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-blue-500 text-lg font-semibold mb-2">What Do We Serve?</h2>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            Comprehensive technology services that integrate digital craftsmanship and business goals.</h1>
        </div>
        <div className="relative flex flex-col items-center">
          <div className=" fixed left-[40%] top-[40%] w-48 h-48 bg-blue-200 rounded-full -z-10"></div>
          <div className=' m-10 text-3xl text-blue-500 font-bold'>Web</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <p className="font-semibold text-lg">
                  {service}
                </p>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-24 border-b-2 border-dotted border-black mt-2"></div>
              </div>
            ))}

          </div>
          <div className=' m-10 text-3xl text-blue-500 font-bold'>App</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {services.map((service, index) => (
              <div key={index} className="relative">
                <p className="font-semibold text-lg">
                  {service}
                </p>
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
};

export default page;



