import React from 'react';
import { motion } from 'framer-motion';
import {
  Droplet,
  Zap,
  Heart,
  Users,
  BookOpen,
  Smile,
} from 'lucide-react';

const Slide8_CopingStrategies = () => {
  const strategies = [
    {
      icon: Heart,
      title: 'Physical Exercise',
      description: 'Release endorphins, reduce cortisol',
      examples: ['Running', 'Yoga', 'Swimming', 'Gym'],
      benefit: '↓ Stress by 40-60%',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Droplet,
      title: 'Mindfulness',
      description: 'Calm nervous system, increase awareness',
      examples: ['Meditation', 'Breathing', 'Journaling', 'Present focus'],
      benefit: '↓ Anxiety by 30-50%',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Social Connection',
      description: 'Share feelings, get support, feel heard',
      examples: ['Talking', 'Therapy', 'Groups', 'Mentorship'],
      benefit: '↓ Stress by 50-70%',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Hobby & Creativity',
      description: 'Flow state, positive engagement',
      examples: ['Art', 'Music', 'Gaming', 'Writing'],
      benefit: '↓ Stress by 35-55%',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: BookOpen,
      title: 'Learning & Growth',
      description: 'Sense of progress, mastery',
      examples: ['New skills', 'Reading', 'Courses', 'Projects'],
      benefit: '↓ Stress by 25-45%',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Smile,
      title: 'Rest & Recovery',
      description: 'Sleep, relaxation, time off',
      examples: ['Sleep 8h', 'Vacation', 'Naps', 'Breaks'],
      benefit: '↓ Stress by 60-80%',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-5xl font-bold text-white mb-4 relative z-10"
      >
        Evidence-Based <span className="text-green-400">Coping Strategies</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 mb-12 relative z-10"
      >
        Proven methods to manage and reduce stress
      </motion.p>

      {/* Strategy cards grid */}
      <div className="grid grid-cols-3 gap-6 max-w-6xl w-full relative z-10">
        {strategies.map((strategy, idx) => {
          const Icon = strategy.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${strategy.color} bg-opacity-10 border border-slate-700 rounded-2xl p-6 h-full hover:border-green-500/50 transition`}>
                {/* Icon */}
                <motion.div
                  className="mb-4"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Icon className="w-8 h-8 text-green-400" />
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">{strategy.title}</h3>

                {/* Description */}
                <p className="text-sm text-slate-400 mb-4">{strategy.description}</p>

                {/* Examples */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {strategy.examples.map((example, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="text-xs px-2 py-1 bg-slate-700/50 rounded-full text-slate-300"
                    >
                      {example}
                    </motion.span>
                  ))}
                </div>

                {/* Benefit badge */}
                <motion.div
                  className={`p-3 bg-gradient-to-r ${strategy.color} bg-opacity-20 rounded-lg border border-green-500/30`}
                  animate={{
                    borderColor: [
                      'rgba(34, 197, 94, 0.3)',
                      'rgba(34, 197, 94, 0.6)',
                      'rgba(34, 197, 94, 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-sm font-bold text-green-300">{strategy.benefit}</p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 relative z-10 p-6 bg-green-900/20 border border-green-500/30 rounded-xl max-w-2xl"
      >
        <p className="text-slate-100 text-center">
          💡 <strong>The most effective approach:</strong> Combine 2-3 strategies consistently.
          No single method works for everyone.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide8_CopingStrategies;