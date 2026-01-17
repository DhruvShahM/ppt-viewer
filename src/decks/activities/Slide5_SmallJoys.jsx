import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Coffee, Star, BookOpen } from 'lucide-react';

export default function Slide5_SmallJoys() {
  const joys = [
    { icon: Coffee, title: 'Favorite Treat', emoji: '☕' },
    { icon: Star, title: 'Anticipate Something', emoji: '🎭' },
    { icon: BookOpen, title: 'Read or Learn', emoji: '📚' },
    { icon: Smile, title: 'Laugh Out Loud', emoji: '😄' },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden  from-slate-950 via-amber-950 to-slate-950">
      {/* Warm Animated Background */}
      <motion.div
        className="absolute top-0 right-1/3 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -80, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-bold text-white mb-3">The Power of Small Joys</h2>
          <p className="text-xl text-white/60">Dopamine hits from simple pleasures</p>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-8">
          {joys.map((joy, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl p-12 backdrop-blur-md relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 8px 32px rgba(251, 146, 60, 0.15)',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 50px rgba(251, 146, 60, 0.3)',
              }}
            >
              {/* Animated Pulse Background */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'radial-gradient(circle at center, rgba(251, 146, 60, 0.1), transparent)',
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: idx * 0.2, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-6">
                {/* Emoji Container */}
                <motion.div
                  className="text-6xl p-4 rounded-xl"
                  style={{
                    background: 'rgba(251, 146, 60, 0.2)',
                    boxShadow: '0 0 30px rgba(251, 146, 60, 0.4)',
                  }}
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ delay: idx * 0.2, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {joy.emoji}
                </motion.div>

                {/* Text */}
                <div>
                  <p className="text-white/60 text-sm uppercase tracking-widest mb-1">Activity</p>
                  <h3 className="text-2xl font-bold text-white">{joy.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info Box */}
        <motion.div
          className="mt-12 p-6 rounded-xl text-center backdrop-blur-sm"
          style={{
            background: 'rgba(251, 146, 60, 0.1)',
            border: '1px solid rgba(251, 146, 60, 0.3)',
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-white/80">
            ✨ Your brain releases dopamine just by <span className="font-semibold">anticipating</span> something pleasant
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}