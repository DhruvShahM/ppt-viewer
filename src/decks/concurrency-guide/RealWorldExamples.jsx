import { motion } from 'framer-motion';

const RealWorldExamples = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                11. Real-World Examples
            </h2>

            <div className="grid grid-cols-2 gap-8">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-green-400">HTTP Server</h3>
                    <p className="text-gray-300 mb-4">
                        Every request is handled in its own goroutine automatically by <code>net/http</code>.
                    </p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`http.HandleFunc("/", func(w, r) {
    // This runs concurrently!
    // Safe to block here (DB calls, etc)
})`}
                    </pre>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-blue-400">Rate Limiter</h3>
                    <p className="text-gray-300 mb-4">
                        Control throughput using a Ticker or Token Bucket.
                    </p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`limiter := time.Tick(200 * time.Millisecond)

for req := range requests {
    <-limiter // Wait for tick
    go process(req)
}`}
                    </pre>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">Parallel File Processing</h3>
                    <p className="text-gray-300 mb-4">
                        Process thousands of files using a worker pool.
                    </p>
                    <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                        <li>Walk directory tree</li>
                        <li>Send paths to <code>jobs</code> channel (Worker Pool Pattern)</li>
                        <li>Workers read file, process, send to <code>results</code></li>
                        <li>Main aggregates results & handles errors centrally</li>
                        <li>Tuning: Adjust number of workers for disk I/O optimization</li>
                    </ul>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-orange-400">Microservices Aggregation</h3>
                    <p className="text-gray-300 mb-4">
                        Fan-out to multiple services, Fan-in results with timeout.
                    </p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`c := make(chan Result)
go callServiceA(c)
go callServiceB(c)

for i := 0; i < 2; i++ {
    select {
    case res := <-c:
        results = append(results, res)
    case <-time.After(500 * time.Millisecond):
        return TimeoutErr
    }
}`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default RealWorldExamples;
