import { motion } from 'framer-motion';

const HindiTitle = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    Go Concurrency<br />(हिंदी)
                </h1>
                <p className="text-3xl text-gray-300 mb-8">
                    Goroutines, Channels और GMP Scheduler
                </p>
                <div className="px-6 py-2 rounded-full bg-white/10 text-sm font-mono text-gray-400 inline-block">
                    Intermediate to Advanced
                </div>
            </motion.div>
        </div>
    );
};

export default HindiTitle;
