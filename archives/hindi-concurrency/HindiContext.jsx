import { motion } from 'framer-motion';


const HindiContext = () => {
    const code = `ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel()

select {
case <-time.After(3 * time.Second):
    fmt.Println("Finished")
case <-ctx.Done():
    fmt.Println("Timeout:", ctx.Err())
}`;

    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">7. Context Package</h2>

            <div className="grid grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">Context क्या है?</h3>
                        <p className="text-xl text-gray-300">
                            Context का use request-scoped values, cancellation signals, और deadlines को API boundaries के पार भेजने के लिए होता है।
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 p-6 rounded-xl border border-white/10"
                    >
                        <h3 className="text-2xl font-bold mb-4 text-green-400">Functions</h3>
                        <ul className="space-y-2 text-gray-300 text-lg">
                            <li><strong>WithCancel:</strong> Manually cancel करने के लिए।</li>
                            <li><strong>WithTimeout:</strong> एक fixed duration के बाद cancel करने के लिए।</li>
                            <li><strong>WithDeadline:</strong> एक specific time पर cancel करने के लिए।</li>
                            <li><strong>WithValue:</strong> Request-scoped data pass करने के लिए।</li>
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

export default HindiContext;
