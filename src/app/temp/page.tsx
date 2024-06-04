"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export default function Page() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide  border-2 border-black">
          <Image
            alt="ss"
            className="p-8 h-[300px] sm:h-[500px] w-screen"
            height={200}
            width={200}
            priority
            src="https://firebasestorage.googleapis.com/v0/b/smitshah-portfolio.appspot.com/o/Apple%2F4e10ee26-a1a2-461f-a905-0a9253243adb-Screenshot%20from%202024-06-01%2017-56-58.png?alt=media&token=cc007812-9c94-49c5-b951-d083e686b1f5"
          ></Image>
        </div>
        <div className="embla__slide  border-2 border-black">
          <Image
            alt="ss"
            className="p-8 h-[300px] sm:h-[500px] w-screen"
            height={200}
            width={200}
            src="https://firebasestorage.googleapis.com/v0/b/smitshah-portfolio.appspot.com/o/Apple%2F4e10ee26-a1a2-461f-a905-0a9253243adb-Screenshot%20from%202024-06-01%2017-56-58.png?alt=media&token=cc007812-9c94-49c5-b951-d083e686b1f5"
          ></Image>
        </div>
        <div className="embla__slide  border-2 border-black">
          <Image
            alt="ss"
            className="p-8 h-[300px] sm:h-[500px] w-screen"
            height={200}
            width={200}
            src="https://firebasestorage.googleapis.com/v0/b/smitshah-portfolio.appspot.com/o/Apple%2F4e10ee26-a1a2-461f-a905-0a9253243adb-Screenshot%20from%202024-06-01%2017-56-58.png?alt=media&token=cc007812-9c94-49c5-b951-d083e686b1f5"
          ></Image>
        </div>
      </div>
    </div>
  );
}
