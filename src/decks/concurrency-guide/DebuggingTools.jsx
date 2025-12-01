import { motion } from 'framer-motion';

const DebuggingTools = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                10. Debugging Tools
            </h2>

            <div className="grid grid-cols-2 gap-8">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-cyan-400">Race Detector</h3>
                    <p className="text-gray-300 mb-4">
                        Instrument your code to find data races.
                    </p>
                    <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-300 mb-4">
                        $ go test -race ./...<br />
                        $ go run -race main.go
                    </div>
                    <div className="text-sm text-yellow-400">
                        ⚠️ Adds overhead (CPU/Memory). Use in CI/Test, not Prod.
                    </div>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-blue-400">Trace Tool</h3>
                    <p className="text-gray-300 mb-4">
                        Visualize goroutine scheduling and blocking events.
                    </p>
                    <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-300 mb-4">
                        // In code<br />
                        trace.Start(f)<br />
                        defer trace.Stop()<br /><br />
                        // Analyze<br />
                        $ go tool trace trace.out
                    </div>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">pprof</h3>
                    <p className="text-gray-300 mb-4">
                        Profiling for CPU, Memory, and Goroutines.
                    </p>
                    <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-300 mb-4">
                        import _ "net/http/pprof"<br /><br />
                        $ go tool pprof http://localhost:6060/debug/pprof/goroutine
                    </div>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Benchmarking</h3>
                    <p className="text-gray-300 mb-4">
                        Measure performance of concurrent code.
                    </p>
                    <div className="bg-black/50 p-4 rounded-lg font-mono text-sm text-gray-300 mb-4">
                        func Benchmark(b *testing.B) {'{'}<br />
                        &nbsp;&nbsp;b.RunParallel(func(pb *testing.PB) {'{'}<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;// ...<br />
                        &nbsp;&nbsp;{'}'})<br />
                        {'}'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DebuggingTools;
