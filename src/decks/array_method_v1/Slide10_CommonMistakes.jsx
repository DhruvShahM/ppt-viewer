import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Slide10_CommonMistakes = () => {
  const mistakes = [
    {
      title: 'Uninitialized Array',
      wrong: 'var arr [5]int',
      right: 'arr := [5]int{1, 2, 3, 4, 5}',
      issue: 'Zero values cause unexpected behavior',
    },
    {
      title: 'Array vs Slice',
      wrong: 'arr := [...]string{} // Array',
      right: 'arr := []string{} // Slice',
      issue: 'Arrays are fixed size, slices are dynamic',
    },
    {
      title: 'Out of Bounds',
      wrong: 'arr[10] // panic if len(arr) < 10',
      right: 'if i < len(arr) { ... }',
      issue: 'No bounds checking, causes runtime panic',
    },
    {
      title: 'Slice Aliasing',
      wrong: 's2 := s1; s2[0] = 999 // Modifies s1!',
      right: 's2 := make([]T, len(s1)); copy(s2, s1)',
      issue: 'Slices share underlying data',
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
          <AlertCircle className="w-10 h-10 text-red-400" />
          <h2 className="text-5xl font-bold text-white">Common Mistakes</h2>
        </motion.div>

        <div className="space-y-6">
          {mistakes.map((mistake, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className="bg-gradient-to-r from-red-900 to-orange-900 rounded-lg p-6 border border-red-700"
            >
              <motion.h3
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 + i * 0.15 }}
                className="text-red-300 font-bold text-lg mb-4"
              >
                {mistake.title}
              </motion.h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-red-950 rounded p-4 border border-red-700">
                  <p className="text-red-200 text-xs font-semibold mb-2">❌ Wrong</p>
                  <p className="font-mono text-xs text-slate-300">{mistake.wrong}</p>
                </div>

                <div className="bg-green-950 rounded p-4 border border-green-700">
                  <p className="text-green-200 text-xs font-semibold mb-2">✓ Correct</p>
                  <p className="font-mono text-xs text-slate-300">{mistake.right}</p>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className="text-orange-200 text-sm"
              >
                → {mistake.issue}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide10_CommonMistakes;