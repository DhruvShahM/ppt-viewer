import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Zap } from 'lucide-react';

const Slide8_TokenBucket = () => {
    const [tokens, setTokens] = useState(5);
    const [requests, setRequests] = useState([]);
    const MAX_TOKENS = 8;

    // Refill tokens
    useEffect(() => {
        const interval = setInterval(() => {
            setTokens(prev => Math.min(prev + 1, MAX_TOKENS));
        }, 1000); // 1 token per second
        return () => clearInterval(interval);
    }, []);

    // Simulate requests
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.4) {
                const id = Date.now();
                setRequests(prev => [...prev, { id, status: 'pending' }]);

                // Process request immediately
                setTokens(currentTokens => {
                    if (currentTokens > 0) {
                        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'success' } : r));
                        return currentTokens - 1;
                    } else {
                        setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'failed' } : r));
                        return currentTokens;
                    }
                });

                // Cleanup old requests
                setTimeout(() => {
                    setRequests(prev => prev.filter(r => r.id !== id));
                }, 2000);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-8 z-10">Token Bucket Algorithm</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl z-10">
                {/* Explanation */}
                <div className="space-y-8">
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                        <ul className="space-y-6 text-xl text-slate-300">
                            <li className="flex items-center space-x-4">
                                <div className="bg-yellow-500/20 p-2 rounded-full">
                                    <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                                </div>
                                <span>Bucket fills with tokens at steady rate</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <Zap className="text-blue-400" />
                                <span>Each request consumes 1 token</span>
                            </li>
                            <li className="flex items-center space-x-4">
                                <div className="bg-green-500/20 p-2 rounded-lg">
                                    <span className="text-green-400 font-bold">BURST</span>
                                </div>
                                <span>Allows bursts until bucket is empty</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Animation */}
                <div className="flex flex-col items-center justify-end h-96 relative">
                    {/* Bucket */}
                    <div className="w-48 h-48 border-b-4 border-l-4 border-r-4 border-slate-500 rounded-b-3xl relative flex items-end justify-center p-2 bg-slate-800/30 backdrop-blur-sm">
                        <div className="absolute -top-8 text-slate-400 text-sm">Capacity: {MAX_TOKENS}</div>

                        {/* Tokens in Bucket */}
                        <div className="flex flex-wrap-reverse gap-2 w-full justify-center mb-2">
                            <AnimatePresence>
                                {[...Array(tokens)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, y: -100 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        className="w-8 h-8 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.6)] border-2 border-yellow-200"
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Incoming Requests */}
                    <div className="absolute top-0 right-0 w-full h-full pointer-events-none">
                        <AnimatePresence>
                            {requests.map(req => (
                                <motion.div
                                    key={req.id}
                                    initial={{ x: 200, y: 0, opacity: 0 }}
                                    animate={{
                                        x: 0,
                                        y: 150,
                                        opacity: req.status === 'failed' ? 0.5 : 1,
                                        scale: req.status === 'failed' ? 0.8 : 1
                                    }}
                                    exit={{ x: -200, opacity: 0 }}
                                    className={`absolute top-10 left-1/2 -ml-6 px-4 py-2 rounded-lg font-bold text-white flex items-center space-x-2
                                        ${req.status === 'success' ? 'bg-green-500' :
                                            req.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'}`}
                                >
                                    <span>REQ</span>
                                    {req.status === 'success' && <div className="w-3 h-3 bg-yellow-300 rounded-full" />}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide8_TokenBucket;
