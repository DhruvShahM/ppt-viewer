import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Ban, ArrowRight } from 'lucide-react';

const Slide12_LimitExceeded = () => {
    const [retryTime, setRetryTime] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setRetryTime(prev => (prev > 0 ? prev - 1 : 30));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-red-500">What Happens When Limit is Exceeded?</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: List */}
                <div className="space-y-6">
                    {[
                        { text: "HTTP 429 Too Many Requests", icon: AlertTriangle },
                        { text: "Retry-After header", icon: Clock },
                        { text: "Temporary block", icon: Ban },
                        { text: "Redirect to queue", icon: ArrowRight }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center gap-4 p-4 rounded-lg border border-slate-700"
                        >
                            <item.icon className="text-red-400" size={28} />
                            <span className="text-xl">{item.text}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-red-500/30 relative h-[400px]">
                    {/* 429 Shake Animation */}
                    <motion.div
                        className="text-8xl font-bold text-red-500 mb-8"
                        animate={{ x: [-5, 5, -5, 5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                        429
                    </motion.div>

                    <div className="text-2xl font-semibold mb-8">Too Many Requests</div>

                    {/* Retry Timer */}
                    <div className="flex items-center gap-4 px-6 py-3 rounded-full border border-slate-600">
                        <Clock className="text-yellow-400 animate-pulse" />
                        <span className="text-xl font-mono text-gray-300">
                            Retry-After: <span className="text-white font-bold">{retryTime}s</span>
                        </span>
                    </div>

                    {/* Alert Overlay */}
                    <motion.div
                        className="absolute inset-0 z-0"
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                </div>
            </div>
        </div>
    );
};

export default Slide12_LimitExceeded;