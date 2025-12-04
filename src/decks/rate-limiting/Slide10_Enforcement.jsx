import React from 'react';
import { motion } from 'framer-motion';
import { Server, Database, Globe, User, Key } from 'lucide-react';

const techniques = [
    {
        title: "API Gateway",
        desc: "Nginx, Kong, Traefik",
        icon: Server,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/30"
    },
    {
        title: "Redis Counters",
        desc: "Fast in-memory counting",
        icon: Database,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30"
    },
    {
        title: "IP-based Limits",
        desc: "Limit per IP address",
        icon: Globe,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30"
    },
    {
        title: "User-based Limits",
        desc: "Limit per User ID",
        icon: User,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30"
    },
    {
        title: "Key-based Limits",
        desc: "API Keys / Tokens",
        icon: Key,
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30"
    }
];

const Slide10_Enforcement = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-8">
            <h2 className="text-4xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                How Systems Enforce Rate Limits
            </h2>

            <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
                {techniques.map((tech, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className={`w-[300px] p-6 rounded-xl border ${tech.border} ${tech.bg} backdrop-blur-sm flex flex-col items-center gap-4 hover:scale-105 transition-transform`}
                    >
                        <div className="relative">
                            <tech.icon size={48} className={tech.color} />
                            <motion.div
                                className={`absolute inset-0 rounded-full ${tech.color} opacity-30`}
                                animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-1">{tech.title}</h3>
                            <p className="text-gray-400 text-sm">{tech.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide10_Enforcement;
