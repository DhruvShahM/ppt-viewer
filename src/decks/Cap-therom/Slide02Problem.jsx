import React from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertCircle } from 'lucide-react';

const Slide2_TheProblem = () => {
    return (
        <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative p-8">
            {/* Background blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

            <div className="relative z-10 grid grid-cols-2 gap-12 max-w-6xl w-full">
                {/* Left: Definition */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center"
                >
                    <h2 className="text-5xl font-black mb-8 text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">
                        What is CAP Theorem?
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                letter: 'C',
                                title: 'Consistency',
                                desc: 'All nodes see the same data at the same time',
                                color: 'from-red-500 to-pink-500',
                            },
                            {
                                letter: 'A',
                                title: 'Availability',
                                desc: 'Every request returns a response, no failures',
                                color: 'from-green-500 to-emerald-500',
                            },
                            {
                                letter: 'P',
                                title: 'Partition Tolerance',
                                desc: 'System works even if network fails between nodes',
                                color: 'from-yellow-500 to-orange-500',
                            },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
                                className="flex gap-4"
                            >
                                <div
                                    className={`flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center font-bold text-xl text-white`}
                                >
                                    {item.letter}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-white mb-1">
                                        {item.title}
                                    </p>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Visual representation */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center justify-center"
                >
                    <svg viewBox="0 0 400 400" className="w-full h-auto">
                        {/* Triangle outline */}
                        <motion.polygon
                            points="200,50 350,350 50,350"
                            fill="none"
                            stroke="url(#triangleGradient)"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5 }}
                        />

                        {/* Gradient definition */}
                        <defs>
                            <linearGradient
                                id="triangleGradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor="rgba(34, 211, 238, 1)" />
                                <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
                                <stop offset="100%" stopColor="rgba(139, 92, 246, 1)" />
                            </linearGradient>
                        </defs>

                        {/* Vertices with animated circles */}
                        {[
                            { cx: 200, cy: 50, label: 'C', color: '#ef4444' },
                            { cx: 350, cy: 350, label: 'A', color: '#22c55e' },
                            { cx: 50, cy: 350, label: 'P', color: '#eab308' },
                        ].map((vertex, idx) => (
                            <g key={idx}>
                                <motion.circle
                                    cx={vertex.cx}
                                    cy={vertex.cy}
                                    r="25"
                                    fill={vertex.color}
                                    opacity="0.2"
                                    animate={{
                                        r: [25, 40, 25],
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: idx * 0.2,
                                        repeat: Infinity,
                                    }}
                                />
                                <circle
                                    cx={vertex.cx}
                                    cy={vertex.cy}
                                    r="20"
                                    fill={vertex.color}
                                />
                                <text
                                    x={vertex.cx}
                                    y={vertex.cy}
                                    textAnchor="middle"
                                    dy="0.3em"
                                    fontSize="24"
                                    fontWeight="bold"
                                    fill="white"
                                >
                                    {vertex.label}
                                </text>
                            </g>
                        ))}

                        {/* Center label */}
                        <text
                            x="200"
                            y="220"
                            textAnchor="middle"
                            fontSize="16"
                            fill="rgba(203, 213, 225, 0.6)"
                            fontWeight="500"
                        >
                            Pick 2 of 3
                        </text>
                    </svg>
                </motion.div>
            </div>
        </div>
    );
};

export default Slide2_TheProblem;