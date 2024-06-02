"use client"
import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
function ImgSlider({ screens }) {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {screens &&
          screens.map((screen, index) => (
            <div key={index} className="embla__slide  border-1 border-gray-400">
              <Image
                alt="ss"
                className="p-2 sm:p-8 h-[300px] sm:h-[500px] w-screen"
                height={200}
                width={200}
                priority
                src={screen}
              ></Image>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ImgSlider
