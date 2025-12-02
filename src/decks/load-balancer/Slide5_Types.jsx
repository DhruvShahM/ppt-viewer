import React from 'react';
import { motion } from 'framer-motion';

const Slide5_Types = () => {
    const types = [
        {
            title: "Hardware Load Balancer",
            icon: "🖥️",
            desc: "Physical device, expensive, high performance.",
            color: "bg-blue-600"
        },
        {
            title: "Software Load Balancer",
            icon: "💾",
            desc: "Runs on standard servers, flexible, cost-effective.",
            color: "bg-purple-600"
        },
        {
            title: "Cloud Load Balancer",
            icon: "☁️",
            desc: "Managed service (AWS ELB), scalable, pay-as-you-go.",
            color: "bg-orange-600"
        }
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 z-10">Types of Load Balancers</h2>

            <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl z-10">
                {types.map((type, index) => (
                    <div key={index} className="w-80 h-96 perspective-1000 group cursor-pointer">
                        <motion.div
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            transition={{ delay: index * 0.3, duration: 0.8 }}
                            className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180"
                        >
                            {/* Front Side */}
                            <div className={`absolute inset-0 ${type.color} rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden shadow-2xl border border-white/10`}>
                                <div className="text-8xl mb-8">{type.icon}</div>
                                <h3 className="text-2xl font-bold text-white text-center">{type.title}</h3>
                                <p className="text-white/70 mt-4 text-sm uppercase tracking-widest">Hover to flip</p>
                            </div>

                            {/* Back Side */}
                            <div className={`absolute inset-0 bg-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center backface-hidden rotate-y-180 border-2 border-${type.color.replace('bg-', '')} shadow-xl`}>
                                <h3 className={`text-2xl font-bold ${type.color.replace('bg-', 'text-')} mb-6 text-center`}>{type.title}</h3>
                                <p className="text-xl text-slate-300 text-center leading-relaxed">
                                    {type.desc}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slide5_Types;
