import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, AlertCircle } from 'lucide-react';

const Slide6_InteractionPatterns = () => {
  const [activeFlow, setActiveFlow] = useState(0);

  const flows = [
    {
      id: 0,
      name: 'Read Heavy',
      color: 'from-blue-500 to-cyan-500',
      pattern: [
        { label: 'Write', size: 1, x: 0 },
        { label: 'Cache', size: 8, x: 100 },
        { label: 'Read', size: 8, x: 200 }
      ],
      description: 'Heavy reads served from cache'
    },
    {
      id: 1,
      name: 'Write Heavy',
      color: 'from-orange-500 to-red-500',
      pattern: [
        { label: 'Write', size: 8, x: 0 },
        { label: 'Queue', size: 6, x: 100 },
        { label: 'Store', size: 8, x: 200 }
      ],
      description: 'Writes buffered through queue'
    },
    {
      id: 2,
      name: 'Polyglot',
      color: 'from-purple-500 to-pink-500',
      pattern: [
        { label: 'SQL', size: 5, x: 0 },
        { label: 'Search', size: 5, x: 100 },
        { label: 'Graph', size: 5, x: 200 }
      ],
      description: 'Different engines for different needs'
    }
  ];

  const activeFlowData = flows[activeFlow];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400"
            animate={{
              x: [Math.random() * 1200, Math.random() * 1200],
              y: [Math.random() * 600, Math.random() * 600],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-20"
        >
          Interaction Patterns
        </motion.h1>

        {/* Flow selector */}
        <div className="flex justify-center gap-4 mb-16">
          {flows.map((flow) => (
            <motion.button
              key={flow.id}
              onClick={() => setActiveFlow(flow.id)}
              className="px-6 py-3 rounded-lg font-semibold transition-all"
              animate={{
                background: activeFlow === flow.id
                  ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                  : 'rgba(30, 41, 59, 0.6)',
                color: activeFlow === flow.id ? 'white' : 'rgba(203, 213, 225, 0.7)',
                scale: activeFlow === flow.id ? 1.05 : 1
              }}
              style={{
                '--tw-gradient-stops': activeFlow === flow.id
                  ? `rgb(59, 130, 246), rgb(34, 211, 238)`
                  : undefined
              }}
              transition={{ duration: 0.3 }}
            >
              {flow.name}
            </motion.button>
          ))}
        </div>

        {/* Visualization */}
        <motion.div
          className="max-w-4xl mx-auto"
          key={activeFlowData.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Flow diagram */}
          <div className="flex items-center justify-around mb-16 relative h-40">
            {activeFlowData.pattern.map((stage, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                {/* Database visualization */}
                <motion.div
                  className={`p-6 rounded-xl bg-gradient-to-br ${activeFlowData.color} mb-4 relative`}
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                      '0 0 40px rgba(59, 130, 246, 0.6)',
                      '0 0 20px rgba(59, 130, 246, 0.3)'
                    ]
                  }}
                  transition={{
                    delay: idx * 0.15,
                    duration: 2.5,
                    repeat: Infinity
                  }}
                >
                  <div
                    className="text-2xl font-bold text-white text-center"
                    style={{ width: `${stage.size * 8}px`, height: `${stage.size * 8}px` }}
                  >
                    {stage.size}
                  </div>
                </motion.div>

                {/* Label */}
                <p className="text-white font-semibold text-sm">{stage.label}</p>

                {/* Arrow */}
                {idx < activeFlowData.pattern.length - 1 && (
                  <motion.div
                    className="absolute"
                    style={{ left: `${35 + idx * 33}%` }}
                    animate={{ x: [0, 10, 0] }}
                    transition={{ delay: idx * 0.2, duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <motion.div
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-xl text-slate-200">{activeFlowData.description}</p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-3 bg-slate-700/50 rounded-lg"
              >
                <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Throughput</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="p-3 bg-slate-700/50 rounded-lg"
              >
                <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Latency</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="p-3 bg-slate-700/50 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Complexity</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_InteractionPatterns;