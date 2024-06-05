import React from "react";
import Image from "next/image";
import founder from "../../../public/founder.jpeg";

function Foundercard({ img, companyName }: { img: any; companyName: string }) {
  return (
    <div className="p-10 bg-red-300">
      <div className="relative flex   max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative h-[450px] w-[350px] m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
          <Image
            // src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
            src={img}
            alt="ui/ux review check"
            layout="fill" // This makes the image fill the container
            objectFit="cover" // This ensures the image covers the container
          />
        </div>
        <div className="p-6">
          {/* <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"> */}
          {/* Run campain
        </h4> */}
          <div className="block text-3xl font-sans  antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            for {companyName} company
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foundercard;
