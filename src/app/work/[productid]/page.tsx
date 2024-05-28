// "use client"

import Project from '@/app/api/model/Project';
import { useRouter } from 'next/router'
import React from 'react'
import phone from '../../../../public/phone.png'
import Image from 'next/image';
import { motion } from 'framer-motion';
import OpicityAnimateText from '@/app/utility/OpicityAnimateText';
import ImageSlider from '@/app/component/ImageSlider';
import withAnimation from '@/app/utility/withAnimation';
import ScopeOfWork from '@/app/component/ScopeOfWork';

// const AnimatedImageSlider = withAnimation(ImageSlider);



//   {
//     "title": "SPS Canada",
//     "desc": "SPS Canada is a team of independent and licensed professionals who have been trained on the latest legal and immigration processes and procedures to help individuals and families navigate smoothly to the complex process of migration to Canada.",
//     "projectCompanyName": "SPS Canada",
//     "projectCompanyDesc": " (removed per your request)",
//     "work": [
//         "UI/UX",
//         "Web",
//         "Branding",
//         "Development"
//     ],
//     "scopeOfWorkLine": "We combined UI/UX design, illustration, and development to deliver a powerful digital solution.",
//     "scopeOfWork": [
//         "Deliverable 1",
//         "Deliverable 2"
//     ],
//     "projectGoalLine": "Guide users through our services and capture leads for seamless migration support.",
//     "projectGoal": [
//         "Increase user engagement",
//         "Improve conversion rate",
//         "Brand Awareness"
//     ],
//     "screens": [
//         "Homepage wireframe"
//     ],
//     "researchLine": "We conducted user research (18-55 age group) to identify pain points during the Canadian visa application process.",
//     "keepTakeAway": [
//         "Too many documents",
//         "No idea about the process",
//         "No guidance for applying",
//         "Costly agent fees"
//     ],
//     "resultStatistics": [
//         { percentage: "49%", description: "Increase In Conversion Rate" },
//         { percentage: "17%", description: "Reduced Bounce Rate" },
//         { percentage: "3200+", description: "Average Visitors On Site" }
//     ]
// }


interface RouteParams {
    params: {
        [key: string]: string; // Dynamic string type for all parameters
    };
}

const getProjectById = async (id: string) => {
    let res = null;
    try {
        res = await Project.findById(id);
        if (res == null) {
            return false;
        }
        return res;
    } catch (error) {
        console.log(error)
        return false;
    }
}



// dynmaic get id and show in dive next js

const steps = [
    { id: 1, label: "", color: "bg-red-500", textColor: "text-red-500" },
    { id: 2, label: "", color: "bg-blue-500", textColor: "text-blue-500" },
    { id: 3, label: "", color: "bg-purple-500", textColor: "text-purple-500" },
    { id: 4, label: "", color: "bg-green-500", textColor: "<text-green-5></text-green-5>00" }
];


async function page({ params }: RouteParams) {
    let res;
    res = await getProjectById(params.productid);
    if (!res) {
        return (
            <div>Project not found</div>
        )
    } else {

        res.keepTakeAway.forEach((label:string, index:any) => {
            // Ensure unique IDs (important for rendering or identification)
            steps[index].id = index + 1; // Update ID directly in the steps array

            // Apply a color scheme (adjust as needed)
            // const colorClasses = ["bg-red-500", "bg-blue-500", "bg-purple-500", "bg-green-500"];
            // const textColorClasses = ["ext-red-500", "text-blue-500", "text-purple-500", "text-green-500"];
            // steps[index].color = colorClasses[index % colorClasses.length]; // Update color

            // Clear and concise label based on pain point
            steps[index].label = label; // Update label

            // White text color for better contrast (optional)
            // steps[index].textColor = textColorClasses[index % textColorClasses.length]; // Update color
        });

    }


    console.log(res)

    return (
        <div className=' sm:m-16  '>

            {/* ---------------------------------------- */}
            {/* section 1  Main Banner  */}
            {/* ---------------------------------------- */}

            {/* section 1 banner */}

            <div className=' h-auto sm:h-[450px]  bg-slate-200  sm:overflow-hidden' >


                <div className='flex  flex-col md:flex-row flex-wrap'>

                    {/*  left  */}
                    <div className='md:w-[50%] w-[100%] h-[470px]  '>
                        <div className='p-10 pb-0 text-2xl sm:text-4xl  font-bold'>client</div>
                        <div className='pl-10 pt-4 text-3xl sm:text-7xl  font-bold'>{res.projectCompanyName}</div>
                        <div className='p-10   font-bold'>{res.projectCompanyDesc}</div>
                        <div className='pl-10 flex flex-row gap-2'>

                            {
                                res.work.map((name:string, index:any) => (
                                    <div key={index}>
                                        <div className=' pb-0 lg:text-2xl  font-bold'>{name + " "}</div>
                                        <div> </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    {/* 
                    <div >
                        <div className=' h-[470px] md:w-[50%] w-[100%] border-r-2 border-gray-300'></div>
                    </div> */}

                    {/* right */}
                    <div className='h-[470px] md:w-[50%] w-[100%]  flex flex-row justify-center items-center'>
                        <Image   priority height={200} width={200} className='  -rotate-12 mt-2' alt="am " src={phone}>
                        </Image>
                        {/* <Image style={{ width: '100%', height: 'auto' }}  className=' h-[400px] w-max  -rotate-12 mt-2' alt="am " src={phone}>
                        </Image> */}
                    </div>
                </div>
            </div>


            {/* ---------------------------------------- */}
            {/* section 2   Scope of work*/}
            {/* ---------------------------------------- */}


            <div className='mt-24'>
                <OpicityAnimateText text="Scope Of Work." size="text-3xl" font="font-bold"></OpicityAnimateText>
            </div>
            <div className='mt-2'>
                <OpicityAnimateText text={res.scopeOfWorkLine} size="text-[20px]"></OpicityAnimateText>
            </div>

            {/* NOTE: baku chhe but niche mujab karis...
             ani andar work je banner ma use karu chhu ej send karu chhu , then  aa component ma jay ne work["ui,"branding"]  amathi je match thay e j batavanu out of 4 .. */}
            <ScopeOfWork></ScopeOfWork>


            {/* ---------------------------------------- */}
            {/* section 3   Project Goals*/}
            {/* ---------------------------------------- */}

            <div className='mt-24'>
                <OpicityAnimateText text="     Project Goals." size="text-3xl" font="font-bold"></OpicityAnimateText>
            </div>
            <div className='mt-2'>
                <OpicityAnimateText text={res.projectGoalLine} size="text-[20px]"></OpicityAnimateText>
            </div>

            <div className='flex flex-row  flex-wrap gap-10 justify-center m-10 '>

                {res.projectGoal.map((goal:string,index:any) => (

                    <div key={index} className='h-[180px] w-[230px] bg-blue-600 text-2xl font-bold text-white flex flex-col justify-center items-center p-4 '>
                        {goal}
                    </div>
                ))}



            </div>

            {/* ---------------------------------------- */}
            {/* section 4   Research and key take away*/}
            {/* ---------------------------------------- */}


            <div className='mt-24  '>
                <OpicityAnimateText text="Research." size="text-3xl" font="font-bold"></OpicityAnimateText>
            </div>
            <div className='mt-2'>
                <OpicityAnimateText text={res.researchLine} size="text-[20px]"></OpicityAnimateText>
            </div>



            <div className='m-16'>
                <OpicityAnimateText text="Key Take Away" size="text-3xl" font="font-bold"></OpicityAnimateText>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around w-full px-4 py-8">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center text-center mb-6 sm:mb-0">
                        <div className={`rounded-full h-12 w-12 flex items-center justify-center ${step.color} text-white mb-2`}>
                            {String(step.id).padStart(2, '0')}
                        </div>
                        <span className={`text-lg ${step.textColor}`}>{step.label}</span>
                        <div className="hidden sm:block border-t-2 border-gray-300 w-24 mt-4"></div>
                        {/* {index < steps.length - 1 && (
                        )} */}
                    </div>
                ))}
            </div>


            {/* ---------------------------------------- */}
            {/* section 5  Screenshots*/}
            {/* ---------------------------------------- */}
     
            <OpicityAnimateText text="Screenshots." size="text-3xl" font="font-bold"></OpicityAnimateText>

            <div className='overflow-hidden border-2 border-gray-300 rounded-lg m-2' >
                {/* <ImageSlider screens={res.screens}></ImageSlider> */}
            </div>




            {/* ---------------------------------------- */}
            {/* section 6   result*/}
            {/* ---------------------------------------- */}

            <div className='mt-24'>
                <OpicityAnimateText text="Result" size="text-3xl" font="font-bold"></OpicityAnimateText>
            </div>
            <div className='mt-2'>
                <OpicityAnimateText text="The app saves your time and lets you lock or unlock your BMW and activate the climate control, anytime and anywhere. Simplified UX helps you find your car in a panic situation. A single tap can find dealers and schedule service appointments." size="text-[20px]"></OpicityAnimateText>
            </div>

            <div className="container mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {res.resultStatistics.map((stat: { percentage: string; description: string }, index:any) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="text-5xl font-bold text-red-500 mb-2">{stat.percentage}</div>
                            <div className="text-lg text-gray-700">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>







        </div>
    )
}

export default page