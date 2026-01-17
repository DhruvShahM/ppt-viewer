import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Slide1_Welcome() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden  from-slate-950 via-purple-950 to-slate-950">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-32 right-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content Glass Layer */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Floating Icon */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center mb-8"
        >
          <div
            className="p-6 rounded-2xl backdrop-blur-md"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
            }}
          >
            <Heart
              size={64}
              className="text-white"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.6))',
              }}
            />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-7xl font-bold text-white mb-6 tracking-tight"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          When You're Down
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Activities That Lift Your Mood
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          className="h-1 w-32 mx-auto mt-8 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.8), transparent)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
          }}
          animate={{ scaleX: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}