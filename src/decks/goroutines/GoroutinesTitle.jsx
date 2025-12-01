import { motion } from 'framer-motion';

const GoroutinesTitle = () => {
    return (
        <div className="text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Goroutines: Under the Hood
                </h1>
            </motion.div>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-2xl text-gray-300 mb-12"
            >
                Scheduler, Stacks, and Context Switching
            </motion.p>
        </div>
    );
};

export default GoroutinesTitle;
