import React from 'react';
import { motion } from 'framer-motion';

const Slide11_RealLife = () => {
    const examples = [
        { name: "CloudFlare", color: "text-orange-500", icon: "☁️" },
        { name: "AWS ALB / ELB", color: "text-yellow-500", icon: "🔶" },
        { name: "Nginx", color: "text-green-500", icon: "🟢" },
        { name: "HAProxy", color: "text-blue-500", icon: "🔵" }
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 z-10">Load Balancer in Real Life</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl z-10">
                {examples.map((ex, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                        className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 flex items-center gap-6 hover:bg-slate-800 transition-colors group"
                    >
                        <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                            {ex.icon}
                        </div>
                        <div>
                            <h3 className={`text-3xl font-bold ${ex.color} mb-2`}>{ex.name}</h3>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 1 + index * 0.2, duration: 1 }}
                                className={`h-1 ${ex.color.replace('text-', 'bg-')} rounded-full opacity-50`}
                            />
                        </div>

                        {/* Glow Effect */}
                        <motion.div
                            animate={{ opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                            className={`absolute inset-0 ${ex.color.replace('text-', 'bg-')}/5 rounded-2xl blur-xl -z-10`}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide11_RealLife;
