import { motion } from 'framer-motion';

const HindiRealWorld = () => {
    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">11. Real-World Examples</h2>

            <div className="grid grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/5 p-8 rounded-xl border border-white/10 flex flex-col items-center text-center"
                >
                    <div className="text-6xl mb-4">🌐</div>
                    <h3 className="text-2xl font-bold mb-2 text-purple-400">Web Server</h3>
                    <p className="text-gray-300">
                        हर incoming HTTP request के लिए Go automatically एक नई goroutine बनाता है। इसलिए Go servers high load handle कर सकते हैं।
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 p-8 rounded-xl border border-white/10 flex flex-col items-center text-center"
                >
                    <div className="text-6xl mb-4">🏭</div>
                    <h3 className="text-2xl font-bold mb-2 text-green-400">Worker Pools</h3>
                    <p className="text-gray-300">
                        Database migrations या image processing जैसे heavy tasks के लिए worker pools का use होता है ताकि system overload न हो।
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 p-8 rounded-xl border border-white/10 flex flex-col items-center text-center"
                >
                    <div className="text-6xl mb-4">⏱️</div>
                    <h3 className="text-2xl font-bold mb-2 text-orange-400">Rate Limiter</h3>
                    <p className="text-gray-300">
                        API requests को limit करने के लिए Ticker और Channels का use करके rate limiter बनाया जाता है।
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 p-8 rounded-xl border border-white/10 flex flex-col items-center text-center"
                >
                    <div className="text-6xl mb-4">🔄</div>
                    <h3 className="text-2xl font-bold mb-2 text-yellow-400">Microservices</h3>
                    <p className="text-gray-300">
                        Multiple microservices से data fetch करने के लिए `errgroup` या `WaitGroup` का use करके parallel calls की जाती हैं।
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default HindiRealWorld;
