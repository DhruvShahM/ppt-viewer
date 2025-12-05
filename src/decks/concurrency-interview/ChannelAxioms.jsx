import { motion } from 'framer-motion';

const ChannelAxioms = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Channel Axioms</h2>

            <div className="grid grid-cols-3 gap-8">
                {/* Nil Channel */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-gray-400 mb-4">Nil Channel</h3>
                    <code className="block mb-4 text-gray-500">var ch chan int</code>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center gap-2">
                            <span className="text-red-400 font-bold">Send:</span>
                            <span className="text-white">Blocks Forever</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-red-400 font-bold">Receive:</span>
                            <span className="text-white">Blocks Forever</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-red-400 font-bold">Close:</span>
                            <span className="text-red-500 font-bold">PANIC!</span>
                        </li>
                    </ul>
                </div>

                {/* Open Channel */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-green-400 mb-4">Open Channel</h3>
                    <code className="block mb-4 text-green-500">ch := make(chan int)</code>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center gap-2">
                            <span className="text-green-400 font-bold">Send:</span>
                            <span className="text-white">OK (or blocks)</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-400 font-bold">Receive:</span>
                            <span className="text-white">OK (or blocks)</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-400 font-bold">Close:</span>
                            <span className="text-white">OK</span>
                        </li>
                    </ul>
                </div>

                {/* Closed Channel */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">Closed Channel</h3>
                    <code className="block mb-4 text-red-500">close(ch)</code>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center gap-2">
                            <span className="text-red-400 font-bold">Send:</span>
                            <span className="text-red-500 font-bold">PANIC!</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-400 font-bold">Receive:</span>
                            <span className="text-white">Zero Value (Instant)</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-red-400 font-bold">Close:</span>
                            <span className="text-red-500 font-bold">PANIC!</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 text-center text-gray-400 italic">
                "Don't close a channel from the receiver side. Don't close a channel if it has multiple concurrent senders."
            </div>
        </div>
    );
};

export default ChannelAxioms;
