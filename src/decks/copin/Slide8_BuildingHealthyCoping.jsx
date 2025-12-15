import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Users, BookOpen, Heart, Compass } from 'lucide-react';

const Slide8_BuildingHealthyCoping = () => {
  const strategies = [
    {
      icon: Target,
      title: 'Define the Problem',
      color: 'from-blue-500 to-cyan-500',
      steps: ['Identify what\'s stressing you', 'Break it into parts', 'Focus on what you control'],
      delay: 0,
    },
    {
      icon: BookOpen,
      title: 'Learn & Experiment',
      color: 'from-purple-500 to-pink-500',
      steps: ['Try different techniques', 'Mindfulness, exercise, art', 'See what resonates'],
      delay: 0.2,
    },
    {
      icon: Users,
      title: 'Build Your Support Network',
      color: 'from-green-500 to-emerald-500',
      steps: ['Talk to trusted people', 'Join communities', 'Seek professional help'],
      delay: 0.4,
    },
    {
      icon: Heart,
      title: 'Practice Self-Compassion',
      color: 'from-red-500 to-rose-500',
      steps: ['Be gentle with yourself', 'Acknowledge progress', 'Celebrate small wins'],
      delay: 0.6,
    },
    {
      icon: Compass,
      title: 'Adjust & Evolve',
      color: 'from-yellow-500 to-orange-500',
      steps: ['Reflect regularly', 'What works changes', 'Keep learning'],
      delay: 0.8,
    },
    {
      icon: Zap,
      title: 'Create a Toolkit',
      color: 'from-indigo-500 to-blue-500',
      steps: ['Build a collection', 'Quick wins & deep work', 'Ready when needed'],
      delay: 1,
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Flowing gradient background */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full blur-3xl opacity-5"
        animate={{
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Building Healthy Coping Skills</h2>
        <p className="text-lg text-gray-400">A 6-step framework for developing resilience</p>
      </motion.div>

      {/* Strategy Cards in flowing grid */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-6xl relative z-10">
        {strategies.map((strategy, idx) => {
          const Icon = strategy.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: strategy.delay,
                duration: 0.7,
                type: 'spring',
                stiffness: 200,
              }}
              className="group relative"
            >
              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.05, translateY: -8 }}
                className={`bg-gradient-to-br ${strategy.color} bg-opacity-5 border border-slate-600 rounded-2xl p-6 backdrop-blur-sm h-full flex flex-col relative overflow-hidden group hover:border-opacity-50 transition-all`}
              >
                {/* Animated gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${strategy.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Number badge */}
                <motion.div
                  className={`absolute top-4 right-4 w-8 h-8 rounded-lg bg-gradient-to-br ${strategy.color} flex items-center justify-center text-sm font-bold text-white opacity-80`}
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                >
                  {idx + 1}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="mb-4 relative z-10"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.1 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${strategy.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-4 relative z-10">
                  {strategy.title}
                </h3>

                {/* Steps */}
                <div className="space-y-2 relative z-10 flex-1">
                  {strategy.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: strategy.delay + 0.3 + i * 0.1,
                        duration: 0.5,
                      }}
                      className="flex items-start gap-2"
                    >
                      <motion.div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${strategy.color} mt-1 flex-shrink-0`}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                      <span className="text-xs text-gray-300 leading-tight">
                        {step}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom glow line */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${strategy.color}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    delay: strategy.delay + 0.5,
                    duration: 0.8,
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Slide8_BuildingHealthyCoping;