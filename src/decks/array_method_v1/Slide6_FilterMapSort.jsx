import React from 'react';
import { motion } from 'framer-motion';
import { Filter, ArrowRightLeft } from 'lucide-react';

const Slide6_FilterMapSort = () => {
  const originalData = [3, 1, 4, 1, 5, 9, 2, 6];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <Filter className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Filter, Map, Sort</h2>
        </motion.div>

        <div className="space-y-10">
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800 rounded-lg p-8 border border-slate-700"
          >
            <p className="text-cyan-400 font-mono text-sm mb-4">// Filter: n > 3</p>
            <div className="flex gap-2 items-center mb-4">
              <div className="flex gap-2">
                {originalData.map((num, i) => (
                  <motion.div
                    key={`filter-${i}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    className={`w-12 h-12 rounded flex items-center justify-center font-mono font-bold ${
                      num > 3
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                        : 'bg-slate-700 text-slate-500 opacity-30'
                    }`}
                  >
                    {num}
                  </motion.div>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-cyan-300 font-mono text-sm ml-4"
              >
                → [4, 5, 9, 6]
              </motion.span>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-slate-800 rounded-lg p-8 border border-slate-700"
          >
            <p className="text-cyan-400 font-mono text-sm mb-4">// Map: n * 2</p>
            <div className="flex gap-2 items-center">
              <div className="flex gap-2">
                {originalData.map((num, i) => (
                  <motion.div key={`map-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                      className="w-12 h-12 rounded flex items-center justify-center font-mono text-sm bg-slate-600 text-slate-300 mb-2"
                    >
                      {num}
                    </motion.div>
                    <motion.div
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                      className="w-12 h-12 rounded flex items-center justify-center font-mono font-bold bg-gradient-to-br from-purple-500 to-pink-600 text-white text-sm"
                    >
                      {num * 2}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-purple-300 font-mono text-sm ml-4"
              >
                → [6, 2, 8, 2, 10, 18, 4, 12]
              </motion.span>
            </div>
          </motion.div>

          {/* Sort */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-slate-800 rounded-lg p-8 border border-slate-700"
          >
            <p className="text-cyan-400 font-mono text-sm mb-4">// Sort ascending</p>
            <div className="flex gap-2 items-center">
              <div className="flex gap-2">
                {[1, 1, 2, 3, 4, 5, 6, 9].map((num, i) => (
                  <motion.div
                    key={`sort-${i}`}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.08 }}
                    whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }}
                    className="w-12 h-12 rounded flex items-center justify-center font-mono font-bold bg-gradient-to-br from-rose-500 to-orange-600 text-white cursor-pointer"
                  >
                    {num}
                  </motion.div>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="text-orange-300 font-mono text-sm ml-4"
              >
                → [1, 1, 2, 3, 4, 5, 6, 9]
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide6_FilterMapSort;