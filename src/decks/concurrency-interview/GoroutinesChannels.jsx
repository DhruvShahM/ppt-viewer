import { motion } from 'framer-motion';

const GoroutinesChannels = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Goroutines & Channels</h2>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-2">Goroutines</h3>
                        <p className="text-gray-300">Lightweight threads managed by Go runtime (2KB stack).</p>
                        <code className="block bg-black/30 p-2 rounded mt-2 font-mono text-sm text-green-400">go func() {'{ ... }'}()</code>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-2">Channels</h3>
                        <p className="text-gray-300">Typed conduits for synchronization and data transfer.</p>
                        <div className="flex gap-4 mt-2 text-sm">
                            <span className="bg-blue-500/20 px-2 py-1 rounded text-blue-300">Unbuffered (Sync)</span>
                            <span className="bg-purple-500/20 px-2 py-1 rounded text-purple-300">Buffered (Async)</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-red-400 mb-2">Closing Channels</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                            <li>Send to closed = <span className="text-red-500 font-bold">PANIC</span></li>
                            <li>Receive from closed = <span className="text-green-400 font-bold">Zero Value</span> (immediate)</li>
                            <li>Close closed = <span className="text-red-500 font-bold">PANIC</span></li>
                        </ul>
                    </div>

                    <div className="bg-[#1E1E1E] p-6 rounded-xl border border-white/10 font-mono text-sm">
                        <pre>
                            <code>
                                <span className="text-gray-500">// Detect closed channel</span>
                                {'\n'}
                                val, ok := &lt;-ch
                                {'\n'}
                                <span className="text-purple-400">if</span> !ok {'{'}
                                {'\n    '}
                                fmt.Println("Channel closed")
                                {'\n}'}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoroutinesChannels;
