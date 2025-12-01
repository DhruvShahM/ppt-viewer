import { motion } from 'framer-motion';

const CommonPitfalls = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                9. Common Issues
            </h2>

            <div className="grid grid-cols-2 gap-8">
                <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                    <h3 className="text-2xl font-bold mb-2 text-red-400">Race Conditions</h3>
                    <p className="text-sm text-gray-300 mb-4">Two goroutines access shared memory concurrently, and at least one writes.</p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`// BAD
count := 0
go func() { count++ }()
go func() { count++ }()
// count is unpredictable!`}
                    </pre>
                    <div className="mt-4 text-xs text-red-300 font-bold">Fix: Use Mutex or Channels</div>
                </div>

                <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                    <h3 className="text-2xl font-bold mb-2 text-red-400">Deadlocks</h3>
                    <p className="text-sm text-gray-300 mb-4">All goroutines are waiting for each other. None can proceed.</p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`ch := make(chan int)
ch <- 1 // Blocks forever!
// No receiver running yet`}
                    </pre>
                    <div className="mt-4 text-xs text-red-300 font-bold">Fix: Buffer channel or start receiver first</div>
                </div>

                <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                    <h3 className="text-2xl font-bold mb-2 text-red-400">Goroutine Leaks</h3>
                    <p className="text-sm text-gray-300 mb-4">Goroutines that never exit (stuck on channel send/recv).</p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`func leak() {
    ch := make(chan int)
    go func() {
        val := <-ch // Stuck forever
    }()
}`}
                    </pre>
                    <div className="mt-4 text-xs text-red-300 font-bold">Fix: Use Context for cancellation</div>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-orange-400">Detection Tools</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-center gap-2">
                            <code className="bg-black/30 px-2 py-1 rounded text-orange-300">go run -race main.go</code>
                            <span className="text-sm">Detects race conditions at runtime.</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <code className="bg-black/30 px-2 py-1 rounded text-orange-300">go vet</code>
                            <span className="text-sm">Static analysis for common mistakes.</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <code className="bg-black/30 px-2 py-1 rounded text-orange-300">pprof</code>
                            <span className="text-sm">Profile blocking and goroutine counts.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CommonPitfalls;
