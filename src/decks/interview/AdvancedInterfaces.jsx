import { motion } from 'framer-motion';

const AdvancedInterfaces = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-blue-400">Advanced Concepts</h2>

            <div className="grid grid-cols-2 gap-16">
                {/* Embedding */}
                <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-green-400">Interface Embedding</h3>
                    <p className="text-gray-300 text-lg">
                        Interfaces can inherit from other interfaces.
                    </p>
                    <pre className="bg-white/5 p-6 rounded-xl border border-white/10 font-mono text-sm">
                        <code>
                            <span className="text-purple-400">type</span> Reader <span className="text-purple-400">interface</span> {'{'} Read() {'}'}
                            {'\n'}
                            <span className="text-purple-400">type</span> Writer <span className="text-purple-400">interface</span> {'{'} Write() {'}'}
                            {'\n\n'}
                            <span className="text-purple-400">type</span> ReadWriter <span className="text-purple-400">interface</span> {'{'}
                            {'\n    '}
                            Reader
                            {'\n    '}
                            Writer
                            {'\n}'}
                        </code>
                    </pre>
                </div>

                {/* Polymorphism */}
                <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-purple-400">Polymorphism</h3>
                    <p className="text-gray-300 text-lg">
                        Treating different types as the same interface.
                    </p>

                    <div className="flex gap-4 mt-8">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-black"
                        >
                            Dog
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                            className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center font-bold text-black"
                        >
                            Cat
                        </motion.div>
                    </div>
                    <div className="text-center text-xl font-bold text-yellow-400 mt-4">
                        Both are "Animals"
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedInterfaces;
