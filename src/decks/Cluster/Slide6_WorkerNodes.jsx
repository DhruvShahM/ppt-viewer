import React from 'react';
import { motion } from 'framer-motion';
import { Box, Zap, Radio } from 'lucide-react';

const Slide6_WorkerNodes = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      <motion.h2
        className="text-5xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Worker Nodes
      </motion.h2>

      {/* Worker node visualization */}
      <motion.div
        className="relative w-full max-w-4xl h-80 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400 rounded-xl p-8 mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Node header */}
        <div className="flex items-center gap-3 mb-8">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
            <Radio className="w-6 h-6 text-cyan-400" />
          </motion.div>
          <h3 className="text-white font-bold text-xl">Worker Node</h3>
        </div>

        {/* Components inside node */}
        <div className="grid grid-cols-3 gap-4 h-48">
          {/* Kubelet */}
          <motion.div
            className="bg-blue-500/20 border border-blue-400 rounded-lg p-4 flex flex-col items-center justify-center"
            animate={{ boxShadow: ['0 0 10px rgba(59,130,246,0)', '0 0 20px rgba(59,130,246,0.5)', '0 0 10px rgba(59,130,246,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-6 h-6 text-blue-400 mb-2" />
            <span className="text-white font-bold text-sm">Kubelet</span>
            <p className="text-blue-300 text-xs mt-1 text-center">Pod manager</p>
          </motion.div>

          {/* Container Runtime */}
          <motion.div
            className="bg-cyan-500/20 border border-cyan-400 rounded-lg p-4 flex flex-col items-center justify-center"
            animate={{ boxShadow: ['0 0 10px rgba(34,211,238,0)', '0 0 20px rgba(34,211,238,0.5)', '0 0 10px rgba(34,211,238,0)'] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          >
            <Box className="w-6 h-6 text-cyan-400 mb-2" />
            <span className="text-white font-bold text-sm">Container Runtime</span>
            <p className="text-cyan-300 text-xs mt-1 text-center">Docker/containerd</p>
          </motion.div>

          {/* kube-proxy */}
          <motion.div
            className="bg-purple-500/20 border border-purple-400 rounded-lg p-4 flex flex-col items-center justify-center"
            animate={{ boxShadow: ['0 0 10px rgba(168,85,247,0)', '0 0 20px rgba(168,85,247,0.5)', '0 0 10px rgba(168,85,247,0)'] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
          >
            <Radio className="w-6 h-6 text-purple-400 mb-2" />
            <span className="text-white font-bold text-sm">kube-proxy</span>
            <p className="text-purple-300 text-xs mt-1 text-center">Networking</p>
          </motion.div>
        </div>

        {/* Pods section */}
        <motion.div className="mt-8">
          <h4 className="text-slate-300 text-sm mb-3 font-semibold">Running Pods:</h4>
          <div className="flex gap-4">
            {[0, 1, 2].map((idx) => (
              <motion.div
                key={idx}
                className="flex-1 h-16 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-400 rounded flex items-center justify-center"
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: idx * 0.2,
                }}
              >
                <span className="text-green-300 font-bold text-sm">Pod {idx + 1}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="bg-slate-800/50 border-l-4 border-cyan-400 pl-8 py-6 max-w-3xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-white text-lg">
          Worker nodes run <span className="text-cyan-400 font-bold">Kubelet, Container Runtime, and kube-proxy</span> to execute and manage pods where your applications actually run.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide6_WorkerNodes;