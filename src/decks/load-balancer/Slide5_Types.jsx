import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Slide5_Types = () => {
    const types = [
        {
            title: "Hardware Load Balancer",
            icon: "🖥️",
            desc: "Physical device, expensive, high performance.",
            color: "from-blue-600",
            bg: "bg-blue-950/50",
            border: "border-blue-500/30"
        },
        {
            title: "Software Load Balancer",
            icon: "💾",
            desc: "Runs on standard servers, flexible, cost-effective.",
            color: "from-purple-600",
            bg: "bg-purple-950/50",
            border: "border-purple-500/30"
        },
        {
            title: "Cloud Load Balancer",
            icon: "☁️",
            desc: "Managed service (AWS ELB), scalable, pay-as-you-go.",
            color: "from-orange-600",
            bg: "bg-orange-950/50",
            border: "border-orange-500/30"
        }
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-slate-900">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white mb-16 z-10"
            >
                Types of Load Balancers
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl z-10">
                {types.map((type, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        className={`relative overflow-hidden rounded-2xl p-8 ${type.bg} ${type.border} border shadow-2xl flex flex-col items-center text-center group backdrop-blur-sm`}
                    >
                        {/* Decorative Top Line */}
                        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type.color} to-transparent`} />

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 + 0.3, type: "spring" }}
                            className="text-7xl mb-8 bg-white/5 p-6 rounded-2xl aspect-square flex items-center justify-center backdrop-blur-md group-hover:bg-white/10 transition-colors shadow-inner"
                        >
                            {type.icon}
                        </motion.div>

                        <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                        <p className="text-gray-300 leading-relaxed text-lg">{type.desc}</p>

                        {/* Subtle Glow Effect */}
                        <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${type.color} to-transparent opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide5_Types;
