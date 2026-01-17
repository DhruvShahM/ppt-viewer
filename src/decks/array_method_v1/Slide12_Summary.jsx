import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Slide12_Summary = () => {
  const keyPoints = [
    'Arrays are fixed-size, values; slices are dynamic, references',
    'Append is amortized O(1), not always O(1)',
    'Slices share underlying data—modifications affect all views',
    'Pre-allocate capacity to avoid reallocations',
    'Copy with make() and copy() for independent data',
    'Use range loops for clean, idiomatic iteration',
    'Array patterns: filter, map, sort, remove, insert',
    'Know the memory model: header + pointer + length + capacity',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-12 overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-cyan-400 rounded-full"
            animate={{
              x: [0, Math.random() * 400 - 200],
              y: [0, Math.random() * 400 - 200],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{
              left: `${20 + i * 10}%`,
              top: `${15 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl font-black text-white mb-4">Master Go Arrays</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto" />
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="grid grid-cols-2 gap-4">
            {keyPoints.map((point, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, x: 10 }}
                className="bg-slate-800 rounded-lg p-6 border border-slate-700 cursor-pointer"
              >
                <div className="flex gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  </motion.div>
                  <p className="text-slate-200 text-sm leading-relaxed">{point}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full px-8 py-4"
          >
            <p className="text-white font-bold text-lg">Practice. Master. Excel.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Border glow */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-lg"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
};

export default Slide12_Summary;