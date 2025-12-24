import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target } from 'lucide-react';

export const Slide7_ContainsAndIndex = () => {
    const fullString = 'Hello World Go Programming';
    const containsExamples = [
        { method: 'Contains()', search: 'World', found: true },
        { method: 'ContainsAny()', search: 'xyz', found: false },
        { method: 'HasPrefix()', search: 'Hello', found: true },
        { method: 'HasSuffix()', search: 'ming', found: true },
    ];

    return (
        <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-5"
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <Search className="w-full h-full text-cyan-400" />
            </motion.div>

            <div className="relative z-10 flex-1 overflow-y-auto p-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    <motion.div
                        className="sticky top-0 bg-gradient-to-b from-slate-900 via-slate-900 to-transparent pt-4 pb-6 z-20"
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Search className="w-10 h-10 text-cyan-400 flex-shrink-0" />
                            <div>
                                <h2 className="text-4xl font-bold text-white leading-tight">
                                    Contains & Index Methods
                                </h2>
                                <p className="text-cyan-300 text-sm mt-1">
                                    स्ट्रिंग में खोज करना और स्थिति खोजना
                                </p>
                            </div>
                        </div>
                        <motion.div
                            className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        />
                    </motion.div>

                    <motion.div
                        className="bg-slate-800/50 rounded-lg p-6 border border-cyan-400/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-sm text-cyan-400 uppercase tracking-wider font-semibold mb-4">
                            🔍 मुख्य String:
                        </p>
                        <motion.div
                            className="flex flex-wrap gap-2 font-mono text-base"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {fullString.split('').map((char, idx) => (
                                <motion.span
                                    key={idx}
                                    className="px-2 py-1 bg-cyan-500/15 border border-cyan-400/40 rounded text-cyan-300 hover:bg-cyan-500/30 transition-all"
                                    whileHover={{ scale: 1.15 }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-cyan-300">
                            Contains Methods - खोज करें:
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            {containsExamples.map((example, idx) => (
                                <motion.div
                                    key={idx}
                                    className={`rounded-lg p-6 border transition-all ${example.found
                                            ? 'bg-green-500/10 border-green-400/50'
                                            : 'bg-red-500/10 border-red-400/50'
                                        }`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <h3 className="text-lg font-bold text-cyan-300 mb-3">
                                        {example.method}
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-slate-400 mb-1">खोजें:</p>
                                            <code className="font-mono text-cyan-200 bg-slate-900/50 px-3 py-2 rounded block text-sm">
                                                "{example.search}"
                                            </code>
                                        </div>
                                        <motion.div
                                            className="flex items-center gap-2 pt-2"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <div
                                                className={`w-3 h-3 rounded-full ${example.found ? 'bg-green-400' : 'bg-red-400'
                                                    }`}
                                            />
                                            <span
                                                className={`text-sm font-bold ${example.found ? 'text-green-300' : 'text-red-300'
                                                    }`}
                                            >
                                                {example.found ? 'मिला ✓' : 'नहीं मिला ✗'}
                                            </span>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-8 border border-purple-400/30"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2">
                            <Target className="w-6 h-6" />
                            Index Methods - स्थिति खोजें:
                        </h3>
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { method: 'Index("o")', result: '4' },
                                { method: 'LastIndex("o")', result: '19' },
                                { method: "IndexRune('d')", result: '10' },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="bg-slate-800/50 rounded p-4 border border-slate-700"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + idx * 0.1 }}
                                    whileHover={{ borderColor: 'rgba(168, 85, 247, 0.6)' }}
                                >
                                    <p className="text-xs text-slate-400 mb-2 font-mono">{item.method}</p>
                                    <motion.p
                                        className="text-2xl font-bold text-purple-300"
                                        animate={{ scale: [1, 1.15, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                                    >
                                        Position: {item.result}
                                    </motion.p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-slate-900/80 rounded-lg p-6 border border-slate-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-3">
                            Go Code Example:
                        </p>
                        <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
                            {`str := "Hello World Go"
contains := strings.Contains(str, "World")     // true
hasPrefix := strings.HasPrefix(str, "Hello")   // true
index := strings.Index(str, "o")               // 4`}
                        </pre>
                    </motion.div>

                    <div className="h-8" />
                </div>
            </div>
        </div>
    );
};

export default Slide7_ContainsAndIndex;
