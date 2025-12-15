import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const Slide3_StressTypes = () => {
  const stressTypes = [
    {
      name: 'Acute Stress',
      icon: TrendingUp,
      description: 'Short-term, immediate threat response',
      example: 'Exam, presentation, accident',
      intensity: 80,
      color: 'from-orange-500 to-red-500',
      duration: 'Seconds to hours',
    },
    {
      name: 'Chronic Stress',
      icon: TrendingDown,
      description: 'Prolonged, ongoing pressure',
      example: 'Work deadlines, relationships, finances',
      intensity: 60,
      color: 'from-purple-500 to-pink-500',
      duration: 'Weeks to years',
    },
    {
      name: 'Episodic Acute',
      icon: AlertTriangle,
      description: 'Recurring acute stress patterns',
      example: 'Constant rushing, repeated conflicts',
      intensity: 70,
      color: 'from-yellow-500 to-orange-500',
      duration: 'Recurring events',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full opacity-10">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-5xl font-bold text-white mb-16 relative z-10"
      >
        Three Types of <span className="text-blue-400">Stress</span>
      </motion.h2>

      {/* Stress cards */}
      <div className="flex gap-8 max-w-7xl w-full relative z-10">
        {stressTypes.map((stress, idx) => {
          const Icon = stress.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex-1"
            >
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full hover:border-blue-500/50 transition">
                {/* Icon and title */}
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon className="w-8 h-8 text-blue-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">{stress.name}</h3>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm mb-4">{stress.description}</p>

                {/* Example */}
                <div className="mb-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Example</p>
                  <p className="text-sm text-slate-200">{stress.example}</p>
                </div>

                {/* Duration */}
                <p className="text-xs text-slate-400 mb-4">⏱️ {stress.duration}</p>

                {/* Intensity gauge */}
                <div className="mb-2">
                  <p className="text-xs text-slate-400 mb-2">Intensity Level</p>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stress.intensity}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      className={`h-full bg-gradient-to-r ${stress.color}`}
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-400 text-right">{stress.intensity}%</p>
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
        className="mt-12 relative z-10 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl max-w-3xl"
      >
        <p className="text-slate-100 text-center">
          💡 <strong>Key Insight:</strong> Acute stress is natural and can be beneficial. Chronic stress without recovery is where damage accumulates.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide3_StressTypes;