import React from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';

const Slide7_CopyVsReference = () => {
  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <Copy className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Copy vs Reference</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-12">
          {/* Array (Value Type) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Array (Value Type)</h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700"
            >
              <p className="font-mono text-sm text-slate-300 mb-4">arr1 := [3]int{1, 2, 3}</p>
              <p className="font-mono text-sm text-slate-300">arr2 := arr1</p>

              <div className="mt-6 space-y-4">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  className="text-xs font-mono bg-slate-900 p-3 rounded border border-cyan-500"
                >
                  <p className="text-cyan-300">arr1: [1, 2, 3]</p>
                  <p className="text-slate-400 mt-2">(independent copy)</p>
                </motion.div>

                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="text-xs font-mono bg-slate-900 p-3 rounded border border-blue-500"
                >
                  <p className="text-blue-300">arr2: [1, 2, 3]</p>
                  <p className="text-slate-400 mt-2">(separate memory)</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-red-400 text-sm font-semibold"
            >
              Modifying arr2 doesn't affect arr1
            </motion.div>
          </motion.div>

          {/* Slice (Reference Type) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-purple-400 mb-6">Slice (Reference Type)</h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700"
            >
              <p className="font-mono text-sm text-slate-300 mb-4">s1 := []int{1, 2, 3}</p>
              <p className="font-mono text-sm text-slate-300">s2 := s1</p>

              <div className="mt-6 space-y-4">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  className="text-xs font-mono bg-slate-900 p-3 rounded border border-purple-500"
                >
                  <p className="text-purple-300">s1: header →</p>
                  <p className="text-slate-400 mt-2">(points to same data)</p>
                </motion.div>

                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="text-xs font-mono bg-slate-900 p-3 rounded border border-purple-500"
                >
                  <p className="text-purple-300">s2: header →</p>
                  <p className="text-slate-400 mt-2">(same underlying array)</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-green-400 text-sm font-semibold"
            >
              Modifying s2 affects s1 & underlying array!
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide7_CopyVsReference;