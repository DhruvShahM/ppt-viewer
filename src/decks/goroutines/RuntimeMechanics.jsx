import { motion } from 'framer-motion';

const RuntimeMechanics = () => {
    return (
        <div className="max-w-6xl w-full px-4">
            <h2 className="text-5xl font-bold mb-12 text-center text-purple-400">How Runtime Package Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 p-8 rounded-2xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">1</span>
                        The Middleman
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        The Go runtime sits between your Go program and the operating system kernel. Unlike Java's VM, it's not a virtual machine but a library linked into every Go binary.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5 text-center mb-4">
                        <span className="text-purple-300">User Code</span>
                        <span className="mx-2 text-gray-500">↔</span>
                        <span className="text-white font-bold">Go Runtime</span>
                        <span className="mx-2 text-gray-500">↔</span>
                        <span className="text-blue-300">OS Kernel</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                        This abstraction allows Go to manage resources more efficiently than the OS could alone, enabling lightweight goroutines and faster context switching.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h4 className="text-xl font-bold mb-2 text-purple-300 flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs">2</span>
                            Scheduling
                        </h4>
                        <p className="text-gray-400 text-sm">
                            Multiplexes thousands of goroutines onto a few OS threads using the M:N scheduler (GMP model).
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h4 className="text-xl font-bold mb-2 text-purple-300 flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs">3</span>
                            Memory Management
                        </h4>
                        <p className="text-gray-400 text-sm">
                            Handles memory allocation (heap/stack) and runs the Garbage Collector to reclaim unused memory.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h4 className="text-xl font-bold mb-2 text-purple-300 flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs">4</span>
                            Netpoller
                        </h4>
                        <p className="text-gray-400 text-sm">
                            Handles network I/O asynchronously, allowing goroutines to block on I/O without blocking OS threads.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default RuntimeMechanics;
