import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Slide7_RoundRobin = () => {
    const [activeServer, setActiveServer] = useState(0);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const reqId = Date.now();
            setRequests(prev => [...prev, { id: reqId, target: activeServer }]);
            setActiveServer(prev => (prev + 1) % 3);

            // Cleanup old requests
            setTimeout(() => {
                setRequests(prev => prev.filter(r => r.id !== reqId));
            }, 2000);
        }, 1500);

        return () => clearInterval(interval);
    }, [activeServer]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 z-10">Round Robin (Animated Demo)</h2>
            <p className="text-xl text-slate-300 mb-12 z-10">Requests go to servers in rotation</p>

            <div className="flex flex-col items-center w-full max-w-4xl z-10">
                {/* Load Balancer */}
                <div className="w-24 h-24 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/50 mb-16 relative">
                    <span className="text-4xl">⚖️</span>

                    {/* Incoming Requests */}
                    <AnimatePresence>
                        {requests.map((req) => (
                            <motion.div
                                key={req.id}
                                initial={{ y: -100, opacity: 0 }}
                                animate={{
                                    y: [-100, 0, 150],
                                    x: [0, 0, (req.target - 1) * 200],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1.5, times: [0, 0.3, 1] }}
                                className="absolute w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-white"
                                style={{ top: "50%", left: "50%", marginLeft: -16, marginTop: -16 }}
                            >
                                Req
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Servers */}
                <div className="flex justify-center gap-32">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: activeServer === (i + 1) % 3 ? [1, 1.1, 1] : 1,
                                borderColor: activeServer === (i + 1) % 3 ? ["#475569", "#3b82f6", "#475569"] : "#475569"
                            }}
                            transition={{ duration: 0.5 }}
                            className="w-32 h-40 bg-slate-800 rounded-lg border-4 border-slate-600 flex flex-col items-center justify-center relative"
                        >
                            <span className="text-4xl mb-2">🖥️</span>
                            <span className="text-lg font-bold text-white">Server {i + 1}</span>

                            {/* Request Indicator */}
                            <AnimatePresence>
                                {requests.filter(r => r.target === i).map((req) => (
                                    <motion.div
                                        key={req.id}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-blue-500/30 rounded-lg"
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slide7_RoundRobin;
