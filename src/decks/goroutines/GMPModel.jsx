import { motion } from 'framer-motion';

const GMPModel = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-purple-400">The GMP Model</h2>

            <div className="flex justify-center gap-16 items-end h-96">
                {/* G - Goroutine */}
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold text-black shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                    >
                        G
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-xl">Goroutine</div>
                        <div className="text-gray-400 text-sm">Code to run</div>
                    </div>
                </div>

                {/* M - Machine (OS Thread) */}
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="w-24 h-32 bg-blue-600 rounded flex items-center justify-center text-2xl font-bold shadow-[0_0_20px_rgba(37,99,235,0.5)] relative"
                    >
                        M
                        <div className="absolute -bottom-2 w-full h-1 bg-blue-400/50 blur-sm" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-xl">Machine</div>
                        <div className="text-gray-400 text-sm">OS Thread</div>
                    </div>
                </div>

                {/* P - Processor (Logical Processor) */}
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ rotate: [45, 50, 45] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="w-24 h-24 bg-purple-600 rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                    >
                        <div className="-rotate-45 text-2xl font-bold">P</div>
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-xl">Processor</div>
                        <div className="text-gray-400 text-sm">Context/Resource</div>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center text-xl text-gray-300 max-w-3xl mx-auto">
                Go multiplexes <span className="text-green-400 font-bold">G</span>s onto <span className="text-blue-400 font-bold">M</span>s via <span className="text-purple-400 font-bold">P</span>s.
            </div>
        </div>
    );
};

export default GMPModel;
