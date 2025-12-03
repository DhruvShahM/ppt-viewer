import { motion } from 'framer-motion';

const TitleSlide = () => {
    // UI Analysis: Verified
    return (
        <div className="text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-go-blue to-white bg-clip-text text-transparent">
                    Go Concurrency
                </h1>
            </motion.div>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-2xl text-go-light mb-12"
            >
                Mastering Goroutines & Channels
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex justify-center gap-4"
            >
                <div className="w-3 h-3 rounded-full bg-go-blue animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="w-3 h-3 rounded-full bg-go-blue animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 rounded-full bg-go-blue animate-bounce" style={{ animationDelay: '0.4s' }} />
            </motion.div>
        </div>
    );
};

export default TitleSlide;
