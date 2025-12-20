import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hand, Ban, ShieldAlert } from 'lucide-react';

const Slide2_WhatIs = () => {
    const [count, setCount] = useState(0);
    const [blocked, setBlocked] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 10) {
                    setBlocked(true);
                    return prev;
                }
                return prev + 1;
            });
        }, 400);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-blue-400">What is Rate Limiting?</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Text Content */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="p-6 rounded-xl border border-slate-700"
                    >
                        <p className="text-xl leading-relaxed">
                            Rate Limiting is a technique used to control how many requests a user or service can make in a given time period.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h3 className="text-2xl font-semibold text-gray-300">Examples:</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-lg p-3 rounded-lg">
                                <span className="text-green-400">✓</span> "Max 100 requests per minute"
                            </li>
                            <li className="flex items-center gap-3 text-lg p-3 rounded-lg">
                                <span className="text-green-400">✓</span> "Only 5 login attempts per hour"
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-sm text-gray-400">
                        Requests: {count} / 10
                    </div>

                    <div className="relative">
                        <motion.div
                            animate={blocked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {blocked ? (
                                <Ban size={120} className="text-red-500" />
                            ) : (
                                <Hand size={120} className="text-blue-400" />
                            )}
                        </motion.div>

                        {/* Tapping animation */}
                        {!blocked && (
                            <motion.div
                                className="absolute top-0 left-0 rounded-full border-4 border-blue-400"
                                style={{ width: 120, height: 120 }}
                                animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                                transition={{ duration: 0.4, repeat: Infinity }}
                            />
                        )}
                    </div>

                    <motion.div
                        className="mt-8 text-2xl font-bold"
                        animate={{ color: blocked ? "#EF4444" : "#60A5FA" }}
                    >
                        {blocked ? "STOP! Limit Reached" : "Processing Requests..."}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Slide2_WhatIs;