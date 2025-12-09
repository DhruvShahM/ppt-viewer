import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Grid3x3, ArrowRight } from 'lucide-react';

const Slide1_Title = () => {
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: { duration: 3, repeat: Infinity },
    },
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glow orbs */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-30"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        transition={{ duration: 4, delay: 1, repeat: Infinity }}
        className="absolute bottom-32 right-20 w-40 h-40 bg-cyan-500 rounded-full filter blur-3xl opacity-20"
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600"
          >
            <Grid3x3 size={48} className="text-white" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl font-black text-white mb-6"
        >
          System Design
          <motion.span
            animate={{ backgroundPosition: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            Patterns
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl text-slate-300 mb-8"
        >
          Building Scalable, Resilient, Production-Ready Systems
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-3 text-cyan-400"
        >
          <Zap size={20} />
          <span>12 Critical Patterns to Master</span>
          <ArrowRight size={20} />
        </motion.div>
      </div>
    </div>
  );
};

export default Slide1_Title;