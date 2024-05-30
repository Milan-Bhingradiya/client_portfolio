
// "use client"
// import { motion } from "framer-motion";

// function Animated_text(
//   { text, mode ,weight,size ,space}: any

// ) {
//   let text2;
//   if (mode == 'single') {
//     text2 = text.split("");
//   } else   if (mode == 'multi') {
  
//       text2 = text.split(" ");

//     }

//     return (
//       <div className="App">
//         {text2.map((el: any, i: any) => (
//           <motion.span
//             className={'text-4xl '+weight+" "+size} initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{
//               duration: 0.25,
//               delay: i / 10,
//             }}
//             key={i}
//           >
        


//             {(el=='|')? <br></br> : el}{space?" ":""}
//           </motion.span>
//         ))}
//       </div>
//     );
//   }

//   export default Animated_text;


// import { motion, useViewportScroll } from "framer-motion";

// interface TextProps {
//   text: string; // Enforce string type for text
//   mode: "single" | "multi"; // Limit mode to specific options
//   weight?: string; // Optional weight property
//   size?: string; // Optional size property
//   space?: boolean; // Optional space property
// }

// function AnimatedText({ text, mode, weight, size, space }: TextProps) {
//   const { scrollY } = useViewportScroll();

//   let textSpans: React.ReactElement<any>[]; // Array of React elements

//   if (mode === "single") {
//     textSpans = text.split("").map((el: string, i: number) => ( // Use string type for el
//       <motion.span
//         key={i}
//         className={`text-4xl ${weight || ""} ${size || ""}`} // Handle optional properties
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: false }}
//         transition={{ duration: 0.25, delay: i / 10 }}
//       >
//         {(el === "|") ? <br /> : el}
//         {space ? " " : ""}
//       </motion.span>
//     ));
//   } else if (mode === "multi") {
//     textSpans = text.split(" ").map((el: string, i: number) => ( // Use string type for el
//       <motion.span
//         key={i}
//         className={`text-4xl ${weight || ""} ${size || ""}`} // Handle optional properties
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: false }}
//         transition={{ duration: 0.25, delay: i / 10 }}
//       >
//         {(el === "|") ? <br /> : el}
//         {space ? " " : ""}
//       </motion.span>
//     ));
//   }

//   return (
//     <div className="App">
//       {textSpans}
//     </div>
//   );
// }

// export default AnimatedText;



import { motion, useViewportScroll } from "framer-motion";

interface TextProps {
  text: string;
  mode: "single" | "multi";
  weight?: string;
  size?: string;
  space?: boolean;
  children?: React.ReactNode;
}

function AnimatedText({ text, mode, weight, size, space }: TextProps) {
  const { scrollY } = useViewportScroll();

  let textSpans: React.ReactElement<any>[];

  if (mode === "single") {
    textSpans = text.split("").map((el: string, i: number) => (
      <motion.span
        key={i}
        className={`text-4xl ${weight || ""} ${size || ""}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false}} // Trigger animation only on "down" scroll
        transition={{ duration: 0.25, delay: i / 10 }}
      >
        {(el === "|") ? <br /> : el}
        {space ? " " : ""}
      </motion.span>
    ));
  } else if (mode === "multi") {
    textSpans = text.split(" ").map((el: string, i: number) => (
      <motion.span
        key={i}
        className={`text-4xl ${weight || ""} ${size || ""}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }} // Trigger animation only on "down" scroll
        transition={{ duration: 0.25, delay: i / 10 }}
      >
        {(el === "|") ? <br /> : el}
        {space ? " " : ""}
      </motion.span>
    ));
  }

  return (
    <div className="App">
      {text}
    </div>
  );
}

export default AnimatedText;
