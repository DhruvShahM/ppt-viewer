import React from 'react';
import { motion } from 'framer-motion';

const Slide4_HowItWorks = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 z-10">How Load Balancing Works</h2>

            <div className="flex items-center justify-between w-full max-w-5xl z-10">
                {/* User */}
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 mb-4"
                    >
                        <span className="text-4xl">👤</span>
                    </motion.div>
                    <span className="text-white font-bold text-xl">User</span>
                </div>

                {/* Arrow 1: User to LB */}
                <div className="flex-1 h-1 bg-slate-700 mx-4 relative overflow-hidden">
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                    />
                </div>

                {/* Load Balancer */}
                <div className="flex flex-col items-center mx-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/50 mb-4 relative z-10"
                    >
                        <span className="text-5xl">⚖️</span>
                        {/* Orbiting particles */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute w-4 h-4 bg-white rounded-full"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    marginTop: -8,
                                    marginLeft: -8,
                                }}
                                animate={{
                                    x: Math.cos(i * 2 * Math.PI / 3) * 60,
                                    y: Math.sin(i * 2 * Math.PI / 3) * 60,
                                }}
                            />
                        ))}
                    </motion.div>
                    <span className="text-white font-bold text-xl">Load Balancer</span>
                </div>

                {/* Arrows: LB to Servers */}
                <div className="flex-1 flex flex-col justify-center h-64 relative">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="absolute left-0 w-full h-1 bg-slate-700 overflow-hidden" style={{ top: `${20 + i * 30}%`, transform: `rotate(${i === 0 ? -15 : i === 2 ? 15 : 0}deg)`, transformOrigin: "left center" }}>
                            <motion.div
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-green-400 to-transparent"
                            />
                        </div>
                    ))}
                </div>

                {/* Servers */}
                <div className="flex flex-col gap-4">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                backgroundColor: ["#1e293b", "#15803d", "#1e293b"],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.5 + 0.75 // Sync with arrow arrival
                            }}
                            className="w-24 h-20 bg-slate-800 rounded-lg border-2 border-slate-600 flex flex-col items-center justify-center shadow-xl"
                        >
                            <span className="text-2xl">🖥️</span>
                            <span className="text-xs text-slate-400 mt-1">Server {i}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slide4_HowItWorks;
