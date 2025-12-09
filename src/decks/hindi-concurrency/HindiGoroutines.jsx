import { motion } from 'framer-motion';


const HindiGoroutines = () => {
    const code = `func main() {
    // Normal function call
    doWork()

    // Goroutine creation
    go doWork()

    // Anonymous function goroutine
    go func() {
        fmt.Println("Inside goroutine")
    }()
}`;

    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">2. Goroutines</h2>

            <div className="grid grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">Goroutine क्या है?</h3>
                        <p className="text-xl text-gray-300">
                            Goroutine एक function है जो दूसरे functions के साथ concurrently चलता है। यह OS thread नहीं, बल्कि Go runtime द्वारा manage किया गया lightweight thread है।
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-green-400">Key Features</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300">
                            <li><strong>Creation:</strong> सिर्फ `go` keyword लगाने से start हो जाती है।</li>
                            <li><strong>Stack Size:</strong> शुरुआत में सिर्फ 2KB, ज़रूरत पड़ने पर grow करती है।</li>
                            <li><strong>Lifecycle:</strong> जब main function खत्म होता है, सभी goroutines बंद हो जाती हैं।</li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <pre className="bg-black/30 p-6 rounded-xl font-mono text-sm text-green-300 overflow-x-auto">
                        {code}
                    </pre>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-12 right-12 bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-full font-mono text-sm flex items-center gap-2"
            >
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                LIVE DEMO REQUESTED
            </motion.div>
        </div>
    );
};

export default HindiGoroutines;
