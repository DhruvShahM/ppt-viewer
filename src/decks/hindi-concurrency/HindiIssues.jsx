import { motion } from 'framer-motion';


const HindiIssues = () => {
    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">9. Common Concurrency Issues</h2>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-red-400">Race Conditions</h3>
                        <p className="text-xl text-gray-300">
                            जब दो goroutines एक ही variable को बिना lock के access करती हैं, और कम से कम एक write operation हो।
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-red-400">Deadlocks</h3>
                        <p className="text-xl text-gray-300">
                            जब सभी goroutines एक दूसरे का इंतज़ार कर रही हों और कोई आगे न बढ़ सके।
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-red-400">Goroutine Leaks</h3>
                        <p className="text-xl text-gray-300">
                            जब goroutines start होती हैं पर कभी खत्म नहीं होतीं। यह memory leak का कारण बनती हैं।
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-red-400">Starvation</h3>
                        <p className="text-xl text-gray-300">
                            जब किसी goroutine को CPU time या resources नहीं मिल पाते क्योंकि दूसरी goroutines उन्हें hog कर लेती हैं।
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HindiIssues;
