import React from 'react';
import { motion } from 'framer-motion';

const Slide1_Title = () => {
    return (
        <div className="relative h-full w-full overflow-hidden flex flex-col items-center justify-center text-center px-8">
            {/* Light moving gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 bg-[length:400%_400%] animate-gradient-xy -z-20" />

            {/* Subtle floating particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-blue-400/10 rounded-full blur-sm"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        x: [null, (Math.random() - 0.5) * 50],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 20 + 10 + "px",
                        height: Math.random() * 20 + 10 + "px",
                    }}
                />
            ))}

            {/* Title with slow zoom-in */}
            <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight z-10"
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
                className="text-xl md:text-2xl text-slate-300 italic z-10"
            >
                “Why every scalable system needs one”
            </motion.p>
        </div>
    );
};

export default Slide1_Title;
