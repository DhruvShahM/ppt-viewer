import { motion } from 'framer-motion';

const PipelinePatterns = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-orange-400">Pipeline Patterns</h2>

            <div className="grid grid-cols-3 gap-8">
                {/* Generator */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-green-400 mb-4">1. Generator</h3>
                    <p className="text-gray-300 mb-4">Converts a list of items into a channel.</p>
                    <div className="flex justify-center my-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-700 px-2 py-1 rounded">[1,2,3]</div>
                            <span className="text-xl">→</span>
                            <div className="bg-green-900/50 px-2 py-1 rounded border border-green-500">chan int</div>
                        </div>
                    </div>
                </div>

                {/* Fan-Out */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">2. Fan-Out</h3>
                    <p className="text-gray-300 mb-4">Multiple functions reading from the same channel to distribute work.</p>
                    <div className="flex flex-col items-center gap-2 my-4">
                        <div className="bg-green-900/50 px-2 py-1 rounded border border-green-500">chan int</div>
                        <div className="flex gap-4">
                            <span className="text-xl">↙</span>
                            <span className="text-xl">↓</span>
                            <span className="text-xl">↘</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="bg-blue-900/50 px-2 py-1 rounded border border-blue-500">W1</div>
                            <div className="bg-blue-900/50 px-2 py-1 rounded border border-blue-500">W2</div>
                            <div className="bg-blue-900/50 px-2 py-1 rounded border border-blue-500">W3</div>
                        </div>
                    </div>
                </div>

                {/* Fan-In */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">3. Fan-In</h3>
                    <p className="text-gray-300 mb-4">Multiplexing multiple channels into one.</p>
                    <div className="flex flex-col items-center gap-2 my-4">
                        <div className="flex gap-2">
                            <div className="bg-blue-900/50 px-2 py-1 rounded border border-blue-500">ch1</div>
                            <div className="bg-blue-900/50 px-2 py-1 rounded border border-blue-500">ch2</div>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-xl">↘</span>
                            <span className="text-xl">↙</span>
                        </div>
                        <div className="bg-purple-900/50 px-2 py-1 rounded border border-purple-500">merged</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PipelinePatterns;
