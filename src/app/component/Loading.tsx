// import React from "react"
// import "./m.css"

// function Loading() {
//   return (
//     <div className="fixed top-0   border-2 border-black z-50 bg-white  ">
//       <div className="canvas">
//         <div className="hexagon">
//           <div className="row">
//             <div className="arrow up outer outer-18"></div>
//             <div className="arrow down outer outer-17"></div>
//             <div className="arrow up outer outer-16"></div>
//             <div className="arrow down outer outer-15"></div>
//             <div className="arrow up outer outer-14"></div>
//           </div>
//           <div className="row">
//             <div className="arrow up outer outer-1"></div>
//             <div className="arrow down outer outer-2"></div>
//             <div className="arrow up inner inner-6"></div>
//             <div className="arrow down inner inner-5"></div>
//             <div className="arrow up inner inner-4"></div>
//             <div className="arrow down outer outer-13"></div>
//             <div className="arrow up outer outer-12"></div>
//           </div>
//           <div className="row">
//             <div className="arrow down outer outer-3"></div>
//             <div className="arrow up outer outer-4"></div>
//             <div className="arrow down inner inner-1"></div>
//             <div className="arrow up inner inner-2"></div>
//             <div className="arrow down inner inner-3"></div>
//             <div className="arrow up outer outer-11"></div>
//             <div className="arrow down outer outer-10"></div>
//           </div>
//           <div className="row">
//             <div className="arrow down outer outer-5"></div>
//             <div className="arrow up outer outer-6"></div>
//             <div className="arrow down outer outer-7"></div>
//             <div className="arrow up outer outer-8"></div>
//             <div className="arrow down outer outer-9"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Loading



"use client";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative w-20 h-20">
        {/* Outer ring spinner */}
        <motion.div
          className="absolute w-full h-full border-4 border-t-pink-500 border-r-blue-500 border-b-yellow-400 border-l-teal-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />

        {/* Pulsing dot in center */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-3 h-3 bg-pink-500 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Loading text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground font-semibold"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
