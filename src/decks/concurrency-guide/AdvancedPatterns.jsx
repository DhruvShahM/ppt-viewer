import { motion } from 'framer-motion';

const AdvancedPatterns = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                8. Concurrency Patterns
            </h2>

            <div className="grid grid-cols-2 gap-8">
                {/* Worker Pool */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-indigo-400">Worker Pool</h3>
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-400">Distribute jobs across fixed number of goroutines.</div>
                    </div>
                    <div className="flex gap-2 justify-center mb-4">
                        <div className="p-2 bg-gray-700 rounded">Jobs</div>
                        <div className="text-2xl">→</div>
                        <div className="flex flex-col gap-1">
                            <div className="w-8 h-8 bg-indigo-500 rounded-full animate-pulse" />
                            <div className="w-8 h-8 bg-indigo-500 rounded-full animate-pulse delay-75" />
                            <div className="w-8 h-8 bg-indigo-500 rounded-full animate-pulse delay-150" />
                        </div>
                        <div className="text-2xl">→</div>
                        <div className="p-2 bg-gray-700 rounded">Results</div>
                    </div>
                </div>

                {/* Pipeline */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">Pipeline</h3>
                    <div className="text-sm text-gray-400 mb-4">Series of stages connected by channels.</div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="p-3 bg-purple-900/50 rounded border border-purple-500/30">Gen</div>
                        <div className="h-1 w-8 bg-gray-600" />
                        <div className="p-3 bg-purple-900/50 rounded border border-purple-500/30">Filter</div>
                        <div className="h-1 w-8 bg-gray-600" />
                        <div className="p-3 bg-purple-900/50 rounded border border-purple-500/30">Map</div>
                    </div>
                </div>

                {/* Fan-Out / Fan-In */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-blue-400">Fan-Out / Fan-In</h3>
                    <div className="text-sm text-gray-400 mb-4">Split work (Fan-Out) and combine results (Fan-In).</div>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-4 h-4 bg-white rounded-full" />
                        <div className="flex flex-col gap-2">
                            <div className="h-0.5 w-8 bg-gray-500 rotate-[-30deg]" />
                            <div className="h-0.5 w-8 bg-gray-500" />
                            <div className="h-0.5 w-8 bg-gray-500 rotate-[30deg]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded-full" />
                            <div className="w-4 h-4 bg-blue-500 rounded-full" />
                            <div className="w-4 h-4 bg-blue-500 rounded-full" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="h-0.5 w-8 bg-gray-500 rotate-[30deg]" />
                            <div className="h-0.5 w-8 bg-gray-500" />
                            <div className="h-0.5 w-8 bg-gray-500 rotate-[-30deg]" />
                        </div>
                        <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                </div>

                {/* Semaphore */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Semaphore</h3>
                    <div className="text-sm text-gray-400 mb-4">Limit concurrency using buffered channel.</div>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`sem := make(chan struct{}, 5) // Max 5

for req := range requests {
    sem <- struct{}{} // Acquire
    go func() {
        defer func() { <-sem }() // Release
        process(req)
    }()
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default AdvancedPatterns;
