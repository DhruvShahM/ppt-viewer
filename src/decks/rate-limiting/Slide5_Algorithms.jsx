import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sliders, Box, Droplets } from 'lucide-react';

const algorithms = [
    {
        title: "Fixed Window",
        icon: Clock,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        desc: "Resets count at fixed intervals"
    },
    {
        title: "Sliding Window",
        icon: Sliders,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        desc: "Smoother rolling time window"
    },
    {
        title: "Token Bucket",
        icon: Box,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        desc: "Tokens refill, allows bursts"
    },
    {
        title: "Leaky Bucket",
        icon: Droplets,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/30",
        desc: "Constant output rate"
    }
];

const Slide5_Algorithms = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
            <h2 className="text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Popular Algorithms
            </h2>

            <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
                {algorithms.map((algo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.2,
                            type: "spring",
                            stiffness: 100
                        }}
                        className={`p-8 rounded-2xl border ${algo.border} ${algo.bg} backdrop-blur-sm flex flex-col items-center justify-center gap-6 hover:scale-105 transition-transform cursor-pointer`}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
                            className={`p-4 rounded-full bg-slate-900/50 ${algo.color}`}
                        >
                            <algo.icon size={48} />
                        </motion.div>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-2">{algo.title}</h3>
                            <p className="text-gray-400">{algo.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide5_Algorithms;
