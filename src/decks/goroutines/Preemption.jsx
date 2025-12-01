import { motion } from 'framer-motion';

const Preemption = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-purple-400">Asynchronous Preemption</h2>

            <div className="grid grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold text-gray-400 mb-2">Before Go 1.14 (Cooperative)</h3>
                        <p className="text-gray-300">
                            Preemption only happened at function calls. Tight loops like <code className="text-red-400">for {'{}'}</code> could hang the scheduler/GC.
                        </p>
                    </div>

                    <div className="bg-green-500/10 p-6 rounded-xl border border-green-500/30">
                        <h3 className="text-xl font-bold text-green-400 mb-2">Go 1.14+ (Preemptive)</h3>
                        <p className="text-gray-300">
                            The runtime sends a signal (<code className="text-purple-300">SIGURG</code>) to threads running for too long (&gt;10ms), forcing them to yield.
                        </p>
                    </div>
                </div>

                <div className="relative h-64 bg-black/30 rounded-xl border border-gray-700 flex items-center px-8 overflow-hidden">
                    {/* Timeline */}
                    <div className="absolute bottom-8 left-0 w-full h-px bg-gray-600" />

                    {/* Long Running Goroutine */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="h-12 bg-blue-500 rounded relative"
                    >
                        <span className="absolute left-4 top-3 text-black font-bold text-sm">Long Loop...</span>
                    </motion.div>

                    {/* Signal Interrupt */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, duration: 0.2 }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                    >
                        <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-[0_0_20px_rgba(239,68,68,0.8)] animate-pulse">
                            SIGURG
                        </div>
                    </motion.div>

                    {/* Yield Effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2 }}
                        className="absolute right-4 top-4 text-green-400 font-mono"
                    >
                        -&gt; Yielded
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Preemption;
