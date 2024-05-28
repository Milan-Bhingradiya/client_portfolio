// "use client"
import Image from 'next/image';
import React from 'react';
import branding from '../../../public/branding.png';
import ux from '../../../public/UIUX.png';
import ui from '../../../public/UI.png';
import development from '../../../public/devlopment.png';

const img=[branding,ux,ui,development
]
let i=0;
const features = [
    {
        title: 'Branding',
        description: 'Designed brand logo and guidelines that suited best for the business.',
        icon: { branding }
    },
    {
        title: 'UX Design',
        description: 'Keeping the target audience in mind the UX design was made very simple using the KISS principle.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-indigo-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9z" />
            </svg>
        ),
    },
    {
        title: 'UI Design',
        description: 'The colors and illustrations were designed to suit the business following a component-based design system.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-indigo-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9z" />
            </svg>
        ),
    },
    {
        title: 'Development',
        description: 'Our experienced developers completed their job by developing a fully functional mobile app keeping experience design at the core.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-indigo-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0-4.97-4.03-9-9-9S3 7.03 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9z" />
            </svg>
        ),
    },
];

const ScopeOfWork = () => {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="text-center">
                        <div className="mb-4  flex justify-center items-center">
                           <Image src={img[i++]} alt={feature.title} width={100} height={100} />

                          
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScopeOfWork;
