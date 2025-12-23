"use client";

import dynamic from "next/dynamic";
import triangle from "../../../../public/triangle.json";
import Animated_text from "../../component/Animated_text";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

function Section1() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center sm:flex-row">
        <div className="mt-10 h-1/2 w-1/2 sm:h-1/3 sm:w-1/3">
          <Player src={triangle} className="player" loop autoplay />
        </div>

        <div className="flex flex-col mt-10 m-6 justify-center superBold">
          <div>
            <Animated_text
              text={"Ideate | Connect | Automate"}
              mode="single"
              weight="font-[900]"
              size={"text-5xl "}
              space={false}
            >
              {" "}
            </Animated_text>
          </div>

          <div className="my-6   sm:my-8 ">
            <Animated_text
              text={"We Help You Reach From Zero To Millions."}
              mode={"multi"}
              weight={"font-normal"}
              size={" text-lg sm:text-lg"}
              space={true}
            ></Animated_text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
