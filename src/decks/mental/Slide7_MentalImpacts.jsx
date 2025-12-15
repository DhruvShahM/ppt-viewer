import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, AlertCircle, Zap, Frown } from 'lucide-react';

const Slide7_MentalImpacts = () => {
  const [hovered, setHovered] = React.useState(null);

  const impacts = [
    {
      icon: Cloud,
      title: 'Anxiety & Worry',
      symptoms: [
        'Constant worry',
        'Racing thoughts',
        'Panic attacks',
      ],
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-900/20',
      borderColor: 'border-cyan-500/30',
    },
    {
      icon: Frown,
      title: 'Depression & Mood',
      symptoms: [
        'Low mood',
        'Loss of interest',
        'Hopelessness',
      ],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-500/30',
    },
    {
      icon: AlertCircle,
      title: 'Cognitive Issues',
      symptoms: [
        'Poor concentration',
        'Memory problems',
        'Indecision',
      ],
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-900/20',
      borderColor: 'border-orange-500/30',
    },
    {
      icon: Zap,
      title: 'Emotional Exhaustion',
      symptoms: [
        'Irritability',
        'Burnout',
        'Detachment',
      ],
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-500/30',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Floating emotional particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-purple-500/30"
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-white mb-4 relative z-10"
      >
        Mental & Emotional <span className="text-purple-400">Impacts</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 mb-12 relative z-10"
      >
        How stress affects your mind and wellbeing
      </motion.p>

      {/* Impact grid */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl w-full relative z-10">
        {impacts.map((impact, idx) => {
          const Icon = impact.icon;
          const isHovered = hovered === idx;

          return (
            <motion.div
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${impact.bgColor} ${impact.borderColor}`}
            >
              {/* Icon */}
              <motion.div
                className="mb-4"
                animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 15, 0] } : {}}
                transition={{
                  duration: 0.6,
                  repeat: isHovered ? Infinity : 0,
                }}
              >
                <Icon className={`w-10 h-10 text-white`} />
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4">{impact.title}</h3>

              {/* Symptoms */}
              <div className="space-y-2">
                {impact.symptoms.map((symptom, i) => (
                  <motion.div
                    key={i}
                    animate={isHovered ? { x: [0, 5, 0] } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isHovered ? Infinity : 0,
                      delay: i * 0.1,
                    }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${impact.color}`}
                      animate={isHovered ? { scale: [1, 1.3, 1] } : {}}
                      transition={{
                        duration: 0.5,
                        repeat: isHovered ? Infinity : 0,
                        delay: i * 0.1,
                      }}
                    />
                    <span className="text-sm text-slate-200">{symptom}</span>
                  </motion.div>
                ))}
              </div>

              {/* Severity indicator */}
              <motion.div
                className="mt-4 pt-4 border-t border-slate-700"
                animate={isHovered ? { opacity: 1 } : { opacity: 0.6 }}
              >
                <p className="text-xs text-slate-400">Impact Level</p>
                <div className="h-1 bg-slate-700 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${impact.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : '60%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Insight */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 relative z-10 text-center max-w-2xl"
      >
        <p className="text-slate-300 text-lg">
          🧠 Untreated stress-related mental health issues can develop into{' '}
          <strong className="text-purple-400">anxiety disorders, depression, and PTSD</strong>
        </p>
      </motion.div>
    </div>
  );
};

export default Slide7_MentalImpacts;