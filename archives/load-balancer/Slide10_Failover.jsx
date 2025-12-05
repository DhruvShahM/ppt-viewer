import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Slide10_Failover = () => {
    const [serverFailed, setServerFailed] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setServerFailed(prev => !prev);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 z-10">Failover Explained</h2>
            <p className="text-xl text-slate-300 mb-16 z-10 max-w-2xl text-center">
                When one server fails, load balancer automatically reroutes traffic to others.
            </p>

            <div className="flex flex-col items-center w-full max-w-5xl z-10">
                {/* Load Balancer */}
                <div className="w-24 h-24 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/50 mb-24 relative z-20">
                    <span className="text-4xl">⚖️</span>
                </div>

                {/* Servers Container */}
                <div className="flex justify-center gap-32 relative w-full">
                    {/* Connection Lines */}
                    <svg className="absolute -top-24 left-0 w-full h-24 pointer-events-none z-0">
                        <motion.path
                            d="M 512 0 L 180 96"
                            stroke="#475569"
                            strokeWidth="4"
                            fill="none"
                        />
                        <motion.path
                            d="M 512 0 L 512 96"
                            stroke={serverFailed ? "#ef4444" : "#475569"}
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={serverFailed ? "5,5" : "0"}
                        />
                        <motion.path
                            d="M 512 0 L 844 96"
                            stroke="#475569"
                            strokeWidth="4"
                            fill="none"
                        />

                        {/* Animated Traffic Particles */}
                        <motion.circle r="4" fill="#4ade80">
                            <animateMotion
                                dur="1s"
                                repeatCount="indefinite"
                                path="M 512 0 L 180 96"
                            />
                        </motion.circle>

                        {!serverFailed && (
                            <motion.circle r="4" fill="#4ade80">
                                <animateMotion
                                    dur="1s"
                                    repeatCount="indefinite"
                                    path="M 512 0 L 512 96"
                                />
                            </motion.circle>
                        )}

                        <motion.circle r="4" fill="#4ade80">
                            <animateMotion
                                dur="1s"
                                repeatCount="indefinite"
                                path="M 512 0 L 844 96"
                            />
                        </motion.circle>
                    </svg>

                    {/* Server 1 */}
                    <div className="w-32 h-40 bg-slate-800 rounded-lg border-4 border-green-500/50 flex flex-col items-center justify-center">
                        <span className="text-4xl mb-2">🖥️</span>
                        <span className="text-green-400 font-bold">Active</span>
                    </div>

                    {/* Server 2 (Fails) */}
                    <AnimatePresence mode="wait">
                        {!serverFailed ? (
                            <motion.div
                                key="active"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, filter: "grayscale(100%)" }}
                                className="w-32 h-40 bg-slate-800 rounded-lg border-4 border-green-500/50 flex flex-col items-center justify-center"
                            >
                                <span className="text-4xl mb-2">🖥️</span>
                                <span className="text-green-400 font-bold">Active</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="failed"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-32 h-40 bg-red-900/20 rounded-lg border-4 border-red-500/50 flex flex-col items-center justify-center border-dashed"
                            >
                                <span className="text-4xl mb-2 opacity-50">💀</span>
                                <span className="text-red-500 font-bold">FAILED</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Server 3 */}
                    <div className="w-32 h-40 bg-slate-800 rounded-lg border-4 border-green-500/50 flex flex-col items-center justify-center">
                        <span className="text-4xl mb-2">🖥️</span>
                        <span className="text-green-400 font-bold">Active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide10_Failover;
