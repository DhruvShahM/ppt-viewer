import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Globe, Network } from 'lucide-react';

const Slide13_Distributed = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-12 z-10">Distributed Rate Limiting</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl z-10 items-center">

                {/* Text Content */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-blue-400 uppercase tracking-wider">Needed For</h3>
                        <ul className="space-y-3 text-xl text-slate-300">
                            <li className="flex items-center space-x-3">
                                <Network size={20} className="text-blue-500" />
                                <span>Microservices Architecture</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Globe size={20} className="text-blue-500" />
                                <span>Multi-region Systems</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Server size={20} className="text-blue-500" />
                                <span>High-scale APIs</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-red-400 uppercase tracking-wider">Powered By</h3>
                        <ul className="space-y-3 text-xl text-slate-300">
                            <li className="flex items-center space-x-3">
                                <Database size={20} className="text-red-500" />
                                <span>Redis / In-memory Clusters</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Server size={20} className="text-red-500" />
                                <span>Shared Counters</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Diagram Animation */}
                <div className="relative h-96 w-full bg-slate-900/50 rounded-3xl border border-slate-800 p-8 flex items-center justify-center">

                    {/* Central Redis */}
                    <div className="relative z-20 flex flex-col items-center">
                        <motion.div
                            animate={{ boxShadow: ["0 0 20px rgba(239,68,68,0.2)", "0 0 40px rgba(239,68,68,0.6)", "0 0 20px rgba(239,68,68,0.2)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-red-600 p-6 rounded-2xl"
                        >
                            <Database size={48} className="text-white" />
                        </motion.div>
                        <span className="text-red-400 font-bold mt-2">Redis Cluster</span>
                    </div>

                    {/* Servers */}
                    {[0, 1, 2, 3].map((i) => {
                        const angle = (i * 90) * (Math.PI / 180);
                        const radius = 140;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <React.Fragment key={i}>
                                {/* Server Node */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="absolute bg-slate-800 p-3 rounded-xl border border-slate-600 z-10"
                                    style={{ transform: `translate(${x}px, ${y}px)` }}
                                >
                                    <Server size={24} className="text-blue-400" />
                                </motion.div>

                                {/* Connection Line */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                    <motion.line
                                        x1="50%"
                                        y1="50%"
                                        x2={`calc(50% + ${x}px)`}
                                        y2={`calc(50% + ${y}px)`}
                                        stroke="#475569"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                                    />
                                    {/* Data Packet */}
                                    <motion.circle
                                        r="4"
                                        fill="#60A5FA"
                                    >
                                        <animateMotion
                                            dur="1.5s"
                                            repeatCount="indefinite"
                                            path={`M ${250 + x} ${192 + y} L 250 192`} // Approximate center coords (500/2, 384/2) - adjusted manually
                                        // Using simple CSS calc logic for SVG is hard, simplifying:
                                        // Let's just animate opacity of the line instead of complex path following for now to save complexity
                                        />
                                    </motion.circle>
                                </svg>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Slide13_Distributed;
