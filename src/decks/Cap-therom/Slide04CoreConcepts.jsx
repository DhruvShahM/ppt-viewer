// Full code as provided in chat
// Slide04CoreConcepts.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Bolt } from 'lucide-react';

const Slide04CoreConcepts = () => {
    const conceptStyle = "p-5 rounded-2xl bg-slate-900/60 text-left";
    const item = (title, desc, icon) => (
        <motion.div className={conceptStyle} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3">
                {icon}
                <div className="font-semibold">{title}</div>
            </div>
            <div className="text-sm text-slate-300 mt-2">{desc}</div>
        </motion.div>
    );

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            <motion.div className="z-10 text-center max-w-5xl w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Core Concepts (CAP)
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {item("Consistency", "All nodes see the same data at the same time.", <Database />)}
                    {item("Availability", "Every request receives a (non-error) response — may be stale.", <Bolt />)}
                    {item("Partition Tolerance", "System continues to operate despite network partitions.", <Database />)}
                </div>
            </motion.div>
        </div>
    );
};

export default Slide04CoreConcepts;
