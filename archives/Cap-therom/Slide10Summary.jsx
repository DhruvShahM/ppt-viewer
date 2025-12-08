// Full code as provided in chat
// Slide10Summary.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Slide10Summary = () => {
    const bullets = [
        "CAP = Consistency, Availability, Partition tolerance",
        "Microservices force you to make trade-offs",
        "Design: pick what matters, implement patterns to mitigate"
    ];
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 text-white p-8 relative overflow-hidden">
            <motion.div className="z-10 text-center max-w-4xl w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Summary / Key Takeaways
                </motion.h2>

                <div className="mt-6 space-y-4 text-left">
                    {bullets.map((b, i) => (
                        <motion.div key={i} initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-xl bg-slate-900/50 flex items-start gap-4">
                            <Check />
                            <div>
                                <div className="font-semibold">{b}</div>
                                <div className="text-sm text-slate-300">Actionable note</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Slide10Summary;
