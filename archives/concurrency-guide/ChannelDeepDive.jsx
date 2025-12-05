import { motion } from 'framer-motion';

const ChannelDeepDive = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                4. Channels
            </h2>

            <div className="grid grid-cols-2 gap-8">
                {/* Types */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4 text-yellow-400">Types of Channels</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-black/30 rounded-lg">
                                <div className="font-mono text-sm text-blue-300 mb-2">Unbuffered</div>
                                <code className="text-gray-400 text-sm">ch := make(chan int)</code>
                                <p className="text-sm text-gray-500 mt-2">Synchronous. Sender blocks until receiver is ready.</p>
                            </div>
                            <div className="p-4 bg-black/30 rounded-lg">
                                <div className="font-mono text-sm text-blue-300 mb-2">Buffered</div>
                                <code className="text-gray-400 text-sm">ch := make(chan int, 5)</code>
                                <p className="text-sm text-gray-500 mt-2">Asynchronous. Sender blocks only when buffer is full.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4 text-yellow-400">Directional Channels</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-black/30 rounded text-center">
                                <code className="text-green-400">chan&lt;- int</code>
                                <div className="text-xs text-gray-500 mt-1">Send Only</div>
                            </div>
                            <div className="p-3 bg-black/30 rounded text-center">
                                <code className="text-green-400">&lt;-chan int</code>
                                <div className="text-xs text-gray-500 mt-1">Receive Only</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Operations & Pitfalls */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4 text-orange-400">Operations</h3>
                        <ul className="space-y-2 text-sm font-mono text-gray-300">
                            <li className="flex justify-between">
                                <span>ch &lt;- val</span>
                                <span className="text-gray-500">// Send</span>
                            </li>
                            <li className="flex justify-between">
                                <span>val := &lt;-ch</span>
                                <span className="text-gray-500">// Receive</span>
                            </li>
                            <li className="flex justify-between">
                                <span>val, ok := &lt;-ch</span>
                                <span className="text-gray-500">// Check open</span>
                            </li>
                            <li className="flex justify-between">
                                <span>close(ch)</span>
                                <span className="text-gray-500">// Close</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                        <h3 className="text-xl font-bold mb-4 text-red-400">Pitfalls ⚠️</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                <span>Sending to nil channel → <strong>Blocks forever</strong></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                <span>Receiving from nil channel → <strong>Blocks forever</strong></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                <span>Sending to closed channel → <strong>Panic</strong></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-500" />
                                <span>Closing closed channel → <strong>Panic</strong></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelDeepDive;
