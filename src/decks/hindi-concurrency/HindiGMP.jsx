import { motion } from 'framer-motion';

const HindiGMP = () => {
    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">3. Go Scheduler (GMP Model)</h2>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                    {/* GMP Components */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10 cursor-pointer transition-all"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">GMP Components</h3>
                        <ul className="space-y-4 text-gray-300 text-lg">
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <strong className="text-blue-300">G (Goroutine):</strong> Code जो execute हो रहा है।
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <strong className="text-green-300">M (Machine):</strong> OS Thread जो code run करता है।
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <strong className="text-orange-300">P (Processor):</strong> Logical processor जो Gs को M पर schedule करता है।
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Work Stealing */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10 cursor-pointer transition-all"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-yellow-400">Work Stealing</h3>
                        <p className="text-lg text-gray-300">
                            जब एक Processor (P) के पास काम खत्म हो जाता है, तो वह दूसरे P की queue से आधा काम "चुरा" लेता है (steals)। इससे CPU cores का efficient use होता है।
                        </p>
                    </motion.div>
                </div>

                {/* Right side - GMP Visual Representation with animations */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center bg-white/5 rounded-xl border border-white/10 p-8"
                >
                    <div className="flex flex-col items-center gap-6 relative">
                        {/* Background Path */}
                        <div className="absolute top-8 bottom-8 w-1 border-l-2 border-dashed border-white/10 -z-10" />

                        {/* Goroutines (G) with staggered animation */}
                        <div className="flex gap-4">
                            {['G1', 'G2', 'G3'].map((label, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
                                    whileHover={{ scale: 1.15, rotate: 10 }}
                                    className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:shadow-lg hover:shadow-blue-500/50 transition-all border-2 border-white/20"
                                >
                                    {label}
                                </motion.div>
                            ))}
                        </div>

                        {/* Connection G -> P */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 40, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="w-1 bg-gradient-to-b from-blue-500 to-orange-500"
                        />

                        {/* Processor (P) - scales from center */}
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                                whileHover={{ scale: 1.05 }}
                                className="w-32 h-32 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex flex-col items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg hover:shadow-orange-500/50 transition-all border-2 border-white/20 z-10 relative"
                            >
                                <span className="text-3xl mb-1">P</span>
                                <span className="text-xs uppercase opacity-80">Local Runq</span>
                            </motion.div>

                            {/* Animated ring for active state */}
                            <motion.div
                                className="absolute -inset-2 rounded-3xl border-2 border-orange-500/30"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>

                        {/* Connection P -> M */}
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 40, opacity: 1 }}
                            transition={{ delay: 1.4 }}
                            className="w-1 bg-gradient-to-b from-orange-500 to-green-600"
                        />

                        {/* Machine/Thread (M) - enters from bottom */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6 }}
                            whileHover={{ scale: 1.05 }}
                            className="w-48 h-24 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 flex flex-col items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg hover:shadow-green-600/50 transition-all border-2 border-white/20"
                        >
                            <span className="text-2xl mb-1">M (Thread)</span>
                            <span className="text-xs uppercase opacity-70">Executing on CPU</span>
                        </motion.div>

                        {/* Moving Token representing execution flow */}
                        <motion.div
                            className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"
                            animate={{
                                top: ["10%", "35%", "65%", "90%"],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 2
                            }}
                            style={{ left: "50%", x: "-50%" }}
                        />

                        {/* Flow direction indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 1.8 }}
                            className="text-center mt-2 text-gray-400 text-sm font-mono"
                        >
                            G → P (Queue) → M (Execute)
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HindiGMP;