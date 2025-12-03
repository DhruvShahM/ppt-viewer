import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, ArrowDown } from 'lucide-react';

const Slide9_LeakyBucket = () => {
    const [bucket, setBucket] = useState([]);
    const [processed, setProcessed] = useState([]);
    const CAPACITY = 5;

    // Leak (Process) requests at constant rate
    useEffect(() => {
        const interval = setInterval(() => {
            setBucket(prev => {
                if (prev.length > 0) {
                    const [first, ...rest] = prev;
                    setProcessed(p => [...p, { ...first, id: Date.now() + 'p' }]); // Visual only
                    return rest;
                }
                return prev;
            });
        }, 1500); // Constant rate: 1 request every 1.5s
        return () => clearInterval(interval);
    }, []);

    // Cleanup processed
    useEffect(() => {
        if (processed.length > 5) {
            setProcessed(prev => prev.slice(1));
        }
    }, [processed]);

    // Random incoming requests
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.3) {
                const id = Date.now();
                setBucket(prev => {
                    if (prev.length < CAPACITY) {
                        return [...prev, { id, status: 'queued' }];
                    } else {
                        // Overflow
                        return prev;
                    }
                });
            }
        }, 800); // Faster input than output to show buffering
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-8 z-10">Leaky Bucket Algorithm</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl z-10">
                {/* Explanation */}
                <div className="space-y-8">
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                        <ul className="space-y-6 text-xl text-slate-300">
                            <li className="flex items-center space-x-4">
                                <Droplets className="text-cyan-400" />
                                <span>Processes requests at a constant rate</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <div className="bg-blue-500/20 p-2 rounded-lg">
                                    <span className="text-blue-400 font-bold">SMOOTH</span>
                                </div>
                                <span>Smoothens out traffic spikes</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <div className="bg-red-500/20 p-2 rounded-lg">
                                    <span className="text-red-400 font-bold">DROP</span>
                                </div>
                                <span>Overflows if bucket is full</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Animation */}
                <div className="flex flex-col items-center h-[500px] relative">

                    {/* Input Funnel */}
                    <div className="mb-4 text-slate-400 text-sm">Traffic Input (Variable)</div>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ArrowDown size={32} className="text-slate-500" />
                    </motion.div>

                    {/* The Bucket */}
                    <div className="w-48 h-64 border-b-4 border-l-4 border-r-4 border-slate-500 rounded-b-3xl relative flex flex-col-reverse items-center p-2 bg-slate-800/30 backdrop-blur-sm overflow-hidden my-4">
                        <div className="absolute top-2 right-2 text-xs text-slate-500">Queue: {bucket.length}/{CAPACITY}</div>

                        {/* Water/Requests in Bucket */}
                        <AnimatePresence>
                            {bucket.map((req, i) => (
                                <motion.div
                                    key={req.id}
                                    initial={{ scale: 0, y: -200 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0, opacity: 0, y: 100 }}
                                    className="w-full h-10 bg-cyan-500/50 border-b border-cyan-400/30 flex items-center justify-center text-white font-bold text-xs"
                                >
                                    REQ
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Leak / Output */}
                    <div className="flex flex-col items-center">
                        <div className="w-2 h-8 bg-cyan-400/50" /> {/* Drip stream */}
                        <div className="mt-2 text-slate-400 text-sm">Constant Output</div>

                        {/* Processed Requests */}
                        <div className="mt-4 flex flex-col space-y-2">
                            <AnimatePresence>
                                {processed.map((req) => (
                                    <motion.div
                                        key={req.id}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold"
                                    >
                                        PROCESSED
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
