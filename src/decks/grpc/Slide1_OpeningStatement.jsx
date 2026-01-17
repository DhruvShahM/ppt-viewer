import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Slide1_OpeningStatement = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 1, type: 'spring', stiffness: 100 },
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-cyan-500 to-transparent"
            style={{ left: `${i * 5}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={iconVariants} className="flex justify-center mb-8">
          <Zap className="w-20 h-20 text-cyan-400" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-7xl font-black text-white mb-6 tracking-tight"
        >
          What is
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            gRPC?
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-2xl text-slate-300 max-w-3xl mb-12 leading-relaxed"
        >
          A high-performance RPC framework built for the modern era of
          distributed systems
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center"
        >
          {['Fast', 'Efficient', 'Scalable'].map((word, idx) => (
            <motion.span
              key={word}
              className="px-6 py-3 bg-slate-800 border border-cyan-500/50 rounded-full text-cyan-300 font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + idx * 0.2, duration: 0.6 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Animated particles at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            initial={{ bottom: '-10px', left: `${i * 20}%`, opacity: 0 }}
            animate={{
              bottom: ['100%', '-10px'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Slide1_OpeningStatement;