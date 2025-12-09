import { motion } from 'framer-motion';

const WorkerPools = () => {
    // Animation variants for clean loops
    const jobVariants = {
        hidden: { x: -50, opacity: 0, scale: 0.5 },
        enter: { x: 0, opacity: 1, scale: 1 },
        exit: { x: 100, opacity: 0, scale: 0.5 } // Move out to right
    };

    const resultVariants = {
        hidden: { x: -50, opacity: 0, scale: 0.5 },
        enter: { x: 0, opacity: 1, scale: 1 },
        exit: { x: 50, opacity: 0, scale: 0.5 }
    };

    const workerVariants = {
        idle: { scale: 1, boxShadow: "0 0 0px rgba(0,0,0,0)" },
        busy: { scale: 1.1, boxShadow: "0 0 20px rgba(34,197,94,0.4)" }
    };

    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-go-blue">Worker Pools</h2>

            <div className="flex flex-col items-center gap-8">
                <p className="text-xl text-gray-300 max-w-2xl text-center">
                    A pattern to control the number of goroutines processing jobs.
                </p>

                <div className="relative w-full h-64 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-between px-12">
                    {/* Jobs Queue */}
                    <div className="flex flex-col gap-2 w-32">
                        <div className="text-gray-400 mb-2 text-center">Jobs</div>
                        <div className="flex gap-2 h-10 items-center overflow-hidden relative">
                            {/* Simulated continuous queue */}
                            {[1, 2, 3].map((i, index) => (
                                <motion.div
                                    key={i}
                                    animate={{ x: [0, 100], opacity: [1, 0] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.6,
                                        ease: "linear"
                                    }}
                                    className="absolute left-0 w-10 h-10 bg-green-500 rounded flex items-center justify-center font-bold text-black shrink-0"
                                >
                                    J{i}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-gray-500 text-4xl"
                    >
                        →
                    </motion.div>

                    {/* Workers */}
                    <div className="flex flex-col gap-4">
                        <div className="text-gray-400 text-center">Workers (Fixed Pool)</div>
                        <div className="grid grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i, index) => (
                                <motion.div
                                    key={i}
                                    variants={workerVariants}
                                    initial="idle"
                                    animate="busy"
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        delay: index * 0.2
                                    }}
                                    className="w-16 h-16 bg-go-blue rounded-full flex items-center justify-center text-xl font-bold relative border-2 border-white/10"
                                >
                                    W{i}
                                    <motion.div
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"
                                        animate={{ scale: [1, 1.5, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        className="text-gray-500 text-4xl"
                    >
                        →
                    </motion.div>

                    {/* Results */}
                    <div className="flex flex-col gap-2 w-32 items-end">
                        <div className="text-gray-400 mb-2 text-center w-full">Results</div>
                        <div className="flex gap-2 h-10 items-center overflow-hidden relative w-full justify-end">
                            {[1, 2, 3].map((i, index) => (
                                <motion.div
                                    key={i}
                                    animate={{ x: [-50, 50], opacity: [0, 1, 0] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.6 + 1,
                                        ease: "linear"
                                    }}
                                    className="absolute left-0 w-10 h-10 bg-purple-500 rounded flex items-center justify-center font-bold text-white shrink-0"
                                >
                                    ✓
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerPools;
