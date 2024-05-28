"use client"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ImageSlider = ({ screens }: { screens: string[] }) => {
  const settings = {
    dots: true,
    // speed: 500,
    // slidesToShow: 1,
    slidesToScroll: 1,
    // infinite: true,
    // autoplay: true,
    // autoplaySpeed: 1000,
  };

  return (
    <div>
      <Slider {...settings}>
     
        {screens.map((screen, index) => (

          <div key={index}>
            <div className=" h-[90vh] w-[90vw] flex justify-center items-center">
              <Image height={400} width={400} src={screen} alt="Image" className="h-full  object-cover">
              </Image>
            </div>
          </div>
        ))}

      </Slider>
    </div>
  );
};

export default ImageSlider
  ;