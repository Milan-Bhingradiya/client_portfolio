import React from "react";
import "./Testimonial.css";
import Image from "next/image";
import { motion } from "framer-motion";

function Testimonial({ data }: any) {
  return (
    <motion.div
      className="flex flex-col items-center min-w-full sm:p-10 sm:pb-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <h2 className="text-2xl font-bold text-black mb-4">
        milan - ceo of twitter
      </h2>
      <div className="relative w-full max-w-xl h-[400px] flex items-center justify-center rounded-2xl overflow-hidden bg-transparent">
        <Image
          src={data.image}
          alt="milan - ceo of twitter"
          layout="fill"
          className="object-scale-down rounded-2xl shadow-xl bg-transparent"
          priority
        />
      </div>
    </motion.div>
  );
}

export default Testimonial;
