import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Settings } from 'lucide-react';

const Slide3_WhatIsKubernetes = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      {/* Animated title */}
      <motion.h2
        className="text-5xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Kubernetes: The Orchestrator
      </motion.h2>

      {/* Central animated core */}
      <motion.div
        className="relative w-80 h-80 mb-12"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full" />
        <div className="absolute inset-8 border-2 border-blue-500/30 rounded-full" />
        <div className="absolute inset-16 border-2 border-purple-500/30 rounded-full" />

        <motion.div
          className="absolute inset-24 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center"
          animate={{ boxShadow: ['0 0 20px rgba(34,211,238,0.3)', '0 0 40px rgba(59,130,246,0.5)', '0 0 20px rgba(34,211,238,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="w-16 h-16 text-cyan-400" />
        </motion.div>
      </motion.div>

      {/* Key features floating */}
      <div className="grid grid-cols-3 gap-8 max-w-5xl mt-8">
        {[
          { icon: Zap, label: 'Auto Deployment', desc: 'Schedules containers optimally' },
          { icon: Shield, label: 'Self-Healing', desc: 'Restarts failed containers' },
          { icon: Settings, label: 'Auto Scaling', desc: 'Scales based on demand' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 + idx * 0.2 }}
          >
            <motion.div
              className="flex justify-center mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
            >
              <item.icon className="w-12 h-12 text-cyan-400" />
            </motion.div>
            <h3 className="text-lg font-bold text-white mb-2">{item.label}</h3>
            <p className="text-slate-300 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Definition */}
      <motion.div
        className="mt-16 bg-slate-800/50 border-l-4 border-cyan-400 pl-8 py-6 max-w-2xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-white text-lg leading-relaxed">
          Kubernetes is an <span className="text-cyan-400 font-bold">open-source orchestration platform</span> that automates deployment, scaling, and management of containerized applications across clusters of machines.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide3_WhatIsKubernetes;