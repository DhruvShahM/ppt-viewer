import { motion } from 'framer-motion';

const BufferedChannels = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-go-blue">Buffered Channels</h2>

            <div className="flex flex-col items-center gap-12">
                <div className="text-xl text-gray-300 text-center max-w-3xl">
                    <p className="mb-4">
                        Buffered channels have a <span className="text-white font-bold">capacity</span>.
                    </p>
                    <p>
                        Sends are <span className="text-green-400">non-blocking</span> until the buffer is full.<br />
                        Receives are <span className="text-purple-400">non-blocking</span> until the buffer is empty.
                    </p>
                </div>

                {/* Buffer Animation */}
                <div className="relative w-[600px] h-32 bg-gray-800 rounded-xl border-2 border-gray-600 flex items-center px-4 gap-2 overflow-hidden">
                    <div className="absolute -top-8 left-0 w-full text-center text-gray-500 font-mono">make(chan int, 5)</div>

                    {/* Slots */}
                    {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className="flex-1 h-20 border border-gray-700 rounded bg-black/20 flex items-center justify-center text-gray-600">
                            [{i}]
                        </div>
                    ))}

                    {/* Filling Animation */}
                    {[0, 1, 2].map(i => (
                        <motion.div
                            key={i}
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.8, duration: 0.5 }}
                            className="absolute w-20 h-20 bg-green-500 rounded flex items-center justify-center font-bold text-black shadow-lg"
                            style={{ left: `${16 + (i * 115)}px` }} // Approximate positioning
                        >
                            {i + 1}
                        </motion.div>
                    ))}
                </div>

                <div className="bg-[#1E1E1E] p-6 rounded-xl border border-white/10 font-mono text-lg">
                    <pre>
                        <code>
                            <span className="text-purple-400">ch</span> := <span className="text-purple-400">make</span>(<span className="text-purple-400">chan</span> <span className="text-blue-400">int</span>, <span className="text-yellow-300">5</span>)
                            {'\n'}
                            <span className="text-purple-400">ch</span> &lt;- 1 <span className="text-gray-500">// Doesn't block</span>
                            {'\n'}
                            <span className="text-purple-400">ch</span> &lt;- 2 <span className="text-gray-500">// Doesn't block</span>
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default BufferedChannels;
