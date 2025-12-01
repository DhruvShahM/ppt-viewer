import { motion } from 'framer-motion';

const Summary = () => {
    return (
        <div className="max-w-4xl w-full text-center">
            <h2 className="text-6xl font-bold mb-16 bg-gradient-to-r from-go-blue to-purple-500 bg-clip-text text-transparent">
                Key Takeaways
            </h2>

            <div className="grid grid-cols-1 gap-6 text-left">
                {[
                    "Concurrency is not Parallelism",
                    "Goroutines are cheap and lightweight",
                    "Channels orchestrate communication",
                    "Don't communicate by sharing memory",
                    "Use WaitGroups to sync execution",
                    "Use Worker Pools to manage load"
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="flex items-center gap-6 bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-go-blue flex items-center justify-center font-bold text-black">
                            {index + 1}
                        </div>
                        <span className="text-2xl text-gray-200">{item}</span>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-16 text-gray-400"
            >
                Thanks for watching!
            </motion.div>
        </div>
    );
};

export default Summary;
