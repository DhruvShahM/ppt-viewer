import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, CheckCircle } from 'lucide-react';

const Slide7_SlidingWindow = () => {
    const [requests, setRequests] = useState([]);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(t => t + 1);

            // Add random requests
            if (Math.random() > 0.6) {
                setRequests(prev => [...prev, { id: Date.now(), time: currentTime + 10 }]); // +10 to spawn ahead
            }
        }, 100);

        return () => clearInterval(interval);
    }, [currentTime]);

    // Filter requests that are within the sliding window (last 20 units)
    const activeRequests = requests.filter(r => r.time <= currentTime && r.time > currentTime - 20);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-8 z-10">Sliding Window Algorithm</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl z-10">
                {/* Text Content */}
                <div className="space-y-8">
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                        <ul className="space-y-6">
                            <li className="flex items-center space-x-4">
                                <div className="bg-purple-500/20 p-3 rounded-lg">
                                    <Activity className="text-purple-400" size={24} />
                                </div>
                                <span className="text-xl text-slate-200">More accurate rate control</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <div className="bg-blue-500/20 p-3 rounded-lg">
                                    <span className="text-blue-400 font-mono font-bold">TS</span>
                                </div>
                                <span className="text-xl text-slate-200">Uses timestamps to track requests</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <div className="bg-green-500/20 p-3 rounded-lg">
                                    <CheckCircle className="text-green-400" size={24} />
                                </div>
                                <span className="text-xl text-slate-200">Solves the "Burst" issue</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Animation */}
                <div className="bg-slate-900/50 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden h-80">

                    {/* Timeline Track */}
                    <div className="w-full h-1 bg-slate-700 absolute top-1/2 transform -translate-y-1/2" />

                    {/* Sliding Window */}
                    <div className="absolute top-1/4 bottom-1/4 w-1/3 border-2 border-purple-500 bg-purple-500/10 rounded-xl flex items-center justify-center z-10 backdrop-blur-sm">
                        <span className="text-purple-300 font-mono text-sm absolute -top-6">Active Window</span>
                    </div>

                    {/* Requests Flowing Through */}
                    <div className="w-full h-full relative flex items-center overflow-hidden">
                        <AnimatePresence>
                            {requests.map((req) => {
                                // Calculate position based on time difference relative to current time
                                // We want requests to move from right to left
                                const offset = (req.time - currentTime) * 20; // Speed factor
                                const isInside = offset < 150 && offset > -150; // Approximate window bounds

                                if (offset < -400) return null; // Remove if too far left

                                return (
                                    <motion.div
                                        key={req.id}
                                        className={`absolute w-4 h-4 rounded-full shadow-lg ${isInside ? 'bg-green-400 shadow-green-400/50' : 'bg-slate-600'}`}
                                        style={{
                                            left: `calc(50% + ${offset}px)`,
                                            top: '50%',
                                            marginTop: -8
                                        }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    <div className="absolute bottom-4 text-slate-400 font-mono text-sm">
                        Current Requests in Window: <span className="text-white font-bold text-xl">{activeRequests.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide7_SlidingWindow;
