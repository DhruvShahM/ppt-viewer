import { motion } from 'framer-motion';

const ContextSwitching = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-purple-400">Context Switching</h2>

            <div className="grid grid-cols-2 gap-16">
                {/* OS Thread Switching */}
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-3xl font-bold mb-6 text-red-400">OS Thread Switch</h3>
                    <div className="space-y-4 text-gray-300 mb-8">
                        <p>Managed by the Kernel.</p>
                        <p>Expensive (~1-2 microseconds).</p>
                        <p>Must save ALL registers (AVX, Floating Point, etc).</p>
                    </div>

                    <div className="relative h-32 bg-black/30 rounded-lg overflow-hidden flex items-center justify-center">
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-red-500 font-mono font-bold"
                        >
                            SYSCALL...
                        </motion.div>
                    </div>
                </div>

                {/* Goroutine Switching */}
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-3xl font-bold mb-6 text-green-400">Goroutine Switch</h3>
                    <div className="space-y-4 text-gray-300 mb-8">
                        <p>Managed by the Go Runtime (User Space).</p>
                        <p>Cheap (~200 nanoseconds).</p>
                        <p>Saves only 3 registers (PC, SP, DX).</p>
                    </div>

                    <div className="relative h-32 bg-black/30 rounded-lg overflow-hidden flex items-center justify-center gap-4">
                        <div className="flex gap-2">
                            {['PC', 'SP', 'DX'].map((reg, i) => (
                                <motion.div
                                    key={reg}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                    className="px-3 py-1 bg-green-500/20 border border-green-500 rounded text-green-400 text-sm font-mono"
                                >
                                    {reg}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContextSwitching;
