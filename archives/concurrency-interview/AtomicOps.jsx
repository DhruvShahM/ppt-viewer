import { motion } from 'framer-motion';

const AtomicOps = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Atomic Operations</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Concept */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">sync/atomic</h3>
                        <p className="text-gray-300 mb-4">
                            Low-level atomic memory primitives.
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">✓</span>
                                <div>
                                    <strong className="text-white">Faster than Mutex</strong> for simple counters/flags.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-green-400 font-bold">✓</span>
                                <div>
                                    <strong className="text-white">Hardware Support:</strong> Uses CPU instructions (CAS).
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">Common Functions</h3>
                        <ul className="space-y-2 font-mono text-sm text-gray-300">
                            <li>atomic.AddInt64(&x, 1)</li>
                            <li>atomic.LoadInt64(&x)</li>
                            <li>atomic.StoreInt64(&x, 10)</li>
                            <li>atomic.CompareAndSwapInt64(&x, old, new)</li>
                        </ul>
                    </div>
                </div>

                {/* Code Example */}
                <div className="bg-black/30 p-6 rounded-xl border border-white/10 font-mono text-sm">
                    <h3 className="text-xl font-bold text-gray-400 mb-4">Lock-Free Counter</h3>
                    <pre>
                        <code>
                            <span className="text-purple-400">var</span> ops <span className="text-yellow-400">uint64</span>
                            {'\n\n'}
                            <span className="text-purple-400">func</span> worker() {'{'}
                            {'\n    '}
                            <span className="text-purple-400">for</span> i := 0; i &lt; 1000; i++ {'{'}
                            {'\n        '}
                            <span className="text-green-400">atomic.AddUint64</span>(&ops, 1)
                            {'\n    '}
                            {'}'}
                            {'\n}'}
                            {'\n\n'}
                            <span className="text-gray-500">// Safe without Mutex!</span>
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default AtomicOps;
