"use client"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const ImageSlider = ({ screens }) => {
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

          <div>
            <div className=" h-[90vh] w-[90vw] flex justify-center items-center">
              <img src={screen} alt="Image" className="h-full  object-cover">
              </img>
            </div>
          </div>
        ))}

      </Slider>
    </div>
  );
};

export default ImageSlider
  ;