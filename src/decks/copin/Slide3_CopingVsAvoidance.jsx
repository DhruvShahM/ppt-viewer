import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

const Slide3_CopingVsAvoidance = () => {
  const stressLevel = 100;

  const strategies = [
    {
      title: 'Healthy Coping',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'from-green-900/20 to-emerald-900/20',
      borderColor: 'border-green-500/30',
      items: [
        'Exercise & movement',
        'Talking to friends',
        'Mindfulness',
        'Problem-solving',
      ],
      trajectory: 'curves down',
      stress: 'Decreases over time',
    },
    {
      title: 'Avoidance Coping',
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'from-red-900/20 to-orange-900/20',
      borderColor: 'border-red-500/30',
      items: [
        'Numbing (substance use)',
        'Procrastination',
        'Denial',
        'Social withdrawal',
      ],
      trajectory: 'curves up',
      stress: 'Increases later',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold text-white mb-4">
          Coping vs. Avoidance
        </h2>
        <p className="text-lg text-gray-400">Two divergent paths in stress management</p>
      </motion.div>

      {/* Charts Container */}
      <div className="flex gap-12 w-full max-w-5xl">
        {strategies.map((strategy, idx) => {
          const Icon = strategy.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.2, duration: 0.8 }}
              className="flex-1"
            >
              {/* Strategy Card */}
              <div className={`bg-gradient-to-br ${strategy.bgColor} border ${strategy.borderColor} rounded-2xl p-8 backdrop-blur-sm h-full flex flex-col`}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <Icon className={`w-6 h-6 ${strategy.color}`} strokeWidth={1.5} />
                  <h3 className={`text-2xl font-bold ${strategy.color}`}>{strategy.title}</h3>
                </div>

                {/* Chart Area */}
                <motion.svg
                  width="100%"
                  height="180"
                  viewBox="0 0 200 120"
                  className="mb-6"
                  initial="hidden"
                  animate="visible"
                >
                  {/* Grid */}
                  <defs>
                    <linearGradient id={`grad${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={idx === 0 ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={idx === 0 ? '#10b981' : '#ef4444'} stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Axis */}
                  <line x1="20" y1="100" x2="180" y2="100" stroke="white" strokeWidth="1" opacity="0.2" />
                  <line x1="20" y1="20" x2="20" y2="100" stroke="white" strokeWidth="1" opacity="0.2" />

                  {/* Curve */}
                  <motion.path
                    d={
                      idx === 0
                        ? 'M 20 80 Q 60 70 100 50 T 180 20'
                        : 'M 20 40 Q 60 50 100 70 T 180 100'
                    }
                    fill="none"
                    stroke={idx === 0 ? '#10b981' : '#ef4444'}
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />

                  {/* Fill under curve */}
                  <motion.path
                    d={
                      idx === 0
                        ? 'M 20 80 Q 60 70 100 50 T 180 20 L 180 100 L 20 100 Z'
                        : 'M 20 40 Q 60 50 100 70 T 180 100 L 180 100 L 20 100 Z'
                    }
                    fill={`url(#grad${idx})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  />

                  {/* Labels */}
                  <text x="10" y="105" fontSize="10" fill="white" opacity="0.5">
                    Time
                  </text>
                  <text x="5" y="30" fontSize="10" fill="white" opacity="0.5">
                    Stress
                  </text>
                </motion.svg>

                {/* Outcome text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className={`text-sm font-semibold ${strategy.color} mb-6`}
                >
                  {strategy.stress}
                </motion.p>

                {/* Strategy list */}
                <div className="space-y-3">
                  {strategy.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full ${strategy.color}`}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                      <span className="text-sm text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Slide3_CopingVsAvoidance;