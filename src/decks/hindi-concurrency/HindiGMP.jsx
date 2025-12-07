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
                    <div className="flex flex-col items-center gap-4">
                        {/* Goroutines (G) with staggered animation */}
                        <div className="flex gap-4">
                            {['G', 'G', 'G'].map((label, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.15 }}
                                    whileHover={{ scale: 1.15 }}
                                    className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                                    style={{ boxShadow: "0 0 15px rgba(59,130,246,0.4)" }}
                                >
                                    {label}
                                </motion.div>
                            ))}
                        </div>

                        {/* Divider line with fade-in animation */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 32 }}
                            transition={{ delay: 0.65 }}
                            className="h-8 w-1 bg-gradient-to-b from-gray-500 to-orange-500"
                        />

                        {/* Processor (P) - scales from center */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, rotate: -10 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-32 h-32 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-2xl cursor-pointer hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                            style={{ boxShadow: "0 0 20px rgba(249,115,22,0.5)" }}
                        >
                            P
                        </motion.div>

                        {/* Divider line */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 32 }}
                            transition={{ delay: 0.9 }}
                            className="h-8 w-1 bg-gradient-to-b from-orange-500 to-green-600"
                        />

                        {/* Machine/Thread (M) - enters from right */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, rotate: 10 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ delay: 1.0 }}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="w-40 h-20 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-2xl cursor-pointer hover:shadow-lg hover:shadow-green-600/50 transition-all"
                            style={{ boxShadow: "0 0 20px rgba(22,163,74,0.5)" }}
                        >
                            M (Thread)
                        </motion.div>

                        {/* Flow direction indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 1.2 }}
                            className="text-center mt-4 text-gray-400 text-sm"
                        >
                            ↓ Schedule Flow ↓
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HindiGMP;