import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Wrench, Coins, Lightbulb } from 'lucide-react';

export default function Slide3_CardTransform() {
  const [activePhase, setActivePhase] = useState(0);

  const supportTypes = [
    {
      id: 'emotional',
      title: 'Emotional Support',
      examples: ['Active listening', 'Validation', 'Comfort in crisis', 'Celebration of wins'],
      icon: Flame,
      gradient: 'from-red-500/20 to-pink-500/20',
      borderColor: 'border-red-400/40'
    },
    {
      id: 'practical',
      title: 'Practical Support',
      examples: ['Childcare help', 'Moving assistance', 'Meal prep', 'Transport'],
      icon: Wrench,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/40'
    },
    {
      id: 'financial',
      title: 'Financial Support',
      examples: ['Emergency funds', 'Loan co-signing', 'Bill assistance', 'Investment advice'],
      icon: Coins,
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/40'
    },
    {
      id: 'informational',
      title: 'Informational Support',
      examples: ['Career guidance', 'Health advice', 'Problem-solving', 'Knowledge sharing'],
      icon: Lightbulb,
      gradient: 'from-purple-500/20 to-indigo-500/20',
      borderColor: 'border-purple-400/40'
    }
  ];

  const current = supportTypes[activePhase];
  const Icon = current.icon;

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      <motion.h2
        className="text-5xl font-bold text-white mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Types of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Support</span>
      </motion.h2>

      <div className="w-full max-w-3xl relative h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            layout
            layoutId="support-type-card"
            className={`absolute inset-0 rounded-3xl border ${current.borderColor} p-12 backdrop-blur-sm`}
            style={{ background: current.gradient }}
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="flex items-start justify-between mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-white flex-1">{current.title}</h3>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Icon size={64} className="text-white/80" />
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {current.examples.map((example, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4 text-white/80"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white/60"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: idx * 0.15 }}
                  />
                  <span className="text-lg">{example}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-12">
        {supportTypes.map((type, idx) => (
          <motion.button
            key={type.id}
            onClick={() => setActivePhase(idx)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activePhase === idx
                ? 'bg-white text-black scale-110'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.title.split(' ')[0]}
          </motion.button>
        ))}
      </div>
    </div>
  );
}