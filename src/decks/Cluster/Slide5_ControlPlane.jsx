import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Shield, Activity } from 'lucide-react';

const Slide5_ControlPlane = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      <motion.h2
        className="text-5xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        The Control Plane
      </motion.h2>

      <div className="grid grid-cols-2 gap-8 max-w-5xl mb-12">
        {/* API Server */}
        <motion.div
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-400 rounded-lg p-8 relative overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Brain className="w-8 h-8 text-blue-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-3">API Server</h3>
          <p className="text-slate-300 text-sm mb-4">Central hub for all communications</p>
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Scheduler */}
        <motion.div
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400 rounded-lg p-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Activity className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-3">Scheduler</h3>
          <p className="text-slate-300 text-sm mb-4">Assigns pods to worker nodes</p>
          <motion.div
            className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
        </motion.div>

        {/* Controller Manager */}
        <motion.div
          className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 border-2 border-green-400 rounded-lg p-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Shield className="w-8 h-8 text-green-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-3">Controller Manager</h3>
          <p className="text-slate-300 text-sm mb-4">Runs reconciliation loops</p>
          <motion.div
            className="h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </motion.div>

        {/* etcd */}
        <motion.div
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-400 rounded-lg p-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Database className="w-8 h-8 text-orange-400 mb-3" />
          <h3 className="text-xl font-bold text-white mb-3">etcd</h3>
          <p className="text-slate-300 text-sm mb-4">Persistent state database</p>
          <motion.div
            className="h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
          />
        </motion.div>
      </div>

      {/* Insight */}
      <motion.p
        className="text-center text-slate-300 max-w-3xl text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        The Control Plane is the brain of the cluster, making decisions and managing the entire system.
      </motion.p>
    </div>
  );
};

export default Slide5_ControlPlane;