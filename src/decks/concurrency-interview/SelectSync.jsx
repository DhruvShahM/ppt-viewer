import { motion } from 'framer-motion';

const SelectSync = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Select & Sync</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Select Statement */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">Select Statement</h3>
                    <p className="text-gray-300 mb-4">Multiplexes multiple channel operations.</p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm">
                        <code>
                            <span className="text-purple-400">select</span> {'{'}
                            {'\n'}
                            <span className="text-purple-400">case</span> msg := &lt;-ch1:
                            {'\n    '}
                            <span className="text-gray-500">// Handle ch1</span>
                            {'\n'}
                            <span className="text-purple-400">case</span> &lt;-time.After(1 * time.Second):
                            {'\n    '}
                            <span className="text-gray-500">// Timeout</span>
                            {'\n'}
                            <span className="text-purple-400">default</span>:
                            {'\n    '}
                            <span className="text-gray-500">// Non-blocking</span>
                            {'\n}'}
                        </code>
                    </pre>
                </div>

                {/* Sync Package */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-blue-400 mb-2">sync.WaitGroup</h3>
                        <p className="text-gray-300">Waits for a collection of goroutines to finish.</p>
                        <code className="text-sm text-gray-400">Add(1) -&gt; Done() -&gt; Wait()</code>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-red-400 mb-2">sync.Mutex</h3>
                        <p className="text-gray-300">Mutual exclusion lock to prevent race conditions.</p>
                        <code className="text-sm text-gray-400">Lock() -&gt; Unlock() (defer this!)</code>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-green-400 mb-2">sync.Once</h3>
                        <p className="text-gray-300">Ensures a function is run exactly once (e.g., singleton).</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectSync;
