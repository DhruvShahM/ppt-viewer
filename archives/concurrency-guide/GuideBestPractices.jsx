import { motion } from 'framer-motion';

const GuideBestPractices = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Best Practices
            </h2>

            <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-2 text-yellow-400">Goroutine Lifecycle</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span><strong>Never start a goroutine without knowing how it will stop.</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Use <code>context.Context</code> for cancellation propagation.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Avoid goroutine leaks by ensuring channels are read/closed.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-2 text-orange-400">Communication</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span><strong>Share memory by communicating.</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Prefer Channels over Mutexes for data flow.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Use Mutexes for simple state protection (counters, maps).</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-2 text-blue-400">Performance</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Limit concurrency (Worker Pools, Semaphores).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Don't create goroutines for tiny tasks (overhead &gt; benefit).</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Use <code>sync.Pool</code> to reduce GC pressure for hot paths.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-2 text-purple-400">Design</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Keep concurrency internal to the package if possible.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Expose synchronous APIs, let the caller decide to use <code>go</code>.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-400">✓</span>
                                <span>Use <code>go vet</code> and <code>-race</code> in CI.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideBestPractices;
