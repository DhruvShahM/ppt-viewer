import React from 'react';
import { motion } from 'framer-motion';

const Slide6_Algorithms = () => {
    const algorithms = [
        { name: "Round Robin", desc: "Sequential distribution" },
        { name: "Least Connections", desc: "Sent to server with fewest active connections" },
        { name: "IP Hash", desc: "Client IP determines server (sticky)" },
        { name: "Weighted Distribution", desc: "Powerful servers get more traffic" }
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 z-10">Algorithms of Load Balancing</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-6xl z-10 items-center">
                {/* List of Algorithms */}
                <div className="space-y-6">
                    {algorithms.map((algo, index) => (
                        <motion.div
                            key={index}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-slate-800/50 p-6 rounded-xl border-l-4 border-blue-500 hover:bg-slate-800 transition-colors"
                        >
                            <h3 className="text-2xl font-bold text-white mb-2">{algo.name}</h3>
                            <p className="text-slate-400">{algo.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Motion Graphic: Circular Distribution */}
                <div className="relative h-96 w-96 flex items-center justify-center">
                    {/* Central Load Balancer */}
                    <div className="absolute z-20 w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-600/50">
                        <span className="text-4xl">⚖️</span>
                    </div>

                    {/* Servers in Circle */}
                    {[0, 1, 2, 3, 4].map((i) => {
                        const angle = (i * 360) / 5;
                        const radius = 140;
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;

                        return (
                            <motion.div
                                key={i}
                                className="absolute w-16 h-16 bg-slate-700 rounded-lg border-2 border-slate-500 flex items-center justify-center z-10"
                                style={{ x, y }}
                                animate={i === 1 ? {
                                    boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.8)", "0 0 0px rgba(59, 130, 246, 0)"],
                                    borderColor: ["#64748b", "#3b82f6", "#64748b"]
                                } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <span className="text-2xl">🖥️</span>
                            </motion.div>
                        );
                    })}

                    {/* Jumping Arrow Animation (Round Robin) */}
                    <motion.div
                        className="absolute w-8 h-8 text-yellow-400 text-3xl z-30"
                        animate={{
                            x: [
                                Math.cos((0 * 360 / 5 * Math.PI) / 180) * 80,
                                Math.cos((1 * 360 / 5 * Math.PI) / 180) * 80,
                                Math.cos((2 * 360 / 5 * Math.PI) / 180) * 80,
                                Math.cos((3 * 360 / 5 * Math.PI) / 180) * 80,
                                Math.cos((4 * 360 / 5 * Math.PI) / 180) * 80,
                                Math.cos((0 * 360 / 5 * Math.PI) / 180) * 80
                            ],
                            y: [
                                Math.sin((0 * 360 / 5 * Math.PI) / 180) * 80,
                                Math.sin((1 * 360 / 5 * Math.PI) / 180) * 80,
                                Math.sin((2 * 360 / 5 * Math.PI) / 180) * 80,
                                Math.sin((3 * 360 / 5 * Math.PI) / 180) * 80,
                                Math.sin((4 * 360 / 5 * Math.PI) / 180) * 80,
                                Math.sin((0 * 360 / 5 * Math.PI) / 180) * 80
                            ],
                            rotate: [0, 72, 144, 216, 288, 360]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "linear",
                            times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                        }}
                    >
                        ➤
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Slide6_Algorithms;
