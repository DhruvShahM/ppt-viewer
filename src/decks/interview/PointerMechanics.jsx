import { motion } from 'framer-motion';

const PointerMechanics = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-blue-400">Pointers & Memory</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Stack vs Heap */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">Stack Allocation</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>• Fast allocation/deallocation (LIFO).</li>
                            <li>• Local variables, function arguments.</li>
                            <li>• Automatically managed by CPU.</li>
                        </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-red-400 mb-4">Heap Allocation</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>• Slower (Garbage Collector involved).</li>
                            <li>• Variables that outlive the function.</li>
                            <li>• "Escape Analysis" determines placement.</li>
                        </ul>
                    </div>

                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/30">
                        <h4 className="text-blue-400 font-bold mb-2">Escape Analysis Rule of Thumb</h4>
                        <p className="text-gray-300 italic">
                            "If a reference to a variable is returned from a function, it moves to the heap."
                        </p>
                    </div>
                </div>

                {/* Visualization */}
                <div className="bg-black/30 p-8 rounded-xl border border-white/10 flex flex-col items-center justify-center relative">
                    <div className="flex gap-8 w-full h-full">
                        {/* Stack Visual */}
                        <div className="flex-1 bg-gray-800/50 rounded-lg p-4 flex flex-col-reverse gap-2 border border-gray-600">
                            <div className="text-center text-gray-400 font-bold mb-2 border-b border-gray-600 pb-2">Stack</div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-green-600/30 border border-green-500 p-2 rounded text-center text-sm"
                            >
                                main() frame
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="bg-green-600/30 border border-green-500 p-2 rounded text-center text-sm"
                            >
                                func() frame
                            </motion.div>
                        </div>

                        {/* Arrow */}
                        <div className="flex flex-col justify-center items-center">
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-red-400 font-bold text-2xl"
                            >
                                ➜
                            </motion.div>
                            <div className="text-xs text-gray-500">Escapes</div>
                        </div>

                        {/* Heap Visual */}
                        <div className="flex-1 bg-gray-800/50 rounded-lg p-4 relative border border-gray-600">
                            <div className="text-center text-gray-400 font-bold mb-2 border-b border-gray-600 pb-2">Heap</div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                                className="absolute top-1/3 left-1/4 w-16 h-16 bg-red-600/30 border border-red-500 rounded-full flex items-center justify-center text-xs text-center"
                            >
                                Shared Data
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointerMechanics;
