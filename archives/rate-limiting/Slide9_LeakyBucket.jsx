import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, ArrowDown } from 'lucide-react';

const Slide9_LeakyBucket = () => {
    const [bucket, setBucket] = useState([]);
    const [processed, setProcessed] = useState([]);
    const CAPACITY = 5;

    useEffect(() => {
        // Incoming traffic (bursty)
        const interval = setInterval(() => {
            if (Math.random() > 0.3) {
                const id = Date.now();
                setBucket(prev => {
                    if (prev.length < CAPACITY) {
                        return [...prev, id];
                    } else {
                        // Overflow
                        return prev;
                    }
                });
            }
        }, 800);

        // Leaking (Constant Rate)
        const leakInterval = setInterval(() => {
            setBucket(prev => {
                if (prev.length > 0) {
                    const [first, ...rest] = prev;
                    setProcessed(p => [...p, { id: first, time: Date.now() }]);
                    return rest;
                }
                return prev;
            });
        }, 1500); // Slower, constant rate

        return () => {
            clearInterval(interval);
            clearInterval(leakInterval);
        };
    }, []);

    // Cleanup processed
    useEffect(() => {
        if (processed.length > 5) {
            setProcessed(prev => prev.slice(1));
        }
    }, [processed]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-cyan-400">Leaky Bucket Algorithm</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Explanation */}
                <div className="space-y-8">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
                        <h3 className="text-2xl font-semibold flex items-center gap-3">
                            <Droplets className="text-cyan-400" /> Concept
                        </h3>
                        <ul className="space-y-4 text-lg text-gray-300">
                            <li>• Works like a leaking bucket</li>
                            <li>• Outputs requests at a <span className="text-cyan-400 font-bold">constant rate</span></li>
                            <li>• Smoothens traffic spikes</li>
                            <li>• Excess requests overflow (dropped)</li>
                        </ul>
                    </div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center bg-slate-800/30 rounded-2xl p-8 border border-slate-700 relative h-[450px]">

                    {/* Input Flow */}
                    <div className="absolute top-4 text-gray-400 text-sm">Bursty Input</div>
                    <motion.div
                        className="absolute top-10"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                    >
                        <ArrowDown size={32} className="text-gray-500" />
                    </motion.div>

                    {/* Bucket */}
                    <div className="relative w-40 h-48 border-4 border-slate-500 border-t-0 rounded-b-xl bg-slate-900/50 flex flex-col-reverse items-center p-2 gap-1 overflow-hidden mt-12">
                        {/* Water Level */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-cyan-500/30"
                            animate={{ height: `${(bucket.length / CAPACITY) * 100}%` }}
                        />

                        <AnimatePresence>
                            {bucket.map((id) => (
                                <motion.div
                                    key={id}
                                    initial={{ scale: 0, y: -100 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="w-full h-6 rounded bg-cyan-500 border border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)] flex-shrink-0 z-10"
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Leak / Output */}
                    <div className="flex flex-col items-center mt-4 gap-2">
                        <div className="w-2 h-8 bg-cyan-500/50 rounded-full" />
                        <div className="text-gray-400 text-sm">Constant Output</div>

                        <div className="flex flex-col gap-2">
                            <AnimatePresence>
                                {processed.map((req) => (
                                    <motion.div
                                        key={req.id}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold"
                                    >
                                        OK
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Slide9_LeakyBucket;
