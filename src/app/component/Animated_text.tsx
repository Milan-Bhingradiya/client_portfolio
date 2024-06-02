
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
      {textSpans!}
    </div>
  );
}

export default AnimatedText;
