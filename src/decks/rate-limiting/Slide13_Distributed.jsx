import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Network, Globe } from 'lucide-react';

const Slide13_Distributed = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-white p-8">
            <h2 className="text-4xl font-bold mb-12 text-blue-400">Distributed Rate Limiting</h2>

            <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
                {/* Left: Text Content */}
                <div className="space-y-8">
                    <div className="p-6 rounded-xl border border-slate-700">
                        <h3 className="text-2xl font-semibold mb-4 text-purple-400">Needed for:</h3>
                        <ul className="space-y-3 text-lg text-gray-300">
                            <li className="flex items-center gap-3"><Globe size={20} /> Microservices</li>
                            <li className="flex items-center gap-3"><Network size={20} /> Multi-region systems</li>
                            <li className="flex items-center gap-3"><Server size={20} /> High-scale APIs</li>
                        </ul>
                    </div>

                    <div className="p-6 rounded-xl border border-slate-700">
                        <h3 className="text-2xl font-semibold mb-4 text-green-400">Usually uses:</h3>
                        <ul className="space-y-3 text-lg text-gray-300">
                            <li className="flex items-center gap-3"><Database size={20} /> Redis / Memcached</li>
                            <li className="flex items-center gap-3"><Server size={20} /> In-memory clusters</li>
                            <li className="flex items-center gap-3"><Network size={20} /> API Gateways with shared counters</li>
                        </ul>
                    </div>
                </div>

                {/* Right: Animation */}
                <div className="flex flex-col items-center justify-center rounded-2xl p-8 border border-slate-700 relative h-[450px]">

                    {/* Central Redis */}
                    <motion.div
                        className="z-20 p-4 rounded-lg border border-red-500 flex flex-col items-center"
                        animate={{ boxShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 20px rgba(239,68,68,0.5)", "0 0 0px rgba(239,68,68,0)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Database size={48} className="text-red-500" />
                        <span className="text-sm font-bold mt-2">Shared Redis</span>
                    </motion.div>

                    {/* Left Servers */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute p-3 rounded-lg border border-slate-600 z-10"
                            style={{
                                top: i === 0 ? '20%' : i === 1 ? '50%' : '80%',
                                left: i === 1 ? '10%' : '20%',
                                transform: 'translate(-50%, -50%)'
                            }}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <Server size={32} className="text-blue-400" />
                            <div className="text-xs mt-1">Service {i + 1}</div>
                        </motion.div>
                    ))}

                    {/* Right Servers */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute p-3 rounded-lg border border-slate-600 z-10"
                            style={{
                                top: i === 0 ? '20%' : i === 1 ? '50%' : '80%',
                                right: i === 1 ? '10%' : '20%',
                                transform: 'translate(50%, -50%)'
                            }}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <Server size={32} className="text-green-400" />
                            <div className="text-xs mt-1">Service {i + 4}</div>
                        </motion.div>
                    ))}

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {[0, 1, 2].map(i => (
                            <React.Fragment key={i}>
                                <motion.line
                                    x1={i === 1 ? "15%" : "25%"}
                                    y1={i === 0 ? "20%" : i === 1 ? "50%" : "80%"}
                                    x2="50%"
                                    y2="50%"
                                    stroke="#475569"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                                <motion.line
                                    x1={i === 1 ? "85%" : "75%"}
                                    y1={i === 0 ? "20%" : i === 1 ? "50%" : "80%"}
                                    x2="50%"
                                    y2="50%"
                                    stroke="#475569"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </React.Fragment>
                        ))}
                    </svg>

                    {/* Data Packets */}
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <motion.div
                            key={`packet-${i}`}
                            className="absolute w-2 h-2 bg-yellow-400 rounded-full z-20"
                            animate={{
                                offsetDistance: "100%"
                            }}
                            style={{
                                offsetPath: `path("M ${i < 3 ? (i === 1 ? 60 : 100) : (i === 4 ? 340 : 300)} ${i % 3 === 0 ? 90 : i % 3 === 1 ? 225 : 360} L 200 225")`
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "linear"
                            }}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Slide13_Distributed;