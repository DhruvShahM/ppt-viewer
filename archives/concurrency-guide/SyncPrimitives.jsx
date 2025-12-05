import { motion } from 'framer-motion';

const SyncPrimitives = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                6. Sync Package
            </h2>

            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold mb-2 text-red-400">WaitGroup</h3>
                    <p className="text-sm text-gray-400 mb-4">Waits for a collection of goroutines to finish.</p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`var wg sync.WaitGroup
wg.Add(1)
go func() {
  defer wg.Done()
  work()
}()
wg.Wait()`}
                    </pre>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold mb-2 text-red-400">Mutex / RWMutex</h3>
                    <p className="text-sm text-gray-400 mb-4">Mutual exclusion locks. Protect shared memory.</p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`var mu sync.Mutex
mu.Lock()
// critical section
mu.Unlock()`}
                    </pre>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold mb-2 text-red-400">Once</h3>
                    <p className="text-sm text-gray-400 mb-4">Ensures a function runs exactly once (e.g., singleton).</p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`var once sync.Once
once.Do(func() {
  init()
})`}
                    </pre>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold mb-2 text-orange-400">Pool</h3>
                    <p className="text-sm text-gray-400 mb-4">Cache of allocated objects to reduce GC pressure.</p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`pool.Get().(*Buffer)
pool.Put(buf)`}
                    </pre>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold mb-2 text-orange-400">Cond</h3>
                    <p className="text-sm text-gray-400 mb-4">Signaling mechanism for waiting goroutines.</p>
                    <pre className="bg-black/30 p-3 rounded text-xs font-mono text-gray-300">
                        {`c.L.Lock()
for !condition() {
    c.Wait()
}
c.L.Unlock()`}
                    </pre>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-4xl mb-2">⚠️</div>
                        <p className="text-gray-300 font-bold">Prefer Channels!</p>
                        <p className="text-xs text-gray-500 mt-2">Use sync only for low-level memory access optimization.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SyncPrimitives;
