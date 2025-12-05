import React from 'react';
import { motion } from 'framer-motion';

const Slide13_AdvancedFeatures = () => {
    const features = [
        { title: "SSL Termination", desc: "Decrypts incoming requests, reducing server load." },
        { title: "Caching", desc: "Stores frequently accessed content for faster delivery." },
        { title: "Sticky Sessions", desc: "Ensures a user stays on the same server." },
        { title: "Rate Limiting", desc: "Prevents abuse by limiting request frequency." },
        { title: "Auto-Scaling Support", desc: "Adds/removes servers based on traffic." }
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 z-10">Advanced Features</h2>

            <div className="relative w-full max-w-4xl z-10">
                {/* Center Line */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 1.5 }}
                    className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-500/30 -translate-x-1/2 rounded-full"
                />

                <div className="space-y-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.3 + 0.5 }}
                            className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                        >
                            {/* Content Box */}
                            <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                                <h3 className="text-2xl font-bold text-white mb-1">{feature.title}</h3>
                                <p className="text-slate-400">{feature.desc}</p>
                            </div>

                            {/* Timeline Dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.3 + 0.5, type: "spring" }}
                                className="w-6 h-6 bg-blue-500 rounded-full border-4 border-slate-900 z-10 shadow-lg shadow-blue-500/50"
                            />

                            {/* Spacer for alignment */}
                            <div className="flex-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slide13_AdvancedFeatures;
