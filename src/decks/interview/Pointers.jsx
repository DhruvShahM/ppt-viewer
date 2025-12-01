import { motion } from 'framer-motion';

const Pointers = () => {
    return (
        <div className="max-w-6xl w-full">
            <h2 className="text-5xl font-bold mb-12 text-center text-blue-400">Pointers</h2>

            <div className="grid grid-cols-2 gap-16">
                <div className="space-y-8 text-xl text-gray-300">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-4">What are they?</h3>
                        <p>Variables that store the <span className="text-blue-400">memory address</span> of another variable.</p>
                    </div>

                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <code className="bg-black/30 px-2 py-1 rounded text-blue-300">*T</code>
                            <span>Type declaration (pointer to T)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <code className="bg-black/30 px-2 py-1 rounded text-blue-300">&T</code>
                            <span>"Address of" operator</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <code className="bg-black/30 px-2 py-1 rounded text-blue-300">*p</code>
                            <span>Dereference operator (get value)</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-[#1E1E1E] p-8 rounded-xl border border-white/10 font-mono text-lg relative overflow-hidden">
                    <pre>
                        <code>
                            <span className="text-purple-400">func</span> <span className="text-blue-400">main</span>() {'{'}
                            {'\n    '}
                            <span className="text-purple-400">var</span> x <span className="text-blue-400">int</span> = 10
                            {'\n    '}
                            <span className="text-purple-400">var</span> p *<span className="text-blue-400">int</span> = &x
                            {'\n\n    '}
                            fmt.<span className="text-yellow-300">Println</span>(p)  <span className="text-gray-500">// 0xc0000...</span>
                            {'\n    '}
                            fmt.<span className="text-yellow-300">Println</span>(*p) <span className="text-gray-500">// 10</span>
                            {'\n\n    '}
                            *p = 20         <span className="text-gray-500">// Change x via p</span>
                            {'\n}'}
                        </code>
                    </pre>

                    {/* Visual Pointer Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute top-10 right-10 flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 border-2 border-blue-500 rounded flex items-center justify-center text-white font-bold">
                            p
                        </div>
                        <motion.div
                            animate={{ height: [20, 40, 20] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1 bg-blue-500"
                        />
                        <div className="w-16 h-16 border-2 border-white rounded flex items-center justify-center text-white font-bold bg-white/10">
                            x
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Pointers;
