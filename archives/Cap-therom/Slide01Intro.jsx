// Full code as provided in chat
// Slide01Intro.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const Slide01Intro = () => {
    const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            {/* subtle floating background element */}
            <motion.div
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.06 }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-3xl"
            />
            {/* 2. Main Content (Z-Index 10) */}
            <div className="z-10 text-center max-w-5xl w-full">
                <motion.h2
                    initial={{ opacity: 0, y: -18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                    How CAP Theorem Applies to Microservices
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg max-w-3xl mx-auto"
                >
                    Understanding trade-offs between Consistency, Availability, and Partition tolerance — and how microservice architectures make those trade-offs explicit.
                </motion.p>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="mt-10 flex items-center justify-center gap-6"
                >
                    <motion.span className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/60">
                        <Sparkles size={18} />
                        Conference-level visuals
                    </motion.span>
                    <motion.span className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/60">
                        <ArrowRight size={18} />
                        Framer Motion animations
                    </motion.span>
                </motion.div>
            </div>
        </div>
    );
};

export default Slide01Intro;
