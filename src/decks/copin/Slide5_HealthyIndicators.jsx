import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Smile, Users, Brain, Heart } from 'lucide-react';

const Slide5_HealthyIndicators = () => {
  const indicators = [
    { icon: CheckCircle, label: 'Addresses the problem', color: 'text-green-400' },
    { icon: Zap, label: 'Reduces stress levels', color: 'text-yellow-400' },
    { icon: Smile, label: 'Improves mood & wellbeing', color: 'text-pink-400' },
    { icon: Users, label: 'Strengthens relationships', color: 'text-blue-400' },
    { icon: Brain, label: 'Builds resilience', color: 'text-purple-400' },
    { icon: Heart, label: 'Preserves physical health', color: 'text-red-400' },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background circles */}
      <motion.div
        className="absolute w-80 h-80 bg-green-500 rounded-full blur-3xl opacity-5"
        animate={{
          x: [0, 30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '20%', left: '5%' }}
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Signs of Healthy Coping</h2>
        <p className="text-lg text-gray-400">What to look for in your stress management</p>
      </motion.div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-5xl relative z-10">
        {indicators.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.1, duration: 0.6 }}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              className="relative group cursor-pointer"
            >
              {/* Card */}
              <motion.div
                animate={{
                  y: activeIndex === idx ? -8 : 0,
                  scale: activeIndex === idx ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 border border-slate-600 rounded-xl p-6 backdrop-blur-sm h-full flex flex-col items-center text-center relative overflow-hidden group-hover:border-green-500/50 transition-all"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={activeIndex === idx ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Icon with pulse */}
                <motion.div
                  className="mb-4 relative z-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                  whileHover={{ rotate: 10, scale: 1.2 }}
                >
                  <div className={`relative ${ind.color}`}>
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                    {/* Pulsing ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-full border ${ind.color}`}
                      animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>
                </motion.div>

                {/* Label */}
                <p className="text-white font-semibold text-sm relative z-10 leading-tight">
                  {ind.label}
                </p>

                {/* Bottom bar indicator */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${ind.color}`}
                  initial={{ width: '0%' }}
                  animate={activeIndex === idx ? { width: '100%' } : { width: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-12 max-w-3xl bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6 text-center relative z-10"
      >
        <p className="text-gray-200">
          <span className="text-green-400 font-semibold">Healthy coping</span> leaves you feeling <span className="text-green-300">better</span>, more in control, and better equipped to handle future challenges.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide5_HealthyIndicators;