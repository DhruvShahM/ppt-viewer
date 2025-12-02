import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Slide9_Summary = () => {
    return (
        <div className="h-full w-full bg-gradient-to-br from-slate-900 to-purple-900 p-12 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent" />

            <div className="flex items-center gap-16 w-full max-w-6xl z-10">
                {/* Chibi Gopher */}
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-1/3 flex justify-center"
                >
                    <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-[3rem] flex items-center justify-center border border-white/20 shadow-2xl">
                        <span className="text-9xl">👍</span>
                    </div>
                </motion.div>

                {/* Summary Points */}
                <div className="w-2/3">
                    <h2 className="text-5xl font-black text-white mb-12">
                        Level Up <span className="text-yellow-400">Complete!</span>
                    </h2>

                    <div className="space-y-6">
                        {[
                            "Goroutines are lightweight threads (Anime Clones)",
                            "Concurrency is structure, Parallelism is execution",
                            "Always wait for your goroutines to finish!"
                        ].map((text, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 + 0.3 }}
                                className="flex items-center gap-4 bg-black/20 p-6 rounded-2xl border border-white/5"
                            >
                                <Star className="text-yellow-400 fill-yellow-400 w-6 h-6 flex-shrink-0" />
                                <span className="text-xl text-white font-medium">{text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide9_Summary;
