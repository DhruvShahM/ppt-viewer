import React from 'react';
import { motion } from 'framer-motion';

const TaskBlock = ({ color, delay }) => (
    <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1, delay: delay, repeat: Infinity, repeatDelay: 3 }}
        className={`h-full ${color} rounded-sm`}
    />
);

const Slide5_Concept = () => {
    return (
        <div className="h-full w-full bg-slate-900 p-12 flex flex-col items-center justify-center relative">
            <h2 className="text-5xl font-black text-white mb-12">
                Core Concept: <span className="text-[#00ADD8]">Concurrency != Parallelism</span>
            </h2>

            <div className="grid grid-cols-2 gap-16 w-full max-w-6xl">
                {/* Animation Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center min-h-[400px] gap-8"
                >
                    {/* Concurrency Animation */}
                    <div className="w-full bg-slate-800 p-6 rounded-2xl border border-slate-600 relative overflow-hidden">
                        <p className="text-sm text-slate-400 mb-4 font-bold uppercase tracking-wider">Concurrency (Single Core)</p>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-2xl border-2 border-white/20 z-10">
                                🤖
                            </div>
                            <div className="flex-1 h-16 bg-slate-900 rounded-lg p-2 flex gap-2 relative overflow-hidden">
                                {/* Switching Context Animation */}
                                <motion.div
                                    animate={{ x: [0, 100, 200, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.33, 0.66, 1] }}
                                    className="absolute top-0 left-0 w-1/3 h-full bg-white/5 border-r-2 border-[#00ADD8] z-0"
                                />

                                <div className="flex-1 bg-green-900/30 rounded border border-green-500/30 relative">
                                    <TaskBlock color="bg-green-500" delay={0} />
                                </div>
                                <div className="flex-1 bg-blue-900/30 rounded border border-blue-500/30 relative">
                                    <TaskBlock color="bg-blue-500" delay={1.3} />
                                </div>
                                <div className="flex-1 bg-red-900/30 rounded border border-red-500/30 relative">
                                    <TaskBlock color="bg-red-500" delay={2.6} />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-right">Fast Context Switching</p>
                    </div>

                    {/* Parallelism Animation */}
                    <div className="w-full bg-slate-800 p-6 rounded-2xl border border-slate-600">
                        <p className="text-sm text-slate-400 mb-4 font-bold uppercase tracking-wider">Parallelism (Multi Core)</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-xl border-2 border-white/20">
                                    🤖
                                </div>
                                <div className="flex-1 h-8 bg-slate-900 rounded-lg p-1 relative">
                                    <TaskBlock color="bg-green-500" delay={0} />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-xl border-2 border-white/20">
                                    🤖
                                </div>
                                <div className="flex-1 h-8 bg-slate-900 rounded-lg p-1 relative">
                                    <TaskBlock color="bg-blue-500" delay={0} />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-right">Simultaneous Execution</p>
                    </div>
                </motion.div>

                {/* Key Points */}
                <div className="flex flex-col justify-center space-y-8">
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-4"
                    >
                        <div className="w-12 h-12 rounded-full bg-[#00ADD8] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#00ADD8]/30">1</div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Concurrency</h3>
                            <p className="text-slate-400">Dealing with lots of things at once. (Structure)</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4"
                    >
                        <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/30">2</div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Parallelism</h3>
                            <p className="text-slate-400">Doing lots of things at once. (Execution)</p>
                        </div>
                    </motion.div>

                    <div className="mt-8 p-6 bg-[#00ADD8]/10 rounded-xl border border-[#00ADD8]/30">
                        <p className="text-[#00ADD8] font-mono text-sm">
                            "Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once." - Rob Pike
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide5_Concept;
