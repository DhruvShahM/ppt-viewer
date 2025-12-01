import { motion } from 'framer-motion';


const HindiSelect = () => {
    const code = `select {
case msg1 := <-ch1:
    fmt.Println("Received from ch1:", msg1)
case msg2 := <-ch2:
    fmt.Println("Received from ch2:", msg2)
case <-time.After(time.Second):
    fmt.Println("Timeout!")
default:
    fmt.Println("No data ready")
}`;

    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">5. Select Statement</h2>

            <div className="grid grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">Select क्या है?</h3>
                        <p className="text-xl text-gray-300">
                            `select` statement एक switch statement जैसा है, लेकिन channels के लिए। यह multiple channel operations का इंतज़ार करता है।
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-green-400">Use Cases</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-300 text-lg">
                            <li><strong>Timeouts:</strong> अगर response time पर न आए तो cancel करना।</li>
                            <li><strong>Non-blocking operations:</strong> `default` case का use करके।</li>
                            <li><strong>Fan-in:</strong> Multiple channels से data एक जगह collect करना।</li>
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

export default HindiSelect;
