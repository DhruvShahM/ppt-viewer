import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

const Slide6_FixedWindow = () => {
    const [windowTime, setWindowTime] = useState(0);
    const [requests, setRequests] = useState([]);
    const [burst, setBurst] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setWindowTime(prev => {
                const next = (prev + 1) % 10;
                if (next === 0) {
                    setRequests([]); // Reset window
                    setBurst(false);
                }
                // Simulate burst at end of window
                if (next > 7) {
                    setBurst(true);
                    setRequests(prevReqs => [...prevReqs, ...Array(3).fill(Date.now())]);
                } else if (next % 2 === 0) {
                    setRequests(prevReqs => [...prevReqs, Date.now()]);
                }
                return next;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-8 z-10">Fixed Window Algorithm</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl z-10">
                {/* Explanation */}
                <div className="space-y-8">
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">How it works</h3>
                        <ul className="space-y-4 text-xl text-slate-300">
                            <li className="flex items-center space-x-3">
                                <Clock className="text-blue-400" />
                                <span>Time divided into fixed windows (e.g., 1 min)</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <span className="bg-blue-500 w-2 h-2 rounded-full" />
                                <span>Counter resets at start of each window</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/30">
                        <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center">
                            <AlertTriangle className="mr-3" />
                            The "Burst" Problem
                        </h3>
                        <p className="text-lg text-slate-300">
                            Traffic can spike at the edges of the window, allowing 2x limit in a short time.
                        </p>
                    </div>
                </div>

                {/* Visualization */}
                <div className="bg-slate-900/50 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Timeline */}
                    <div className="w-full h-2 bg-slate-700 rounded-full mb-12 relative">
                        <motion.div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(windowTime + 1) * 10}%` }}
                        />
                        {/* Window Markers */}
                        <div className="absolute top-4 left-0 text-slate-500 text-sm">0s</div>
                        <div className="absolute top-4 right-0 text-slate-500 text-sm">10s</div>
                    </div>

                    {/* Request Stack */}
                    <div className="flex flex-wrap-reverse content-start gap-2 w-full h-64 bg-slate-800/30 rounded-xl p-4 border-b-4 border-slate-600 relative">
                        <AnimatePresence>
                            {requests.map((r, i) => (
                                <motion.div
                                    key={r + i}
                                    initial={{ scale: 0, y: -50 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className={`w-8 h-8 rounded-md ${i > 15 ? 'bg-red-500' : 'bg-blue-400'}`}
                                />
                            ))}
                        </AnimatePresence>

                        {/* Limit Line */}
                        <div className="absolute top-1/2 w-full h-0.5 bg-red-500/50 border-dashed border-t border-red-500">
                            <span className="absolute -top-6 right-2 text-red-400 text-xs">Limit</span>
                        </div>
                    </div>

                    {burst && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-1/2 text-red-500 font-black text-4xl bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm"
                        >
                            BURST!
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Slide6_FixedWindow;
