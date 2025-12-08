// Full code as provided in chat
// Slide09WhenToUse.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const Slide09WhenToUse = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            <motion.div className="z-10 text-center max-w-6xl w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    When to Use vs Avoid
                </motion.h2>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-6 rounded-2xl bg-slate-900/50">
                        <div className="flex items-center gap-3 mb-3"><CheckCircle /><div className="font-semibold">Use CAP reasoning when:</div></div>
                        <ul className="text-sm text-slate-300 list-disc ml-6 space-y-2">
                            <li>Designing geo-replicated services</li>
                            <li>Choosing databases and replication modes</li>
                            <li>Tuning for latency vs correctness</li>
                        </ul>
                    </motion.div>
                    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-6 rounded-2xl bg-slate-900/50">
                        <div className="flex items-center gap-3 mb-3"><XCircle /><div className="font-semibold">Avoid over-applying when:</div></div>
                        <ul className="text-sm text-slate-300 list-disc ml-6 space-y-2">
                            <li>You can accept single-node failure modes (monolith)</li>
                            <li>Strict serializability is unnecessary</li>
                            <li>Latency is non-critical (batch systems)</li>
                        </ul>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Slide09WhenToUse;
