import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';

const Slide11_RealWorldExamples = () => {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      title: 'Deduplicate Array',
      code: `seen := make(map[int]bool)
result := []int{}
for _, v := range arr {
  if !seen[v] {
    seen[v] = true
    result = append(result, v)
  }
}`,
    },
    {
      title: 'Reverse In-Place',
      code: `for i, j := 0, len(arr)-1; i < j; i, j = i+1, j-1 {
  arr[i], arr[j] = arr[j], arr[i]
}`,
    },
    {
      title: 'Rotate Left by N',
      code: `n := n % len(arr)
rotated := append(arr[n:], arr[:n]...)`,
    },
    {
      title: 'Partition for QuickSort',
      code: `i, j := 0, len(arr)-1
for {
  for arr[i] < pivot { i++ }
  for arr[j] > pivot { j-- }
  if i >= j { break }
  arr[i], arr[j] = arr[j], arr[i]
}`,
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
          <Code2 className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Real-World Examples</h2>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-12 overflow-x-auto">
          {examples.map((example, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveTab(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${activeTab === i
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
            >
              {example.title}
            </motion.button>
          ))}
        </div>

        {/* Code Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 relative overflow-hidden"
          >
            {/* Background animation */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, #06b6d4 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, #06b6d4 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, #06b6d4 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              pointerEvents="none"
            />

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-cyan-400 font-bold text-2xl mb-6 relative z-10"
            >
              {examples[activeTab].title}
            </motion.h3>

            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-sm text-slate-200 leading-relaxed relative z-10 overflow-x-auto"
            >
              <code>{examples[activeTab].code}</code>
            </motion.pre>
          </motion.div>
        </AnimatePresence>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 bg-slate-800 rounded-lg p-6 border border-slate-700"
        >
          <p className="text-slate-300 text-sm">
            These patterns leverage array methods for common algorithmic problems.
            Master them for efficient array manipulation in production code.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11_RealWorldExamples;
