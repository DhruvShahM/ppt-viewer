import { motion } from 'framer-motion';

const HindiSummary = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Summary
                </h1>

                <div className="grid grid-cols-2 gap-8 text-left max-w-4xl mx-auto mb-12">
                    <ul className="space-y-4 text-2xl text-gray-300">
                        <li>✅ Goroutines lightweight threads हैं।</li>
                        <li>✅ Channels communication के लिए हैं।</li>
                        <li>✅ GMP Scheduler efficient है।</li>
                        <li>✅ Race conditions से बचें।</li>
                    </ul>
                    <ul className="space-y-4 text-2xl text-gray-300">
                        <li>✅ Context cancellation के लिए ज़रूरी है।</li>
                        <li>✅ Worker pools resource management के लिए।</li>
                        <li>✅ `go run -race` का use करें।</li>
                        <li>✅ Concurrency != Parallelism.</li>
                    </ul>
                </div>

                <p className="text-3xl text-white font-bold">
                    धन्यवाद! 🙏
                </p>
            </motion.div>
        </div>
    );
};

export default HindiSummary;
