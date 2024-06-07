import React from "react";
import "./Testimonial.css";
import Image from "next/image";

function Testimonial() {
  return (
    <div className=" flex flex-row justify-center min-w-full sm:p-10  sm:pb-8 rounded-lg ">
      <figure className="snip1390 ">
        <figcaption>
          <h2>Eleanor Crisp</h2>
          <h4>UX Design</h4>
          <div className="flex flex-row justify-center">
            <Image
              src="https://picsum.photos/300/300"
              alt="m"
              width={400}
              height={400}
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
