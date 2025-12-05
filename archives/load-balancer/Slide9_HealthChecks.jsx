import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Slide9_HealthChecks = () => {
    const [serverStatus, setServerStatus] = useState([true, true, true]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Toggle middle server status
            setServerStatus(prev => [prev[0], !prev[1], prev[2]]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 z-10">Health Checks</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl z-10 items-center">
                {/* Text Content */}
                <div className="space-y-8">
                    <p className="text-2xl text-slate-300">Load Balancer continuously checks:</p>
                    <ul className="space-y-6">
                        {[
                            { text: "Is server alive?", icon: "💓" },
                            { text: "Is it slow?", icon: "🐢" },
                            { text: "Is it down?", icon: "💀" }
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className="flex items-center gap-4 text-xl text-white bg-slate-800/50 p-4 rounded-xl border border-slate-700"
                            >
                                <span className="text-3xl">{item.icon}</span>
                                {item.text}
                            </motion.li>
                        ))}
                    </ul>
                    <motion.div
                        animate={{ opacity: serverStatus[1] ? 0.3 : 1 }}
                        className="bg-red-900/30 border border-red-500/50 p-4 rounded-lg text-red-200 mt-8"
                    >
                        If DOWN → it's removed from rotation.
                    </motion.div>
                </div>

                {/* Animation */}
                <div className="flex flex-col gap-8 items-center">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                backgroundColor: serverStatus[i] ? "#1e293b" : "#450a0a",
                                borderColor: serverStatus[i] ? "#475569" : "#ef4444",
                                opacity: serverStatus[i] ? 1 : 0.6
                            }}
                            className="w-64 h-24 rounded-xl border-2 flex items-center justify-between px-6 relative overflow-hidden"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-3xl">🖥️</span>
                                <div>
                                    <h4 className="text-white font-bold">Server {i + 1}</h4>
                                    <span className={`text-sm ${serverStatus[i] ? "text-green-400" : "text-red-400"}`}>
                                        {serverStatus[i] ? "HEALTHY" : "UNHEALTHY"}
                                    </span>
                                </div>
                            </div>

                            {/* Heartbeat Animation */}
                            {serverStatus[i] && (
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="text-3xl text-red-500"
                                >
                                    ❤️
                                </motion.div>
                            )}

                            {!serverStatus[i] && (
                                <span className="text-3xl grayscale opacity-50">💔</span>
                            )}

                            {/* Scan Line */}
                            <motion.div
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500/10 to-transparent skew-x-12"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slide9_HealthChecks;
