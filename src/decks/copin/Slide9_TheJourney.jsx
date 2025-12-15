import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';

const Slide9_TheJourney = () => {
  const phases = [
    {
      label: 'Awareness',
      icon: AlertCircle,
      color: 'text-yellow-400',
      bgColor: 'from-yellow-900/30 to-orange-900/30',
      description: 'Notice patterns in your coping',
      position: 0,
    },
    {
      label: 'Assessment',
      icon: Lightbulb,
      color: 'text-blue-400',
      bgColor: 'from-blue-900/30 to-cyan-900/30',
      description: 'Evaluate if it serves you',
      position: 1,
    },
    {
      label: 'Experimentation',
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'from-purple-900/30 to-pink-900/30',
      description: 'Try new strategies',
      position: 2,
    },
    {
      label: 'Integration',
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'from-green-900/30 to-emerald-900/30',
      description: 'Make healthy habits stick',
      position: 3,
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
        <h2 className="text-5xl font-bold text-white mb-4">The Journey to Healthy Coping</h2>
        <p className="text-lg text-gray-400">A continuous cycle of growth and self-discovery</p>
      </motion.div>

      {/* Journey path */}
      <div className="w-full max-w-6xl relative">
        {/* Connecting line */}
        <motion.svg
          width="100%"
          height="400"
          viewBox="0 0 1000 200"
          className="absolute inset-0 z-0"
        >
          {/* Animated path */}
          <motion.path
            d="M 100 100 Q 300 50 500 100 T 900 100"
            fill="none"
            stroke="url(#gradientPath)"
            strokeWidth="3"
            strokeDasharray="10 5"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -15 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <defs>
            <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="25%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="75%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Phase cards */}
        <div className="flex justify-between items-start relative z-10">
          {phases.map((phase, idx) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.15, duration: 0.7 }}
                className="w-1/5 flex flex-col items-center"
              >
                {/* Node circle */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="mb-6 relative"
                >
                  {/* Pulsing background */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${phase.bgColor}`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Circle */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${phase.bgColor} border-2 ${phase.color} flex items-center justify-center relative z-10`}>
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                    >
                      <Icon className={`w-7 h-7 ${phase.color}`} strokeWidth={1.5} />
                    </motion.div>
                  </div>

                  {/* Number badge */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs font-bold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                  >
                    {idx + 1}
                  </motion.div>
                </motion.div>

                {/* Card */}
                <motion.div
                  className={`bg-gradient-to-br ${phase.bgColor} border ${phase.color}/30 rounded-xl p-4 text-center backdrop-blur-sm w-full`}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className={`${phase.color} font-bold text-lg mb-2`}>
                    {phase.label}
                  </h3>
                  <p className="text-xs text-gray-300 leading-tight">
                    {phase.description}
                  </p>
                </motion.div>

                {/* Arrow to next */}
                {idx < phases.length - 1 && (
                  <motion.div
                    className="absolute top-20 -right-8 text-2xl text-gray-500 opacity-60"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    →
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cycle note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-20 text-center max-w-2xl"
      >
        <motion.p
          className="text-gray-300 text-lg leading-relaxed"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          This is <span className="text-cyan-300 font-semibold">not linear</span>. You may cycle through these phases multiple times, each time building deeper resilience and understanding.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Slide9_TheJourney;