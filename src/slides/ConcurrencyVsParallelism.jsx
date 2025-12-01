import { motion } from 'framer-motion';

const ConcurrencyVsParallelism = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-go-blue to-white bg-clip-text text-transparent">
                Concurrency vs Parallelism
            </h2>

            <div className="grid grid-cols-2 gap-16">
                {/* Concurrency Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                    <h3 className="text-3xl font-semibold mb-6 text-go-blue">Concurrency</h3>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        Dealing with a lot of things at once. It's about <span className="text-white font-bold">structure</span>.
                    </p>

                    <div className="relative h-40 bg-black/30 rounded-lg overflow-hidden flex items-center justify-center">
                        {/* Animation of one gopher switching between tasks */}
                        <motion.div
                            animate={{
                                x: [-40, 40, -40],
                                backgroundColor: ["#00ADD8", "#D800AD", "#00ADD8"]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="absolute bottom-2 text-sm text-gray-400">One worker, multiple tasks</div>
                    </div>
                </motion.div>

                {/* Parallelism Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                    <h3 className="text-3xl font-semibold mb-6 text-purple-400">Parallelism</h3>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        Doing a lot of things at once. It's about <span className="text-white font-bold">execution</span>.
                    </p>

                    <div className="relative h-40 bg-black/30 rounded-lg overflow-hidden flex items-center justify-center gap-8">
                        {/* Animation of two gophers working simultaneously */}
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-12 h-12 rounded-full bg-go-blue"
                        />
                        <motion.div
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-12 h-12 rounded-full bg-purple-500"
                        />
                        <div className="absolute bottom-2 text-sm text-gray-400">Multiple workers, simultaneous execution</div>
                    </div>
                </motion.div>
            </div>

            <motion.blockquote
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-16 text-center text-2xl italic text-gray-400 border-l-4 border-go-blue pl-6 mx-auto max-w-3xl"
            >
                "Concurrency is about dealing with lots of things at once. Parallelism is about doing lots of things at once."
                <footer className="text-lg text-go-blue mt-2 not-italic font-bold">— Rob Pike</footer>
            </motion.blockquote>
        </div>
    );
};

export default ConcurrencyVsParallelism;
