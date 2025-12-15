import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Heart,
  DollarSign,
  Users,
  AlertCircle,
  Clock,
} from 'lucide-react';

const Slide4_CommonStressors = () => {
  const stressors = [
    {
      icon: Briefcase,
      label: 'Work',
      percentage: 88,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-blue-600/10',
    },
    {
      icon: Heart,
      label: 'Relationships',
      percentage: 76,
      color: 'text-pink-400',
      bgColor: 'from-pink-500/20 to-pink-600/10',
    },
    {
      icon: DollarSign,
      label: 'Finances',
      percentage: 82,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-green-600/10',
    },
    {
      icon: Users,
      label: 'Social',
      percentage: 64,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-purple-600/10',
    },
    {
      icon: Clock,
      label: 'Time Pressure',
      percentage: 79,
      color: 'text-orange-400',
      bgColor: 'from-orange-500/20 to-orange-600/10',
    },
    {
      icon: AlertCircle,
      label: 'Health',
      percentage: 71,
      color: 'text-red-400',
      bgColor: 'from-red-500/20 to-red-600/10',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Animated background blur */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-white mb-4 relative z-10"
      >
        Most Common <span className="text-blue-400">Stressors</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 mb-12 relative z-10"
      >
        % of people reporting significant stress
      </motion.p>

      {/* Stressor bars */}
      <div className="w-full max-w-4xl space-y-6 relative z-10">
        {stressors.map((stressor, idx) => {
          const Icon = stressor.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stressor.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stressor.color}`} />
                </div>
                <span className="text-white font-semibold w-32">{stressor.label}</span>
                <span className="text-blue-400 font-bold ml-auto">{stressor.percentage}%</span>
              </div>

              {/* Progress bar with animation */}
              <div className="relative h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stressor.percentage}%` }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + idx * 0.1,
                    ease: 'easeOut',
                  }}
                  className={`h-full bg-gradient-to-r ${stressor.bgColor} rounded-full`}
                />

                {/* Pulsing indicator */}
                <motion.div
                  className="absolute right-0 top-0 w-1 h-full bg-white"
                  animate={{
                    opacity: [1, 0, 1],
                    right: [0, -2, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                  style={{ width: `${stressor.percentage}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom stat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-16 relative z-10"
      >
        <p className="text-slate-300 text-center text-lg">
          <span className="text-3xl font-bold text-blue-400">1 in 3</span> people experience
          <br />
          <span className="text-yellow-400">chronic stress</span> regularly
        </p>
      </motion.div>
    </div>
  );
};

export default Slide4_CommonStressors;