import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Activity, ShoppingBag, Droplets } from 'lucide-react';

const Slide5_Algorithms = () => {
    const algorithms = [
        {
            title: "Fixed Window",
            icon: Clock,
            desc: "Simple counters per time unit",
            color: "bg-blue-500"
        },
        {
            title: "Sliding Window",
            icon: Activity,
            desc: "Smoother rolling time windows",
            color: "bg-purple-500"
        },
        {
            title: "Token Bucket",
            icon: ShoppingBag,
            desc: "Allow bursts with token refill",
            color: "bg-green-500"
        },
        {
            title: "Leaky Bucket",
            icon: Droplets,
            desc: "Constant output rate",
            color: "bg-cyan-500"
        },
    ];

    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <h2 className="text-5xl font-bold text-white mb-16 z-10">Popular Algorithms</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl z-10">
                {algorithms.map((algo, index) => (
                    <motion.div
                        key={index}
                        initial={{ rotateY: 90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        transition={{
                            delay: index * 0.2,
                            duration: 0.6,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-slate-500 transition-colors group cursor-pointer"
                    >
                        <div className="flex items-center space-x-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
                                className={`${algo.color} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}
                            >
                                <algo.icon size={32} className="text-white" />
                            </motion.div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{algo.title}</h3>
                                <p className="text-slate-400 text-lg">{algo.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Slide5_Algorithms;
