import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Zap, AlertTriangle } from 'lucide-react';

const Slide6_PhysicalImpacts = () => {
  const impacts = [
    {
      area: 'Heart & Circulation',
      icon: Heart,
      effects: [
        { label: 'Blood Pressure', value: '↑ +20-30 mmHg', severity: 80 },
        { label: 'Heart Rate', value: '↑ +30-50 bpm', severity: 75 },
        { label: 'Cortisol', value: '↑ 2-5x baseline', severity: 85 },
      ],
      risks: 'Hypertension, heart attack',
    },
    {
      area: 'Nervous System',
      icon: Brain,
      effects: [
        { label: 'Anxiety', value: 'Elevated', severity: 70 },
        { label: 'Focus', value: 'Scattered', severity: 65 },
        { label: 'Memory', value: 'Impaired', severity: 60 },
      ],
      risks: 'Cognitive decline, insomnia',
    },
    {
      area: 'Immune System',
      icon: Zap,
      effects: [
        { label: 'Immunity', value: '↓ -30%', severity: 75 },
        { label: 'Inflammation', value: '↑ Chronic', severity: 80 },
        { label: 'Recovery', value: '↓ Slower', severity: 70 },
      ],
      risks: 'Frequent illness, inflammation',
    },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Animated pulse background */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-red-500/10 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ x: '-50%', y: '-50%' }}
      />

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-5xl font-bold text-white mb-4 relative z-10"
      >
        Physical <span className="text-red-400">Impacts</span> of Stress
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 mb-12 relative z-10"
      >
        Measurable changes in your body under stress
      </motion.p>

      {/* Impact cards */}
      <div className="grid grid-cols-3 gap-6 max-w-6xl w-full relative z-10">
        {impacts.map((impact, idx) => {
          const Icon = impact.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-red-500/50 transition"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className="w-8 h-8 text-red-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">{impact.area}</h3>
              </div>

              {/* Effects */}
              <div className="space-y-4 mb-6">
                {impact.effects.map((effect, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 + i * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-300 font-medium">
                        {effect.label}
                      </span>
                      <span className="text-sm text-red-400 font-bold">{effect.value}</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${effect.severity}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Risk badge */}
              <motion.div
                className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg"
                animate={{ borderColor: ['rgba(239, 68, 68, 0.3)', 'rgba(239, 68, 68, 0.5)', 'rgba(239, 68, 68, 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-xs text-red-300">
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  {impact.risks}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Warning message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 relative z-10 p-6 bg-red-900/20 border border-red-500/40 rounded-xl max-w-2xl"
      >
        <p className="text-slate-100 text-center">
          ⚠️ <strong>Chronic stress</strong> can lead to serious conditions: hypertension, heart
          disease, diabetes, autoimmune disorders
        </p>
      </motion.div>
    </div>
  );
};

export default Slide6_PhysicalImpacts;