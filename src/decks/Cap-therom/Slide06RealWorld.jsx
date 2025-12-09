// Full code as provided in chat
// Slide06RealWorld.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, Server } from 'lucide-react';

const Slide06RealWorld = () => {
    const examples = [
        { title: "Payment processing", cap: "CP (prefer consistency)", reason: "Strong correctness guarantees" },
        { title: "Social feed", cap: "AP (prefer availability)", reason: "Low latency & eventual consistency" },
        { title: "Geo-replicated cache", cap: "AP (tolerate staleness)", reason: "Fast reads across regions" },
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            <motion.div className="z-10 text-center max-w-5xl w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Real-World Examples
                </motion.h2>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {examples.map((e, i) => (
                        <motion.div key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.12 }} className="p-6 rounded-2xl bg-slate-900/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {i === 0 ? <Database /> : i === 1 ? <Cloud /> : <Server />}
                                    <div className="font-semibold">{e.title}</div>
                                </div>
                                <div className="text-sm font-medium bg-slate-800/60 px-3 py-1 rounded-full">{e.cap}</div>
                            </div>
                            <div className="text-sm text-slate-300 mt-3">{e.reason}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Slide06RealWorld;
