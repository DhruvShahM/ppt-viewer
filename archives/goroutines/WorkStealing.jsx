import { motion } from 'framer-motion';

const WorkStealing = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-purple-400">Work Stealing</h2>

            <div className="flex flex-col items-center gap-12">
                <p className="text-xl text-gray-300 text-center max-w-3xl">
                    When a Processor (P) runs out of work, it attempts to <span className="text-green-400 font-bold">steal</span> half the run queue from another P.
                </p>

                <div className="flex gap-24 items-center">
                    {/* Processor 1 (Idle) */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 bg-purple-600/20 border-2 border-purple-500 rounded-lg flex items-center justify-center text-2xl font-bold relative">
                            P1
                            <div className="absolute -top-8 text-sm text-gray-400">Idle</div>
                        </div>
                        {/* Empty Queue */}
                        <div className="w-32 h-40 border-2 border-dashed border-gray-700 rounded-lg flex flex-col-reverse p-2 gap-2 relative">
                            <div className="text-center text-gray-600 text-sm mt-2">Run Queue</div>

                            {/* Stolen Jobs Animation */}
                            {[1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 2 + (i * 0.2), duration: 1 }}
                                    className="h-8 bg-green-500 rounded flex items-center justify-center text-black font-bold text-xs"
                                >
                                    G{i + 4} (Stolen)
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Stealing Action */}
                    <motion.div
                        animate={{ x: [0, 50, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl text-green-400 font-bold"
                    >
                        ← Steal
                    </motion.div>

                    {/* Processor 2 (Busy) */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 bg-purple-600 border-2 border-purple-500 rounded-lg flex items-center justify-center text-2xl font-bold relative">
                            P2
                            <div className="absolute -top-8 text-sm text-green-400">Busy</div>
                        </div>
                        {/* Full Queue */}
                        <div className="w-32 h-40 border-2 border-gray-700 rounded-lg flex flex-col-reverse p-2 gap-2 overflow-hidden">
                            <div className="text-center text-gray-600 text-sm mt-2">Run Queue</div>
                            {[1, 2, 3, 4].map(i => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 1 }}
                                    animate={i > 2 ? { x: -300, opacity: 0 } : {}}
                                    transition={{ delay: 2 + ((i - 2) * 0.2), duration: 1 }}
                                    className="h-8 bg-green-500 rounded flex items-center justify-center text-black font-bold text-xs"
                                >
                                    G{i}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkStealing;
