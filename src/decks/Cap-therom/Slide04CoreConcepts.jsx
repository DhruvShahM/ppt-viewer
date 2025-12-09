import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Zap, AlertCircle } from 'lucide-react';

const Slide04CoreConceptCAP = () => {
    const [stage, setStage] = useState(0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden p-20">
            <motion.div className="w-full max-w-5xl">
                <motion.h2
                    className="text-5xl font-black mb-12 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Network Partition: The Reality
                </motion.h2>

                {/* Visualization */}
                <div className="relative h-64 mb-12 flex items-center justify-between">
                    {/* Left cluster */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                className="w-12 h-12 rounded-lg bg-blue-500/30 border-2 border-blue-400 flex items-center justify-center"
                                animate={
                                    stage > 0
                                        ? { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)' }
                                        : {}
                                }
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Server className="w-6 h-6 text-blue-300" />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Partition line */}
                    <motion.div
                        className="absolute left-1/2 h-32 w-1 bg-gradient-to-b from-transparent via-red-500 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={stage > 0 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />

                    {/* Broken connection */}
                    <motion.div
                        className="absolute left-1/3 top-1/2 h-0.5 bg-red-500/30 w-1/3"
                        initial={{ opacity: 0 }}
                        animate={stage > 0 ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                            animate={
                                stage > 0
                                    ? {
                                        x: ['0%', '100%'],
                                    }
                                    : {}
                            }
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                        />
                    </motion.div>

                    {/* Right cluster */}
                    <motion.div
                        className="flex flex-col gap-2"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {[1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-12 h-12 rounded-lg bg-purple-500/30 border-2 border-purple-400 flex items-center justify-center"
                                animate={
                                    stage > 0
                                        ? { boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)' }
                                        : {}
                                }
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Server className="w-6 h-6 text-purple-300" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Information sections */}
                <motion.div className="space-y-6">
                    <motion.div
                        className="p-6 rounded-lg bg-blue-500/10 border border-blue-500/50"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3 className="text-lg font-bold text-blue-300 mb-2">Network Partition Occurs</h3>
                        <p className="text-sm text-gray-300">
                            Nodes can't communicate. Two independent clusters form. Data diverges.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-6 rounded-lg bg-amber-500/10 border border-amber-500/50"
                        initial={{ opacity: 0, x: -30 }}
                        animate={stage > 0 ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-lg font-bold text-amber-300 mb-2">You Must Choose</h3>
                                <p className="text-sm text-gray-300">
                                    <span className="font-semibold">Consistency:</span> Block writes to prevent divergence (unavailable)
                                </p>
                                <p className="text-sm text-gray-300 mt-1">
                                    <span className="font-semibold">Availability:</span> Accept writes on both sides (inconsistent)
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Animated trigger button */}
                <motion.div className="mt-12 flex justify-center">
                    <motion.button
                        onClick={() => setStage(stage === 0 ? 1 : 0)}
                        className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm hover:shadow-lg transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {stage === 0 ? 'Trigger Partition' : 'Reset'}
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};


export default Slide04CoreConceptCAP;