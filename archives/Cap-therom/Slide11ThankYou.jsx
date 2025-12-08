// Full code as provided in chat
// Slide11ThankYou.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const Slide11ThankYou = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            <motion.div className="z-10 text-center max-w-4xl w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                    initial={{ y: -12 }} animate={{ y: 0 }}
                >
                    Thank you!
                </motion.h2>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg text-slate-300 mb-8">
                    Questions? Q&A time — or connect for deeper system design walkthroughs.
                </motion.p>

                <motion.div className="inline-flex items-center gap-4 bg-slate-900/60 px-6 py-3 rounded-2xl">
                    <Sparkles />
                    <div className="text-left">
                        <div className="font-semibold">Follow-up</div>
                        <div className="text-sm text-slate-300">Ask about consensus patterns, CRDTs, or database choices</div>
                    </div>
                    <ArrowRight />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Slide11ThankYou;
