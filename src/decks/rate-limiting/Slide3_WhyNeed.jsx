import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, ShieldCheck, Users, DollarSign, Zap } from 'lucide-react';

const Slide3_WhyNeed = () => {
    const [protected_state, setProtected] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setProtected(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const reasons = [
        { icon: Zap, text: "Prevent DDoS attacks", color: "text-red-400" },
        { icon: Users, text: "Stop API abuse", color: "text-orange-400" },
        { icon: Server, text: "Protect servers from overload", color: "text-blue-400" },
        { icon: DollarSign, text: "Reduce cost & misuse", color: "text-green-400" },
        { icon: ShieldCheck, text: "Ensure fair usage", color: "text-purple-400" },
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-12 z-10">Why Rate Limiting is Needed?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl z-10 items-center">
                {/* List of Reasons */}
                <div className="space-y-6">
                    {reasons.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center space-x-6 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50"
                        >
                            <div className={`p-3 rounded-lg bg-slate-900 ${item.color}`}>
                                <item.icon size={28} />
                            </div>
                            <span className="text-xl text-slate-200 font-medium">{item.text}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Animation: Server Load */}
                <div className="relative flex flex-col items-center justify-center h-96 bg-slate-900/50 rounded-3xl border border-slate-800 p-8">
                    <AnimatePresence>
                        {!protected_state ? (
                            <motion.div
                                key="server-stressed"
                                animate={{ x: [-2, 2, -2] }}
                                transition={{ repeat: Infinity, duration: 0.1 }}
                                className="relative"
                            >
                                <Server size={120} className="text-red-500" />
                                <motion.div
                                    className="absolute -top-8 -right-8 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.5 }}
                                >
                                    OVERLOAD
                                </motion.div>
                                {/* Incoming Traffic Particles */}
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-red-400 rounded-full"
                                        initial={{ x: -200, y: (Math.random() - 0.5) * 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: Math.random() }}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="server-protected"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative"
                            >
                                <div className="relative">
                                    <Server size={120} className="text-green-500" />
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -inset-4 border-4 border-blue-500/50 rounded-xl"
                                    />
                                    <ShieldCheck size={60} className="absolute -bottom-4 -right-4 text-blue-400 bg-slate-900 rounded-full p-1" />
                                </div>
                                {/* Controlled Traffic */}
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-green-400 rounded-full"
                                        initial={{ x: -200, y: 0, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-8 text-center">
                        <p className={`text-xl font-bold ${protected_state ? 'text-green-400' : 'text-red-400'}`}>
                            {protected_state ? "Traffic Stabilized" : "System Under Attack!"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide3_WhyNeed;
