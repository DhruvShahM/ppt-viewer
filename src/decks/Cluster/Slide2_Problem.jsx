import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Package } from 'lucide-react';

const Slide2_Problem = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      {/* Title */}
      <motion.h2
        className="text-5xl font-bold text-white mb-16 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        The Container Problem
      </motion.h2>

      {/* Container visualization */}
      <div className="flex gap-8 items-center justify-center mb-12 relative w-full max-w-4xl">
        {/* Chaos representation */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="w-16 h-16 bg-slate-700 border-2 border-slate-500 rounded-lg flex items-center justify-center"
            animate={{
              x: Math.random() * 40 - 20,
              y: Math.random() * 40 - 20,
              rotate: Math.random() * 20 - 10,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <Package className="text-slate-400 w-8 h-8" />
          </motion.div>
        ))}

        {/* Alert icon */}
        <motion.div
          className="absolute"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertCircle className="w-24 h-24 text-red-500" />
        </motion.div>
      </div>

      {/* Problems list */}
      <div className="grid grid-cols-3 gap-6 mt-16 max-w-5xl">
        {[
          { title: 'Scheduling', desc: 'Where do containers run?' },
          { title: 'Scaling', desc: 'Managing demand spikes' },
          { title: 'Failure', desc: 'Automatic recovery' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + idx * 0.2 }}
            whileHover={{ borderColor: '#06b6d4', scale: 1.05 }}
          >
            <h3 className="text-xl font-bold text-cyan-400 mb-2">{item.title}</h3>
            <p className="text-slate-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom insight */}
      <motion.p
        className="text-lg text-slate-300 mt-16 text-center max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Running containers manually at scale is like herding cats. You need a system.
      </motion.p>
    </div>
  );
};

export default Slide2_Problem;