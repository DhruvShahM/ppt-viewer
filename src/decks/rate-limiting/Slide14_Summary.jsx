import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Slide14_Summary = () => {
    const points = [
        "Controls API traffic",
        "Prevents abuse",
        "Ensures fair usage",
        "Protects backend systems",
        "Uses smart algorithms (Fixed / Sliding / Bucket models)"
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-6xl font-black text-white mb-16 z-10 tracking-tight">Summary</h2>

            <div className="flex flex-col space-y-8 w-full max-w-4xl z-10">
                {points.map((point, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                            delay: index * 0.2,
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                        }}
                        className="flex items-center space-x-6 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                        >
                            <CheckCircle2 size={32} className="text-green-400" />
                        </motion.div>
                        <span className="text-2xl md:text-3xl text-slate-200 font-medium">
                            {point}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide14_Summary;
