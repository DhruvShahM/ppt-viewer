import { motion } from 'framer-motion';

const WorkerPools = () => {
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
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map(i => (
                                <motion.div
                                    key={i}
                                    animate={{ x: [0, 100], opacity: [1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
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
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-16 h-16 bg-go-blue rounded-full flex items-center justify-center text-xl font-bold shadow-lg relative">
                                    W{i}
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: Math.random() }}
                                        className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="flex flex-col gap-2">
                        <div className="text-gray-400 mb-2 text-center">Results</div>
                        <div className="flex gap-2">
                            <motion.div
                                animate={{ x: [-50, 0], opacity: [0, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-10 h-10 bg-purple-500 rounded flex items-center justify-center font-bold"
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
