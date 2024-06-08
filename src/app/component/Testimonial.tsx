import React from "react";
import "./Testimonial.css";
import Image from "next/image";

function Testimonial({ data }: any) {
  return (
    <div className=" flex flex-row justify-center min-w-full sm:p-10  sm:pb-8 rounded-lg ">
      <figure className="snip1390 ">
        <figcaption>
          <h2>Eleanor Crisp</h2>
          <h4>UX Design</h4>
          <div className="relative h-[300px] w-[90%] flex flex-row justify-center">
            <Image
              src={data.image}
              alt="m"
              layout="fill"
              className="m-4 sm:m-4 rounded-lg"
            ></Image>
          </div>
        </figcaption>
      </figure>

      {/*  */}
    </div>
  );
}

export default Testimonial;
