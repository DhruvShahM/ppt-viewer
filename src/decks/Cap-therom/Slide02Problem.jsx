// Full code as provided in chat
// Slide02Problem.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Info, ArrowRight } from 'lucide-react';

const Slide02Problem = () => {
    const list = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.18 } }
    };
    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            <motion.div
                className="z-10 text-center max-w-5xl w-full"
                initial={{ opacity: 0, scale: 0.995 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <motion.h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    Problem Statement
                </motion.h2>

                <motion.div className="max-w-3xl mx-auto text-left" variants={list} initial="hidden" animate="show">
                    <motion.div className="flex items-start gap-4 p-4 rounded-xl mb-3 bg-slate-900/50" variants={item}>
                        <Info size={20} />
                        <div>
                            <div className="font-semibold">Microservices increase distribution</div>
                            <div className="text-sm text-slate-300">More networked components → more failure modes</div>
                        </div>
                    </motion.div>

                    <motion.div className="flex items-start gap-4 p-4 rounded-xl mb-3 bg-slate-900/50" variants={item}>
                        <Info size={20} />
                        <div>
                            <div className="font-semibold">Consistency is harder</div>
                            <div className="text-sm text-slate-300">Data is partitioned or replicated across services</div>
                        </div>
                    </motion.div>

                    <motion.div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/50" variants={item}>
                        <ArrowRight size={20} />
                        <div>
                            <div className="font-semibold">Need clear trade-offs</div>
                            <div className="text-sm text-slate-300">CAP theorem gives a framework to reason about them</div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Slide02Problem;
