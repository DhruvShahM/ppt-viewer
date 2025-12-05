import { motion } from 'framer-motion';

const MutexTypes = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Mutex vs RWMutex</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* sync.Mutex */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">sync.Mutex</h3>
                    <p className="text-gray-300 mb-4">Standard mutual exclusion.</p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-blue-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">Lock():</strong> Blocks everyone else.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-blue-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">Use Case:</strong> When reads and writes are equally frequent.
                            </div>
                        </li>
                    </ul>
                </div>

                {/* sync.RWMutex */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">sync.RWMutex</h3>
                    <p className="text-gray-300 mb-4">Reader/Writer mutual exclusion.</p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-purple-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">RLock():</strong> Multiple readers allowed.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">Lock():</strong> Single writer (blocks readers too).
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-purple-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">Use Case:</strong> Many readers, few writers (e.g., caches).
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 bg-red-500/10 p-6 rounded-xl border border-red-500/30 text-center">
                <h4 className="text-xl font-bold text-red-400 mb-2">Warning: Writer Starvation</h4>
                <p className="text-gray-300">
                    If new readers keep arriving, a writer might wait forever. RWMutex is slightly more expensive than Mutex, so only use it if the read/write ratio is high.
                </p>
            </div>
        </div>
    );
};

export default MutexTypes;
