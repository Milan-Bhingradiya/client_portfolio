
"use client"
import { motion } from "framer-motion";

function Animated_text(
  { text, mode ,weight,size ,space}: any

) {
  let text2;
  if (mode == 'single') {
    text2 = text.split("");
  } else   if (mode == 'multi') {
  
      text2 = text.split(" ");

    }

    return (
      <div className="App">
        {text2.map((el: any, i: any) => (
          <motion.span
            className={'text-4xl '+weight+" "+size} initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.25,
              delay: i / 10,
            }}
            key={i}
          >
        


            {(el=='|')? <br></br> : el}{space?" ":""}
          </motion.span>
        ))}
      </div>
    );
  }

  export default Animated_text;
