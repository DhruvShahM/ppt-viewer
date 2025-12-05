import { motion } from 'framer-motion';
import { Terminal, Cpu, Zap } from 'lucide-react';

const GuideTitle = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 text-center"
            >
                <div className="flex justify-center gap-6 mb-8">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-4 bg-blue-500/20 rounded-2xl text-blue-400"
                    >
                        <Terminal size={48} />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                        className="p-4 bg-purple-500/20 rounded-2xl text-purple-400"
                    >
                        <Cpu size={48} />
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                        className="p-4 bg-orange-500/20 rounded-2xl text-orange-400"
                    >
                        <Zap size={48} />
                    </motion.div>
                </div>

                <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                    The Go Concurrency<br />Masterclass
                </h1>

                <p className="text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    From Goroutines and Channels to the GMP Scheduler and Advanced Patterns.
                </p>

                <div className="flex gap-4 justify-center">
                    <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-gray-400">
                        v1.22+
                    </div>
                    <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-gray-400">
                        Intermediate to Advanced
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default GuideTitle;
