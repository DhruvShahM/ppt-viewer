import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';

const Slide6_FixedWindow = () => {
    const [windowTime, setWindowTime] = useState(0);
    const [requests, setRequests] = useState([]);
    const [burst, setBurst] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setWindowTime(prev => {
                if (prev >= 100) {
                    setRequests([]); // Reset window
                    setBurst(false);
                    return 0;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Add requests
        if (windowTime > 80 && windowTime < 95) {
            // Simulate burst near end of window
            setBurst(true);
            if (Math.random() > 0.5) {
                setRequests(prev => [...prev, { id: Date.now(), x: Math.random() * 80 }]);
            }
        } else if (windowTime % 10 === 0 && windowTime < 80) {
            // Regular traffic
            setRequests(prev => [...prev, { id: Date.now(), x: Math.random() * 80 }]);
        }
    }, [windowTime]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-blue-400">Fixed Window Algorithm</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Explanation */}
                <div className="space-y-8">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
                        <h3 className="text-2xl font-semibold flex items-center gap-3">
                            <Clock className="text-blue-400" /> Concept
                        </h3>
                        <ul className="space-y-3 text-lg text-gray-300">
                            <li>• Time divided into equal windows (e.g., 1 min)</li>
                            <li>• Max allowed requests per window</li>
                            <li>• Counter resets at start of new window</li>
                        </ul>
                    </div>

                    <motion.div
                        className="bg-red-900/20 p-6 rounded-xl border border-red-500/30"
                        animate={{ scale: burst ? 1.05 : 1 }}
                    >
                        <h3 className="text-2xl font-semibold flex items-center gap-3 text-red-400">
                            <AlertCircle /> The "Burst" Problem
                        </h3>
                        <p className="mt-2 text-gray-300">
                            Traffic can spike at the edges of the window, allowing 2x limit in short time.
                        </p>
                    </motion.div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center bg-slate-800/30 rounded-2xl p-8 border border-slate-700 relative h-[400px]">

                    {/* Window Container */}
                    <div className="w-full h-64 border-2 border-dashed border-slate-500 rounded-lg relative overflow-hidden bg-slate-900/50">
                        <div className="absolute top-2 right-2 text-xs text-gray-400">Current Window</div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-75" style={{ width: `${windowTime}%` }} />

                        {/* Requests */}
                        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap content-end gap-1 h-full p-2">
                            {requests.map((req, i) => (
                                <motion.div
                                    key={req.id}
                                    initial={{ scale: 0, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold ${i > 10 ? 'bg-red-500' : 'bg-green-500'}`}
                                >
                                    REQ
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Timer */}
                    <div className="mt-6 flex items-center gap-4">
                        <Clock className="animate-spin-slow text-blue-400" size={32} />
                        <span className="text-2xl font-mono">{windowTime}%</span>
                        {burst && <span className="text-red-500 font-bold animate-pulse">BURST DETECTED!</span>}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Slide6_FixedWindow;
