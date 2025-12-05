import { motion } from 'framer-motion';

const GoroutineBasics = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                2. Goroutines
            </h2>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-4 text-green-400">What is a Goroutine?</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            A function executing concurrently with other goroutines in the same address space.
                        </p>
                        <pre className="bg-black/50 p-4 rounded-lg font-mono text-sm text-green-300">
                            <code>go myFunction()</code>
                        </pre>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-4 text-green-400">Lifecycle</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li>1. Created with `go` keyword</li>
                            <li>2. Added to a Local Run Queue (LRQ) or Global Run Queue (GRQ)</li>
                            <li>3. Executed by a Logical Processor (P)</li>
                            <li>4. Exits when function returns (or main returns)</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-6 text-emerald-400">Stack Management</h3>

                    <div className="relative h-64 bg-black/30 rounded-xl border border-white/5 mb-6 flex items-center justify-center overflow-hidden">
                        <motion.div
                            initial={{ width: 100, height: 100 }}
                            animate={{ width: [100, 200, 100], height: [100, 200, 100] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="bg-green-500/20 rounded-full border border-green-500/50 flex items-center justify-center"
                        >
                            <span className="text-xs text-green-400 font-mono">Stack</span>
                        </motion.div>
                        <div className="absolute bottom-4 text-xs text-gray-500 font-mono">Dynamic Resizing</div>
                    </div>

                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-400 font-bold">Start Small:</span>
                            <span>Begins at 2KB (vs 1-2MB for OS threads).</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-400 font-bold">Growable:</span>
                            <span>Can grow up to 1GB (64-bit) if needed.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-400 font-bold">Copying:</span>
                            <span>When stack fills, runtime allocates a larger segment and copies data.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GoroutineBasics;
