import React from "react";
import "./Testimonial.css";
import Image from "next/image";

function Testimonial() {
  return (
    <div className="  min-w-full sm:p-20 rounded-xl sm:pt-8 sm:pb-8 rounded-lg bg-[#dedfe7] ">
      <div className="flex flex-col sm:flex-row rounded-xl text-black rounded-lg">
        <figure className="snip1390">
          <figcaption>
            <h2>Eleanor Crisp</h2>
            <h4>UX Design</h4>
            <blockquote>
              Dad buried in landslide! Jubilant throngs fill streets! Stunned
              father inconsolable - demands recount!
            </blockquote>
          </figcaption>
        </figure>

        {/*  */}
        <div className="flex flex-row justify-center">
          <Image
            src="https://picsum.photos/300/300"
            alt="m"
            width={300}
            height={300}
            className="m-8 sm:m-10"
          ></Image>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
