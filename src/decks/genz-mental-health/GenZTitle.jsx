import { motion } from 'framer-motion';

const GenZTitle = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -z-10"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, -90, 0],
                }}
                transition={{ duration: 25, repeat: Infinity }}
                className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[100px] -z-10"
            />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center z-10"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-8xl mb-6"
                >
                    🧠 ✨
                </motion.div>

                <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Gen-Z Mental Health
                </h1>

                <h2 className="text-4xl font-bold text-white/80 mb-12">
                    The Vibe Check Interview
                </h2>

                <div className="flex gap-4 justify-center">
                    {['No Cap', 'Real Talk', 'Wellness'].map((tag, i) => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + (i * 0.2) }}
                            className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white/60 font-mono text-sm backdrop-blur-sm"
                        >
                            #{tag}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default GenZTitle;
