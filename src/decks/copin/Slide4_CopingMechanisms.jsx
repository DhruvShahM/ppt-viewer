import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Zap, Shield, Eye, Lightbulb } from 'lucide-react';

const Slide4_CopingMechanisms = () => {
  const mechanisms = [
    {
      name: 'Problem-Focused',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-900/30 to-orange-900/30',
      borderColor: 'border-yellow-500/30',
      examples: ['Planning', 'Action', 'Problem-solving'],
      description: 'Address the stressor directly',
    },
    {
      name: 'Emotion-Focused',
      icon: Heart,
      color: 'from-pink-500 to-red-500',
      bgColor: 'from-pink-900/30 to-red-900/30',
      borderColor: 'border-pink-500/30',
      examples: ['Acceptance', 'Reframing', 'Support-seeking'],
      description: 'Manage emotional response',
    },
    {
      name: 'Cognitive',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-900/30 to-cyan-900/30',
      borderColor: 'border-blue-500/30',
      examples: ['Mindfulness', 'Positive thinking', 'Journaling'],
      description: 'Reframe thoughts & perspective',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Types of Coping</h2>
        <p className="text-lg text-gray-400">Three primary approaches to managing stress</p>
      </motion.div>

      {/* Mechanism Cards */}
      <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
        {mechanisms.map((mech, idx) => {
          const Icon = mech.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.15, duration: 0.7 }}
              whileHover={{ scale: 1.03, translateY: -5 }}
              className="group relative"
            >
              {/* Card */}
              <div className={`bg-gradient-to-br ${mech.bgColor} border ${mech.borderColor} rounded-2xl p-8 backdrop-blur-sm h-full flex flex-col relative overflow-hidden`}>
                {/* Animated glow background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${mech.color} opacity-0 blur-2xl`}
                  animate={{ opacity: [0, 0.1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: idx * 0.4 }}
                  style={{ pointerEvents: 'none' }}
                />

                {/* Icon */}
                <motion.div
                  className="mb-6 relative z-10"
                  animate={{ rotate: [0, 5, 0], y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mech.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{mech.name}</h3>

                {/* Description */}
                <p className="text-sm text-gray-300 mb-6 relative z-10">{mech.description}</p>

                {/* Examples */}
                <div className="space-y-2 relative z-10 flex-1">
                  {mech.examples.map((example, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.15 + i * 0.08, duration: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${mech.color}`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                      <span className="text-sm text-gray-200">{example}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${mech.color}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8 + idx * 0.15, duration: 0.8 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Slide4_CopingMechanisms;