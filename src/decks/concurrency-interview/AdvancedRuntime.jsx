import { motion } from 'framer-motion';

const AdvancedRuntime = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Advanced Runtime</h2>

            <div className="grid grid-cols-3 gap-8">
                {/* Memory Model */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">Memory Model</h3>
                    <p className="text-gray-300 mb-4">
                        Defines conditions under which reads of a variable in one goroutine can observe writes in another.
                    </p>
                    <div className="bg-purple-500/20 p-4 rounded text-purple-300 font-bold text-center">
                        "Happens Before" Relationship
                    </div>
                </div>

                {/* GOMAXPROCS */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">GOMAXPROCS</h3>
                    <p className="text-gray-300 mb-4">
                        Limits the number of OS threads that can execute user-level Go code simultaneously.
                    </p>
                    <div className="bg-blue-500/20 p-4 rounded text-blue-300 font-bold text-center">
                        Default = NumCPU
                    </div>
                </div>

                {/* Deadlocks */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">Deadlocks</h3>
                    <p className="text-gray-300 mb-4">
                        Occur when a group of goroutines are waiting for each other and none can proceed.
                    </p>
                    <div className="bg-red-500/20 p-4 rounded text-red-300 font-bold text-center">
                        Detected by Runtime (fatal error)
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center">
                <h3 className="text-3xl font-bold text-white mb-4">Race Detector</h3>
                <code className="bg-black/50 px-6 py-3 rounded-lg text-green-400 text-xl font-mono border border-green-500/30">
                    go run -race main.go
                </code>
                <p className="text-gray-400 mt-4">Always use this during development/CI!</p>
            </div>
        </div>
    );
};

export default AdvancedRuntime;
