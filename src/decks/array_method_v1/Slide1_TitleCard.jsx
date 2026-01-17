import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap } from 'lucide-react';

const Slide1_TitleCard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    animate: {
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            animate={{
              x: Math.sin(i * 1.2) * 300 + 200,
              y: Math.cos(i * 0.8) * 300 + 300,
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 12}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 max-w-4xl px-8"
      >
        <motion.div variants={iconVariants} className="flex justify-center gap-4 mb-6">
          <Code2 className="w-16 h-16 text-cyan-400" strokeWidth={1.5} />
          <Zap className="w-16 h-16 text-cyan-300" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-7xl font-black text-white mb-4 tracking-tight"
        >
          Go Array
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {' '}
          </span>
          Methods
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"
        />

        <motion.p variants={itemVariants} className="text-xl text-slate-300 mb-4">
          Master every operation, transformation, and pattern
        </motion.p>

        <motion.p variants={itemVariants} className="text-lg text-slate-400">
          High-performance arrays in Go
        </motion.p>
      </motion.div>

      {/* Animated border glow */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-lg"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
};

export default Slide1_TitleCard;