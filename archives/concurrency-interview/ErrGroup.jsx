import { motion } from 'framer-motion';

const ErrGroup = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">ErrGroup</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Concept */}
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4">golang.org/x/sync/errgroup</h3>
                        <p className="text-gray-300 mb-4">
                            A better WaitGroup that handles errors and context cancellation.
                        </p>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-400 font-bold">✓</span>
                                <div>
                                    <strong className="text-white">Error Propagation:</strong> Returns the first non-nil error.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-400 font-bold">✓</span>
                                <div>
                                    <strong className="text-white">Context Integration:</strong> Cancels all goroutines if one fails.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-400 font-bold">✓</span>
                                <div>
                                    <strong className="text-white">Simpler API:</strong> No need to manually Add() or Done().
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Code Example */}
                <div className="bg-black/30 p-6 rounded-xl border border-white/10 font-mono text-sm">
                    <h3 className="text-xl font-bold text-gray-400 mb-4">Usage Pattern</h3>
                    <pre>
                        <code>
                            g, ctx := errgroup.WithContext(context.Background())
                            {'\n\n'}
                            <span className="text-purple-400">for</span> _, url := <span className="text-purple-400">range</span> urls {'{'}
                            {'\n    '}
                            url := url <span className="text-gray-500">// Capture loop var</span>
                            {'\n    '}
                            g.Go(<span className="text-purple-400">func</span>() <span className="text-yellow-400">error</span> {'{'}
                            {'\n        '}
                            <span className="text-purple-400">return</span> fetch(ctx, url)
                            {'\n    '}
                            {'}'})
                            {'\n'}
                            {'}'}
                            {'\n\n'}
                            <span className="text-purple-400">if</span> err := g.Wait(); err != <span className="text-purple-400">nil</span> {'{'}
                            {'\n    '}
                            <span className="text-gray-500">// Handle first error</span>
                            {'\n'}
                            {'}'}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default ErrGroup;
