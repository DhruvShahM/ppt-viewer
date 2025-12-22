import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';

const Slide5_IterationPatterns = () => {
  const patterns = [
    { name: 'for i := 0; i < len(arr); i++', color: 'from-cyan-500 to-blue-600', delay: 0.2 },
    { name: 'for i, v := range arr', color: 'from-blue-500 to-purple-600', delay: 0.4 },
    { name: 'for v := range arr', color: 'from-purple-500 to-pink-600', delay: 0.6 },
    { name: 'for range arr { ... }', color: 'from-pink-500 to-rose-600', delay: 0.8 },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <RotateCw className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Iteration Patterns</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {patterns.map((pattern, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, x: i % 2 === 0 ? -40 : 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: pattern.delay }}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-br ${pattern.color} rounded-xl p-8 cursor-pointer`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, delay: pattern.delay, repeat: Infinity }}
                className="h-full flex items-center"
              >
                <p className="font-mono text-white font-semibold text-center leading-relaxed">
                  {pattern.name}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 bg-slate-800 rounded-lg p-8 border border-slate-700"
        >
          <h3 className="text-cyan-400 font-semibold mb-4">Use Cases</h3>
          <div className="grid grid-cols-2 gap-6 text-slate-300 text-sm">
            <div>
              <p className="text-cyan-300 mb-2">→ Traditional for loop</p>
              <p className="text-slate-400">Manual index control, complex logic</p>
            </div>
            <div>
              <p className="text-cyan-300 mb-2">→ Range loops</p>
              <p className="text-slate-400">Clean, idiomatic, safe</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5_IterationPatterns;