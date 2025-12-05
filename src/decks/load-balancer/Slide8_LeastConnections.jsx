import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Slide8_LeastConnections = () => {
    const [connections, setConnections] = useState([5, 2, 7]);
    const [incomingReq, setIncomingReq] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            // Find server with min connections
            const minConns = Math.min(...connections);
            const targetIndex = connections.indexOf(minConns);

            setIncomingReq({ id: Date.now(), target: targetIndex });

            setTimeout(() => {
                setConnections(prev => {
                    const newConns = [...prev];
                    newConns[targetIndex] += 1;
                    // Randomly decrease another server to keep it dynamic
                    const decreaseIndex = (targetIndex + 1) % 3;
                    if (newConns[decreaseIndex] > 0) newConns[decreaseIndex] -= 1;
                    return newConns;
                });
            }, 1000);

        }, 2000);

        return () => clearInterval(interval);
    }, [connections]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 z-10">Least Connections</h2>
            <p className="text-xl text-slate-300 mb-12 z-10">Traffic sent to server with minimum active connections</p>

            <div className="flex flex-col items-center w-full max-w-4xl z-10">
                {/* Load Balancer */}
                <div className="w-24 h-24 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/50 mb-16 relative">
                    <span className="text-4xl">⚖️</span>

                    {/* Incoming Request Animation */}
                    <AnimatePresence>
                        {incomingReq && (
                            <motion.div
                                key={incomingReq.id}
                                initial={{ y: -100, opacity: 0 }}
                                animate={{
                                    y: [-100, 0, 150],
                                    x: [0, 0, (incomingReq.target - 1) * 200],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 1, times: [0, 0.3, 1] }}
                                className="absolute w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-xs font-bold text-black border-2 border-white z-20"
                                style={{ top: "50%", left: "50%", marginLeft: -16, marginTop: -16 }}
                            >
                                New
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Servers */}
                <div className="flex justify-center gap-32">
                    {connections.map((count, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: incomingReq?.target === i ? [1, 1.05, 1] : 1,
                                borderColor: count === Math.min(...connections) ? "#22c55e" : "#475569"
                            }}
                            className="w-32 h-40 bg-slate-800 rounded-lg border-4 flex flex-col items-center justify-center relative transition-colors duration-300"
                        >
                            <span className="text-4xl mb-2">🖥️</span>
                            <div className="bg-slate-900 px-3 py-1 rounded-full border border-slate-700 mt-2">
                                <span className={`font-mono font-bold ${count === Math.min(...connections) ? "text-green-400" : "text-slate-400"}`}>
                                    {count} conns
                                </span>
                            </div>

                            {/* Connection Visuals */}
                            <div className="absolute -bottom-8 flex gap-1">
                                {[...Array(Math.min(count, 8))].map((_, idx) => (
                                    <div key={idx} className="w-2 h-2 bg-blue-500 rounded-full" />
                                ))}
                                {count > 8 && <span className="text-xs text-blue-500">+</span>}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slide8_LeastConnections;
