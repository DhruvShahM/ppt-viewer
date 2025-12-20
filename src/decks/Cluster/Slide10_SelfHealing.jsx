import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Check } from 'lucide-react';

const Slide10_SelfHealing = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      <motion.h2
        className="text-5xl font-bold text-white mb-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Self-Healing: Resilience Built-In
      </motion.h2>

      {/* Scenario visualization */}
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-3 gap-8">
          {/* Pod Dies */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-slate-800/50 border-2 border-red-500 rounded-lg p-8 text-center">
              <motion.div
                animate={{ scale: [1, 1.2, 0.9, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-white font-bold mb-2">Pod Crashes</h3>
              <p className="text-red-400 text-sm">Container dies unexpectedly</p>
            </div>
          </motion.div>

          {/* Detection & Restart */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-slate-800/50 border-2 border-yellow-500 rounded-lg p-8 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <RefreshCw className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-white font-bold mb-2">Kubelet Detects</h3>
              <p className="text-yellow-400 text-sm">Health check fails</p>
            </div>

            {/* Arrow */}
            <motion.div
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-yellow-500"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.div>

          {/* Pod Restarted */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="bg-slate-800/50 border-2 border-green-500 rounded-lg p-8 text-center">
              <motion.div
                animate={{ scale: [0, 1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-white font-bold mb-2">Auto Restart</h3>
              <p className="text-green-400 text-sm">New pod launched</p>
            </div>

            {/* Arrow from first */}
            <motion.div
              className="absolute -left-24 top-1/2 transform -translate-y-1/2 text-slate-500 text-2xl"
              animate={{ x: [-20, -10, -20] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↻
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Self-healing scenarios */}
      <motion.div
        className="mt-16 grid grid-cols-2 gap-6 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {[
          { scenario: 'Pod dies', action: 'New pod created' },
          { scenario: 'Node fails', action: 'Pods rescheduled' },
          { scenario: 'Container hung', action: 'Liveness probe restart' },
          { scenario: 'Service unhealthy', action: 'Removed from load balancer' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-slate-800/40 border border-slate-700 rounded-lg p-5"
            whileHover={{ borderColor: '#22d3ee', scale: 1.02 }}
          >
            <p className="text-slate-400 text-sm mb-2">
              <span className="text-red-400">✗</span> {item.scenario}
            </p>
            <p className="text-green-400 text-sm font-semibold">
              <span className="text-green-400">✓</span> {item.action}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Key insight */}
      <motion.div
        className="mt-12 bg-slate-800/50 border-l-4 border-green-400 pl-8 py-6 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <p className="text-white text-lg">
          Kubernetes continuously monitors and restores your desired state—if something fails, it fixes it automatically.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide10_SelfHealing;