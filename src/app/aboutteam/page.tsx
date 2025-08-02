"use client";
import React from "react";
import FounderCard from "./component/FounderCard";
import Animated_text from "../component/Animated_text";

function page() {
  return (
    <div className="flex flex-col justify-center items-start ">
      <div className="m-10 mx-20">
        <Animated_text
          text={"About Team "}
          mode="single"
          weight="superBold"
          size={"text-4xl sm:text-5xl "}
          space={false}
        >
          {" "}
        </Animated_text>
      </div>

      <div className="flex flex-row justify-center w-screen gap-4  ">
        <FounderCard></FounderCard>
        {/* <FounderCard></FounderCard>
                <FounderCard></FounderCard> */}
      </div>
    </div>
  );
}

export default page;
