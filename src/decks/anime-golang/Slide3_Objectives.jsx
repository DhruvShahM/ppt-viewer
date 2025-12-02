import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Slide3_Objectives = () => {
    const objectives = [
        "Understand Goroutines vs Threads",
        "Master Channels (The Anime Way)",
        "Avoid Deadlocks & Race Conditions",
        "Real-world Patterns for Microservices"
    ];

    return (
        <div className="h-full w-full bg-slate-900 p-12 flex items-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-[#00ADD8]/10 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl" />

            <div className="grid grid-cols-2 gap-16 w-full max-w-7xl mx-auto z-10">
                {/* Left: Gopher Pointing */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center justify-center"
                >
                    <div className="w-full aspect-[3/4] bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-700 flex items-center justify-center relative">
                        <span className="text-9xl">👉</span>
                        <p className="absolute bottom-8 text-slate-400">Gopher Pointing at Board</p>
                    </div>
                </motion.div>

                {/* Right: Objectives List */}
                <div className="flex flex-col justify-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-black text-white mb-12"
                    >
                        What You Will <span className="text-[#00ADD8]">Learn</span>
                    </motion.h2>

                    <div className="space-y-6">
                        {objectives.map((obj, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.3 }}
                                className="flex items-center gap-4 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-[#00ADD8]/50 transition-colors"
                            >
                                <CheckCircle2 className="text-[#00ADD8] w-8 h-8 flex-shrink-0" />
                                <span className="text-xl text-slate-200 font-medium">{obj}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide3_Objectives;
