import { motion } from 'framer-motion';


const HindiGMP = () => {
    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">3. Go Scheduler (GMP Model)</h2>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">GMP Components</h3>
                        <ul className="space-y-4 text-gray-300 text-lg">
                            <li><strong className="text-blue-300">G (Goroutine):</strong> Code जो execute हो रहा है।</li>
                            <li><strong className="text-green-300">M (Machine):</strong> OS Thread जो code run करता है।</li>
                            <li><strong className="text-orange-300">P (Processor):</strong> Logical processor जो Gs को M पर schedule करता है।</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-yellow-400">Work Stealing</h3>
                        <p className="text-xl text-gray-300">
                            जब एक Processor (P) के पास काम खत्म हो जाता है, तो वह दूसरे P की queue से आधा काम "चुरा" लेता है (steals)। इससे CPU cores का efficient use होता है।
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center bg-white/5 rounded-xl border border-white/10 p-8"
                >
                    {/* Simple Visual Representation */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-4">
                            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">G</div>
                            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">G</div>
                            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">G</div>
                        </div>
                        <div className="h-8 w-1 bg-gray-500"></div>
                        <div className="w-32 h-32 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-2xl">P</div>
                        <div className="h-8 w-1 bg-gray-500"></div>
                        <div className="w-40 h-20 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-2xl">M (Thread)</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HindiGMP;
