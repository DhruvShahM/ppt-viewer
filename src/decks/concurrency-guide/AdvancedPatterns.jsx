import { motion } from 'framer-motion';

const AdvancedPatterns = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                8. Concurrency Patterns
            </h2>

            <div className="grid grid-cols-2 gap-8">
                {/* Worker Pool */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-indigo-400">Worker Pool</h3>
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-400">Distribute jobs across fixed number of goroutines.</div>
                    </div>
                    <div className="flex gap-2 justify-center mb-4 items-center">
                        <div className="p-2 bg-gray-700 rounded z-10">Jobs</div>
                        <motion.div
                            className="text-2xl text-indigo-400"
                            animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >→</motion.div>
                        <div className="flex flex-col gap-1 relative">
                            {[0, 1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-xs"
                                    animate={{ scale: [1, 1.1, 1] }} // Simple pulse
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                >
                                    G{i + 1}
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            className="text-2xl text-indigo-400"
                            animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                        >→</motion.div>
                        <div className="p-2 bg-gray-700 rounded z-10">Results</div>
                    </div>
                </div>

                {/* Pipeline */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">Pipeline</h3>
                    <div className="text-sm text-gray-400 mb-4">Series of stages connected by channels.</div>
                    <div className="flex items-center justify-center gap-2 relative">
                        <div className="p-3 bg-purple-900/50 rounded border border-purple-500/30 z-10">Gen</div>
                        <div className="relative h-1 w-12 bg-gray-700 overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full w-1/2 bg-purple-500"
                                animate={{ x: [-20, 50] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                        <div className="p-3 bg-purple-900/50 rounded border border-purple-500/30 z-10">Filter</div>
                        <div className="relative h-1 w-12 bg-gray-700 overflow-hidden">
                            <motion.div
                                className="absolute top-0 left-0 h-full w-1/2 bg-purple-500"
                                animate={{ x: [-20, 50] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                            />
                        </div>
                        <div className="p-3 bg-purple-900/50 rounded border border-purple-500/30 z-10">Map</div>
                    </div>
                </div>

                {/* Fan-Out / Fan-In */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-blue-400">Fan-Out / Fan-In</h3>
                    <div className="text-sm text-gray-400 mb-4">Split work (Fan-Out) and combine results (Fan-In).</div>
                    <div className="flex items-center justify-center gap-4">
                        <motion.div
                            className="w-4 h-4 bg-white rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="flex flex-col gap-2 items-end">
                            <motion.div className="h-0.5 w-8 bg-gray-500 origin-right rotate-[-30deg]" />
                            <motion.div className="h-0.5 w-8 bg-gray-500" />
                            <motion.div className="h-0.5 w-8 bg-gray-500 origin-right rotate-[30deg]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            {[0, 1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    className="w-4 h-4 bg-blue-500 rounded-full"
                                    animate={{
                                        x: [0, 2, 0],
                                        boxShadow: ["0 0 0px #3b82f6", "0 0 10px #3b82f6", "0 0 0px #3b82f6"]
                                    }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <motion.div className="h-0.5 w-8 bg-gray-500 origin-left rotate-[30deg]" />
                            <motion.div className="h-0.5 w-8 bg-gray-500" />
                            <motion.div className="h-0.5 w-8 bg-gray-500 origin-left rotate-[-30deg]" />
                        </div>
                        <motion.div
                            className="w-4 h-4 bg-white rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                    </div>
                </div>

                {/* Semaphore */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Semaphore</h3>
                    <div className="text-sm text-gray-400 mb-4">Limit concurrency using buffered channel.</div>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`sem := make(chan struct{}, 5) // Max 5

for req := range requests {
    sem <- struct{}{} // Acquire
    go func() {
        defer func() { <-sem }() // Release
        process(req)
    }()
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default AdvancedPatterns;
