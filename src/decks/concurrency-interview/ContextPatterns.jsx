import { motion } from 'framer-motion';

const ContextPatterns = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Context & Patterns</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Context */}
                <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-blue-400">context.Context</h3>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h4 className="text-xl font-bold text-white mb-2">Purpose</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Cancellation signals (propagation).</li>
                            <li>Deadlines & Timeouts.</li>
                            <li>Request-scoped values.</li>
                        </ul>
                    </div>
                    <div className="bg-[#1E1E1E] p-4 rounded-xl border border-white/10 font-mono text-sm">
                        ctx, cancel := context.WithCancel(parent)
                        {'\n'}
                        <span className="text-purple-400">defer</span> cancel()
                    </div>
                </div>

                {/* Patterns */}
                <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-green-400">Patterns</h3>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h4 className="text-xl font-bold text-white mb-2">Worker Pools</h4>
                        <p className="text-gray-300">
                            Limit concurrency by creating a fixed number of workers consuming from a jobs channel.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h4 className="text-xl font-bold text-white mb-2">Safe Data Structures</h4>
                        <p className="text-gray-300">
                            Use <code className="text-red-400">sync.RWMutex</code> for maps or <code className="text-blue-400">sync.Map</code> for specific use cases.
                            Prefer communicating over sharing memory!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContextPatterns;
