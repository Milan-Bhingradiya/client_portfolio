"use client"
import { mystore } from '@/app/store/mystore';
import React, { use, useState } from 'react';


const Ball = ({ top, left, delay ,color }:any) => {


  const ballSize = mystore((state:any) => state.ballSize)
  console.log(ballSize.height, ballSize.width)
  console.log(ballSize.height, ballSize.width)
    return (
      <div
        className={`ball duration-1000 ease-out ${color}`}
        style={{
            height: `${ballSize.height}px`,
          width: `${ballSize.width}px`,
          top: `${top}px`,
          left: `${left}px`,
          transitionDelay: `${0}s`,
        }}
      />
    );
  };

export default Ball;
