// src/components/withAnimation.js
import React from 'react';
import { motion } from 'framer-motion';

const withAnimation = (WrappedComponent:any) => {
    const animationVariant = {
        initial: {
            opacity: 0,
            y: 20, // Start position: 20px below
        },
        animate: {
            opacity: 1,
            y: 0, // Animate to its final position
            transition: {
                duration: 1, // Animation duration in seconds
            },
        },
    };

    // eslint-disable-next-line react/display-name
    return (props:any):any => (
        <motion.div
            variants={animationVariant}
            initial="initial"
            animate="animate"
        >
            <WrappedComponent {...props} />
        </motion.div>
    );
};

export default withAnimation;
