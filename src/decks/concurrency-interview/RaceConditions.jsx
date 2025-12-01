import { motion } from 'framer-motion';

const RaceConditions = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-red-500">Race Conditions</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Definition */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-red-400 mb-4">What is a Data Race?</h3>
                        <p className="text-gray-300 mb-4">
                            Occurs when two goroutines access the same variable concurrently, and at least one access is a <strong className="text-white">write</strong>.
                        </p>
                        <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-lg text-center">
                            <div className="text-xl font-bold text-red-400">Undefined Behavior</div>
                            <div className="text-sm text-gray-400">Anything can happen (crashes, corruption).</div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">The Race Detector</h3>
                        <p className="text-gray-300 mb-4">
                            Go has a built-in tool to detect race conditions at runtime.
                        </p>
                        <code className="block bg-black/30 p-3 rounded text-green-400 font-mono text-center">
                            go run -race main.go
                        </code>
                        <p className="text-sm text-gray-500 mt-2 italic">
                            * Adds overhead, so use it during testing/CI, not always in prod.
                        </p>
                    </div>
                </div>

                {/* Example */}
                <div className="bg-black/30 p-6 rounded-xl border border-white/10 font-mono text-sm relative overflow-hidden">
                    <h3 className="text-xl font-bold text-gray-400 mb-4">Racy Code</h3>
                    <pre>
                        <code>
                            <span className="text-purple-400">var</span> counter <span className="text-yellow-400">int</span>
                            {'\n\n'}
                            <span className="text-purple-400">func</span> main() {'{'}
                            {'\n    '}
                            <span className="text-purple-400">go</span> <span className="text-purple-400">func</span>() {'{'}
                            {'\n        '}
                            counter++ <span className="text-red-500 font-bold">// WRITE</span>
                            {'\n    '}
                            {'}'}()
                            {'\n\n'}
                            <span className="text-purple-400">if</span> counter == 0 {'{'} <span className="text-red-500 font-bold">// READ</span>
                            {'\n        '}
                            fmt.Println(<span className="text-green-400">"Zero"</span>)
                            {'\n    '}
                            {'}'}
                            {'\n}'}
                        </code>
                    </pre>

                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    >
                        <div className="text-6xl font-bold text-red-600/50 rotate-[-15deg] border-4 border-red-600/50 p-4 rounded-xl">
                            RACE!
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default RaceConditions;
