import { motion } from 'framer-motion';

const ContextMastery = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                7. Context Package
            </h2>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-4 text-teal-400">The "Done" Signal</h3>
                        <p className="text-gray-300 mb-6">
                            Carries deadlines, cancellation signals, and request-scoped values across API boundaries and goroutines.
                        </p>
                        <div className="flex gap-4">
                            <div className="p-3 bg-black/30 rounded border border-white/5 text-center flex-1">
                                <div className="text-teal-400 font-bold">Background()</div>
                                <div className="text-xs text-gray-500">Root of tree</div>
                            </div>
                            <div className="p-3 bg-black/30 rounded border border-white/5 text-center flex-1">
                                <div className="text-teal-400 font-bold">TODO()</div>
                                <div className="text-xs text-gray-500">Placeholder</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-4 text-blue-400">Creation Methods</h3>
                        <ul className="space-y-4 font-mono text-sm text-gray-300">
                            <li className="p-3 bg-black/30 rounded">
                                <span className="text-blue-400">WithCancel(parent)</span>
                                <div className="text-gray-500 text-xs mt-1">Returns ctx, cancelFunc. Manual cancellation.</div>
                            </li>
                            <li className="p-3 bg-black/30 rounded">
                                <span className="text-blue-400">WithTimeout(parent, time)</span>
                                <div className="text-gray-500 text-xs mt-1">Cancels automatically after duration.</div>
                            </li>
                            <li className="p-3 bg-black/30 rounded">
                                <span className="text-blue-400">WithValue(parent, key, val)</span>
                                <div className="text-gray-500 text-xs mt-1">Passes request-scoped data (ID, Auth).</div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-6 text-teal-400">Pattern: Graceful Shutdown</h3>
                    <pre className="bg-black/50 p-6 rounded-xl font-mono text-sm text-gray-300 overflow-hidden">
                        {`func worker(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            return // Clean exit
        case work := <-jobs:
            process(work)
        }
    }
}

// In main:
ctx, cancel := context.WithTimeout(
    context.Background(), 
    5*time.Second
)
defer cancel()

go worker(ctx)`}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default ContextMastery;
