// "use client"

import React, { Suspense } from "react"
import Image from "next/image"
import OpicityAnimateText from "@/app/utility/OpicityAnimateText"
import ImgSlider from "@/app/component/ImgSlider"
import ScopeOfWork from "@/app/component/ScopeOfWork"
import banner from "@/../public/1.jpg"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { firestoreInstance } from "../../../../firebase-config"
import Loading from "@/app/component/Loading"
import { Interface } from "readline"

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
    [key: string]: string // Dynamic string type for all parameters
  }
}

// const getProjectById = async (id: string) => {
//     await dbConnect();
//     let res = null;
//     try {
//         res = await Project.findById(id);
//         if (res == null) {
//             return false;
//         }
//         return res;
//     } catch (error) {
//         console.log(error)
//         return false;
//     }
// }

const getOneProject = async (id: string) => {
  const docRef = doc(firestoreInstance, "projects", id) // Replace with your collection name
  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists!) {
      return docSnap.data()
    } else {
      return false
      console.log("No document found with the provided ID.")
    }
  } catch (error) {
    return false
    console.error("Error fetching document:", error)
  }
}

// dynmaic get id and show in dive next js

const steps = [
  { id: 1, label: "", color: "bg-red-500", textColor: "text-red-500" },
  { id: 2, label: "", color: "bg-blue-500", textColor: "text-blue-500" },
  { id: 3, label: "", color: "bg-purple-500", textColor: "text-purple-500" },
  {
    id: 4,
    label: "",
    color: "bg-green-500",
    textColor: "<text-green-5></text-green-5>00",
  },
]

interface restype {
  id: string
  thumbnail: string
  projectCompanyName: string
  scopeOfWorkLine: string
  screens: string[]
  projectGoalLine: string
  projectGoal: string[]
  researchLine: string
  resultStatistics: { number: string; description: string }[]
}

async function page({ params }: RouteParams) {
  let res: restype | undefined

  res = (await getOneProject(params.productid)) as restype
  if (!res) {
    return <div>Project not found</div>
  }

  console.log(res)

  return (
    <Suspense fallback={<Loading />}>
      <div className="m-2 sm:m-16   ">
        <div className="mx-2 sm:mx-10 mb-5  ">
          <div className="sm:p-5 pb-0 text-2xl sm:text-4xl font-bold">
            client
          </div>
          <div className="sm:pl-5 pt-4 text-3xl  sm:text-7xl  font-bold">
            {res.projectCompanyName}
          </div>
        </div>
        {/* ---------------------------------------- */}
        {/* section 1  Main Banner  */}
        {/* ---------------------------------------- */}

        {/* section 1 banner */}

        <div className=" h-auto   bg-slate-200  overflow-hidden">
          <Image
            className=""
            src={res.thumbnail}
            width="800"
            height={300}
            alt="banner"
            objectFit="cover"
          ></Image>
        </div>

        {/* ---------------------------------------- */}
        {/* section 2   Scope of work*/}
        {/* ---------------------------------------- */}

        <div className="mt-24">
          <OpicityAnimateText
            text="Scope Of Work."
            size="text-3xl"
            font="font-bold"
          ></OpicityAnimateText>
        </div>
        <div className="mt-2">
          <OpicityAnimateText
            text={res.scopeOfWorkLine}
            size="text-[20px]"
          ></OpicityAnimateText>
        </div>

        {/* NOTE: baku chhe but niche mujab karis...
             ani andar work je banner ma use karu chhu ej send karu chhu , then  aa component ma jay ne work["ui,"branding"]  amathi je match thay e j batavanu out of 4 .. */}
        <ScopeOfWork></ScopeOfWork>

        {/* ---------------------------------------- */}
        {/* section 5  Screenshots*/}
        {/* ---------------------------------------- */}

        <OpicityAnimateText
          className=""
          text="Screenshots."
          size="text-3xl"
          font="font-bold"
        ></OpicityAnimateText>

        <div className="overflow-hidden border-2 border-gray-300 rounded-lg m-2">
          <ImgSlider screens={res.screens}></ImgSlider>
        </div>

        {/* ---------------------------------------- */}
        {/* section 3   Project Goals*/}
        {/* ---------------------------------------- */}

        <div className="mt-24">
          <OpicityAnimateText
            text="     Project Goals."
            size="text-3xl"
            font="font-bold"
          ></OpicityAnimateText>
        </div>
        <div className="mt-2">
          <OpicityAnimateText
            text={res.projectGoalLine}
            size="text-[20px]"
          ></OpicityAnimateText>
        </div>

        <div className="flex flex-row  flex-wrap gap-10 justify-center m-10 ">
          {res.projectGoal.map((goal: string, index: any) => (
            <div
              key={index}
              className="h-[180px] w-[230px] bg-blue-600 text-2xl font-bold text-white flex flex-col justify-center items-center p-4 "
            >
              {goal}
            </div>
          ))}
        </div>

        {/* ---------------------------------------- */}
        {/* section 4   Research and key take away*/}
        {/* ---------------------------------------- */}

        <div className="mt-24  ">
          <OpicityAnimateText
            text="Research."
            size="text-3xl"
            font="font-bold"
          ></OpicityAnimateText>
        </div>
        <div className="mt-2 mb-20">
          <OpicityAnimateText
            text={res.researchLine}
            size="text-[20px]"
          ></OpicityAnimateText>
        </div>

        {/* ---------------------------------------- */}
        {/* section 6   result*/}
        {/* ---------------------------------------- */}

        <div className="mt-24">
          <OpicityAnimateText
            text="Result"
            size="text-3xl"
            font="font-bold"
          ></OpicityAnimateText>
        </div>
        <div className="mt-2">
          <OpicityAnimateText
            text="The app saves your time and lets you lock or unlock your BMW and activate the climate control, anytime and anywhere. Simplified UX helps you find your car in a panic situation. A single tap can find dealers and schedule service appointments."
            size="text-[20px]"
          ></OpicityAnimateText>
        </div>

        <div className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {res.resultStatistics.map(
              (stat: { number: string; description: string }, index: any) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-red-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg text-gray-700">
                    {stat.description}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default page
