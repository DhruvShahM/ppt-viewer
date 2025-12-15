import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, TrendingDown, Lock, X } from 'lucide-react';

export default function Slide7_ChallengesView() {
  const [corrected, setCorrected] = useState(false);

  const challenges = [
    {
      id: 1,
      title: 'One-Sided Relationships',
      description: 'You give constantly but receive little',
      icon: TrendingDown,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Isolation & Avoidance',
      description: 'Withdrawing from relationships due to fear or shame',
      icon: Lock,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 3,
      title: 'Toxic Connections',
      description: 'People who drain, manipulate, or harm you',
      icon: X,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'Lack of Communication',
      description: 'Unspoken needs and unexpressed feelings',
      icon: AlertCircle,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      <motion.h2
        className="text-5xl font-bold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Red Flags & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Challenges</span>
      </motion.h2>

      <motion.p
        className="text-white/60 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Recognizing what weakens a support system
      </motion.p>

      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-2 gap-6">
          <AnimatePresence>
            {challenges.map((challenge, idx) => {
              const Icon = challenge.icon;
              const offsetX = !corrected ? (Math.random() - 0.5) * 150 : 0;
              const offsetY = !corrected ? (Math.random() - 0.5) * 150 : 0;

              return (
                <motion.div
                  key={challenge.id}
                  layout
                  layoutId={`challenge-${challenge.id}`}
                  className="rounded-2xl border-2 border-red-400/30 p-8 cursor-pointer group relative overflow-hidden"
                  style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                  animate={{
                    x: corrected ? 0 : offsetX,
                    y: corrected ? 0 : offsetY,
                    rotate: corrected ? 0 : (Math.random() - 0.5) * 15
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 25,
                    delay: corrected ? idx * 0.1 : 0
                  }}
                  onClick={() => setCorrected(!corrected)}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="flex items-start gap-4"
                    animate={{ opacity: corrected ? 1 : 0.7 }}
                  >
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${challenge.color} flex-shrink-0`}
                      animate={{ rotate: corrected ? 0 : [0, -20, 20, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Icon size={32} className="text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {challenge.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {challenge.description}
                      </p>
                    </div>
                  </motion.div>

                  {corrected && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-8 p-6 rounded-2xl border border-green-400/30 bg-green-500/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-white font-bold mb-3">✓ The Fix</h4>
          <p className="text-white/70">
            Awareness is the first step. Set boundaries, communicate openly, invest in reciprocal relationships, and don't hesitate to seek professional help if needed.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 text-center text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        ↑ Click to {corrected ? 're-mess' : 'correct'} the grid
      </motion.div>
    </div>
  );
}