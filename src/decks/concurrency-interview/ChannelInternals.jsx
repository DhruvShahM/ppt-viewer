import { motion } from 'framer-motion';

const ChannelInternals = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Channels: Inside the Runtime</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* hchan Struct */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-purple-400 mb-4">The `hchan` Struct</h3>
                        <pre className="bg-black/30 p-4 rounded font-mono text-sm overflow-hidden">
                            <code>
                                <span className="text-blue-400">type</span> hchan <span className="text-blue-400">struct</span> {'{'}
                                {'\n    '}
                                <span className="text-green-400">qcount</span>   <span className="text-yellow-400">uint</span>           <span className="text-gray-500">// items in buffer</span>
                                {'\n    '}
                                <span className="text-green-400">dataqsiz</span> <span className="text-yellow-400">uint</span>           <span className="text-gray-500">// circular buffer size</span>
                                {'\n    '}
                                <span className="text-green-400">buf</span>      <span className="text-yellow-400">unsafe.Pointer</span> <span className="text-gray-500">// points to array</span>
                                {'\n    '}
                                <span className="text-green-400">sendx</span>    <span className="text-yellow-400">uint</span>           <span className="text-gray-500">// send index</span>
                                {'\n    '}
                                <span className="text-green-400">recvx</span>    <span className="text-yellow-400">uint</span>           <span className="text-gray-500">// receive index</span>
                                {'\n    '}
                                <span className="text-green-400">recvq</span>    <span className="text-yellow-400">waitq</span>          <span className="text-gray-500">// list of recv waiters</span>
                                {'\n    '}
                                <span className="text-green-400">sendq</span>    <span className="text-yellow-400">waitq</span>          <span className="text-gray-500">// list of send waiters</span>
                                {'\n    '}
                                <span className="text-green-400">lock</span>     <span className="text-yellow-400">mutex</span>          <span className="text-gray-500">// protects all fields</span>
                                {'\n}'}
                            </code>
                        </pre>
                    </div>
                    <p className="text-gray-300 italic">
                        "Channels are just thread-safe queues with a lock."
                    </p>
                </div>

                {/* Circular Buffer Visualization */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                    <h3 className="text-2xl font-bold text-blue-400 mb-8">Circular Buffer (Buffered Channel)</h3>

                    <div className="relative w-64 h-64 border-4 border-gray-700 rounded-full flex items-center justify-center">
                        {/* Buffer Slots */}
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="absolute w-12 h-12 bg-gray-800 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 font-mono"
                                style={{
                                    transform: `rotate(${i * 60}deg) translate(120px) rotate(-${i * 60}deg)`
                                }}
                            >
                                {i}
                            </div>
                        ))}

                        {/* Data Items */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute w-full h-full"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-8 h-8 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                        </motion.div>

                        <div className="text-center">
                            <div className="text-4xl font-bold text-white">buf</div>
                            <div className="text-sm text-gray-400">Ring Buffer</div>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded-full" />
                            <span className="text-gray-300">Data</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-800 border border-gray-600 rounded-full" />
                            <span className="text-gray-300">Empty Slot</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChannelInternals;
