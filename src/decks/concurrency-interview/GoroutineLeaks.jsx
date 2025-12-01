import { motion } from 'framer-motion';

const GoroutineLeaks = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-red-400">Goroutine Leaks</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Causes */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-red-400 mb-4">Common Causes</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 font-bold">1.</span>
                                <div>
                                    <strong className="text-white">Stuck Send:</strong> Sending to a channel that no one reads.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 font-bold">2.</span>
                                <div>
                                    <strong className="text-white">Stuck Receive:</strong> Waiting on a channel that never sends/closes.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-400 font-bold">3.</span>
                                <div>
                                    <strong className="text-white">Nil Channels:</strong> Block forever.
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">Prevention</h3>
                        <p className="text-gray-300">
                            Always ensure goroutines have a way to exit (e.g., using <code className="text-yellow-400">context.Context</code> or a <code className="text-yellow-400">done</code> channel).
                        </p>
                    </div>
                </div>

                {/* Detection */}
                <div className="bg-black/30 p-6 rounded-xl border border-white/10 font-mono text-sm">
                    <h3 className="text-xl font-bold text-gray-400 mb-4">Detection: runtime.NumGoroutine()</h3>
                    <pre>
                        <code>
                            <span className="text-purple-400">func</span> TestLeak(t *testing.T) {'{'}
                            {'\n    '}
                            initial := runtime.NumGoroutine()
                            {'\n    '}
                            LeakyFunction()
                            {'\n    '}
                            time.Sleep(100 * time.Millisecond)
                            {'\n\n'}
                            <span className="text-purple-400">if</span> runtime.NumGoroutine() &gt; initial {'{'}
                            {'\n        '}
                            t.Errorf(<span className="text-green-400">"Goroutine leak detected!"</span>)
                            {'\n    '}
                            {'}'}
                            {'\n}'}
                        </code>
                    </pre>
                    <div className="mt-4 text-gray-500 italic">
                        Also use: Uber's `goleak` library for robust testing.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoroutineLeaks;
