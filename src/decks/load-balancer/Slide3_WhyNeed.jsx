import React from "react";
import { motion } from "framer-motion";

const trafficVariant = {
    initial: { opacity: 0, y: -10 },
    animate: {
        opacity: [0, 1, 0],
        y: [0, 60],
        transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
        },
    },
};

const Slide3_WhyNeed = () => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center p-10">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-bold text-white mb-14"
            >
                Why do we need a Load Balancer?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 w-full max-w-7xl">
                {/* WITHOUT LOAD BALANCER */}
                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-red-900/20 border border-red-500/40 rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold text-red-400 mb-6">
                        Without Load Balancer
                    </h3>

                    {/* Traffic */}
                    <div className="absolute top-16 left-10 flex flex-col gap-2">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                variants={trafficVariant}
                                initial="initial"
                                animate="animate"
                                className="w-3 h-3 bg-red-400 rounded-full"
                            />
                        ))}
                    </div>

                    {/* Overloaded Server */}
                    <motion.div
                        animate={{
                            x: [-3, 3, -3, 3, 0],
                            rotate: [-1, 1, -1, 1, 0],
                            boxShadow: [
                                "0 0 0px rgba(239,68,68,0)",
                                "0 0 30px rgba(239,68,68,0.6)",
                                "0 0 0px rgba(239,68,68,0)",
                            ],
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 1.5,
                        }}
                        className="mx-auto mt-10 w-36 h-44 bg-slate-800 border-2 border-red-500 rounded-xl flex flex-col items-center justify-center"
                    >
                        <span className="text-5xl">🔥</span>
                        <span className="text-xs mt-2 font-mono text-red-300">
                            OVERLOADED
                        </span>
                    </motion.div>

                    <ul className="mt-8 space-y-3 text-slate-300">
                        <li>❌ All traffic hits one server</li>
                        <li>❌ Crashes during peak load</li>
                        <li>❌ Poor user experience</li>
                    </ul>
                </motion.div>

                {/* WITH LOAD BALANCER */}
                <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative bg-green-900/20 border border-green-500/40 rounded-2xl p-8"
                >
                    <h3 className="text-2xl font-bold text-green-400 mb-6">
                        With Load Balancer
                    </h3>

                    {/* Load Balancer */}
                    <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="mx-auto w-28 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-slate-900 font-bold shadow-lg"
                    >
                        LB
                    </motion.div>

                    {/* Flow Lines */}
                    <div className="flex justify-center gap-6 my-6">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                                className="w-1 h-10 bg-green-400 rounded"
                            />
                        ))}
                    </div>

                    {/* Servers */}
                    <div className="flex justify-center gap-5">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    boxShadow: [
                                        "0 0 0px rgba(34,197,94,0)",
                                        "0 0 25px rgba(34,197,94,0.6)",
                                        "0 0 0px rgba(34,197,94,0)",
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.4,
                                }}
                                className="w-20 h-24 bg-slate-800 border border-green-500 rounded-lg flex flex-col items-center justify-center"
                            >
                                <span className="text-3xl">❄️</span>
                                <span className="text-[10px] mt-1 font-mono text-green-300">
                                    STABLE
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <ul className="mt-8 space-y-3 text-slate-300">
                        <li>✅ Even traffic distribution</li>
                        <li>✅ High availability</li>
                        <li>✅ Faster response time</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default Slide3_WhyNeed;
