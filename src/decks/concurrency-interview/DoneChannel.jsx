import { motion } from 'framer-motion';

const DoneChannel = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">The 'Done' Channel</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Concept */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Cancellation Pattern</h3>
                        <p className="text-gray-300 mb-4">
                            Before `context` (and still useful), the `done` channel was the standard way to broadcast cancellation.
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-400 font-bold">•</span>
                                <div>
                                    <strong className="text-white">Mechanism:</strong> Closing a channel unblocks ALL receivers instantly.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-400 font-bold">•</span>
                                <div>
                                    <strong className="text-white">Usage:</strong> Pass a <code className="text-yellow-400">&lt;-chan struct{'{'}{'}'}</code> to workers.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Code Example */}
                <div className="bg-black/30 p-6 rounded-xl border border-white/10 font-mono text-sm">
                    <h3 className="text-xl font-bold text-gray-400 mb-4">Implementation</h3>
                    <pre>
                        <code>
                            <span className="text-purple-400">func</span> worker(done &lt;-chan <span className="text-purple-400">struct</span>{'{'}{'}'}) {'{'}
                            {'\n    '}
                            <span className="text-purple-400">for</span> {'{'}
                            {'\n        '}
                            <span className="text-purple-400">select</span> {'{'}
                            {'\n        '}
                            <span className="text-purple-400">case</span> &lt;-done:
                            {'\n            '}
                            <span className="text-purple-400">return</span> <span className="text-gray-500">// Exit immediately</span>
                            {'\n        '}
                            <span className="text-purple-400">default</span>:
                            {'\n            '}
                            <span className="text-gray-500">// Do work...</span>
                            {'\n        '}
                            {'}'}
                            {'\n    '}
                            {'}'}
                            {'\n}'}
                            {'\n\n'}
                            <span className="text-gray-500">// Main</span>
                            {'\n'}
                            done := make(chan <span className="text-purple-400">struct</span>{'{'}{'}'})
                            {'\n'}
                            <span className="text-purple-400">go</span> worker(done)
                            {'\n'}
                            close(done) <span className="text-gray-500">// Signals all workers to stop</span>
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default DoneChannel;
