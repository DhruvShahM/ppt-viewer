import React from 'react';
import { motion } from 'framer-motion';

const Slide1_Title = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-blue-400 rounded-full opacity-20"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        x: [null, (Math.random() - 0.5) * 50],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 10 + 5,
                        height: Math.random() * 10 + 5,
                    }}
                />
            ))}

            {/* Flowing Gradient Overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Title */}
            <motion.h1
                className="text-6xl font-bold text-white mb-6 text-center z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                Rate Limiting <br />
                <span className="text-blue-400">In-depth Explained</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="text-2xl text-gray-300 z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                "How systems control and limit traffic safely"
            </motion.p>
        </div>
    );
};

export default Slide1_Title;