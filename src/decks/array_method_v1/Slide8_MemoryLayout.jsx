import React from 'react';
import { motion } from 'framer-motion';
import { MemoryStick } from 'lucide-react';

const Slide8_MemoryLayout = () => {
  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <MemoryStick className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Slice Memory Layout</h2>
        </motion.div>

        <div className="space-y-12">
          {/* Underlying Array */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-slate-400 font-mono text-sm mb-4">Underlying Data Array</p>
            <div className="flex gap-2">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`mem-${i}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="w-16 h-16 bg-slate-700 rounded flex items-center justify-center font-mono text-sm text-cyan-300 border border-slate-600"
                >
                  {i}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Slice Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-cyan-900 to-blue-900 rounded-lg p-8 border border-cyan-500"
          >
            <h3 className="text-xl font-semibold text-cyan-300 mb-6">Slice Header (24 bytes)</h3>

            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Pointer', desc: 'Points to index 0', width: 'w-32' },
                { label: 'Length', desc: 'Current elements', width: 'w-24' },
                { label: 'Capacity', desc: 'Max elements', width: 'w-24' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                  className={`${item.width} h-20 bg-slate-800 rounded p-3 border border-cyan-400`}
                >
                  <p className="text-cyan-300 font-semibold text-xs mb-1">{item.label}</p>
                  <p className="text-slate-300 text-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Animation showing slicing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700"
          >
            <p className="text-slate-300 text-sm leading-relaxed">
              <span className="text-cyan-300">→</span> Multiple slices can reference same array
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mt-2">
              <span className="text-cyan-300">→</span> Cheap to create (only 24 bytes per slice)
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mt-2">
              <span className="text-cyan-300">→</span> Modifications visible across all views
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide8_MemoryLayout;