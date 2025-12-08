// Full code as provided in chat
// Slide03WhyMatters.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle } from 'lucide-react';

const Slide03WhyMatters = () => {
    const bullets = [
        "Service reliability across regions",
        "Correctness of user-visible data",
        "Latency and user experience"
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            <motion.div className="z-10 text-center max-w-5xl w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                    initial={{ y: -12 }} animate={{ y: 0 }}
                >
                    Why This Topic Matters
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {bullets.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.12 }}
                            className="p-6 rounded-2xl bg-slate-900/50 flex flex-col items-start gap-3"
                        >
                            <div className="inline-flex items-center gap-3">
                                <CheckCircle />
                                <h3 className="font-semibold">{b}</h3>
                            </div>
                            <p className="text-sm text-slate-300">
                                {i === 0 ? "Design for faults and cross-region traffic." : i === 1 ? "Is eventual state acceptable?" : "User latency affects retention."}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Slide03WhyMatters;
