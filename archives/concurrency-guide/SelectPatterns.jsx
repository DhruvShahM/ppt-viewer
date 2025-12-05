import { motion } from 'framer-motion';

const SelectPatterns = () => {
    return (
        <div className="max-w-6xl w-full mx-auto p-8">
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                5. Select Statement
            </h2>

            <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">The "Switch" for Channels</h3>
                        <p className="text-gray-300 mb-4">
                            Lets a goroutine wait on multiple communication operations.
                        </p>
                        <pre className="bg-black/50 p-4 rounded-lg font-mono text-sm text-purple-300">
                            {`select {
case msg1 := <-c1:
    print("received", msg1)
case c2 <- "hello":
    print("sent hello")
default:
    print("no comm ready")
}`}
                        </pre>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4 text-pink-400">Key Behaviors</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>• Blocks until one case can run.</li>
                            <li>• Chooses pseudo-randomly if multiple are ready.</li>
                            <li>• <code>default</code> case executes immediately if no channel is ready (Non-blocking).</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4 text-blue-400">Use Case: Timeouts</h3>
                        <pre className="bg-black/50 p-4 rounded-lg font-mono text-sm text-blue-300">
                            {`select {
case res := <-c:
    handle(res)
case <-time.After(1 * time.Second):
    print("timeout")
}`}
                        </pre>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-xl font-bold mb-4 text-green-400">Use Case: Fan-In</h3>
                        <pre className="bg-black/50 p-4 rounded-lg font-mono text-sm text-green-300">
                            {`select {
case msg := <-input1:
    output <- msg
case msg := <-input2:
    output <- msg
}`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectPatterns;
