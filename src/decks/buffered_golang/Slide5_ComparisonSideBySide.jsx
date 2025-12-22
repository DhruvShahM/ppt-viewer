import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Lock } from 'lucide-react';

const Slide5_ComparisonSideBySide = () => {
  const features = [
    { name: 'Buffer Capacity', unbuffered: '0', buffered: 'N (custom)' },
    { name: 'Send Blocking', unbuffered: 'Always*', buffered: 'When full' },
    { name: 'Receive Blocking', unbuffered: 'Always*', buffered: 'When empty' },
    { name: 'Synchronization', unbuffered: 'Synchronous', buffered: 'Asynchronous' },
    { name: 'Use Case', unbuffered: 'Tight coupling', buffered: 'Decoupling' },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-12 text-center"
        >
          Head-to-Head Comparison
        </motion.h1>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="overflow-hidden rounded-lg border border-slate-700"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-0 bg-slate-800/50">
            <div className="p-6 border-r border-slate-700">
              <p className="text-slate-400 font-semibold">Feature</p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 border-r border-slate-700 bg-purple-600/10"
            >
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-purple-400" />
                <p className="text-purple-400 font-semibold">Unbuffered</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-cyan-600/10"
            >
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-cyan-400" />
                <p className="text-cyan-400 font-semibold">Buffered</p>
              </div>
            </motion.div>
          </div>

          {/* Rows */}
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className={`grid grid-cols-3 gap-0 border-t border-slate-700 ${idx % 2 === 0 ? 'bg-slate-800/20' : ''}`}
            >
              <div className="p-6 border-r border-slate-700">
                <p className="text-white font-semibold">{feature.name}</p>
              </div>
              <div className="p-6 border-r border-slate-700 bg-purple-600/5">
                <p className="text-purple-300">{feature.unbuffered}</p>
              </div>
              <div className="p-6 bg-cyan-600/5">
                <p className="text-cyan-300">{feature.buffered}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-slate-400 text-sm mt-8 text-center"
        >
          *Both need the other party ready or they block. The difference is <span className="text-white font-semibold">when blocking happens</span>.
        </motion.p>
      </div>
    </div>
  );
};

export default Slide5_ComparisonSideBySide;