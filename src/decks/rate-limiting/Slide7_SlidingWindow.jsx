import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sliders, CheckCircle } from 'lucide-react';

const Slide7_SlidingWindow = () => {
    const [requests, setRequests] = useState([]);
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();
            setNow(currentTime);

            if (Math.random() > 0.7) {
                setRequests(prev => [...prev, { id: currentTime, time: currentTime }]);
            }

            setRequests(prev => prev.filter(req => currentTime - req.time < 6000));
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const windowSize = 3000;

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-purple-400">Sliding Window Algorithm</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Explanation */}
                <div className="space-y-8">
                    <div className="p-6 rounded-xl border border-slate-700 space-y-4">
                        <h3 className="text-2xl font-semibold flex items-center gap-3">
                            <Sliders className="text-purple-400" /> Concept
                        </h3>
                        <ul className="space-y-4 text-lg text-gray-300">
                            <li className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-green-400" />
                                More accurate rate control
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-green-400" />
                                Uses timestamps to track requests
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-green-400" />
                                Reduces the "burst" issue significantly
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-slate-700 relative h-[400px] overflow-hidden">

                    {/* Timeline */}
                    <div className="w-full h-32 relative border-b-2 border-slate-600 flex items-center">
                        {/* Moving Window */}
                        <div className="absolute top-0 bottom-0 border-l-2 border-r-2 border-purple-500 z-10 w-[50%] right-0 flex items-center justify-center">
                            <span className="text-purple-300 font-bold px-2 rounded">Active Window</span>
                        </div>

                        {/* Requests moving left */}
                        {requests.map(req => {
                            const age = now - req.time;
                            const position = 100 - (age / 6000) * 100;

                            if (position < -10) return null;

                            const inWindow = age < windowSize;
                            return (
                                <motion.div
                                    key={req.id}
                                    className={`absolute w-4 h-4 rounded-full ${inWindow ? 'bg-green-400' : 'bg-gray-600'}`}
                                    style={{ left: `${position}%`, top: '50%' }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                />
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center text-gray-400">
                        Requests slide out of the window smoothly based on time.
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Slide7_SlidingWindow;