import { motion } from 'framer-motion';

const InterviewTitle = () => {
    return (
        <div className="text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    Go Interview Prep
                </h1>
            </motion.div>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-3xl text-gray-300 mb-12"
            >
                Pointers, Interfaces & Methods
            </motion.p>
        </div>
    );
};

export default InterviewTitle;
