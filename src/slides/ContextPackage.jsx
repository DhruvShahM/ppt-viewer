import { motion } from 'framer-motion';

const ContextPackage = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-go-blue">Context Package</h2>

            <div className="grid grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <p className="text-2xl text-gray-300">
                        Essential for managing <span className="text-white font-bold">cancellation</span>,
                        <span className="text-white font-bold">timeouts</span>, and
                        <span className="text-white font-bold">deadlines</span> across API boundaries.
                    </p>

                    <ul className="space-y-4 text-lg text-gray-400">
                        <li className="flex items-center gap-3">
                            <span className="text-purple-400">✓</span> Propagate cancellation signals
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-purple-400">✓</span> Set deadlines for operations
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-purple-400">✓</span> Pass request-scoped values
                        </li>
                    </ul>

                    <div className="bg-[#1E1E1E] p-6 rounded-xl border border-white/10 font-mono text-sm">
                        <pre><code>
                            <span className="text-purple-400">ctx</span>, <span className="text-purple-400">cancel</span> := context.<span className="text-yellow-300">WithTimeout</span>(parent, 2*time.Second)
                            {'\n'}
                            <span className="text-purple-400">defer</span> <span className="text-purple-400">cancel</span>()
                            {'\n\n'}
                            <span className="text-purple-400">select</span> {'{'}
                            {'\n'}
                            <span className="text-purple-400">case</span> &lt;-time.<span className="text-yellow-300">After</span>(3*time.Second):
                            {'\n '}fmt.Println("Overslept")
                            {'\n'}
                            <span className="text-purple-400">case</span> &lt;-ctx.<span className="text-yellow-300">Done</span>():
                            {'\n '}fmt.Println(ctx.<span className="text-yellow-300">Err</span>()) <span className="text-gray-500">// context deadline exceeded</span>
                            {'\n}'}
                        </code></pre>
                    </div>
                </div>

                <div className="relative h-96 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center p-8">
                    <div className="absolute top-4 text-gray-400 uppercase tracking-widest text-sm">Cancellation Propagation</div>

                    {/* Fixed Tree Animation */}
                    <motion.div
                        className="flex flex-col items-center gap-8 w-full"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.3,
                                    delayChildren: 0.5
                                }
                            }
                        }}
                    >
                        {/* Parent */}
                        <motion.div
                            variants={{
                                active: { backgroundColor: "#22c55e", scale: 1.05 },
                                cancelled: { backgroundColour: "#ef4444", scale: 1.1 }
                            }}
                            initial="active"
                            animate="cancelled"
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-32 h-12 rounded-lg flex items-center justify-center font-bold text-black"
                        >
                            Parent
                        </motion.div>

                        {/* Connecting Lines */}
                        <div className="flex w-full justify-center gap-16 relative">
                            <div className="absolute top-[-32px] w-px h-8 bg-gray-600"></div>
                            <div className="absolute top-[-32px] w-32 h-px bg-gray-600"></div>
                            <div className="absolute top-[-32px] left-[calc(50%-64px)] w-px h-8 bg-gray-600"></div>
                            <div className="absolute top-[-32px] right-[calc(50%-64px)] w-px h-8 bg-gray-600"></div>
                        </div>

                        {/* Children */}
                        <div className="flex gap-8">
                            {[1, 2].map(i => (
                                <motion.div
                                    key={i}
                                    variants={{
                                        active: { backgroundColor: "#22c55e", scale: 1 },
                                        cancelled: { backgroundColor: "#ef4444", scale: 1.05 }
                                    }}
                                    initial="active"
                                    animate="cancelled"
                                    transition={{ duration: 4, repeat: Infinity, delay: 0.2 }}
                                    className="w-24 h-12 rounded-lg flex items-center justify-center font-bold text-black text-sm"
                                >
                                    Child {i}
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
                            className="text-red-500 font-bold mt-4"
                        >
                            CANCELLED!
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContextPackage;
