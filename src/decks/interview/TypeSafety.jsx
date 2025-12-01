import { motion } from 'framer-motion';

const TypeSafety = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-blue-400">Type Safety & Assertions</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* Type Assertion */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-green-400">Type Assertion</h3>
                    <p className="text-gray-400 mb-4">Extracting the underlying concrete value.</p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm">
                        <code>
                            <span className="text-purple-400">var</span> i <span className="text-yellow-300">any</span> = "hello"
                            {'\n\n'}
                            <span className="text-gray-500">// Unsafe (panics if wrong)</span>
                            {'\n'}
                            s := i.(<span className="text-blue-400">string</span>)
                            {'\n\n'}
                            <span className="text-gray-500">// Safe (comma-ok idiom)</span>
                            {'\n'}
                            s, ok := i.(<span className="text-blue-400">string</span>)
                            {'\n'}
                            <span className="text-purple-400">if</span> ok {'{'} ... {'}'}
                        </code>
                    </pre>
                </div>

                {/* Type Switch */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 text-purple-400">Type Switch</h3>
                    <p className="text-gray-400 mb-4">Handling multiple types.</p>
                    <pre className="bg-black/30 p-4 rounded font-mono text-sm">
                        <code>
                            <span className="text-purple-400">switch</span> v := i.(<span className="text-purple-400">type</span>) {'{'}
                            {'\n'}
                            <span className="text-purple-400">case</span> <span className="text-blue-400">int</span>:
                            {'\n    '}
                            fmt.Println("Integer", v)
                            {'\n'}
                            <span className="text-purple-400">case</span> <span className="text-blue-400">string</span>:
                            {'\n    '}
                            fmt.Println("String", v)
                            {'\n}'}
                        </code>
                    </pre>
                </div>

                {/* Check Implementation */}
                <div className="col-span-2 bg-white/5 p-6 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-bold mb-2 text-yellow-400">Check Implementation</h3>
                        <p className="text-gray-300">Compile-time check to ensure a type implements an interface.</p>
                    </div>
                    <code className="bg-black/30 p-4 rounded font-mono text-sm text-blue-300">
                        var _ Speaker = (*MyType)(nil)
                    </code>
                </div>
            </div>
        </div>
    );
};

export default TypeSafety;
