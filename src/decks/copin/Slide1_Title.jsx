import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Waves } from 'lucide-react';

const Slide1_Title = () => {
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
      transition: { duration: 1, ease: 'easeOut', delay: 0.5 },
    },
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10"
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10"
        animate={{
          x: [0, -50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '10%' }}
      />

      <motion.div
        className="relative z-10 text-center px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icons Row */}
        <motion.div className="flex justify-center gap-8 mb-12">
          <motion.div variants={iconVariants} animate="animate">
            <Heart className="w-12 h-12 text-red-400" strokeWidth={1.5} />
          </motion.div>
          <motion.div variants={iconVariants} animate="animate" style={{ animationDelay: 0.2 }}>
            <Brain className="w-12 h-12 text-blue-400" strokeWidth={1.5} />
          </motion.div>
          <motion.div variants={iconVariants} animate="animate" style={{ animationDelay: 0.4 }}>
            <Waves className="w-12 h-12 text-cyan-400" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.h1 variants={itemVariants} className="text-7xl font-bold text-white mb-6">
          Do You Think Your
        </motion.h1>
        <motion.h2 variants={itemVariants} className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-8">
          Coping Skills Are Healthy?
        </motion.h2>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          A visual exploration of stress management, resilience, and the psychology of adaptation
        </motion.p>

        {/* CTA pulse */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center justify-center"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-gray-400"
          >
            ↓ Scroll to begin ↓
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide1_Title;