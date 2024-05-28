
"use client"
import { motion } from "framer-motion";

function OpicityAnimateText(
    { text,size,font}: any

) {



    const textVariant = {
        initial: {
            y: 20, // Start position: 20px below
            opacity: 0, // Initially invisible
        },
        animate: {
            y: 0, // Animate to its final position
            opacity: 1, // Animate to full opacity
            transition: {
                duration: 0.3, // Animation duration in seconds
            },
        },
    };
    return (
        <motion.div
            className={'text-center  '+size+' '+font}
            // variants={textVariant}
            variants={textVariant}
            initial="initial"
            animate="animate"
            // whileInView={ {opacity: 1} }
            // viewport={{ once: true }}
        >
            {text}
        </motion.div>

    );
}

export default OpicityAnimateText;
