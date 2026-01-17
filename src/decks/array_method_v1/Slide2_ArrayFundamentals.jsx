import React from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

const Slide2_ArrayFundamentals = () => {
  const arrayLength = 5;

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <Database className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Array Fundamentals</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-12">
          {/* Left: Declaration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-800 rounded-xl p-8 border border-slate-700"
          >
            <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Declaration</h3>
            <div className="space-y-4">
              {['[n]Type', 'var arr [5]int', 'arr := [...]int{1,2,3}'].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                  className="font-mono text-sm text-slate-300 bg-slate-900 px-4 py-3 rounded border border-slate-600"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual Array */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-semibold text-cyan-400 mb-8">In Memory</h3>

            <div className="flex gap-2 mb-8">
              {[...Array(arrayLength)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.1,
                    ease: 'easeOut',
                  }}
                  whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }}
                  className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center cursor-pointer"
                >
                  <motion.span
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                    className="text-white font-bold text-lg"
                  >
                    {i}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-slate-400 text-sm"
            >
              <p>• Fixed size at compile time</p>
              <p>• Contiguous memory allocation</p>
              <p>• O(1) random access</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide2_ArrayFundamentals;