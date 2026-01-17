import React from 'react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';

const Slide3_SlicingOperations = () => {
  const fullArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const sliceStart = 2;
  const sliceEnd = 7;

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <Scissors className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Slicing Operations</h2>
        </motion.div>

        <div className="space-y-12">
          {/* Full Array */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-slate-400 text-sm mb-4 font-mono">arr[0:] → full array</p>
            <div className="flex gap-2">
              {fullArray.map((num, i) => (
                <motion.div
                  key={`full-${i}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                  className="w-14 h-14 bg-slate-700 rounded-md flex items-center justify-center text-white font-mono text-sm"
                >
                  {num}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sliced Array */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-slate-400 text-sm mb-4 font-mono">arr[2:7] → partial slice</p>
            <div className="flex gap-2">
              {fullArray.map((num, i) => (
                <motion.div
                  key={`slice-${i}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: i >= sliceStart && i < sliceEnd ? 1 : 0.5, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.05 }}
                  className={`w-14 h-14 rounded-md flex items-center justify-center text-sm font-mono ${
                    i >= sliceStart && i < sliceEnd
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold'
                      : 'bg-slate-700 text-slate-500'
                  }`}
                >
                  {num}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-gradient-to-r from-cyan-900 to-blue-900 rounded-lg p-8 border border-cyan-500"
          >
            <p className="text-cyan-300 font-mono mb-3">Result: [2, 3, 4, 5, 6]</p>
            <div className="text-slate-300 text-sm space-y-2">
              <p>• arr[start:end] includes start, excludes end</p>
              <p>• O(1) operation (no copy, same memory)</p>
              <p>• Modifications affect original array</p>
              <p>• Slice header: pointer + length + capacity</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide3_SlicingOperations;