import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Zap } from 'lucide-react';

const Slide8_TokenBucket = () => {
    const [tokens, setTokens] = useState(5);
    const [requests, setRequests] = useState([]);
    const MAX_TOKENS = 8;

    useEffect(() => {
        // Refill tokens
        const refillInterval = setInterval(() => {
            setTokens(prev => Math.min(prev + 1, MAX_TOKENS));
        }, 1000);

        // Simulate requests
        const requestInterval = setInterval(() => {
            if (Math.random() > 0.4) {
                setRequests(prev => [...prev, { id: Date.now(), processed: false }]);
            }
        }, 600);

        return () => {
            clearInterval(refillInterval);
            clearInterval(requestInterval);
        };
    }, []);

    useEffect(() => {
        // Process requests
        if (requests.length > 0) {
            const unprocessed = requests.filter(r => !r.processed);
            if (unprocessed.length > 0) {
                const req = unprocessed[0];
                if (tokens > 0) {
                    setTokens(prev => prev - 1);
                    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, processed: true, status: 'allowed' } : r));
                } else {
                    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, processed: true, status: 'denied' } : r));
                }

                // Cleanup old requests
                setTimeout(() => {
                    setRequests(prev => prev.filter(r => r.id !== req.id));
                }, 1000);
            }
        }
    }, [requests, tokens]);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-green-400">Token Bucket Algorithm</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Explanation */}
                <div className="space-y-8">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4">
                        <h3 className="text-2xl font-semibold flex items-center gap-3">
                            <Box className="text-green-400" /> Concept
                        </h3>
                        <ul className="space-y-4 text-lg text-gray-300">
                            <li>• Bucket fills with tokens at a steady rate</li>
                            <li>• Each request consumes 1 token</li>
                            <li>• <span className="text-green-400 font-bold">Allows short bursts</span> (until bucket empties)</li>
                        </ul>
                    </div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center bg-slate-800/30 rounded-2xl p-8 border border-slate-700 relative h-[400px]">

                    {/* Bucket Container */}
                    <div className="flex flex-col items-center gap-2">
                        <div className="relative w-40 h-64 border-4 border-slate-500 border-t-0 rounded-b-xl bg-slate-900/50 flex flex-col-reverse items-center p-2 gap-1 overflow-hidden">

                            <AnimatePresence>
                                {[...Array(tokens)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, y: -100 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-yellow-600 shadow-[0_0_10px_rgba(250,204,21,0.5)] flex-shrink-0"
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                        <span className="text-gray-400 font-medium">Token Bucket</span>
                    </div>

                    {/* Incoming Requests */}
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                        <AnimatePresence>
                            {requests.filter(r => r.processed).map((req) => (
                                <motion.div
                                    key={req.id}
                                    initial={{ x: 100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    className={`px-4 py-2 rounded-lg font-bold ${req.status === 'allowed' ? 'bg-green-500' : 'bg-red-500'}`}
                                >
                                    {req.status === 'allowed' ? 'Allowed' : 'Denied'}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Refill Animation */}
                    <motion.div
                        className="absolute top-10 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        <Zap className="text-yellow-400 fill-yellow-400" size={32} />
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Slide8_TokenBucket;
