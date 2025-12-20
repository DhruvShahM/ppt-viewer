import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp, Cog } from 'lucide-react';

const Slide15_Conclusion = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      {/* Animated title */}
      <motion.h2
        className="text-6xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Kubernetes Clusters
      </motion.h2>

      <motion.p
        className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-bold mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        The Orchestration Revolution
      </motion.p>

      {/* Core pillars */}
      <div className="grid grid-cols-4 gap-6 max-w-6xl mb-16">
        {[
          { icon: Cog, label: 'Automation', color: 'from-blue-500 to-cyan-500' },
          { icon: Shield, label: 'Resilience', color: 'from-green-500 to-emerald-500' },
          { icon: TrendingUp, label: 'Scaling', color: 'from-purple-500 to-pink-500' },
          { icon: Zap, label: 'Efficiency', color: 'from-orange-500 to-red-500' },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className={`bg-gradient-to-br ${item.color}/20 border-2 border-${item.color.split(' ')[1]}/400 rounded-lg p-8 text-center`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
            >
              <item.icon className="w-12 h-12 mx-auto mb-4" style={{
                color: item.color === 'from-blue-500 to-cyan-500' ? '#22d3ee' :
                       item.color === 'from-green-500 to-emerald-500' ? '#10b981' :
                       item.color === 'from-purple-500 to-pink-500' ? '#ec4899' : '#f97316'
              }} />
            </motion.div>
            <h4 className="text-white font-bold text-lg">{item.label}</h4>
          </motion.div>
        ))}
      </div>

      {/* Key takeaways */}
      <motion.div
        className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 max-w-3xl mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h3 className="text-white text-2xl font-bold mb-6 text-center">Key Takeaways</h3>
        <ul className="space-y-4">
          {[
            'A cluster = Control Plane + Worker Nodes managing containers',
            'Pods are deployed, services provide stable networking',
            'Self-healing: failures are automatically recovered',
            'Auto-scaling: responds to real-time demand',
            'Declarative: you describe desired state, K8s makes it happen',
          ].map((point, idx) => (
            <motion.li
              key={idx}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1 + idx * 0.1 }}
            >
              <motion.span
                className="w-6 h-6 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center flex-shrink-0 font-bold text-sm"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
              >
                ✓
              </motion.span>
              <span className="text-slate-200 text-lg">{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Final statement */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      >
        <motion.p
          className="text-2xl text-slate-300 mb-8"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Kubernetes clusters are the backbone of modern DevOps and cloud-native architecture.
        </motion.p>

        <motion.div
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-slate-900 font-bold text-xl">Master the Cluster, Master Cloud Scale</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide15_Conclusion;