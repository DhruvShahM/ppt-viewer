import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Clock, Zap, Lock, Flame } from 'lucide-react';

const Slide6_UnhealthyWarnings = () => {
  const warnings = [
    {
      icon: TrendingDown,
      title: 'Makes things worse',
      color: 'text-red-400',
      bgColor: 'from-red-900/30 to-orange-900/30',
      borderColor: 'border-red-500/30',
      example: 'Temporary relief, long-term harm',
    },
    {
      icon: Clock,
      title: 'Requires escalation',
      color: 'text-orange-400',
      bgColor: 'from-orange-900/30 to-yellow-900/30',
      borderColor: 'border-orange-500/30',
      example: 'Need more to achieve same effect',
    },
    {
      icon: Lock,
      title: 'Creates dependency',
      color: 'text-yellow-400',
      bgColor: 'from-yellow-900/30 to-amber-900/30',
      borderColor: 'border-yellow-500/30',
      example: 'Can\'t function without it',
    },
    {
      icon: Flame,
      title: 'Harms relationships',
      color: 'text-red-400',
      bgColor: 'from-red-900/30 to-pink-900/30',
      borderColor: 'border-red-500/30',
      example: 'Pushes people away',
    },
    {
      icon: Zap,
      title: 'Damages health',
      color: 'text-pink-400',
      bgColor: 'from-pink-900/30 to-rose-900/30',
      borderColor: 'border-pink-500/30',
      example: 'Physical & mental consequences',
    },
    {
      icon: AlertCircle,
      title: 'Avoids the issue',
      color: 'text-rose-400',
      bgColor: 'from-rose-900/30 to-red-900/30',
      borderColor: 'border-rose-500/30',
      example: 'Problem persists & compounds',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Pulsing danger background */}
      <motion.div
        className="absolute w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-5"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" strokeWidth={1.5} />
        </motion.div>
        <h2 className="text-5xl font-bold text-white mb-4">Red Flags: Unhealthy Coping</h2>
        <p className="text-lg text-gray-400">Warning signs that your coping mechanism isn't working</p>
      </motion.div>

      {/* Warning Cards Grid */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-6xl relative z-10">
        {warnings.map((warn, idx) => {
          const Icon = warn.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.15 + idx * 0.1, duration: 0.7 }}
              className="relative group"
            >
              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className={`bg-gradient-to-br ${warn.bgColor} border ${warn.borderColor} rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group hover:border-red-400/60 transition-colors`}
              >
                {/* Animated danger pulse */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-red-500 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Icon */}
                <motion.div
                  className="mb-4 relative z-10"
                  animate={{ 
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.2 }}
                >
                  <div className={`${warn.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 relative z-10">
                  {warn.title}
                </h3>

                {/* Example */}
                <p className="text-sm text-gray-300 relative z-10">
                  {warn.example}
                </p>

                {/* Animated border glow on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/0 to-red-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom warning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-12 relative z-10"
      >
        <motion.div
          className="text-center text-gray-300 max-w-2xl"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="text-sm">
            <span className="text-red-400 font-semibold">If you notice these patterns,</span> consider seeking professional support or trying new coping strategies.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide6_UnhealthyWarnings;