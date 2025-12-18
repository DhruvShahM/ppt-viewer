

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Lightbulb } from 'lucide-react';

const Slide9_NeuroOptimization = () => {
  // Brain regions that activate with positive scenario thinking
  const brainRegions = [
    { name: "Prefrontal Cortex", activity: 85, function: "Decision making & planning" },
    { name: "Anterior Cingulate", activity: 92, function: "Emotional regulation" },
    { name: "Nucleus Accumbens", activity: 78, function: "Reward processing" },
    { name: "Hippocampus", activity: 88, function: "Memory & learning" }
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center p-12">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-5xl font-bold text-white mb-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          Neuro-Optimization
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="grid grid-cols-2 gap-12">
          {/* Left: Brain visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative h-96"
          >
            {/* Animated brain diagram */}
            <svg className="w-full h-full" viewBox="0 0 300 300">
              {/* Brain outline - simplified */}
              <g opacity="0.3">
                <ellipse cx="150" cy="150" rx="80" ry="100" fill="none" stroke="#9ca3af" strokeWidth="2" />
                <path d="M 130 100 Q 120 120 130 140 Q 140 130 150 140 Q 160 130 170 140 Q 180 120 170 100" fill="none" stroke="#9ca3af" strokeWidth="1" />
              </g>

              {/* Active neural nodes */}
              {[
                { x: 150, y: 100, size: 12, label: "PFC" },
                { x: 200, y: 140, size: 10, label: "ACC" },
                { x: 100, y: 160, size: 11, label: "NAcc" },
                { x: 150, y: 200, size: 9, label: "Hippo" }
              ].map((node, i) => (
                <motion.g key={i}>
                  {/* Pulse circles */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill="#60a5fa"
                    opacity="0.6"
                    animate={{ r: [node.size, node.size * 1.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Main node */}
                  <circle cx={node.x} cy={node.y} r={node.size} fill="#3b82f6" />

                  {/* Connecting line to others */}
                  {i > 0 && (
                    <motion.line
                      x1={node.x}
                      y1={node.y}
                      x2={150 + Math.cos(i) * 60}
                      y2={150 + Math.sin(i) * 60}
                      stroke="#60a5fa"
                      strokeWidth="1"
                      opacity="0.5"
                      strokeDasharray="5,5"
                      animate={{ strokeDashoffset: [0, -10] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.g>
              ))}
            </svg>

            {/* Bottom label */}
            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="text-sm text-gray-400">Brain activity during optimistic scenario visualization</p>
            </motion.div>
          </motion.div>

          {/* Right: Neural region data */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col justify-center gap-4"
          >
            {brainRegions.map((region, i) => (
              <motion.div
                key={i}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold text-sm">{region.name}</h4>
                    <p className="text-gray-400 text-xs">{region.function}</p>
                  </div>
                  <motion.span
                    className="text-blue-400 font-bold text-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                  >
                    {region.activity}%
                  </motion.span>
                </div>

                {/* Activity bar */}
                <div className="bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${region.activity}%` }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Key insight */}
            <motion.div
              className="mt-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-purple-300 text-sm font-semibold mb-1">Neuroplasticity Revolution</p>
                  <p className="text-gray-300 text-xs">
                    Consistent positive scenario visualization rewires neural pathways. Future therapies will use VR to train brains for resilience at scale.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide9_NeuroOptimization;