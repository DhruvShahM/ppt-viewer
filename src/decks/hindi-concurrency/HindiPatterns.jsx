import { motion } from 'framer-motion';


const HindiPatterns = () => {
    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">8. Concurrency Patterns</h2>

            <div className="grid grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">Worker Pools</h3>
                    <p className="text-gray-300 mb-4">
                        Fixed number of goroutines जो job queue से काम लेकर process करते हैं। Resource usage control करने के लिए best है।
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Fan-Out / Fan-In</h3>
                    <p className="text-gray-300 mb-4">
                        <strong>Fan-Out:</strong> एक channel से multiple goroutines को काम देना।<br />
                        <strong>Fan-In:</strong> Multiple goroutines के results को एक channel में collect करना।
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-orange-400">Pipeline</h3>
                    <p className="text-gray-300 mb-4">
                        Data को stages में process करना, जहाँ हर stage एक goroutine होती है और channels से connected होती है।
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">Semaphore</h3>
                    <p className="text-gray-300 mb-4">
                        Concurrency limit करने के लिए buffered channel का use करना।
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default HindiPatterns;
