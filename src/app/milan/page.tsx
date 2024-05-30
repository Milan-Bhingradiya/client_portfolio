"use client"
import React, { useEffect, useState } from 'react';

const BallAnimation = () => {
  const [positions, setPositions] = useState({
    k: { top: '-50px', left: '-50px', opacity: 0 },
    p: { top: '-50px', left: '-50px', opacity: 0 },
    i: { top: '-50px', left: '-50px', opacity: 0 },
  });

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setPositions((prev) => ({
        ...prev,
        k: { top: '0', left: '0', opacity: 1 },
      }));
    }, 1000);

    const timeout2 = setTimeout(() => {
      setPositions((prev) => ({
        ...prev,
        p: { top: '0', left: '0', opacity: 1 },
      }));
    }, 1500);

    const timeout3 = setTimeout(() => {
      setPositions((prev) => ({
        ...prev,
        i: { top: '0', left: '0', opacity: 1 },
      }));
    }, 2000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div className="flex flex-row w-[100%] justify-center relative">
      <div id="k" className="text-3xl sm:text-4xl font-bold m-4 mx-6 relative z-10">k</div>
      <div id="p" className="text-3xl sm:text-4xl font-bold m-4 mx-6 relative z-10">p</div>
      <div id="i" className="text-3xl sm:text-4xl font-bold m-4 mx-6 relative z-10">i</div>

      <div
        className="ball bg-red-500"
        style={{ top: positions.k.top, left: positions.k.left, opacity: positions.k.opacity }}
      ></div>
      <div
        className="ball bg-red-500"
        style={{ top: positions.k.top, left: positions.k.left, opacity: positions.k.opacity }}
      ></div>
      <div
        className="ball bg-red-500"
        style={{ top: positions.k.top, left: positions.k.left, opacity: positions.k.opacity }}
      ></div>
      <div
        className="ball bg-green-500"
        style={{ top: positions.p.top, left: positions.p.left, opacity: positions.p.opacity }}
      ></div>
      <div
        className="ball bg-blue-500"
        style={{ top: positions.i.top, left: positions.i.left, opacity: positions.i.opacity }}
      ></div>
    </div>
  );
};

export default BallAnimation;
