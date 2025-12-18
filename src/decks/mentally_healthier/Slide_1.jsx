

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

const Slide1_Title = () => {
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const question = "Do you think your generation will be mentally healthier in the future?";

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            animate={{
              x: Math.sin(i) * 300,
              y: Math.cos(i) * 300,
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              left: `${20 + i * 3}%`,
              top: `${30 + i * 2}%`
            }}
          />
        ))}
      </motion.div>

      {/* Icon animations */}
      <motion.div
        className="absolute top-20 left-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Brain className="w-16 h-16 text-blue-400 opacity-30" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="w-16 h-16 text-purple-400 opacity-30" />
      </motion.div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-12 text-center relative z-10">
        <motion.h1
          className="text-7xl font-bold mb-8 text-white leading-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Mental Health
          <br />
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            animate={{ backgroundPosition: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            in the Future
          </motion.span>
        </motion.h1>

        <div className="space-y-2 mb-12">
          {question.split("").map((letter, i) => (
            <motion.span
              key={i}
              className="text-xl text-gray-300 inline"
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="inline-flex items-center gap-3 bg-blue-500/20 px-6 py-3 rounded-full border border-blue-400/50"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          <span className="text-sm text-blue-300">A data-driven exploration</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide1_Title;