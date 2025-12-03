import { motion } from 'framer-motion';

const RuntimeControl = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-purple-400">Runtime Package</h2>

            <div className="grid grid-cols-1 gap-8">
                {/* GOMAXPROCS */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 p-8 rounded-2xl border border-white/10 flex items-center gap-8 hover:bg-white/10 transition-colors duration-300"
                >
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-purple-300 text-xl min-w-[250px]">
                        runtime.GOMAXPROCS(n)
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Parallelism Level</h3>
                        <p className="text-gray-400">
                            Sets the number of logical CPUs (P's) that can execute user-level Go code simultaneously.
                            Defaults to <code className="text-purple-300">runtime.NumCPU()</code>.
                        </p>
                    </div>
                </motion.div>

                {/* Gosched */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 p-8 rounded-2xl border border-white/10 flex items-center gap-8 hover:bg-white/10 transition-colors duration-300"
                >
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-purple-300 text-xl min-w-[250px]">
                        runtime.Gosched()
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Yield Processor</h3>
                        <p className="text-gray-400">
                            Voluntarily yields the processor, allowing other goroutines to run.
                            The current goroutine is placed back in the local run queue.
                        </p>
                    </div>
                </motion.div>

                {/* Goexit */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 p-8 rounded-2xl border border-white/10 flex items-center gap-8 hover:bg-white/10 transition-colors duration-300"
                >
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-purple-300 text-xl min-w-[250px]">
                        runtime.Goexit()
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Terminate Goroutine</h3>
                        <p className="text-gray-400">
                            Terminates the calling goroutine. Defer statements are still executed.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RuntimeControl;
