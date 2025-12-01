import { motion } from 'framer-motion';


const HindiChannels = () => {
    const code = `// Create channel
ch := make(chan int)

// Send data
go func() {
    ch <- 42
}()

// Receive data
val := <-ch`;

    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">4. Channels</h2>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">Channels क्या हैं?</h3>
                        <p className="text-xl text-gray-300 mb-4">
                            Channels goroutines के बीच बात करने का ज़रिया हैं। यह pipe की तरह होते हैं जहाँ से data एक तरफ से डाला जाता है और दूसरी तरफ से निकाला जाता है।
                        </p>
                        <p className="text-lg text-gray-400 italic">
                            "Don't communicate by sharing memory, share memory by communicating."
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-green-400">Types of Channels</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li>
                                <strong>Unbuffered:</strong> Sender तब तक block रहता है जब तक कोई receiver न हो। (Synchronous)
                            </li>
                            <li>
                                <strong>Buffered:</strong> इसमें capacity होती है। Sender तब तक block नहीं होता जब तक buffer full न हो।
                            </li>
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
        </div>
    );
};

export default HindiChannels;
