"use client"
import { mystore } from '@/app/store/mystore';
import React, { use, useEffect, useRef, useState } from 'react';


const Ball = ({ top, left, delay, color }: any) => {
  const ballRef = useRef<HTMLDivElement>(null); // Reference to the ball element (optional)

  const ballVisible = mystore((state:any) => state.ballVisible)
  const setballVisible = mystore((state:any) => state.setballVisible)
  const ballShouldFollow = mystore((state:any) => state.ballShouldFollow)
  const staticTitleBallVisible = mystore((state:any) => state.staticTitleBallVisible)
  const setstaticTitleBallVisible = mystore((state:any) => state.setstaticTitleBallVisible)



  // useEffect(() => {
  //   if (ballRef.current) {

  //     console.log("ball useeffect : " + (ballRef?.current?.getBoundingClientRect().top - top))
  //     console.log("ball useeffect : " + (ballRef?.current?.getBoundingClientRect().left - left))
  //   }
  //   // Optional logic using ballRef:
  //   if (ballRef.current && // Check if element exists
  //     Math.abs(ballRef?.current?.getBoundingClientRect().bottom - top) < 50 && Math.abs(ballRef?.current?.getBoundingClientRect().right - left) < 50) { // Check proximity to target
  //     console.log("xxxxxxxxxxxxxxxxxxxxxxxx")
  //     setIsVisible(false);
  //   }
  // }, [top, left])



  useEffect(() => {
    const checkPosition = () => {
      // const currentScrollY = window.scrollY;

      if (ballRef.current) {
        const ballRect = ballRef.current.getBoundingClientRect();
        if (Math.abs(ballRect.top - top) < 40 && Math.abs(ballRect.left - left) < 40) {
          setballVisible(false)

          //if jo ball ne title no pichho karvano hoy to title ni baju vala bal static visible karvana when animation stop..
         


        }
      }
    };

    const interval = setInterval(checkPosition,1000);



    
    return () => clearInterval(interval);
  }, [top, left]);


  const ballSize = mystore((state: any) => state.ballSize)


  if (!ballVisible) {
    return null;
  }


  return (
    <div
      ref={ballRef}
      className={`ball   ${color}`}
      style={{
        transition: `all 0.5s ease-out`,
        height: `${ballSize.height}px`,
        width: `${ballSize.width}px`,
        // top: `${top}px`,
        // left: `${left}px`,
        transform: `translateX(${left}px) translateY(${top}px)`,
        transitionDelay: `${delay}s`,
      }}
    />
  );
};

export default Ball;
