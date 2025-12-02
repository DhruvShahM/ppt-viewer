import React from 'react';
import { motion } from 'framer-motion';

const Slide2_Hook = () => {
    return (
        <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center p-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950" />

            <div className="z-10 text-center max-w-4xl">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-8 inline-block"
                >
                    <div className="w-64 h-64 rounded-full bg-gradient-to-b from-yellow-400 to-orange-500 p-1 mx-auto shadow-[0_0_50px_rgba(234,179,8,0.3)]">
                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                            {/* Placeholder for Shocked Gopher */}
                            <div className="text-center">
                                <span className="text-8xl block">🤯</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl font-bold text-white mb-8"
                >
                    Why this topic confuses <span className="text-red-500">80%</span> of beginners?
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl shadow-xl"
                >
                    <p className="text-2xl text-slate-300 leading-relaxed">
                        "Is it parallelism? Is it threading? Why do my channels deadlock?"
                        <br />
                        <span className="text-[#00ADD8] font-bold mt-2 block">Let's clear the confusion once and for all!</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Slide2_Hook;
