// "use client"

import React, { Suspense } from "react";
import Image from "next/image";
import OpicityAnimateText from "@/app/utility/OpicityAnimateText";

import m1 from "@/../public/m_1.png";
import m2 from "@/../public/m_2.png";
import m3 from "@/../public/m_3.png";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestoreInstance } from "../../../../firebase-config";
import Loading from "@/app/component/Loading";
import { Interface } from "readline";
import Link from "next/link";

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

const project = {
  id: "ggn39j52Mp3b4jWI3fS8",
  title: "UI/UX",
  projectCompanyName: "Apple",
  projectCompanyDesc:
    "our company is mainly in web and mobile application devlopment using native and cross platform like flutter and firebase , we devlope efficient app .",
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/smitshah-portfolio.appspot.com/o/Difi%20studd%2F101fcece-7ba2-432f-bf40-35252d09c8fa-Screenshot%20from%202024-06-05%2000-40-14.png?alt=media&token=7507a042-1e07-4ea9-9dd6-298a7f4507f8",
  resultStatistics: [
    { number: "500+", description: "Downloads" },
    { number: "10000+", description: "Impressions" },
    { description: "avg ad", number: "10+" },
  ],
  scopeOfWork: [],
  projectDesc:
    "our company is mainly in web and mobile application devlopment using native and cross platform like flutter and firebase , we devlope efficient app .",
  industryName: "Mobile",
  screens: [
    "https://firebasestorage.googleapis.com/v0/b/smitshah-portfolio.appspot.com/o/Difi%20studd%2F07be82a1-1a63-4ac1-a540-2fa78b5dc93b-Screenshot%20from%202024-06-05%2000-40-44.png?alt=media&token=338a8265-74e1-46da-8c4c-b85faedaeaa2",
    "https://firebasestorage.googleapis.com/v0/b/smitshah-portfolio.appspot.com/o/Difi%20studd%2Ff8a8ebd0-2b3e-44ae-b6e9-14be1a99b7ff-Screenshot%20from%202024-06-05%2000-41-08.png?alt=media&token=32bfd07a-7bb1-432a-9f1f-c3620f17a4d5",
    "https://firebasestorage.googleapis.com/v0/b/smitshah-portfolio.appspot.com/o/Difi%20studd%2F0033f2e1-207a-40f8-a69d-55b86948b2c2-Screenshot%20from%202024-06-05%2000-41-22.png?alt=media&token=358393cf-1d52-4961-9582-8063f9bdcc1b",
    "https://firebasestorage.googleapis.com/v0/b/smitshah-portfolio.appspot.com/o/Difi%20studd%2Fca609389-f81b-41a9-b545-3383f8d54f9a-Screenshot%20from%202024-06-05%2000-41-27.png?alt=media&token=890f15a9-82e4-4599-b91b-e30ba714142c",
  ],
};

const getOneProject = async (id: string) => {
  const docRef = doc(firestoreInstance, "projects", id); // Replace with your collection name
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists!) {
      return docSnap.data();
    } else {
      return false;
      console.log("No document found with the provided ID.");
    }
  } catch (error) {
    return false;
    console.error("Error fetching document:", error);
  }
};

// dynmaic get id and show in dive next js

const challenges = [
  "Deciphering and translating Peeyo’s essence into a cohesive visual identity.",
  "Designing packaging that not only showcased the product but also communicated the brand’s essence.",
  "Creating a harmonious colour palette to align with Peeyo’s unique canned mocktail packaging.",
  "Balancing distinct flavour representations while maintaining a cohesive brand image across the product line.",
];
interface restype {
  title: string;
  thumbnail: string;
  industryName: string;
  projectCompanyName: string;
  solution: string;
  screens: string[];
  chellenges: string[];
}

async function page({ params }: RouteParams) {
  let res = await getOneProject(params.productid);
  if (!res) {
    return <div>Project not found</div>;
  }

  console.log(res);

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
        {/* section 2   chelleges /}
        {/* ---------------------------------------- */}

        <div className=" text-black p-6 my-10 sm:m-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-3xl  font-bold text-red-500 m-5">
              Chellenges
            </div>
            <div className="border-gray-700">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="challenge flex items-start py-4 border-b border-gray-700"
                >
                  <div className="text-gray-400 font-bold text-xl mr-4">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="text-base leading-relaxed">{challenge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------- */}
        {/* section 3  2 img*/}
        {/* ---------------------------------------- */}

        <div className="flex flex-col sm:flex-row  justify-center gap-4">
          {/* first img */}
          <div className=" h-auto   bg-slate-200  overflow-hidden">
            <Image
              className=""
              src={res.screens[0]}
              width="600"
              height={600}
              alt="banner"
              objectFit="cover"
            ></Image>
          </div>

          {/* second img */}
          <div className=" h-auto   bg-slate-200  overflow-hidden">
            <Image
              className=""
              src={res.screens[0]}
              width="600"
              height={600}
              alt="banner"
              objectFit="cover"
            ></Image>
          </div>
        </div>
        {/* ---------------------------------------- */}
        {/* section 4   SOlution*/}
        {/* ---------------------------------------- */}

        <div className="flex flex-col my-14 m-4">
          <div className="text-2xl my-5 ">Industry : {res.industryName}</div>
          <div className="text-2xl font-bold ">Solution</div>
          <div className=" ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum quis
            deleniti dolorem aperiam corrupti a, incidunt suscipit nesciunt
            repudiandae ullam necessitatibus, et cupiditate officiis ea odit ab,
            dignissimos sed iste?Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Laboriosam, at! Odio totam sunt maiores corporis
            eum, ipsa quod. Autem magnam, temporibus totam consectetur veniam
            hic. Animi eligendi deleniti quam debitis. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Repellat voluptas, nam blanditiis
            officiis a velit rerum pariatur voluptatibus consequuntur
            voluptatum. Accusamus est consequatur, eveniet voluptates
            exercitationem soluta beatae. Asperiores, ex.lorem3 Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Ipsam unde sed magni
            reiciendis velit nihil, enim, cupiditate aliquam ea doloribus
            repellat dolorem at dolore similique saepe quibusdam necessitatibus
            obcaecati dignissimos?
          </div>
        </div>
        {/* ---------------------------------------- */}
        {/* section 5   2 img
        {/* ---------------------------------------- */}

        <div className="flex flex-col sm:flex-row  justify-center gap-4 ">
          {/* first img */}
          <div className=" h-auto   bg-slate-200  overflow-hidden">
            <Image
              className=""
              src={res.screens[0]}
              width="600"
              height={600}
              alt="banner"
              objectFit="cover"
            ></Image>
          </div>

          {/* second img */}
          <div className=" h-auto   bg-slate-200  overflow-hidden">
            <Image
              className=""
              src={res.screens[0]}
              width="600"
              height={600}
              alt="banner"
              objectFit="cover"
            ></Image>
          </div>
        </div>

        {/* ---------------------------------------- */}
        {/* section 6  3 LOGO*/}
        {/* ---------------------------------------- */}

        {/* <ScopeOfWork2></ScopeOfWork2> */}
        <div className="flex flex-col sm:flex-row justify-center gap-10 items-center h-screen bg-white">
          <div className="flex flex-col items-center h-[150px] w-[200px]">
            <div className="h-[100px] w-[100px]">
              <Image src={m1} alt="m1" height={150} width={150}></Image>
            </div>
            <span className="text-xl">Increased Brand Awareness</span>
          </div>
          <div className="flex flex-col items-center h-[150px] w-[200px] ">
            <div className="h-[100px] w-[100px]">
              <Image src={m2} alt="m1" height={150} width={150}></Image>
            </div>
            <span className="text-xl">Improved Sales</span>
          </div>
          <div className="flex flex-col items-center h-[150px] w-[200px] ">
            <div className="h-[100px] w-[100px]">
              <Image src={m3} alt="m1" height={150} width={150}></Image>
            </div>
            <span className="text-xl">Better Value</span>
          </div>
        </div>
        {/* ---------------------------------------- */}
        {/* section 7  3 LOGO*/}
        {/* ---------------------------------------- */}
        <div className="bg-pink-500 text-white p-6 rounded-lg  mx-auto sm:mt-10">
          <h2 className="text-2xl font-bold mb-2">Make the Move</h2>
          <h3 className="text-lg font-semibold mb-2">REACH OUT</h3>
          <p className="mb-4">
            If you’re looking for a holistic agency to work on your big dream,
            just say the magic words!
          </p>
          <button className="bg-transparent text-white font-semibold py-2 px-4 border border-white rounded-lg hover:bg-white hover:text-pink-500">
            LET’S COLLABORATE
          </button>
        </div>

        {/* ---------------------------------------- */}
        {/* section 8 more stuff*/}
        {/* ---------------------------------------- */}
        <div className="flex flex-col my-14 m-4">
          <div className="text-2xl my-1 ">More</div>
          <div className="text-2xl text-gray-400 font-bold ">Good Stuff</div>
        </div>

        <div className="flex flex-row flex-wrap">
          <div className=" m-3   w-[350px]">
            <Link href={"./work/" + project.id}>
              <article className="relative h-[300px] isolate flex flex-col just    ify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 ">
                <Image
                  src={project.thumbnail}
                  alt="University of Southern California"
                  className="absolute inset-0 h-full w-full object-cover"
                  width={200}
                  height={200}
                ></Image>
                <div className="absolute inset-0 bottom-[0px] bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-8  text-3xl font-bold text-white">
                  {project.title}
                </h3>
                <div className="z-10 bottom-0 text-red-400 overflow-hidden text-sm  text- font-bold">
                  {" "}
                  {"for " + project.projectCompanyName + " company"}{" "}
                </div>
              </article>
            </Link>
          </div>
          <div className=" m-3   w-[350px]">
            <Link href={"/work/" + project.id}>
              <article className="relative h-[300px] isolate flex flex-col just    ify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 ">
                <Image
                  src={project.thumbnail}
                  alt="University of Southern California"
                  className="absolute inset-0 h-full w-full object-cover"
                  width={200}
                  height={200}
                ></Image>
                <div className="absolute inset-0 bottom-[0px] bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-8  text-3xl font-bold text-white">
                  {project.title}
                </h3>
                <div className="z-10 bottom-0 text-red-400 overflow-hidden text-sm  text- font-bold">
                  {" "}
                  {"for " + project.projectCompanyName + " company"}{" "}
                </div>
              </article>
            </Link>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default page;
