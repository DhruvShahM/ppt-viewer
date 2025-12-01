import { motion } from 'framer-motion';

const ConcurrencyIntro = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                1. Introduction to Concurrency
            </h2>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-4 text-blue-400">What is Concurrency?</h3>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            Concurrency is about <span className="text-white font-bold">dealing</span> with lots of things at once.
                            It's the composition of independently executing processes.
                        </p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">Concurrency vs Parallelism</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 mt-1">•</span>
                                <span><strong>Concurrency:</strong> Structure. Breaking a program into independent pieces.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-400 mt-1">•</span>
                                <span><strong>Parallelism:</strong> Execution. Doing multiple things at the exact same time.</span>
                            </li>
                        </ul>
                        <div className="mt-6 p-4 bg-black/30 rounded-lg text-sm font-mono text-gray-400 italic">
                            "Concurrency is not parallelism, but it enables parallelism." — Rob Pike
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-6 text-orange-400">Why Go?</h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl">1</div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Lightweight Threads</h4>
                                <p className="text-gray-400">Goroutines start with only ~2KB of stack space. You can run millions of them.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl">2</div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">CSP Model</h4>
                                <p className="text-gray-400">Communicating Sequential Processes. Share memory by communicating, don't communicate by sharing memory.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl">3</div>
                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">Runtime Scheduler</h4>
                                <p className="text-gray-400">Go has its own sophisticated scheduler (GMP) that multiplexes goroutines onto OS threads.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConcurrencyIntro;
