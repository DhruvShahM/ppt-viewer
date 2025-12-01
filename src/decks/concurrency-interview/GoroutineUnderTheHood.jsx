import { motion } from 'framer-motion';

const GoroutineUnderTheHood = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Goroutines: Under the Hood</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Stack Size & Cost */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">Lightweight Threads</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">✓</span>
                                <div>
                                    <strong className="text-white">Initial Stack:</strong> Only 2KB (vs 1-2MB for OS threads).
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">✓</span>
                                <div>
                                    <strong className="text-white">Dynamic Growth:</strong> Stack grows and shrinks as needed.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">✓</span>
                                <div>
                                    <strong className="text-white">Low Overhead:</strong> Creation and teardown are very cheap.
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-purple-400 mb-4">M:N Scheduling</h3>
                        <p className="text-gray-300 mb-4">
                            Go Runtime multiplexes <strong className="text-white">M</strong> goroutines onto <strong className="text-white">N</strong> OS threads.
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-400">
                            <div className="text-center">
                                <div className="text-orange-400 font-bold text-xl">Thousands</div>
                                <div>Goroutines</div>
                            </div>
                            <div className="text-2xl">→</div>
                            <div className="text-center">
                                <div className="text-blue-400 font-bold text-xl">Go Scheduler</div>
                                <div>(User Space)</div>
                            </div>
                            <div className="text-2xl">→</div>
                            <div className="text-center">
                                <div className="text-green-400 font-bold text-xl">Few</div>
                                <div>OS Threads</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Representation */}
                <div className="bg-black/30 p-8 rounded-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-400 mb-8 absolute top-4 left-4">Context Switching Cost</h3>

                    <div className="flex gap-12 items-end">
                        {/* OS Thread */}
                        <div className="flex flex-col items-center gap-2">
                            <motion.div
                                className="w-24 h-48 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center justify-center relative"
                            >
                                <span className="text-red-400 font-bold">OS Thread</span>
                                <div className="absolute bottom-0 w-full h-1/2 bg-red-500/20 animate-pulse" />
                            </motion.div>
                            <span className="text-red-400 font-bold">~1-2 Microseconds</span>
                            <span className="text-xs text-gray-500">(Kernel Mode Switch)</span>
                        </div>

                        {/* Goroutine */}
                        <div className="flex flex-col items-center gap-2">
                            <motion.div
                                className="w-24 h-48 bg-green-900/30 border border-green-500/50 rounded-lg flex items-center justify-center relative"
                            >
                                <span className="text-green-400 font-bold">Goroutine</span>
                                <div className="absolute bottom-0 w-full h-1/6 bg-green-500/20 animate-pulse" />
                            </motion.div>
                            <span className="text-green-400 font-bold">~200 Nanoseconds</span>
                            <span className="text-xs text-gray-500">(User Space Switch)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoroutineUnderTheHood;
