import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Server, BarChart3 } from 'lucide-react';

const Slide8_DataFlow = () => {
  const [animatingStep, setAnimatingStep] = useState(0);

  const steps = [
    { id: 0, icon: Server, label: 'Application', color: 'from-blue-500 to-cyan-500', x: 150 },
    { id: 1, icon: Database, label: 'Primary DB', color: 'from-green-500 to-emerald-500', x: 400 },
    { id: 2, icon: Database, label: 'Replica', color: 'from-purple-500 to-pink-500', x: 650 },
    { id: 3, icon: BarChart3, label: 'Data Warehouse', color: 'from-orange-500 to-red-500', x: 900 }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .05) 25%, rgba(59, 130, 246, .05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .05) 75%, rgba(59, 130, 246, .05) 76%, transparent 77%, transparent),
            linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .05) 25%, rgba(59, 130, 246, .05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .05) 75%, rgba(59, 130, 246, .05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-20"
        >
          Data Flow Through Databases
        </motion.h1>

        {/* Main flow diagram */}
        <div className="max-w-6xl mx-auto">
          <svg viewBox="0 0 1100 400" className="w-full h-auto">
            {/* Connection lines */}
            {steps.map((step, idx) => {
              if (idx === steps.length - 1) return null;
              const nextStep = steps[idx + 1];

              return (
                <motion.line
                  key={`line-${idx}`}
                  x1={step.x + 60}
                  y1="200"
                  x2={nextStep.x - 60}
                  y2="200"
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="3"
                  animate={{
                    strokeDashoffset: animatingStep === idx ? 0 : 100,
                    stroke: animatingStep === idx ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 0.3)',
                    strokeWidth: animatingStep === idx ? 4 : 3
                  }}
                  transition={{ duration: 0.5 }}
                  strokeDasharray="100"
                />
              );
            })}

            {/* Step nodes */}
            {steps.map((step) => {
              const isActive = animatingStep === step.id || animatingStep === step.id - 1;

              return (
                <g key={step.id}>
                  {/* Pulsing background */}
                  <motion.circle
                    cx={step.x}
                    cy="200"
                    r="50"
                    fill="rgba(59, 130, 246, 0.1)"
                    animate={{
                      r: isActive ? [50, 70, 50] : 50,
                      opacity: isActive ? [0.3, 0.6, 0.3] : 0.1
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />

                  {/* Main circle */}
                  <motion.circle
                    cx={step.x}
                    cy="200"
                    r="40"
                    fill={`url(#gradient-${step.id})`}
                    animate={{
                      r: isActive ? 45 : 40
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon */}
                  <foreignObject x={step.x - 20} y="180" width="40" height="40">
                    <motion.div
                      className="w-full h-full flex items-center justify-center"
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        rotate: isActive ? 12 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </foreignObject>

                  {/* Label */}
                  <motion.text
                    x={step.x}
                    y="280"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="white"
                    animate={{
                      fill: isActive ? 'rgba(59, 130, 246)' : 'white'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.label}
                  </motion.text>

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id={`gradient-${step.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={step.color.split(' ')[0]} />
                      <stop offset="100%" stopColor={step.color.split(' ')[1]} />
                    </linearGradient>
                  </defs>
                </g>
              );
            })}
          </svg>

          {/* Data packets flowing */}
          {[0, 1, 2, 3].map((packet) => (
            <motion.div
              key={`packet-${packet}`}
              className="absolute w-8 h-8 rounded-lg bg-blue-400 opacity-70"
              animate={{
                left: ['10%', '90%'],
                top: '200px'
              }}
              transition={{
                duration: 4,
                delay: packet * 1,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <motion.div
                className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto bg-slate-800/50 border border-slate-700 rounded-xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Typical Flow:</h3>
          <div className="space-y-2 text-slate-300">
            <p>1. <span className="font-semibold">Application</span> reads/writes to primary database</p>
            <p>2. <span className="font-semibold">Replica</span> stays in sync for failover & reads</p>
            <p>3. <span className="font-semibold">Data Warehouse</span> gets batch/streaming updates for analytics</p>
            <p className="text-slate-400 text-sm mt-4">Each stage introduces latency, consistency, and failure points</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide8_DataFlow;