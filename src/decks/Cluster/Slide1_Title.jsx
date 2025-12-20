import React from 'react';
import { motion } from 'framer-motion';

const Slide1_Title = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Animated background particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          animate={{
            x: Math.cos((i / 8) * Math.PI * 2) * 300,
            y: Math.sin((i / 8) * Math.PI * 2) * 300,
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.1,
          }}
          style={{
            left: '50%',
            top: '50%',
            marginLeft: -2,
            marginTop: -2,
          }}
        />
      ))}

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center z-10"
      >
        <motion.h1
          className="text-7xl font-bold text-white mb-6 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          What is a
        </motion.h1>
        
        <motion.div
          className="relative inline-block"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-2xl opacity-30" />
          <h2 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 relative">
            Kubernetes Cluster?
          </h2>
        </motion.div>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="text-xl text-slate-300 mt-12 max-w-2xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        Understanding the orchestration engine that powers modern container systems
      </motion.p>

      {/* Glowing line animation at bottom */}
      <motion.div
        className="absolute bottom-20 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default Slide1_Title;