import React from 'react';
import { motion } from 'framer-motion';

const Slide4_Explanation = () => {
    return (
        <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center p-12 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 w-full max-w-5xl"
            >
                <h2 className="text-4xl font-bold text-center text-white mb-16">
                    The <span className="text-pink-400">Anime</span> Metaphor
                </h2>

                <div className="grid grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl h-[300px] flex flex-col justify-center"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="text-2xl font-bold text-[#00ADD8] mb-4">Standard Program</h3>
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center text-3xl">😓</div>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed text-center">
                            One tired main character doing everything alone.
                            <br />
                            <span className="text-red-400 italic">Slow and exhausting!</span>
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-slate-800 p-8 rounded-3xl border border-[#00ADD8]/30 shadow-2xl shadow-[#00ADD8]/10 h-[300px] flex flex-col justify-center relative overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                    >
                        <h3 className="text-2xl font-bold text-pink-400 mb-4 relative z-10">Goroutines</h3>

                        {/* Shadow Clone Animation */}
                        <div className="flex justify-center mb-6 relative h-20">
                            <motion.div
                                className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-3xl absolute z-20"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                😎
                            </motion.div>
                            {/* Clones */}
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-16 h-16 bg-pink-500/50 rounded-full flex items-center justify-center text-3xl absolute"
                                    initial={{ opacity: 0, x: 0, scale: 0.5 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        x: (i % 2 === 0 ? -1 : 1) * (40 + i * 20),
                                        y: (i < 2 ? -1 : 1) * 20,
                                        scale: 0.8
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeOut"
                                    }}
                                >
                                    👤
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-slate-300 text-lg leading-relaxed text-center relative z-10">
                            "Shadow Clones" (Kage Bunshin)!
                            <br />
                            <span className="text-green-400 italic">Super fast and efficient!</span>
                        </p>
                    </motion.div>
                </div>

                <div className="mt-12 flex justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-6xl">👯‍♂️</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Slide4_Explanation;
