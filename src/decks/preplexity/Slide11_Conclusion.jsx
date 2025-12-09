import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Database, Zap } from 'lucide-react';

const Slide11_Conclusion = () => {
  const keyPoints = [
    { icon: AlertCircle, text: 'You have more databases than you think' },
    { icon: Database, text: 'They serve different purposes' },
    { icon: Zap, text: 'Discovery requires infrastructure and discipline' },
    { icon: CheckCircle, text: 'Visibility is your first step' }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400"
            animate={{
              x: [Math.random() * 1200, Math.random() * 1200],
              y: [Math.random() * 600, Math.random() * 600],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-bold text-white mb-8"
        >
          How Many Databases?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl text-blue-400 font-bold mb-16"
        >
          More Than You Can Count Manually
        </motion.p>

        {/* Key points */}
        <div className="space-y-6 mb-16">
          {keyPoints.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.15, duration: 0.6 }}
              className="flex items-center justify-center gap-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  delay: 0.8 + idx * 0.15,
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <point.icon className="w-8 h-8 text-blue-400" />
              </motion.div>
              <p className="text-2xl text-white font-semibold">{point.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-2xl p-10 mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4">The Answer:</h2>
          <p className="text-xl text-slate-200 leading-relaxed mb-6">
            You need a <span className="font-bold text-cyan-400">discovery system</span>, not a manual count. Implement:
          </p>
          <div className="text-lg text-slate-300 space-y-2">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              ✓ Service discovery & registry
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              ✓ Observability & monitoring
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              ✓ Configuration management
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              ✓ Data lineage & mapping
            </motion.p>
          </div>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 30px rgba(59, 130, 246, 0.3)',
              '0 0 60px rgba(59, 130, 246, 0.6)',
              '0 0 30px rgba(59, 130, 246, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-2xl text-white font-bold"
        >
          Without visibility, you can't govern.
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11_Conclusion;