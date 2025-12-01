import { motion } from 'framer-motion';

const HindiBestPractices = () => {
    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">🎯 Best Practices</h2>

            <div className="space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-6"
                >
                    <div className="text-4xl">🚫</div>
                    <div>
                        <h3 className="text-2xl font-bold text-red-400">Avoid Shared Memory</h3>
                        <p className="text-gray-300">जहाँ तक हो सके, channels का use करें। Locks (Mutex) का use तभी करें जब ज़रूरी हो।</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-6"
                >
                    <div className="text-4xl">🛑</div>
                    <div>
                        <h3 className="text-2xl font-bold text-orange-400">Handle Cancellation</h3>
                        <p className="text-gray-300">हमेशा `Context` का use करें ताकि goroutines को cancel किया जा सके और leaks न हों।</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-6"
                >
                    <div className="text-4xl">🧹</div>
                    <div>
                        <h3 className="text-2xl font-bold text-green-400">Cleanup Goroutines</h3>
                        <p className="text-gray-300">Goroutine start करने से पहले सोचें कि वह खत्म कैसे होगी।</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-6"
                >
                    <div className="text-4xl">⚠️</div>
                    <div>
                        <h3 className="text-2xl font-bold text-yellow-400">Limit Concurrency</h3>
                        <p className="text-gray-300">Unlimited goroutines create न करें। Worker pools या semaphore का use करें।</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HindiBestPractices;
