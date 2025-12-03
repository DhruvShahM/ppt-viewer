import { motion } from 'framer-motion';

const RuntimeControl = () => {
    return (
        <div className="max-w-6xl w-full px-4">
            <h2 className="text-5xl font-bold mb-12 text-center text-purple-400">Runtime Package</h2>

            <div className="grid grid-cols-1 gap-6">
                {/* GOMAXPROCS */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center gap-6"
                >
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-purple-300 text-lg md:text-xl flex-shrink-0 w-full md:w-auto">
                        runtime.GOMAXPROCS(n)
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Parallelism Level</h3>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                            Sets the number of logical CPUs (P's) that can execute user-level Go code simultaneously.
                            Defaults to <code className="text-purple-300 bg-black/20 px-2 py-1 rounded">runtime.NumCPU()</code>.
                        </p>
                    </div>
                </motion.div>

                {/* Gosched */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center gap-6"
                >
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-purple-300 text-lg md:text-xl flex-shrink-0 w-full md:w-auto">
                        runtime.Gosched()
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Yield Processor</h3>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
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
                    className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center gap-6"
                >
                    <div className="bg-black/30 p-4 rounded-lg font-mono text-purple-300 text-lg md:text-xl flex-shrink-0 w-full md:w-auto">
                        runtime.Goexit()
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Terminate Goroutine</h3>
                        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                            Terminates the calling goroutine. Defer statements are still executed.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RuntimeControl;
