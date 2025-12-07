import { motion } from 'framer-motion';

const WorkerPools = () => {
    // Animation variants for clean loops
    const jobVariants = {
        hidden: { x: -50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 }
    };

    const resultVariants = {
        hidden: { x: -50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        exit: { x: 50, opacity: 0, scale: 0.8 }
    };

    const workerVariants = {
        idle: { scale: 1 },
        busy: { scale: 1.2 },
        idle: { scale: 1 }
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
                    <div className="flex flex-col gap-2">
                        <div className="text-gray-400 mb-2 text-center">Jobs</div>
                        <div className="flex gap-2 h-10 items-end">
                            {[1, 2, 3, 4].map((i, index) => (
                                <motion.div
                                    key={i}
                                    variants={jobVariants}
                                    initial="hidden"
                                    animate="enter"
                                    exit="exit"
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: index * 0.4
                                    }}
                                    className="w-10 h-10 bg-green-500 rounded flex items-center justify-center font-bold text-black"
                                >
                                    {i}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Workers */}
                    <div className="flex flex-col gap-4">
                        <div className="text-gray-400 text-center">Workers (Fixed Pool)</div>
                        <div className="grid grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i, index) => (
                                <motion.div
                                    key={i}
                                    variants={workerVariants}
                                    initial="idle"
                                    animate="busy"
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: index * 0.3
                                    }}
                                    className="w-16 h-16 bg-go-blue rounded-full flex items-center justify-center text-xl font-bold shadow-lg relative"
                                >
                                    W{i}
                                    <motion.div
                                        className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"
                                        animate={{ opacity: [0, 1, 1, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="flex flex-col gap-2">
                        <div className="text-gray-400 mb-2 text-center">Results</div>
                        <div className="flex gap-2 h-10 items-end">
                            <motion.div
                                variants={resultVariants}
                                initial="hidden"
                                animate="enter"
                                exit="exit"
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                                className="w-10 h-10 bg-purple-500 rounded flex items-center justify-center font-bold text-white"
                            >
                                ✓
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerPools;
