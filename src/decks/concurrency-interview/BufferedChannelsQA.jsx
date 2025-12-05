import { motion } from 'framer-motion';

const BufferedChannelsQA = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Buffered vs Unbuffered</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Unbuffered */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">Unbuffered (Capacity 0)</h3>
                    <p className="text-gray-300 mb-4">"Synchronous" communication.</p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">Send blocks</strong> until receive.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">Receive blocks</strong> until send.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">Guarantees delivery</strong> (handshake).
                            </div>
                        </li>
                    </ul>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm mt-6">
                        <code>
                            ch := make(chan int)
                        </code>
                    </pre>
                </div>

                {/* Buffered */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-green-400 mb-4">Buffered (Capacity &gt; 0)</h3>
                    <p className="text-gray-300 mb-4">"Asynchronous" communication.</p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-green-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">Send blocks</strong> only if buffer is FULL.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">Receive blocks</strong> only if buffer is EMPTY.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-400 font-bold">•</span>
                            <div>
                                <strong className="text-white">No delivery guarantee</strong> (sender moves on).
                            </div>
                        </li>
                    </ul>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm mt-6">
                        <code>
                            ch := make(chan int, 5)
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default BufferedChannelsQA;
