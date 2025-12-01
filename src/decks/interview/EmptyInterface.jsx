import { motion } from 'framer-motion';

const EmptyInterface = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-blue-400">The Empty Interface</h2>

            <div className="grid grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-3xl font-bold text-white mb-2">interface{'{ }'}</h3>
                        <p className="text-gray-300 text-lg">
                            An interface with zero methods.
                        </p>
                    </div>

                    <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-500/30">
                        <h3 className="text-3xl font-bold text-blue-400 mb-2">any</h3>
                        <p className="text-gray-300 text-lg">
                            Added in Go 1.18. It is an <span className="font-bold text-white">alias</span> for `interface{'{ }'}`.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-yellow-400 mb-2">Why is it special?</h3>
                        <p className="text-gray-300">
                            <span className="font-bold text-white">ALL types</span> implement the empty interface.
                            Used for code that handles unknown types (like `fmt.Println`).
                        </p>
                    </div>
                </div>

                <div className="bg-[#1E1E1E] p-8 rounded-xl border border-white/10 font-mono text-lg">
                    <pre>
                        <code>
                            <span className="text-purple-400">func</span> <span className="text-blue-400">PrintAnything</span>(v <span className="text-yellow-300">any</span>) {'{'}
                            {'\n    '}
                            fmt.<span className="text-yellow-300">Println</span>(v)
                            {'\n}'}
                            {'\n\n'}
                            <span className="text-blue-400">PrintAnything</span>(42)
                            {'\n'}
                            <span className="text-blue-400">PrintAnything</span>("hello")
                            {'\n'}
                            <span className="text-blue-400">PrintAnything</span>(true)
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default EmptyInterface;
