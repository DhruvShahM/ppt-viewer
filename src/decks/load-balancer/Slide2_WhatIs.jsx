import React from 'react';
import { motion } from 'framer-motion';

const Slide2_WhatIs = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 z-10">What is a Load Balancer?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl z-10 items-center">
                {/* Text Content */}
                <div className="space-y-6">
                    <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                        A Load Balancer is a system that distributes incoming traffic across multiple servers to:
                    </p>
                    <ul className="space-y-4">
                        {[
                            { text: "Improve Speed", icon: "⚡" },
                            { text: "Prevent Overload", icon: "🛡️" },
                            { text: "Increase Reliability", icon: "✅" }
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.2 + 0.5 }}
                                className="flex items-center gap-4 text-xl text-white bg-slate-800/50 p-4 rounded-xl border border-slate-700"
                            >
                                <span className="text-2xl">{item.icon}</span>
                                {item.text}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Motion Graphic */}
                <div className="relative h-96 bg-slate-800/30 rounded-3xl p-8 flex flex-col items-center justify-center border border-slate-700/50">
                    {/* Pipe Animation */}
                    <div className="flex flex-col items-center w-full mb-8">
                        {/* Main Pipe */}
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 60 }}
                            transition={{ duration: 0.5 }}
                            className="w-4 bg-blue-500 rounded-full mb-2"
                        />
                        {/* Splitter */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center z-10 shadow-lg shadow-blue-500/50"
                        >
                            <span className="text-2xl">⚖️</span>
                        </motion.div>
                        {/* Split Pipes */}
                        <div className="flex justify-between w-64 mt-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: 40 }}
                                    transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                                    className="w-2 bg-blue-400/50 rounded-full"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Servers */}
                    <div className="flex justify-between w-64">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    delay: 1.2 + i * 0.2,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15
                                }}
                                className="w-16 h-20 bg-slate-700 rounded-lg border-2 border-slate-600 flex flex-col items-center justify-end p-2 shadow-xl"
                            >
                                <div className="w-full h-1 bg-green-500/50 rounded-full mb-1 animate-pulse" />
                                <div className="w-full h-1 bg-green-500/50 rounded-full mb-2 animate-pulse delay-75" />
                                <span className="text-xs text-slate-400">S{i}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide2_WhatIs;
