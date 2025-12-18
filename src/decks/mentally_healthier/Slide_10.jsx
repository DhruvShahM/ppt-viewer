

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, TrendingUp, Users } from 'lucide-react';

const Slide10_HopeFramework = () => {
  const [activeElement, setActiveElement] = useState(null);

  const framework = [
    {
      pillar: "Connection",
      description: "AI matching you with communities of people facing similar challenges",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      data: "Loneliness decreases 60% when part of supportive community"
    },
    {
      pillar: "Capability",
      description: "Tools that teach you to manage your mental health autonomously",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      data: "Skill-building reduces future crisis severity by 71%"
    },
    {
      pillar: "Compassion",
      description: "AI that responds without judgment, always available",
      icon: Heart,
      color: "from-pink-500 to-red-500",
      data: "Self-acceptance leading factor in recovery (r = 0.84)"
    },
    {
      pillar: "Future Vision",
      description: "Training your brain to imagine positive, achievable futures",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
      data: "Optimism increases action-taking likelihood by 5x"
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
          The Hope Framework
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.p
          className="text-gray-300 mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Mental health of tomorrow depends on four interconnected pillars
        </motion.p>

        {/* 4 pillars - cross formation */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {framework.map((item, i) => {
            const Icon = item.icon;
            const isActive = activeElement === i;

            return (
              <motion.div
                key={i}
                className={`rounded-2xl overflow-hidden cursor-pointer transition-all transform ${isActive
                    ? `bg-gradient-to-br ${item.color} p-8 text-white scale-105`
                    : "bg-slate-800/50 border border-slate-700 p-8 text-gray-300 hover:border-slate-600"
                  }`}
                onClick={() => setActiveElement(isActive ? null : i)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                whileHover={{ scale: isActive ? 1.05 : 1.02 }}
              >
                <motion.div
                  className="mb-4"
                  animate={{ rotate: isActive ? 360 : 0, scale: isActive ? 1.2 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`w-10 h-10 ${isActive ? "text-white" : "text-gray-400"}`} />
                </motion.div>

                <h3 className={`text-2xl font-bold mb-3 ${isActive ? "text-white" : "text-gray-300"}`}>
                  {item.pillar}
                </h3>

                <p className={`text-base mb-4 ${isActive ? "text-white/90" : "text-gray-400"}`}>
                  {item.description}
                </p>

                {/* Expandable data */}
                {isActive && (
                  <motion.div
                    className="bg-white/10 rounded-lg p-4 mt-4 border border-white/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={`text-sm font-semibold mb-2 ${isActive ? "text-white/70" : ""}`}>RESEARCH</p>
                    <p className={`text-sm leading-relaxed ${isActive ? "text-white/90" : ""}`}>
                      {item.data}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Central integration point */}
        <motion.div
          className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            className="flex items-center justify-center mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-8 h-8 text-pink-400" />
          </motion.div>

          <h4 className="text-white font-bold text-center mb-3">Integrated Ecosystem</h4>
          <p className="text-gray-300 text-center text-sm">
            These four pillars aren't separate—they work together. Technology enables connection, capability enhances compassion, future vision motivates action. This ecosystem creates sustainable mental wellness.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide10_HopeFramework;