import { motion } from 'framer-motion';

const SyncCond = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">sync.Cond</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Concept */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Condition Variable</h3>
                        <p className="text-gray-300 mb-4">
                            A rendezvous point for goroutines waiting for or announcing the occurrence of an event.
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-400 font-bold">•</span>
                                <div>
                                    <strong className="text-white">Wait():</strong> Unlocks and suspends execution.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-400 font-bold">•</span>
                                <div>
                                    <strong className="text-white">Signal():</strong> Wakes one waiter.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-400 font-bold">•</span>
                                <div>
                                    <strong className="text-white">Broadcast():</strong> Wakes all waiters.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Code Example */}
                <div className="bg-black/30 p-6 rounded-xl border border-white/10 font-mono text-sm">
                    <h3 className="text-xl font-bold text-gray-400 mb-4">Usage Pattern</h3>
                    <pre>
                        <code>
                            c := sync.NewCond(&sync.Mutex{'{}'})
                            {'\n\n'}
                            <span className="text-gray-500">// Waiter</span>
                            {'\n'}
                            c.L.Lock()
                            {'\n'}
                            <span className="text-purple-400">for</span> !condition() {'{'}
                            {'\n    '}
                            c.Wait() <span className="text-gray-500">// Atomically unlocks & suspends</span>
                            {'\n'}
                            {'}'}
                            {'\n'}
                            <span className="text-gray-500">// Do work...</span>
                            {'\n'}
                            c.L.Unlock()
                            {'\n\n'}
                            <span className="text-gray-500">// Notifier</span>
                            {'\n'}
                            c.L.Lock()
                            {'\n'}
                            condition = true
                            {'\n'}
                            c.Signal()
                            {'\n'}
                            c.L.Unlock()
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default SyncCond;
