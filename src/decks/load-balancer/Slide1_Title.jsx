import React from 'react';
import { motion } from 'framer-motion';

const Slide1_Title = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center px-8">
            {/* Title with slow zoom-in */}
            <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight"
            >
                Load Balancer
                <span className="block text-4xl md:text-5xl mt-4 text-blue-400 font-bold">
                    In-depth Explained
                </span>
                <span className="block text-2xl md:text-3xl mt-2 text-slate-400 font-normal">
                    (Beginner Level)
                </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl md:text-2xl text-slate-300 italic"
            >
                “Why every scalable system needs one”
            </motion.p>
        </div>
    );
};

export default Slide1_Title;
