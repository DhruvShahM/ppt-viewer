

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, GitBranch, Zap } from 'lucide-react';

const Slide8_PersonalizationEngine = () => {
  const [activeTrail, setActiveTrail] = useState(0);

  const userJourneys = [
    {
      name: "Person A",
      triggers: ["Social media anxiety", "Sleep issues", "Perfectionism"],
      treatment: ["Daily grounding exercises", "Sleep tracking", "Self-compassion AI coaching"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Person B",
      triggers: ["Work stress", "Isolation", "Decision paralysis"],
      treatment: ["Team connection tools", "Community matching", "Decision support AI"],
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Person C",
      triggers: ["Financial anxiety", "Future uncertainty", "Low motivation"],
      treatment: ["Financial planning AI", "Career coaching", "Goal-setting therapy"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center p-12">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hyper-Personalized Care
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Central insight */}
        <motion.p
          className="text-gray-300 mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          No two mental health journeys are the same. AI learns unique patterns and adapts treatment in real-time.
        </motion.p>

        <div className="grid grid-cols-3 gap-8">
          {userJourneys.map((journey, i) => (
            <motion.div
              key={i}
              className={`rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br ${journey.color} p-8 text-white relative group`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              onClick={() => setActiveTrail(activeTrail === i ? -1 : i)}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Cpu className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-bold">{journey.name}</h3>
              </div>

              {/* Triggers */}
              <div className="mb-6">
                <p className="text-xs opacity-75 font-semibold mb-2">TRIGGERS IDENTIFIED</p>
                <div className="space-y-2">
                  {journey.triggers.map((trigger, j) => (
                    <motion.div
                      key={j}
                      className="bg-white/20 px-3 py-2 rounded-lg text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 + j * 0.05, duration: 0.4 }}
                    >
                      <span className="inline-block">•</span> {trigger}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Treatment */}
              <div>
                <p className="text-xs opacity-75 font-semibold mb-2">CUSTOM TREATMENT</p>
                <div className="space-y-2">
                  {journey.treatment.map((treatment, j) => (
                    <motion.div
                      key={j}
                      className="bg-white/10 px-3 py-2 rounded-lg text-sm border border-white/20"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 + j * 0.05, duration: 0.4 }}
                    >
                      <span className="inline-block mr-2">✓</span> {treatment}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Hover effect indicator */}
              <motion.div
                className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center"
                initial={false}
              >
                <span className="text-white font-semibold">Click to learn more</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* AI Personalization insight */}
        <motion.div
          className="mt-12 bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex items-start gap-4">
            <GitBranch className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div>
              <h4 className="text-purple-300 font-semibold mb-2">Adaptive AI Learning</h4>
              <p className="text-gray-300">
                Each interaction trains the system. What worked for "Person A" guides suggestions for millions of similar profiles. Therapy becomes a science, not a guessing game.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide8_PersonalizationEngine;