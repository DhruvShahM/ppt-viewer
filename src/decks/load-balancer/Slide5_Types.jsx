import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Slide5_Types = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const types = [
        {
            title: "Hardware Load Balancer",
            icon: "🖥️",
            desc: "Physical device, expensive, high performance.",
            color: "bg-blue-600",
            backColor: "bg-blue-950"
        },
        {
            title: "Software Load Balancer",
            icon: "💾",
            desc: "Runs on standard servers, flexible, cost-effective.",
            color: "bg-purple-600",
            backColor: "bg-purple-950"
        },
        {
            title: "Cloud Load Balancer",
            icon: "☁️",
            desc: "Managed service (AWS ELB), scalable, pay-as-you-go.",
            color: "bg-orange-600",
            backColor: "bg-orange-950"
        }
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 z-10">Types of Load Balancers</h2>

            <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl z-10">
                {types.map((type, index) => (
                    <div
                        key={index}
                        className="w-80 h-96 perspective-1000 cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <motion.div
                            initial={{
                                x: index === 0 ? -100 : index === 2 ? 100 : 0,
                                y: index === 1 ? 100 : 0,
                                opacity: 0
                            }}
                            animate={{
                                x: 0,
                                y: 0,
                                rotateY: hoveredIndex === index ? 180 : 0,
                                opacity: 1
                            }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.2,
                                type: "spring",
                                stiffness: 100
                            }}
                            className="relative w-full h-full"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Front Side */}
                            <div
                                className={`absolute inset-0 ${type.color} rounded-2xl p-8 flex flex-col items-center justify-center shadow-2xl border border-white/10`}
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <div className="text-8xl mb-8">{type.icon}</div>
                                <h3 className="text-2xl font-bold text-white text-center">{type.title}</h3>
                                <p className="text-white/70 mt-4 text-sm uppercase tracking-widest">Hover to flip</p>
                            </div>

                            {/* Back Side */}
                            <div
                                className={`absolute inset-0 ${type.backColor} rounded-2xl p-8 flex flex-col items-center justify-center shadow-xl border border-white/10`}
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <h3 className="text-2xl font-bold text-white mb-6 text-center">{type.title}</h3>
                                <p className="text-xl text-gray-200 text-center leading-relaxed">
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
