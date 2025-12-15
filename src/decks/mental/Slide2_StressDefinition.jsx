import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Heart, Zap } from 'lucide-react';

const Slide2_StressDefinition = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const definitions = [
    {
      icon: AlertCircle,
      title: 'Psychological',
      description: 'Mental pressure, anxiety, overwhelm',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Heart,
      title: 'Physiological',
      description: 'Heart rate, cortisol, muscle tension',
      color: 'from-purple-500 to-blue-500',
    },
    {
      icon: Zap,
      title: 'Behavioral',
      description: 'Sleep disruption, aggression, avoidance',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background animated circles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-slate-700/30"
          style={{
            width: `${200 + i * 100}px`,
            height: `${200 + i * 100}px`,
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            rotate: i % 2 === 0 ? 360 : -360,
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-white mb-16 relative z-10"
      >
        What is <span className="text-blue-400">Stress?</span>
      </motion.h2>

      {/* Definition cards */}
      <div className="grid grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        {definitions.map((item, idx) => {
          const Icon = item.icon;
          const isActive = idx === activeIndex;

          return (
            <motion.div
              key={idx}
              onHoverStart={() => setActiveIndex(idx)}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isActive ? 1.05 : 1,
              }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-8 rounded-2xl border transition-all cursor-pointer ${
                isActive
                  ? `border-blue-500 bg-gradient-to-br ${item.color} bg-opacity-10 shadow-2xl`
                  : 'border-slate-700 bg-slate-800/50'
              }`}
            >
              {/* Icon with animation */}
              <motion.div
                animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : { scale: 1 }}
                transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}
                className="mb-4"
              >
                <Icon className={`w-12 h-12 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
              </motion.div>

              {/* Title */}
              <h3 className={`text-2xl font-bold mb-3 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {item.title}
              </h3>

              {/* Description */}
              <motion.p
                animate={{ opacity: isActive ? 1 : 0.7 }}
                className={`text-sm leading-relaxed ${isActive ? 'text-slate-100' : 'text-slate-400'}`}
              >
                {item.description}
              </motion.p>

              {/* Progress bar */}
              <motion.div
                className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden"
                initial={{ width: '0%' }}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${item.color}`}
                  animate={{ width: isActive ? '100%' : '0%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-slate-400 text-sm mt-16 relative z-10"
      >
        Stress = Your body's response to a challenging or threatening situation
      </motion.p>
    </div>
  );
};

export default Slide2_StressDefinition;