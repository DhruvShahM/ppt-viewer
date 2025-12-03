import React from 'react';
import { motion } from 'framer-motion';
import { Hand, ShieldAlert, Timer } from 'lucide-react';

const Slide2_WhatIs = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-12 z-10">What is Rate Limiting?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl z-10">
                {/* Text Content */}
                <div className="flex flex-col justify-center space-y-8">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm"
                    >
                        <p className="text-2xl text-slate-200 leading-relaxed">
                            Rate Limiting is a technique used to control how many requests a user or service can make in a given time period.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="space-y-4"
                    >
                        <h3 className="text-xl text-purple-400 font-semibold uppercase tracking-wider">Examples</h3>
                        <div className="flex items-center space-x-4 text-xl text-slate-300">
                            <Timer className="text-blue-400" />
                            <span>“Max 100 requests per minute”</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xl text-slate-300">
                            <ShieldAlert className="text-red-400" />
                            <span>“Only 5 login attempts per hour”</span>
                        </div>
                    </motion.div>
                </div>

                {/* Animation Area */}
                <div className="flex items-center justify-center relative bg-slate-900/50 rounded-3xl border border-slate-800 p-8">
                    <div className="relative flex flex-col items-center">
                        {/* Tapping Animation */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.8, 1]
                            }}
                            transition={{
                                duration: 0.2,
                                repeat: 5,
                                repeatDelay: 0.1
                            }}
                            className="bg-blue-500/20 p-6 rounded-full mb-8"
                        >
                            <Hand size={64} className="text-blue-400" />
                        </motion.div>

                        {/* Counter */}
                        <div className="text-4xl font-mono font-bold text-slate-200 mb-4">
                            Requests: <Counter />
                        </div>

                        {/* Stop Sign */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 2, type: "spring" }}
                            className="bg-red-500 text-white px-8 py-4 rounded-xl font-black text-2xl shadow-lg shadow-red-500/20"
                        >
                            STOP
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Counter = () => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 5) {
                    clearInterval(interval);
                    return 5;
                }
                return prev + 1;
            });
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return <span className={count >= 5 ? "text-red-500" : "text-green-500"}>{count}</span>;
}

export default Slide2_WhatIs;
