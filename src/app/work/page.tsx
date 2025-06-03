"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Animated_text from "../component/Animated_text";
import Link from "next/link";
import Loading from "../component/Loading";

function Page() {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const [response, setResponse] = useState<any[]>([]);
  useEffect(() => {
    const getAllProject = async () => {
      try {
        const res = await fetch(
          "https://smit-shah-backend-80da1d71856d.herokuapp.com/getprojects"
        );
        const data = await res.json();
        setResponse(data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getAllProject();
  }, []);

  return (
    <div className="m-5 sm:mx-28 sm:mt-10">
      <Animated_text
        text={"We Have Designed Experiences For Over 260 Projects."}
        mode={"multi"}
        weight={"font-extrabold"}
        size={"text-3xl"}
        space={true}
      />
      <Suspense fallback={<Loading />}>
        {/* Responsive grid: 1 col mobile, 2 col sm, 3 col lg, 4 col xl+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-5 justify-center">
          {response &&
            response.map((project: any, index: number) => (
              <motion.div
                key={index}
                className="m-3 w-[350px]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                }}
              >
                <Link href={"./work/" + project._id}>
                  <article className="relative h-[300px] isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <Image
                      src={project.images?.[0] || "/placeholder.png"}
                      alt={project.title || "Project Thumbnail"}
                      className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                      width={400}
                      height={300}
                    />
                    <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                    <h3 className="z-10 mt-8 text-2xl font-bold text-white drop-shadow-lg">
                      {project.title}
                    </h3>
                    <div className="z-10 bottom-0 text-blue-200 overflow-hidden text-sm font-bold drop-shadow">
                      {project.projectCompanyName &&
                        `for ${project.projectCompanyName} company`}
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
        </div>
      </Suspense>
    </div>
  );
}

export default Page;
