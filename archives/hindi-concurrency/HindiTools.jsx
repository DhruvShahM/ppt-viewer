import { motion } from 'framer-motion';


const HindiTools = () => {
    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">10. Tools for Debugging</h2>

            <div className="grid grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">Race Detector</h3>
                    <p className="text-gray-300 mb-4">
                        Race conditions पकड़ने के लिए सबसे ज़रूरी tool।
                    </p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm text-gray-300 overflow-x-auto">
                        {`go run -race main.go
go test -race ./...`}
                    </pre>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-green-400">pprof (Profiler)</h3>
                    <p className="text-gray-300 mb-4">
                        CPU और Memory usage analyze करने के लिए। Goroutine leaks ढूँढने में मदद करता है।
                    </p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm text-gray-300 overflow-x-auto">
                        {`import _ "net/http/pprof"
go tool pprof http://localhost:6060/debug/pprof/goroutine`}
                    </pre>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-orange-400">Trace Tool</h3>
                    <p className="text-gray-300 mb-4">
                        Goroutine scheduling और latency issues को visualize करने के लिए।
                    </p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm text-gray-300 overflow-x-auto">
                        {`go tool trace trace.out`}
                    </pre>
                </motion.div>
            </div>
        </div>
    );
};

export default HindiTools;
