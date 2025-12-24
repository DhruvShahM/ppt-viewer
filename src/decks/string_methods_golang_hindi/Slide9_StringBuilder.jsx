import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Code } from 'lucide-react';

export const Slide9_StringBuilder = () => {
    const [builderSteps, setBuilderSteps] = useState(5);

    const steps = [
        { step: 1, action: 'WriteString("Hello")', result: '"Hello"' },
        { step: 2, action: 'WriteString(" ")', result: '"Hello "' },
        { step: 3, action: 'WriteString("World")', result: '"Hello World"' },
        { step: 4, action: 'WriteByte(\'!\')', result: '"Hello World!"' },
        { step: 5, action: 'String()', result: '"Hello World!"' },
    ];

    return (
        <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden">
            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            >
                <Hammer className="w-full h-full text-yellow-400" />
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
                            <Hammer className="w-10 h-10 text-yellow-400 flex-shrink-0" />
                            <div>
                                <h2 className="text-4xl font-bold text-white leading-tight">
                                    StringBuilder Pattern
                                </h2>
                                <p className="text-yellow-300 text-sm mt-1">
                                    बेहतर और तेज़ String निर्माण
                                </p>
                            </div>
                        </div>
                        <motion.div
                            className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        />
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div
                            className="bg-red-500/10 border border-red-400/30 rounded-lg p-6"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ borderColor: 'rgba(239, 68, 68, 0.5)' }}
                        >
                            <h3 className="text-lg font-bold text-red-300 mb-4">❌ Slow Way</h3>
                            <pre className="text-slate-300 text-xs font-mono overflow-x-auto">
                                {`str := ""
for i := 0; i < 1000; i++ {
  str += "a"
}
// 1000 नई strings बनती हैं`}
                            </pre>
                        </motion.div>

                        <motion.div
                            className="bg-green-500/10 border border-green-400/30 rounded-lg p-6"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ borderColor: 'rgba(34, 197, 94, 0.5)' }}
                        >
                            <h3 className="text-lg font-bold text-green-300 mb-4">✅ Fast Way</h3>
                            <pre className="text-slate-300 text-xs font-mono overflow-x-auto">
                                {`var sb strings.Builder
for i := 0; i < 1000; i++ {
  sb.WriteString("a")
}
result := sb.String()`}
                            </pre>
                        </motion.div>
                    </motion.div>

                    <motion.div className="space-y-4">
                        <h3 className="text-2xl font-bold text-cyan-300">
                            StringBuilder के साथ String बनाएं:
                        </h3>

                        <div className="space-y-3">
                            {steps.slice(0, builderSteps).map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex items-center gap-4"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.12 }}
                                >
                                    <motion.div
                                        className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-white text-sm"
                                        animate={{ scale: [1, 1.15, 1] }}
                                        transition={{ delay: 0.5 + idx * 0.12, duration: 0.8 }}
                                    >
                                        {item.step}
                                    </motion.div>

                                    <motion.div
                                        className="flex-1 bg-slate-800/50 rounded p-3 border border-slate-700 font-mono text-cyan-300 text-sm"
                                        whileHover={{ borderColor: 'rgba(34, 211, 238, 0.6)' }}
                                    >
                                        {item.action}
                                    </motion.div>

                                    <motion.div
                                        className="flex-1 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded p-3 border border-cyan-400/30 font-mono text-cyan-300 text-sm"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.55 + idx * 0.12 }}
                                    >
                                        {item.result}
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div className="flex justify-center gap-2 mt-6">
                            {steps.map((_, idx) => (
                                <motion.button
                                    key={idx}
                                    onClick={() => setBuilderSteps(idx + 1)}
                                    className={`w-3 h-3 rounded-full transition-all ${idx < builderSteps ? 'bg-cyan-400' : 'bg-slate-600'
                                        }`}
                                    whileHover={{ scale: 1.4 }}
                                    whileTap={{ scale: 0.8 }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-8 border border-yellow-400/30"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <h3 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center gap-2">
                            <Code className="w-6 h-6" />
                            StringBuilder के मुख्य Methods:
                        </h3>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { method: 'WriteString()', desc: 'String जोड़ें' },
                                { method: 'WriteByte()', desc: 'Single byte जोड़ें' },
                                { method: 'WriteRune()', desc: 'Single rune जोड़ें' },
                                { method: 'String()', desc: 'Final string प्राप्त करें' },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="bg-slate-800/50 rounded p-4 border border-slate-700"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 + idx * 0.1 }}
                                    whileHover={{ borderColor: 'rgba(234, 179, 8, 0.5)' }}
                                >
                                    <p className="font-bold text-yellow-300 mb-1">{item.method}</p>
                                    <p className="text-sm text-slate-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-slate-900/80 rounded-lg p-6 border border-slate-700"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                    >
                        <p className="text-xs text-cyan-400 uppercase tracking-wider font-semibold mb-3">
                            Complete Example:
                        </p>
                        <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
                            {`var builder strings.Builder
builder.WriteString("Hello")
builder.WriteString(" ")
builder.WriteString("World")
builder.WriteByte('!')

result := builder.String()
// result = "Hello World!"`}
                        </pre>
                    </motion.div>

                    <div className="h-8" />
                </div>
            </div>
        </div>
    );
};

export default Slide9_StringBuilder;
