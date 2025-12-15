import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sun, Wind } from 'lucide-react';

export default function Slide10_Closing() {
  const reminders = [
    { icon: Heart, text: 'You deserve to feel better' },
    { icon: Sun, text: 'Start small, stay consistent' },
    { icon: Wind, text: 'Be gentle with yourself' },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950">
      {/* Ethereal Closing Orbs */}
      <motion.div
        className="absolute top-0 left-1/3 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%)',
          filter: 'blur(130px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center w-full max-w-3xl mx-auto px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Main Message */}
        <motion.h2
          className="text-7xl font-bold text-white mb-6"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          When You're Down
        </motion.h2>

        <motion.p
          className="text-2xl text-white/70 mb-16 leading-relaxed"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          There's always something you can do, right now.
        </motion.p>

        {/* Reminders */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {reminders.map((reminder, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.2 + 0.4, duration: 0.8 }}
            >
              <motion.div
                className="p-5 rounded-full mb-4"
                style={{
                  background: 'rgba(168, 85, 247, 0.15)',
                  boxShadow: '0 0 40px rgba(168, 85, 247, 0.3)',
                }}
                animate={{ y: [0, -15, 0] }}
                transition={{ delay: idx * 0.2 + 0.4, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <reminder.icon size={32} className="text-white" />
              </motion.div>
              <p className="text-white font-semibold">{reminder.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          className="p-8 rounded-2xl backdrop-blur-md max-w-2xl mx-auto"
          style={{
            background: 'rgba(168, 85, 247, 0.12)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 20px 60px rgba(168, 85, 247, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{
            boxShadow: '0 20px 60px rgba(168, 85, 247, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
          }}
        >
          <h3 className="text-2xl font-bold text-white mb-3">Pick One. Start Today.</h3>
          <p className="text-white/80 text-lg mb-6">
            Waiting for motivation is waiting forever. Your mood will shift once you move.
          </p>
          <motion.div
            className="h-1 w-24 rounded-full mx-auto"
            style={{
              background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
            }}
            animate={{ scaleX: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Floating Thank You */}
        <motion.p
          className="mt-12 text-white/60 text-sm tracking-widest uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Thank You
        </motion.p>
      </motion.div>
    </div>
  );
}