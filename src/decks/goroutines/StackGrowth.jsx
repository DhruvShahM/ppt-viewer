import { motion } from 'framer-motion';

const StackGrowth = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-16 text-center text-purple-400">Stack Management</h2>

            <div className="grid grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-white">Dynamic Stacks</h3>
                    <ul className="space-y-4 text-xl text-gray-300">
                        <li className="flex items-center gap-3">
                            <span className="text-green-400">✓</span> Start small (2KB)
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-green-400">✓</span> Grow automatically when needed
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-green-400">✓</span> Shrink during GC if unused
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-red-400">✗</span> OS Threads: Fixed large stack (1-2MB)
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-end h-80 bg-white/5 rounded-xl border-b-4 border-gray-600 relative overflow-hidden">
                    <div className="absolute top-4 text-gray-500 font-mono">Memory Address Space</div>

                    {/* Stack Animation */}
                    <motion.div
                        animate={{ height: ["10%", "80%", "10%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-32 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg relative"
                    >
                        <div className="absolute top-2 w-full text-center text-white font-bold text-sm">Stack</div>
                    </motion.div>

                    <div className="w-full h-px bg-white/20 absolute bottom-0" />
                </div>
            </div>
        </div>
    );
};

export default StackGrowth;
