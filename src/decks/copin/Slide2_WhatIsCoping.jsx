import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertCircle, TrendingUp, Zap } from 'lucide-react';

const Slide2_WhatIsCoping = () => {
  const mechanisms = [
    { icon: Shield, label: 'Protection', color: 'text-blue-400', desc: 'Mental barrier' },
    { icon: Zap, label: 'Response', color: 'text-yellow-400', desc: 'Action taken' },
    { icon: TrendingUp, label: 'Adaptation', color: 'text-green-400', desc: 'Change & grow' },
    { icon: AlertCircle, label: 'Management', color: 'text-red-400', desc: 'Control stress' },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden p-12">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Animated background grid */}
      <motion.svg
        className="absolute inset-0 opacity-5"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </motion.svg>

      <div className="relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">What is Coping?</h2>
          <p className="text-xl text-gray-400">
            Cognitive & behavioral efforts to manage stress and adversity
          </p>
        </motion.div>

        {/* Definition Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm max-w-2xl"
        >
          <p className="text-lg text-gray-200 leading-relaxed">
            <span className="text-blue-300 font-semibold">Coping</span> is a dynamic process where individuals use <span className="text-cyan-300 font-semibold">thoughts, emotions, and behaviors</span> to respond to stressors and maintain psychological equilibrium.
          </p>
        </motion.div>

        {/* Mechanism Cards */}
        <div className="grid grid-cols-4 gap-6">
          {mechanisms.map((mech, idx) => {
            const Icon = mech.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                {/* Card */}
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 text-center backdrop-blur-sm hover:bg-slate-700/60 transition-all">
                  {/* Animated icon background */}
                  <motion.div
                    className="mb-4 flex justify-center"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ rotate: 10 }}
                    >
                      <Icon className={`w-8 h-8 ${mech.color}`} strokeWidth={1.5} />
                    </motion.div>
                  </motion.div>

                  {/* Label */}
                  <h3 className="text-white font-semibold mb-1">{mech.label}</h3>
                  <p className="text-xs text-gray-400">{mech.desc}</p>

                  {/* Pulse glow */}
                  <motion.div
                    className={`absolute inset-0 rounded-xl opacity-0 blur-lg ${mech.color}`}
                    style={{ background: `radial-gradient(circle, ${mech.color}, transparent)` }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slide2_WhatIsCoping;