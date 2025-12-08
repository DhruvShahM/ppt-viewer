// Full code as provided in chat
// Slide07Advantages.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Slide07Advantages = () => {
    const points = [
        "Design clarity — explicit trade-offs",
        "Resilience patterns (retries, timeouts, circuit breakers)",
        "Optimized user experience by tuning availability & latency"
    ];
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            <motion.div className="z-10 text-center max-w-4xl w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Advantages When You Apply CAP Thoughtfully
                </motion.h2>

                <div className="mt-6 space-y-4 text-left">
                    {points.map((p, i) => (
                        <motion.div key={i} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.12 }} className="p-4 rounded-xl bg-slate-900/50 flex items-start gap-4">
                            <Check />
                            <div>
                                <div className="font-semibold">{p}</div>
                                <div className="text-sm text-slate-300">Practical note for architects</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Slide07Advantages;
