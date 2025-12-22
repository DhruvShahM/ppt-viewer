import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Slide9_PerformancePatterns = () => {
  const patterns = [
    {
      name: 'Pre-allocate Capacity',
      code: 'arr := make([]int, 0, 1000)',
      benefit: 'Avoid reallocations',
      color: 'from-green-600 to-emerald-600',
    },
    {
      name: 'Copy with make()',
      code: 'newArr := make([]int, len(arr))',
      benefit: 'Deep copy, independent data',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      name: 'Remove by Index',
      code: 'arr = append(arr[:i], arr[i+1:]...)',
      benefit: 'Efficient element removal',
      color: 'from-purple-600 to-pink-600',
    },
    {
      name: 'Insert at Position',
      code: 'arr = append(arr[:i], append([]T{x}, arr[i:]...)...)',
      benefit: 'Insert maintaining order',
      color: 'from-orange-600 to-red-600',
    },
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
          <Zap className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Performance Patterns</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {patterns.map((pattern, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 211, 238, 0.2)' }}
              className={`bg-gradient-to-br ${pattern.color} rounded-xl p-6 cursor-pointer`}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, delay: 0.2 + i * 0.15, repeat: Infinity }}
              >
                <h3 className="text-white font-bold text-lg mb-3">{pattern.name}</h3>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  className="bg-black bg-opacity-40 rounded p-3 mb-4"
                >
                  <p className="font-mono text-white text-xs leading-relaxed break-all">
                    {pattern.code}
                  </p>
                </motion.div>

                <p className="text-white text-sm font-semibold">{pattern.benefit}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 bg-slate-800 rounded-lg p-8 border border-slate-700"
        >
          <h3 className="text-cyan-400 font-bold mb-4">Key Insights</h3>
          <div className="space-y-3 text-slate-300 text-sm">
            <p>
              <span className="text-cyan-300">•</span> Capacity is your friend
            </p>
            <p>
              <span className="text-cyan-300">•</span> Append is O(1) amortized, not always O(1)
            </p>
            <p>
              <span className="text-cyan-300">•</span> Copy-on-write not automatic, be explicit
            </p>
            <p>
              <span className="text-cyan-300">•</span> Remove/Insert can be O(n), batch if possible
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide9_PerformancePatterns;