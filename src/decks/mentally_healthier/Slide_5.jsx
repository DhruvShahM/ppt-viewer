

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageSquare, Activity, BarChart3 } from 'lucide-react';

const Slide5_ContinuousCareCycle = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      icon: Heart,
      title: "Assessment",
      desc: "Real-time mood & wellness tracking",
      color: "from-red-500 to-pink-500",
      number: 1
    },
    {
      icon: MessageSquare,
      title: "Support",
      desc: "Immediate access to resources & chatbots",
      color: "from-blue-500 to-cyan-500",
      number: 2
    },
    {
      icon: Activity,
      title: "Intervention",
      desc: "Personalized therapy & VR experiences",
      color: "from-green-500 to-emerald-500",
      number: 3
    },
    {
      icon: BarChart3,
      title: "Progress",
      desc: "Data-driven insights & optimization",
      color: "from-purple-500 to-pink-500",
      number: 4
    }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Future: Continuous Care Model
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Circular cycle */}
        <div className="relative h-96 mb-12">
          {/* Animated circle background */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <defs>
              <linearGradient id="cycleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            {/* Background circle */}
            <circle cx="200" cy="200" r="120" fill="none" stroke="url(#cycleGradient)" strokeWidth="2" opacity="0.3" />

            {/* Animated rotating circle */}
            <motion.circle
              cx="200"
              cy="200"
              r="120"
              fill="none"
              stroke="url(#cycleGradient)"
              strokeWidth="2"
              strokeDasharray="754"
              strokeDashoffset="754"
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.svg>

          {/* Phase nodes */}
          {phases.map((phase, i) => {
            const angle = (i / phases.length) * Math.PI * 2 - Math.PI / 2;
            const x = 200 + 130 * Math.cos(angle);
            const y = 200 + 130 * Math.sin(angle);

            const Icon = phase.icon;
            const isActive = activePhase === i;

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `calc(${(x / 400) * 100}% - 40px)`,
                  top: `calc(${(y / 400) * 100}% - 40px)`
                }}
              >
                <motion.button
                  onClick={() => setActivePhase(i)}
                  className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-white relative group ${isActive
                      ? `bg-gradient-to-br ${phase.color} shadow-lg`
                      : "bg-slate-700 hover:bg-slate-600"
                    }`}
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    boxShadow: isActive ? "0 0 40px rgba(99, 102, 241, 0.6)" : "none"
                  }}
                  whileHover={{ scale: isActive ? 1.3 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                </motion.button>

                {/* Label */}
                <motion.div
                  className="absolute top-full mt-4 text-center whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <p className="text-sm font-semibold text-white">{phase.title}</p>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Center text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            key={activePhase}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-sm text-gray-400 mb-2">Phase {phases[activePhase].number}</p>
              <h3 className="text-2xl font-bold text-white">{phases[activePhase].title}</h3>
            </motion.div>
          </motion.div>
        </div>

        {/* Active phase detail */}
        <motion.div
          key={activePhase}
          className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-300 text-lg">{phases[activePhase].desc}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5_ContinuousCareCycle;