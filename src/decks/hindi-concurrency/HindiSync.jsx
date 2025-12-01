import { motion } from 'framer-motion';


const HindiSync = () => {
    return (
        <div className="h-full flex flex-col justify-center max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-12 text-blue-400">6. Synchronization Primitives</h2>

            <div className="grid grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">WaitGroup</h3>
                    <p className="text-gray-300 mb-4">
                        Goroutines के complete होने का इंतज़ार करने के लिए।
                    </p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm text-gray-300 overflow-x-auto">
                        {`var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
    doWork()
}()
wg.Wait()`}
                    </pre>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Mutex</h3>
                    <p className="text-gray-300 mb-4">
                        Shared resource को protect करने के लिए (Locking)।
                    </p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm text-gray-300 overflow-x-auto">
                        {`var mu sync.Mutex
mu.Lock()
count++
mu.Unlock()`}
                    </pre>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-orange-400">Once</h3>
                    <p className="text-gray-300 mb-4">
                        किसी function को सिर्फ एक बार run करने के लिए (Singleton)।
                    </p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm text-gray-300 overflow-x-auto">
                        {`var once sync.Once
once.Do(func() {
    initDB()
})`}
                    </pre>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                    <h3 className="text-2xl font-bold mb-4 text-yellow-400">Pool</h3>
                    <p className="text-gray-300 mb-4">
                        Objects को reuse करने के लिए ताकि GC pressure कम हो।
                    </p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm text-gray-300 overflow-x-auto">
                        {`pool := sync.Pool{
    New: func() interface{} { return new(Buffer) },
}
b := pool.Get().(*Buffer)
pool.Put(b)`}
                    </pre>
                </motion.div>
            </div>
        </div>
    );
};

export default HindiSync;
