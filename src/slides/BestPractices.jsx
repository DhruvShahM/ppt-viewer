import { motion } from 'framer-motion';
import { AlertTriangle, ShieldCheck, Bug } from 'lucide-react';

const BestPractices = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-go-blue">Best Practices & Pitfalls</h2>

            <div className="grid grid-cols-3 gap-8">
                {/* Race Conditions */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-red-500/10 p-8 rounded-2xl border border-red-500/30 flex flex-col items-center text-center"
                >
                    <Bug size={48} className="text-red-500 mb-6" />
                    <h3 className="text-2xl font-bold mb-4 text-red-400">Race Conditions</h3>
                    <p className="text-gray-300 mb-6">
                        When multiple goroutines access shared data without synchronization.
                    </p>
                    <div className="bg-black/30 p-3 rounded text-sm font-mono text-red-300 w-full">
                        data++ // Unsafe!
                    </div>
                </motion.div>

                {/* Deadlocks */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-yellow-500/10 p-8 rounded-2xl border border-yellow-500/30 flex flex-col items-center text-center"
                >
                    <AlertTriangle size={48} className="text-yellow-500 mb-6" />
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">Deadlocks</h3>
                    <p className="text-gray-300 mb-6">
                        When goroutines are waiting for each other and none can proceed.
                    </p>
                    <div className="bg-black/30 p-3 rounded text-sm font-mono text-yellow-300 w-full">
                        fatal error: all goroutines are asleep - deadlock!
                    </div>
                </motion.div>

                {/* The Solution */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-green-500/10 p-8 rounded-2xl border border-green-500/30 flex flex-col items-center text-center"
                >
                    <ShieldCheck size={48} className="text-green-500 mb-6" />
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Race Detector</h3>
                    <p className="text-gray-300 mb-6">
                        Always test your concurrent code with the built-in race detector.
                    </p>
                    <div className="bg-black/30 p-3 rounded text-sm font-mono text-green-300 w-full">
                        go run -race main.go
                    </div>
                </motion.div>
            </div>

            <div className="mt-12 text-center">
                <h3 className="text-2xl font-semibold mb-6">Golden Rules</h3>
                <div className="flex justify-center gap-4 flex-wrap">
                    {["Avoid shared state", "Use Channels for orchestration", "Use Mutex for state", "Don't leak goroutines"].map((rule, i) => (
                        <span key={i} className="px-6 py-3 bg-white/5 rounded-full border border-white/10 text-go-light">
                            {rule}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BestPractices;
