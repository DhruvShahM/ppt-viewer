import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const Slide3_WhyNeed = () => {
    const [protected_state, setProtectedState] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setProtectedState(true);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-blue-400">Why Rate Limiting is Needed?</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Problems Solved List */}
                <div className="space-y-6">
                    {[
                        "Prevent DDoS attacks",
                        "Stop API abuse",
                        "Protect servers from overload",
                        "Reduce cost & misuse",
                        "Ensure fair usage"
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700"
                        >
                            <CheckCircle className="text-green-400" size={24} />
                            <span className="text-xl">{item}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center bg-slate-800/30 rounded-2xl p-8 border border-slate-700 relative overflow-hidden h-[400px]">

                    {/* Traffic Particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(protected_state ? 5 : 20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute rounded-full ${protected_state ? 'bg-blue-400' : 'bg-red-500'}`}
                                style={{ width: 8, height: 8, left: -10 }}
                                animate={{
                                    x: [0, 500],
                                    y: [Math.random() * 400, 200] // Converge to server
                                }}
                                transition={{
                                    duration: protected_state ? 2 : 0.5,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                    ease: "linear"
                                }}
                            />
                        ))}
                    </div>

                    {/* Server Icon */}
                    <motion.div
                        className="z-10 relative"
                        animate={protected_state ? {} : {
                            x: [-5, 5, -5, 5, 0],
                            rotate: [-2, 2, -2, 2, 0]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    >
                        <Server size={120} className={protected_state ? "text-blue-400" : "text-red-500"} />
                        {!protected_state && (
                            <motion.div
                                className="absolute -top-8 -right-8"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                <AlertTriangle size={40} className="text-yellow-500" />
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Shield Animation */}
                    {protected_state && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1.5, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring" }}
                            className="absolute z-20"
                        >
                            <Shield size={100} className="text-green-400 opacity-80" />
                        </motion.div>
                    )}

                    <div className="mt-12 z-10 text-xl font-bold">
                        {protected_state ? (
                            <span className="text-green-400">Protected & Stable</span>
                        ) : (
                            <span className="text-red-500 animate-pulse">Server Overload!</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide3_WhyNeed;
