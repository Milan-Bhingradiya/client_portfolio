// src/components/ServiceList.js
import Image from 'next/image';
import React from 'react';

import branding from '../../../../public/branding.png';
import ux from '../../../../public/UIUX.png';
import ui from '../../../../public/UI.png';
import development from '../../../../public/devlopment.png';



const services = [
    "Email Marketing"
    , "ASO"
    , "Content Marketing"
    , "Branding"
    , "PPC Campaign"
    , "Video Marketing"
    , "SEO"
    , "SMO"
    , "SMM"
];

const steps = [
    {
        title: 'Research',
        description: 'At Leo9, we develop future-proof brands with meticulous research to define a business problem by assessing existing marketing collaterals.',
        imgSrc: '/path/to/empathise.png', // Replace with your image path
    },
    {
        title: 'Positioning ',
        description: 'With brands, we work to co-create the brand’s purpose, vision, platform, architecture, and brand message matrix by blending human behavioural patterns with data science.',
        imgSrc: '/path/to/define.png', // Replace with your image path
    },
    {
        title: 'Creative',
        description: 'Right from creating top-notch visual to verbal identity to guidelines, from brand assets to brand sprints, we help our clients deliver value-driven brand positioning outcomes.',
        imgSrc: '/path/to/ideation.png', // Replace with your image path
    },
    {
        title: 'Marketing',
        description: 'We create future-proof brand touchpoints and ensure seamless interaction between the brand and its users powered by security and performance.',
        imgSrc: '/path/to/prototype.png', // Replace with your image path
    },
    {
        title: 'Management    ',
        description: 'We unlock scalable and accessible solutions for effortless customer interactions to help brands manage their customers’ pain points by identifying the customer experience gaps and bringing the brand closer to customers.',
        imgSrc: '/path/to/prototype.png', // Replace with your image path
    }
];

function page() {
    return (
        <div className=' m-2 sm:m-10'>

            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-8">
                    <h2 className="text-purple-500 text-lg font-semibold mb-2">What Do We Serve?</h2>
                    <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                        Comprehensive technology services that integrate digital craftsmanship and business goals.</h1>

                </div>
                <div className="relative flex flex-col items-center">
                    <div className=" fixed left-[40%] top-[40%] w-48 h-48 bg-blue-200 rounded-full -z-10"></div>
                    {/* <div className=' m-10 text-3xl text-blue-500 font-bold'>Web</div> */}
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








            <div className=' flex justify-center items-center m-10 text-3xl text-blue-500 font-bold'>HOW WE DO IT ?</div>

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



