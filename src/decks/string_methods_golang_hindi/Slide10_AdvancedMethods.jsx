import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code } from 'lucide-react';

export const Slide10_AdvancedMethods = () => {
    const advancedMethods = [
        {
            name: 'FieldsFunc()',
            desc: 'Custom function के साथ split करें',
            example: 'strings.FieldsFunc("a1b2c3", unicode.IsDigit)',
        },
        {
            name: 'TrimLeftFunc()',
            desc: 'Left side से custom characters हटाएं',
            example: 'strings.TrimLeftFunc("   hello", unicode.IsSpace)',
        },
        {
            name: 'Cut()',
            desc: 'String को separator से दो भागों में बांटें',
            example: 'before, after, found := strings.Cut("a-b", "-")',
        },
        {
            name: 'Count()',
            desc: 'Non-overlapping occurrences गिनें',
            example: 'count := strings.Count("aaa", "aa")',
        },
    ];

    return (
        <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-5"
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <Zap className="w-full h-full text-yellow-400" />
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
                            <Zap className="w-10 h-10 text-yellow-400 flex-shrink-0" />
                            <div>
                                <h2 className="text-4xl font-bold text-white leading-tight">
                                    Advanced Methods
                                </h2>
                                <p className="text-yellow-300 text-sm mt-1">
                                    उन्नत और शक्तिशाली string manipulation तरीके
                                </p>
                            </div>
                        </div>
                        <motion.div
                            className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-purple-500 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        />
                    </motion.div>

                    <div className="space-y-6">
                        {advancedMethods.map((method, idx) => (
                            <motion.div
                                key={idx}
                                className="group relative overflow-hidden rounded-lg"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + idx * 0.12 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent"
                                    animate={{ x: [-100, 100, -100] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                <div className="relative bg-slate-800/50 border border-yellow-400/30 rounded-lg p-6 hover:border-yellow-400 transition-all">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 + idx * 0.12 }}
                                        >
                                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                                                Method
                                            </p>
                                            <h3 className="text-2xl font-bold text-yellow-300">
                                                {method.name}
                                            </h3>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.35 + idx * 0.12 }}
                                        >
                                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                                                विवरण
                                            </p>
                                            <p className="text-slate-300 text-sm">{method.desc}</p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 + idx * 0.12 }}
                                        >
                                            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                                                उदाहरण
                                            </p>
                                            <code className="text-xs bg-slate-900/50 text-cyan-300 p-2 rounded block border border-slate-700 overflow-x-auto">
                                                {method.example}
                                            </code>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="bg-gradient-to-r from-purple-500/10 to-yellow-500/10 rounded-lg p-8 border border-purple-400/30"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2">
                            <Code className="w-6 h-6" />
                            विस्तृत उदाहरण (Detailed Examples):
                        </h3>

                        <motion.div
                            className="bg-slate-900/80 rounded p-6 border border-slate-700"
                            whileHover={{ borderColor: 'rgba(168, 85, 247, 0.5)' }}
                        >
                            <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
                                {`// FieldsFunc - custom separator
words := strings.FieldsFunc("a1b2c3", func(r rune) bool {
  return unicode.IsDigit(r)
})
// Result: ["a", "b", "c"]

// Cut - string को divide करें
before, after, found := strings.Cut("name=John", "=")
// before: "name", after: "John", found: true

// Count - occurrences गिनें
count := strings.Count("aaaa", "aa")
// Result: 2 (non-overlapping)`}
                            </pre>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg p-6 border border-cyan-400/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85 }}
                    >
                        <h3 className="text-lg font-bold text-cyan-300 mb-4">
                            ⚡ महत्वपूर्ण बातें:
                        </h3>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li>✓ FieldsFunc() कस्टम separator के लिए बेहतरीन है</li>
                            <li>✓ Cut() string को 2 भागों में divide करता है</li>
                            <li>✓ Count() non-overlapping occurrences गिनता है</li>
                            <li>✓ TrimLeftFunc() predicate-based trimming के लिए है</li>
                        </ul>
                    </motion.div>

                    <div className="h-8" />
                </div>
            </div>
        </div>
    );
};

export default Slide10_AdvancedMethods;
