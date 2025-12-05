import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const summaryPoints = [
    { text: "Controls API traffic", highlight: "Controls" },
    { text: "Prevents abuse", highlight: "Prevents" },
    { text: "Ensures fair usage", highlight: "fair usage" },
    { text: "Protects backend systems", highlight: "Protects" },
    { text: "Uses smart algorithms (Fixed / Sliding / Bucket models)", highlight: "smart algorithms" },
];

const Slide14_Summary = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
            <h2 className="text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                Summary
            </h2>

            <div className="flex flex-col gap-8 w-full max-w-4xl">
                {summaryPoints.map((point, index) => {
                    const parts = point.text.split(point.highlight);
                    return (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -100 : 100
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: index * 0.2,
                                type: "spring",
                                stiffness: 100
                            }}
                            className="flex items-center gap-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.2 + 0.3 }}
                            >
                                <CheckCircle className="text-green-400" size={32} />
                            </motion.div>

                            <span className="text-2xl">
                                {parts[0]}
                                <span className="text-blue-400 font-bold">{point.highlight}</span>
                                {parts[1]}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Slide14_Summary;
