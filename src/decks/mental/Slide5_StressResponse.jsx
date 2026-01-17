import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Heart, Brain, AlertCircle } from 'lucide-react';

const Slide5_StressResponse = () => {
  const [activeStage, setActiveStage] = React.useState(0);

  const stages = [
    {
      label: 'Trigger',
      icon: AlertCircle,
      description: 'Stressor detected',
      details: ['Perceived threat', 'Challenge identified'],
      color: 'from-red-500 to-orange-500',
      duration: 'Milliseconds',
    },
    {
      label: 'Alarm',
      icon: Zap,
      description: 'Fight-or-flight activated',
      details: [
        'Amygdala triggers response',
        'Adrenaline release',
        'Heart rate increases',
      ],
      color: 'from-orange-500 to-yellow-500',
      duration: 'Seconds',
    },
    {
      label: 'Resistance',
      icon: Heart,
      description: 'Body mobilizes resources',
      details: [
        'Cortisol maintained',
        'Muscles ready',
        'Focus heightened',
      ],
      color: 'from-yellow-500 to-blue-500',
      duration: 'Minutes to hours',
    },
    {
      label: 'Recovery',
      icon: Brain,
      description: 'Return to baseline',
      details: ['Parasympathetic activation', 'Stress hormones decrease', 'Calm restored'],
      color: 'from-blue-500 to-green-500',
      duration: 'Hours to days',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Animated flowing line background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <motion.polyline
          points="0,270 240,270 480,200 720,300 960,150 1200,270 1440,200"
          fill="none"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          animate={{
            points: [
              '0,270 240,270 480,200 720,300 960,150 1200,270 1440,200',
              '0,250 240,280 480,180 720,320 960,130 1200,290 1440,180',
              '0,270 240,270 480,200 720,300 960,150 1200,270 1440,200',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-5xl font-bold text-white mb-4 relative z-10"
      >
        The Stress <span className="text-blue-400">Response Cycle</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 mb-12 relative z-10"
      >
        How your body reacts to perceived threats
      </motion.p>

      {/* Timeline */}
      <div className="flex gap-4 max-w-5xl w-full relative z-10">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = idx === activeStage;

          return (
            <motion.div
              key={idx}
              onHoverStart={() => setActiveStage(idx)}
              className="flex-1 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {/* Card */}
              <motion.div
                animate={{
                  scale: isActive ? 1.05 : 1,
                  y: isActive ? -10 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-xl border-2 transition-all h-full flex flex-col justify-between ${
                  isActive
                    ? `border-blue-500 bg-gradient-to-br ${stage.color} bg-opacity-20 shadow-2xl shadow-blue-500/20`
                    : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                }`}
              >
                {/* Icon */}
                <motion.div
                  className="mb-3"
                  animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                  transition={{
                    duration: 0.6,
                    repeat: isActive ? Infinity : 0,
                  }}
                >
                  <Icon
                    className={`w-8 h-8 ${isActive ? 'text-blue-300' : 'text-slate-400'}`}
                  />
                </motion.div>

                {/* Title */}
                <h3
                  className={`text-xl font-bold mb-1 ${isActive ? 'text-white' : 'text-slate-300'}`}
                >
                  {stage.label}
                </h3>

                {/* Duration */}
                <p className="text-xs text-slate-500 mb-2">⏱️ {stage.duration}</p>

                {/* Description */}
                <p className="text-sm text-slate-400 mb-3">{stage.description}</p>

                {/* Details (expanded on hover) */}
                <motion.div
                  animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="text-xs text-slate-300 space-y-1">
                    {stage.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">→</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* Connector arrow */}
              {idx < stages.length - 1 && (
                <motion.div
                  className="absolute top-16 -right-8 text-slate-600 z-10"
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  →
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Key message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 relative z-10 text-center max-w-2xl"
      >
        <p className="text-slate-300">
          🧠 When stress is <strong>managed well</strong>, this cycle is healthy. When chronic,
          <strong className="text-red-400"> recovery phase never comes</strong>.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide5_StressResponse;