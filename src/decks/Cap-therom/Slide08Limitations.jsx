// Full code as provided in chat
// Slide08Limitations.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const Slide08Limitations = () => {
    const limitations = [
        "Hard choices — you can't get all three at once during partitions",
        "Operational complexity with distributed consensus",
        "Testing and reasoning under partitions is difficult"
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            <motion.div className="z-10 text-center max-w-4xl w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Limitations & Trade-offs
                </motion.h2>

                <div className="mt-6 space-y-4 text-left">
                    {limitations.map((l, i) => (
                        <motion.div key={i} initial={{ x: 12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.12 }} className="p-4 rounded-xl bg-slate-900/50 flex items-start gap-4">
                            <X />
                            <div>
                                <div className="font-semibold">{l}</div>
                                <div className="text-sm text-slate-300">What to watch for in production</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Slide08Limitations;
