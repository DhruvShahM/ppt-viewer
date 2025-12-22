import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function Slide1_TitleCard() {
  // Animated gradient blobs
  const blobVariants = {
    animate: {
      x: [0, 30, -20, 0],
      y: [0, -40, 30, 0],
      scale: [1, 1.1, 0.95, 1],
      transition: { duration: 8, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, ease: 'easeInOut', repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Context Layer: Animated gradient orbs */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-700 rounded-full blur-3xl opacity-20"
      />

      {/* Glass Layer: Content container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-12 max-w-2xl mx-auto"
        style={{
          boxShadow: '0 0 40px rgba(0, 188, 212, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Floating icon */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="flex justify-center mb-8"
        >
          <Code2
            size={80}
            className="text-cyan-400"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0, 188, 212, 0.8))',
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl font-bold text-white mb-4"
        >
          Go String Methods
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl text-cyan-300 mb-6"
        >
          Master the String Manipulation Toolkit
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto w-32"
        />
      </motion.div>

      {/* Ambient glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 80px rgba(0, 188, 212, 0.3)',
            '0 0 120px rgba(0, 188, 212, 0.5)',
            '0 0 80px rgba(0, 188, 212, 0.3)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}