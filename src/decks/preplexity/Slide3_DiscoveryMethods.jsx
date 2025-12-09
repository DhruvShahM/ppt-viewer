import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Zap, Code, Network } from 'lucide-react';

const Slide3_DiscoveryMethods = () => {
  const [activeMethod, setActiveMethod] = useState(null);

  const methods = [
    {
      id: 0,
      icon: Eye,
      title: 'Code Review',
      color: 'from-blue-500 to-cyan-500',
      items: ['Parse connection strings', 'Scan import statements', 'Manual effort', 'Error prone']
    },
    {
      id: 1,
      icon: Zap,
      title: 'Runtime Instrumentation',
      color: 'from-purple-500 to-pink-500',
      items: ['Hook into drivers', 'Trace connections', 'Real data', 'Overhead']
    },
    {
      id: 2,
      icon: Network,
      title: 'Network Scanning',
      color: 'from-green-500 to-emerald-500',
      items: ['Monitor traffic', 'Find endpoints', 'Passive discovery', 'Infrastructure']
    },
    {
      id: 3,
      icon: Code,
      title: 'Configuration Files',
      color: 'from-orange-500 to-red-500',
      items: ['Parse configs', 'Environment vars', 'Static analysis', 'May be stale']
    }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background */}
      <motion.div className="absolute inset-0 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-slate-600"
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width: `${150 + i * 100}px`,
              height: `${150 + i * 100}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-16"
        >
          Discovery Methods
        </motion.h1>

        <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
          {methods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: method.id * 0.15, duration: 0.6 }}
              onHoverStart={() => setActiveMethod(method.id)}
              onHoverEnd={() => setActiveMethod(null)}
              className="cursor-pointer"
            >
              <motion.div
                className={`p-8 rounded-xl bg-gradient-to-br ${method.color} opacity-10 border border-slate-700 h-full`}
                animate={{
                  opacity: activeMethod === method.id ? 0.2 : 0.1,
                  scale: activeMethod === method.id ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    animate={{
                      rotate: activeMethod === method.id ? [0, 10, -10, 0] : 0,
                      scale: activeMethod === method.id ? 1.2 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <method.icon className={`w-12 h-12 bg-gradient-to-br ${method.color} bg-clip-text text-transparent`} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">{method.title}</h3>
                </div>

                <motion.div
                  animate={{
                    opacity: activeMethod === method.id ? 1 : 0.6
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {method.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: activeMethod === method.id ? 1 : 0.7,
                        x: activeMethod === method.id ? 0 : -10
                      }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="text-slate-300 text-sm mb-2 flex items-center gap-2"
                    >
                      <motion.span
                        className="w-2 h-2 rounded-full bg-white"
                        animate={{ scale: activeMethod === method.id ? [1, 1.5, 1] : 1 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center text-slate-400 text-lg"
        >
          Hover to explore each approach
        </motion.div>
      </div>
    </div>
  );
};

export default Slide3_DiscoveryMethods;