import React from 'react';
import { motion } from 'framer-motion';

const Slide3_WhyNeed = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 z-10">Why do we need a Load Balancer?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl z-10">
                {/* Left: Without Load Balancer */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 flex flex-col items-center"
                >
                    <h3 className="text-2xl font-bold text-red-400 mb-6">Without Load Balancer</h3>

                    {/* Shaking Server Animation */}
                    <motion.div
                        animate={{
                            x: [-2, 2, -2, 2, 0],
                            rotate: [-1, 1, -1, 1, 0],
                            backgroundColor: ["#1e293b", "#450a0a", "#1e293b"]
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 2
                        }}
                        className="w-32 h-40 bg-slate-800 rounded-lg border-2 border-red-500/50 mb-8 flex flex-col items-center justify-center shadow-lg shadow-red-900/50"
                    >
                        <span className="text-4xl">🔥</span>
                        <span className="text-xs text-red-300 mt-2 font-mono">OVERLOAD</span>
                    </motion.div>

                    <ul className="space-y-4 w-full">
                        {[
                            "One server handles everything ❌",
                            "Server crashes under heavy load ❌",
                            "More downtime ❌"
                        ].map((text, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + i * 0.2 }}
                                className="text-slate-300 flex items-center gap-2"
                            >
                                {text}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* Right: With Load Balancer */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-green-900/20 border border-green-500/30 rounded-2xl p-8 flex flex-col items-center"
                >
                    <h3 className="text-2xl font-bold text-green-400 mb-6">With Load Balancer</h3>

                    {/* Balanced Servers Animation */}
                    <div className="flex gap-4 mb-8">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    boxShadow: ["0 0 0px rgba(34, 197, 94, 0)", "0 0 20px rgba(34, 197, 94, 0.3)", "0 0 0px rgba(34, 197, 94, 0)"]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.5
                                }}
                                className="w-20 h-24 bg-slate-800 rounded-lg border-2 border-green-500/50 flex flex-col items-center justify-center"
                            >
                                <span className="text-2xl">❄️</span>
                                <span className="text-[10px] text-green-300 mt-2 font-mono">STABLE</span>
                            </motion.div>
                        ))}
                    </div>

                    <ul className="space-y-4 w-full">
                        {[
                            "Smooth distribution ✔️",
                            "High availability ✔️",
                            "Faster response ✔️"
                        ].map((text, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 + i * 0.2 }}
                                className="text-slate-300 flex items-center gap-2"
                            >
                                {text}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default Slide3_WhyNeed;
