import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Globe, User, Key } from 'lucide-react';

const Slide10_Enforcement = () => {
    const techniques = [
        {
            title: "API Gateway",
            desc: "Nginx, Kong, Traefik",
            icon: Server,
            color: "bg-orange-500"
        },
        {
            title: "Redis Counters",
            desc: "Fast in-memory counting",
            icon: Database,
            color: "bg-red-500"
        },
        {
            title: "IP-based Limits",
            desc: "Limit by Client IP",
            icon: Globe,
            color: "bg-blue-500"
        },
        {
            title: "User-based Limits",
            desc: "Limit by User ID",
            icon: User,
            color: "bg-green-500"
        },
        {
            title: "Key-based Limits",
            desc: "API Keys / Tokens",
            icon: Key,
            color: "bg-purple-500"
        },
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-16 z-10">How Systems Enforce Limits</h2>

            <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl z-10">
                {techniques.map((tech, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-80 hover:scale-105 transition-transform duration-300"
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="relative">
                                <div className={`${tech.color} p-4 rounded-full shadow-lg z-10 relative`}>
                                    <tech.icon size={32} className="text-white" />
                                </div>
                                {/* Ping Animation */}
                                <motion.div
                                    className={`absolute inset-0 ${tech.color} rounded-full opacity-50`}
                                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">{tech.title}</h3>
                                <p className="text-slate-400">{tech.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide10_Enforcement;
