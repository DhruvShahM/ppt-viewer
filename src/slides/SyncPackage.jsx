import { motion } from 'framer-motion';

const SyncPackage = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-6 text-center text-go-blue">Sync Package</h2>
            <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
                Essential primitives for synchronizing goroutines and protecting shared memory.
            </p>

            <div className="grid grid-cols-3 gap-8">
                {/* WaitGroup */}
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-3xl font-bold mb-6 text-yellow-400">WaitGroup</h3>
                    <p className="text-gray-300 mb-8">Wait for a collection of goroutines to finish.</p>

                    <div className="flex justify-center gap-4 mb-8">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -20, 0], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                                className="w-12 h-12 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg flex items-center justify-center text-yellow-500 font-bold"
                            >
                                G{i}
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center font-mono text-sm text-gray-400">wg.Add(1) ... wg.Done() ... wg.Wait()</div>
                    <div className="text-center text-sm text-gray-500 mt-2">Add → Work → Done → Wait</div>
                </div>

                {/* Mutex */}
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-3xl font-bold mb-6 text-red-400">Mutex</h3>
                    <p className="text-gray-300 mb-8">Mutual exclusion lock. Protect shared resources.</p>

                    <div className="flex justify-center items-center gap-8 mb-8">
                        <div className="relative">
                            <div className="w-24 h-24 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center text-red-500 font-bold text-xl">
                                Data
                            </div>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-2 border-t-4 border-red-500 rounded-full"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="px-4 py-2 bg-gray-800 rounded text-sm text-gray-400">Lock()</div>
                            <div className="px-4 py-2 bg-gray-800 rounded text-sm text-gray-400">Unlock()</div>
                        </div>
                    </div>
                    <div className="text-center font-mono text-sm text-gray-400">mu.Lock() ... mu.Unlock()</div>
                </div>

                {/* Once */}
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-3xl font-bold mb-6 text-green-400">Once</h3>
                    <p className="text-gray-300 mb-8">Run an action exactly once, no matter how many times called.</p>

                    <div className="flex justify-center items-center gap-4 mb-8 h-32">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="px-6 py-3 bg-green-500/20 border-2 border-green-500 rounded text-green-500 font-bold text-xl"
                        >
                            Init()
                        </motion.div>
                        <div className="flex flex-col gap-2 opacity-50">
                            <div className="w-2 h-2 bg-gray-500 rounded-full" />
                            <div className="w-2 h-2 bg-gray-500 rounded-full" />
                            <div className="w-2 h-2 bg-gray-500 rounded-full" />
                        </div>
                    </div>
                    <div className="text-center font-mono text-sm text-gray-400">once.Do(setup)</div>
                </div>
            </div>
        </div>
    );
};

export default SyncPackage;
