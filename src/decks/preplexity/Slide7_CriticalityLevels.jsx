import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, Shield } from 'lucide-react';

const Slide7_CriticalityLevels = () => {
  const [hoveredLevel, setHoveredLevel] = useState(1);

  const levels = [
    {
      id: 0,
      name: 'Critical Path',
      icon: AlertTriangle,
      color: 'from-red-600 to-red-700',
      textColor: 'text-red-300',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-700',
      percentage: 95,
      examples: ['User DB', 'Order DB', 'Payment System'],
      sla: '99.95%'
    },
    {
      id: 1,
      name: 'Important',
      icon: AlertCircle,
      color: 'from-yellow-600 to-yellow-700',
      textColor: 'text-yellow-300',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-700',
      percentage: 75,
      examples: ['Cache Layer', 'Session Store', 'Analytics'],
      sla: '99.9%'
    },
    {
      id: 2,
      name: 'Nice to Have',
      icon: Info,
      color: 'from-blue-600 to-blue-700',
      textColor: 'text-blue-300',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-700',
      percentage: 50,
      examples: ['Logs', 'Metrics', 'Backups'],
      sla: '99%'
    },
    {
      id: 3,
      name: 'Degradable',
      icon: Shield,
      color: 'from-green-600 to-green-700',
      textColor: 'text-green-300',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-700',
      percentage: 25,
      examples: ['Search Index', 'Recommendations', 'Testing DB'],
      sla: 'Best Effort'
    }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background */}
      <motion.div className="absolute inset-0 opacity-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width: '400px',
              height: '400px',
              left: `${20 + i * 30}%`,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-4"
        >
          Database Criticality Levels
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-400 mb-16"
        >
          Not all databases are equally important
        </motion.p>

        {/* Criticality bars */}
        <div className="max-w-5xl mx-auto space-y-6">
          {levels.map((level) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: level.id * 0.15, duration: 0.6 }}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(1)}
            >
              <motion.div
                className={`p-6 rounded-xl border ${level.borderColor} ${level.bgColor} cursor-pointer`}
                animate={{
                  scale: hoveredLevel === level.id ? 1.02 : 1,
                  boxShadow: hoveredLevel === level.id
                    ? '0 0 30px rgba(59, 130, 246, 0.5)'
                    : 'none'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: hoveredLevel === level.id ? 1.2 : 1,
                        rotate: hoveredLevel === level.id ? 12 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <level.icon className={`w-8 h-8 ${level.textColor}`} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{level.name}</h3>
                      <p className={`text-sm ${level.textColor}`}>SLA: {level.sla}</p>
                    </div>
                  </div>
                </div>

                {/* Percentage bar */}
                <div className="mb-4">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${level.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${level.percentage}%` }}
                    transition={{ delay: level.id * 0.15 + 0.3, duration: 0.8, ease: 'easeOut' }}
                  />
                  <motion.p
                    className="text-sm text-slate-400 mt-2"
                    animate={{ opacity: hoveredLevel === level.id ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    Importance: {level.percentage}%
                  </motion.p>
                </div>

                {/* Examples */}
                <motion.div
                  animate={{
                    maxHeight: hoveredLevel === level.id ? 'auto' : 0,
                    opacity: hoveredLevel === level.id ? 1 : 0,
                    marginTop: hoveredLevel === level.id ? 16 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-slate-300 mb-2 font-semibold">Examples:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {level.examples.map((example, idx) => (
                      <motion.div
                        key={idx}
                        className={`px-3 py-2 rounded-lg ${level.bgColor} border ${level.borderColor}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                      >
                        <p className={`text-xs ${level.textColor}`}>{example}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 text-lg">
            Categorizing databases helps prioritize monitoring, backups, and redundancy
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide7_CriticalityLevels;