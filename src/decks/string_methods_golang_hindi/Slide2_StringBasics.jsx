import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code } from 'lucide-react';

const Slide2_StringBasics = () => {
  const methods = [
    { name: 'len()', desc: 'स्ट्रिंग की लंबाई' },
    { name: 'Rune conversion', desc: 'Characters को Rune में बदलें' },
    { name: 'Index access', desc: 'पहली बाइट से एक्सेस करें' },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-y-auto p-12">
      {/* Background animation */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BookOpen className="w-12 h-12 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">String के मूल सिद्धांत</h2>
        </motion.div>

        {/* Key concepts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {methods.map((method, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-xl bg-slate-800/50 border border-cyan-500/30 hover:border-cyan-400 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' }}
            >
              <h3 className="text-xl font-bold text-cyan-300 mb-2">{method.name}</h3>
              <p className="text-slate-300">{method.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Code example */}
        <motion.div
          className="bg-slate-900/80 rounded-xl p-8 border border-slate-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Code className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-300 font-mono text-sm">go_string_basics.go</span>
          </div>
          <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
            {`str := "नमस्ते"
length := len(str)           // 15 bytes (UTF-8)
runes := []rune(str)          // ['न', 'म', 'स', '्', 'त', 'े']
charCount := len(runes)       // 6 characters
firstByte := str[0]            // 226 (first byte)`}
          </pre>
        </motion.div>

        {/* Animated note */}
        <motion.p
          className="text-slate-400 text-sm mt-8 italic"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ⚠️ Go में strings UTF-8 encoded हैं, इसलिए len() bytes गिनता है, characters नहीं
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Slide2_StringBasics;