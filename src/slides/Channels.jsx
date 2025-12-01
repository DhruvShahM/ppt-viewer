import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Channels = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-go-blue">Channels</h2>

            <div className="flex flex-col items-center gap-16">
                <p className="text-2xl text-gray-300 text-center max-w-3xl">
                    "Don't communicate by sharing memory, share memory by communicating."
                </p>

                {/* Channel Animation */}
                <div className="flex items-center gap-8 bg-white/5 p-12 rounded-2xl border border-white/10 w-full justify-center">
                    {/* Sender */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">G1</div>
                        <span className="text-gray-400">Sender</span>
                    </div>

                    {/* The Channel (Pipe) */}
                    <div className="relative w-96 h-16 bg-gray-800 rounded-full flex items-center px-4 overflow-hidden border border-gray-700">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono tracking-widest uppercase text-sm">
                            chan int
                        </div>

                        {/* Data Packet Animation */}
                        <motion.div
                            animate={{ x: [0, 300], opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="w-8 h-8 bg-green-400 rounded shadow-[0_0_15px_rgba(74,222,128,0.5)] z-10"
                        />
                    </div>

                    {/* Receiver */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold">G2</div>
                        <span className="text-gray-400">Receiver</span>
                    </div>
                </div>

                {/* Syntax */}
                <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
                    <div className="bg-[#1E1E1E] p-6 rounded-lg border border-white/10">
                        <div className="text-gray-500 text-sm mb-2">// Send</div>
                        <code className="text-xl"><span className="text-purple-400">ch</span> &lt;- data</code>
                    </div>
                    <div className="bg-[#1E1E1E] p-6 rounded-lg border border-white/10">
                        <div className="text-gray-500 text-sm mb-2">// Receive</div>
                        <code className="text-xl">data := &lt;-<span className="text-purple-400">ch</span></code>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Channels;
