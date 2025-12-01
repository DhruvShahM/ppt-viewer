import { motion } from 'framer-motion';

const InterfaceInternals = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-blue-400">Interfaces: Under the Hood</h2>

            <div className="grid grid-cols-2 gap-12">
                {/* iface vs eface */}
                <div className="space-y-8">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-purple-400 mb-4">The `iface` Struct</h3>
                        <p className="text-gray-300 mb-4">Used for interfaces <strong className="text-white">with methods</strong>.</p>
                        <pre className="bg-black/30 p-4 rounded font-mono text-sm">
                            <code>
                                <span className="text-blue-400">type</span> iface <span className="text-blue-400">struct</span> {'{'}
                                {'\n    '}
                                <span className="text-green-400">tab</span>  <span className="text-yellow-400">*itab</span>          <span className="text-gray-500">// Type info & methods</span>
                                {'\n    '}
                                <span className="text-green-400">data</span> <span className="text-yellow-400">unsafe.Pointer</span> <span className="text-gray-500">// Actual value</span>
                                {'\n}'}
                            </code>
                        </pre>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-green-400 mb-4">The `eface` Struct</h3>
                        <p className="text-gray-300 mb-4">Used for <strong className="text-white">empty interfaces</strong> (interface{'{}'}).</p>
                        <pre className="bg-black/30 p-4 rounded font-mono text-sm">
                            <code>
                                <span className="text-blue-400">type</span> eface <span className="text-blue-400">struct</span> {'{'}
                                {'\n    '}
                                <span className="text-green-400">_type</span> <span className="text-yellow-400">*inline_type</span>   <span className="text-gray-500">// Type info only</span>
                                {'\n    '}
                                <span className="text-green-400">data</span>  <span className="text-yellow-400">unsafe.Pointer</span> <span className="text-gray-500">// Actual value</span>
                                {'\n}'}
                            </code>
                        </pre>
                    </div>
                </div>

                {/* Visualization */}
                <div className="bg-black/30 p-8 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold text-gray-400 mb-8">Interface Value Pair</h3>

                    <div className="flex gap-4">
                        {/* Type Info */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-40 h-40 bg-purple-900/30 border border-purple-500/50 rounded-lg flex flex-col items-center justify-center p-4 text-center"
                        >
                            <div className="text-purple-400 font-bold text-xl mb-2">Type</div>
                            <div className="text-sm text-gray-300">Method Table</div>
                            <div className="text-xs text-gray-500 mt-2">(itab / _type)</div>
                        </motion.div>

                        {/* Data Pointer */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="w-40 h-40 bg-green-900/30 border border-green-500/50 rounded-lg flex flex-col items-center justify-center p-4 text-center"
                        >
                            <div className="text-green-400 font-bold text-xl mb-2">Value</div>
                            <div className="text-sm text-gray-300">Pointer to Data</div>
                            <div className="text-xs text-gray-500 mt-2">(unsafe.Pointer)</div>
                        </motion.div>
                    </div>

                    <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-200 text-center">
                        <strong className="block text-lg mb-1">Key Takeaway</strong>
                        An interface is nil only if <br />
                        <span className="font-mono bg-black/30 px-2 rounded">Type == nil && Value == nil</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterfaceInternals;
