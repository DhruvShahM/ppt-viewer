import { motion } from 'framer-motion';

const Goroutines = () => {
    const codeSnippet = `func main() {
    // Start a new goroutine
    go doSomething()
    
    // Main function continues...
    fmt.Println("Hello")
}`;

    return (
        <div className="max-w-6xl w-full flex gap-12 items-center">
            <div className="flex-1">
                <h2 className="text-5xl font-bold mb-8 text-go-blue">Goroutines</h2>
                <ul className="space-y-6 text-xl text-gray-300">
                    <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4"
                    >
                        <span className="w-2 h-2 bg-go-blue rounded-full" />
                        Functions that run concurrently
                    </motion.li>
                    <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-4"
                    >
                        <span className="w-2 h-2 bg-go-blue rounded-full" />
                        Extremely lightweight (2KB stack)
                    </motion.li>
                    <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center gap-4"
                    >
                        <span className="w-2 h-2 bg-go-blue rounded-full" />
                        Managed by the Go Runtime (Scheduler)
                    </motion.li>
                    <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center gap-4"
                    >
                        <span className="w-2 h-2 bg-go-blue rounded-full" />
                        Cheap to create thousands of them
                    </motion.li>
                </ul>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex-1"
            >
                <div className="bg-[#1E1E1E] p-8 rounded-xl shadow-2xl border border-white/10 font-mono text-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-go-blue to-purple-500" />
                    <pre className="text-gray-300">
                        <code>
                            <span className="text-purple-400">func</span> <span className="text-blue-400">main</span>() {'{'}
                            {'\n    '}
                            <span className="text-gray-500">// Start a new goroutine</span>
                            {'\n    '}
                            <span className="text-red-400">go</span> <span className="text-yellow-300">doSomething</span>()
                            {'\n    '}
                            {'\n    '}
                            <span className="text-gray-500">// Main function continues...</span>
                            {'\n    '}
                            <span className="text-blue-300">fmt</span>.<span className="text-yellow-300">Println</span>(<span className="text-green-400">"Hello"</span>)
                            {'\n}'}
                        </code>
                    </pre>

                    {/* Floating 'go' keyword animation */}
                    <motion.div
                        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-4 right-4 text-go-blue font-bold text-4xl opacity-10 pointer-events-none"
                    >
                        go
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Goroutines;
