import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Zap } from 'lucide-react';



const Slide03WhyMatter = () => {
    const problems = [
        {
            icon: AlertTriangle,
            title: 'Network Failures',
            desc: 'Servers get disconnected but must keep working',
            color: 'text-red-400',
            bgColor: 'bg-red-500/10',
        },
        {
            icon: Zap,
            title: 'Data Inconsistency',
            desc: 'Different nodes have different data versions',
            color: 'text-orange-400',
            bgColor: 'bg-orange-500/10',
        },
        {
            icon: AlertTriangle,
            title: 'Latency Issues',
            desc: 'Waiting for consensus slows down responses',
            color: 'text-yellow-400',
            bgColor: 'bg-yellow-500/10',
        },
    ];

    return (
        <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative p-8">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900" />

            <div className="relative z-10 grid grid-cols-2 gap-16 max-w-6xl w-full items-center">
                {/* Left: Problems */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl font-black mb-12 text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
                        Why CAP Theorem?
                    </h2>

                    <div className="space-y-6">
                        {problems.map((problem, idx) => {
                            const Icon = problem.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.15 }}
                                    className={`p-4 rounded-lg border border-slate-700/50 ${problem.bgColor}`}
                                    whileHover={{ borderColor: 'rgba(255, 100, 100, 0.3)' }}
                                >
                                    <div className="flex gap-4 items-start">
                                        <Icon className={`w-6 h-6 flex-shrink-0 mt-1 ${problem.color}`} />
                                        <div>
                                            <p className="font-semibold text-white mb-1">
                                                {problem.title}
                                            </p>
                                            <p className="text-slate-400 text-sm">{problem.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Right: Animated visualization - chaos to order */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-8"
                >
                    {/* Chaos state */}
                    <div className="relative h-48 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-lg border border-red-500/30 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center gap-4">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-3 h-3 bg-red-400 rounded-full"
                                    animate={{
                                        x: [0, 30, -30, 0],
                                        y: [0, -30, 30, 0],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.15,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </div>
                        <span className="relative z-10 text-red-400 font-bold text-sm">
                            Chaos
                        </span>
                    </div>

                    {/* Arrow */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="h-6 flex items-center justify-center"
                    >
                        <div className="w-1 h-full bg-gradient-to-b from-red-500 to-green-500" />
                        <svg
                            className="w-6 h-6 text-green-400 -ml-3"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 19l-7-7h4V6h6v6h4l-7 7z" />
                        </svg>
                    </motion.div>

                    {/* Order state */}
                    <div className="relative h-48 bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg border border-green-500/30 overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center gap-4">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-3 h-3 bg-green-400 rounded-full"
                                    animate={{
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        delay: i * 0.1,
                                        repeat: Infinity,
                                    }}
                                    style={{
                                        position: 'absolute',
                                        left: `${10 + i * 13}%`,
                                    }}
                                />
                            ))}
                        </div>
                        <span className="relative z-10 text-green-400 font-bold text-sm">
                            Stability
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Slide03WhyMatter;