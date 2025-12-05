import React from 'react';
import { motion } from 'framer-motion';

const Slide14_Summary = () => {
    const points = [
        "Load Balancer = Traffic Manager",
        "Prevents overload",
        "Improves uptime",
        "Distributes load smartly",
        "Essential for scalable systems"
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 z-10">Summary</h2>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800/50 p-12 rounded-3xl border border-slate-700 max-w-4xl w-full relative overflow-hidden"
            >
                {/* Pulse Animation on Card */}
                <motion.div
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-500/20"
                />

                <ul className="space-y-6 relative z-10">
                    {points.map((point, index) => (
                        <motion.li
                            key={index}
                            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center gap-4 text-2xl text-white"
                        >
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.2 + 0.2, type: "spring" }}
                                className="text-green-400 text-3xl"
                            >
                                ✔️
                            </motion.span>
                            {point}
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default Slide14_Summary;
