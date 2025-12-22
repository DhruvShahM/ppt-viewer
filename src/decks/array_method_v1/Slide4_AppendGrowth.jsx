import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const Slide4_AppendGrowth = () => {
  const [count, setCount] = useState(0);

  const capacity = Math.max(1, Math.pow(2, Math.ceil(Math.log2(count + 1))));
  const filled = count;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev >= 12 ? 0 : prev + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <Plus className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Append & Capacity Growth</h2>
        </motion.div>

        <div className="space-y-12">
          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-6">
              <p className="text-cyan-400 font-mono text-lg mb-4">
                Length: {filled} | Capacity: {capacity}
              </p>

              <div className="flex gap-2">
                <AnimatePresence mode="popLayout">
                  {[...Array(capacity)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`h-16 rounded-lg flex items-center justify-center font-mono text-sm flex-1 ${
                        i < filled
                          ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 text-white font-bold'
                          : 'bg-slate-700 text-slate-600 border border-dashed border-slate-600'
                      }`}
                    >
                      {i < filled ? i : '-'}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Growth strategy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-slate-800 rounded-lg p-8 border border-slate-700"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-6">Growth Strategy</h3>
              <div className="text-slate-300 space-y-3">
                <p>
                  <span className="text-cyan-300">→</span> When len exceeds capacity
                </p>
                <p>
                  <span className="text-cyan-300">→</span> Allocate new array with 2× capacity
                </p>
                <p>
                  <span className="text-cyan-300">→</span> Copy all elements to new location
                </p>
                <p>
                  <span className="text-cyan-300">→</span> Return new slice pointing to new array
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Amortized O(1) note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-r from-blue-900 to-cyan-900 rounded-lg p-6 border border-blue-500"
          >
            <p className="text-blue-200 font-mono">Amortized O(1) time complexity</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide4_AppendGrowth;