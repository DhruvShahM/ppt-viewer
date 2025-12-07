import { motion } from 'framer-motion';

const HindiPatterns = () => {
    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">8. Concurrency Patterns</h2>

            <div className="grid grid-cols-2 gap-8">
                {/* Worker Pools */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(168,85,247,0.3)" }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 cursor-pointer transition-all"
                >
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">Worker Pools</h3>
                    <p className="text-gray-300 mb-4 text-base leading-relaxed">
                        Fixed number of goroutines जो job queue से काम लेकर process करते हैं।
                        <strong className="text-purple-300"> Resource usage control</strong> करने के लिए best है, क्योंकि आप parallel workers की count limit कर सकते हैं।
                        Heavy I/O या CPU bound tasks जैसे <strong className="text-purple-300">image processing, API calls या DB queries</strong> के लिए ये pattern बहुत useful है।
                    </p>
                </motion.div>

                {/* Fan-Out / Fan-In */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34,197,94,0.3)" }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 cursor-pointer transition-all"
                >
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Fan-Out / Fan-In</h3>
                    <p className="text-gray-300 mb-4 text-base leading-relaxed">
                        <strong className="text-green-300">Fan-Out:</strong> एक channel से multiple goroutines को काम देना, ताकि same type का काम <strong className="text-green-300">parallel में हो सके</strong>।<br />
                        <strong className="text-green-300">Fan-In:</strong> Multiple goroutines के results को एक channel में collect करना, ताकि final consumer को <strong className="text-green-300">single stream मिले</strong>।
                        इससे code readable रहता है और <strong className="text-green-300">aggregation logic simple</strong> हो जाता है।
                    </p>
                </motion.div>

                {/* Pipeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(249,115,22,0.3)" }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 cursor-pointer transition-all"
                >
                    <h3 className="text-2xl font-bold mb-4 text-orange-400">Pipeline</h3>
                    <p className="text-gray-300 mb-4 text-base leading-relaxed">
                        Data को stages में process करना, जहाँ हर stage एक goroutine होती है और channels से connected होती है।
                        हर stage सिर्फ अपना छोटा सा काम करती है (<strong className="text-orange-300">read → transform → validate → save</strong>), जिससे code <strong className="text-orange-300">modular और testable</strong> बनता है।
                        <strong className="text-orange-300">Large data processing</strong> या streaming scenarios में ये pattern बहुत powerful है।
                    </p>
                </motion.div>

                {/* Semaphore */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(234,179,8,0.3)" }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 cursor-pointer transition-all"
                >
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">Semaphore</h3>
                    <p className="text-gray-300 mb-4 text-base leading-relaxed">
                        Concurrency limit करने के लिए <strong className="text-yellow-300">buffered channel</strong> का use करना।
                        Channel में limited tokens रखकर आप एक समय में चलने वाली goroutines की <strong className="text-yellow-300">maximum count control</strong> कर सकते हैं।
                        इससे <strong className="text-yellow-300">external services या database पर overload</strong> नहीं आता और <strong className="text-yellow-300">system stable</strong> रहता है।
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default HindiPatterns;