import { motion } from 'framer-motion';

const SelectStatement = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-go-blue">Select Statement</h2>

            <div className="flex gap-12 items-center">
                <div className="flex-1 space-y-8">
                    <p className="text-2xl text-gray-300">
                        Like a <code className="text-purple-400 bg-white/10 px-2 py-1 rounded">switch</code> statement, but for channels.
                    </p>
                    <p className="text-xl text-gray-400">
                        It lets a goroutine wait on multiple communication operations.
                    </p>

                    <div className="bg-[#1E1E1E] p-6 rounded-xl border border-white/10 font-mono text-lg">
                        <pre>
                            <code>
                                <span className="text-purple-400">select</span> {'{'}
                                {'\n'}
                                <span className="text-purple-400">case</span> msg1 := &lt;-ch1:
                                {'\n    '}fmt.Println("Received", msg1)
                                {'\n'}
                                <span className="text-purple-400">case</span> msg2 := &lt;-ch2:
                                {'\n    '}fmt.Println("Received", msg2)
                                {'\n'}
                                <span className="text-purple-400">default</span>:
                                {'\n    '}fmt.Println("No activity")
                                {'\n}'}
                            </code>
                        </pre>
                    </div>
                </div>

                <div className="flex-1 flex justify-center">
                    <div className="relative w-80 h-80 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                        <div className="absolute inset-0 animate-[spin_10s_linear_infinite] opacity-20">
                            <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-gradient-to-t from-transparent to-go-blue origin-bottom" />
                            <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-gradient-to-t from-transparent to-purple-500 origin-bottom rotate-90" />
                            <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-gradient-to-t from-transparent to-green-500 origin-bottom rotate-180" />
                        </div>

                        <div className="z-10 text-center">
                            <div className="text-6xl mb-2">📡</div>
                            <div className="text-sm text-gray-400">Multiplexing</div>
                        </div>

                        {/* Incoming signals */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                            className="absolute top-10 right-10 w-4 h-4 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                            className="absolute bottom-10 left-10 w-4 h-4 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectStatement;
