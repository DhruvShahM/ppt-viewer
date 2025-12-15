import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Check } from 'lucide-react';

export default function Slide8_ReflectionAction() {
  const reflectionQuestions = [
    'Who can you turn to in crisis?',
    'Who celebrates your wins?',
    'Who challenges you to grow?',
    'Who do you support in return?'
  ];

  const actionItems = [
    'Identify 3 people to strengthen relationships with',
    'Schedule a meaningful conversation this week',
    'Set a boundary with someone who drains you',
    'Join a community aligned with your values'
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            animate={{
              x: [0, 100, -100, 0],
              y: [0, 50, -50, 0],
              scale: [1, 1.5, 0.8, 1]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width: 100 + i * 40,
              height: 100 + i * 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-8 flex justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Heart size={80} className="text-red-400" fill="currentColor" />
        </motion.div>

        <h2 className="text-6xl font-bold text-white mb-4">
          You Deserve a
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-red-400">
            Strong Support System
          </span>
        </h2>

        <motion.p
          className="text-xl text-white/70 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Whether you're building from scratch or strengthening what exists, every step matters.
        </motion.p>

        {/* Reflection Questions */}
        <motion.div
          className="mb-12 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-white font-bold text-lg mb-4">Reflect on these:</h3>
          {reflectionQuestions.map((question, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 text-white/70 justify-center"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
              whileHover={{ x: 10, color: '#ffffff' }}
            >
              <Sparkles size={20} className="text-yellow-400 flex-shrink-0" />
              <span className="text-lg">{question}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Items */}
        <motion.div
          className="space-y-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-white font-bold text-lg mb-4">Take action today:</h3>
          {actionItems.map((action, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 text-white/70 justify-center"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4 + idx * 0.1 }}
              whileHover={{ x: 10, color: '#10b981' }}
            >
              <Check size={24} className="text-green-400 flex-shrink-0" />
              <span className="text-lg">{action}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.button
          className="px-12 py-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Start Building Your Network
        </motion.button>
      </motion.div>

      {/* Bottom Affirmation */}
      <motion.div
        className="absolute bottom-8 text-center text-white/40 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <p>Remember: You are not alone. Reach out. Connect. Reciprocate. Thrive.</p>
      </motion.div>
    </div>
  );
}