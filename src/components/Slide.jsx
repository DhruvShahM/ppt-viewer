import React from 'react';
import { motion } from 'framer-motion';

const Slide = React.forwardRef(({ children, isActive = true, noAnimation = false, custom }, ref) => {
    if (noAnimation) {
        return (
            <div ref={ref} className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-12 z-10">
                {children}
            </div>
        );
    }

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <motion.div
            ref={ref}
            custom={custom}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            }}
            className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-12 ${isActive ? 'z-10' : 'z-0'}`}
        >
            {children}
        </motion.div>
    );
});

Slide.displayName = 'Slide';

export default Slide;

