import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Zap } from 'lucide-react';

const Slide10_Visualization = () => {
  const [showConnections, setShowConnections] = useState(true);

  // Generate random nodes
  const nodes = [
    { id: 0, type: 'app', label: 'API', x: 200, y: 150, color: 'from-blue-500 to-cyan-500' },
    { id: 1, type: 'db', label: 'PostgreSQL', x: 600, y: 100, color: 'from-green-500 to-emerald-500' },
    { id: 2, type: 'cache', label: 'Redis', x: 600, y: 250, color: 'from-yellow-500 to-orange-500' },
    { id: 3, type: 'search', label: 'Elasticsearch', x: 900, y: 180, color: 'from-purple-500 to-pink-500' },
    { id: 4, type: 'analytics', label: 'BigQuery', x: 900, y: 350, color: 'from-red-500 to-red-600' },
    { id: 5, type: 'cache', label: 'Memcached', x: 600, y: 400, color: 'from-pink-500 to-rose-500' },
    { id: 6, type: 'queue', label: 'Kafka', x: 300, y: 350, color: 'from-indigo-500 to-blue-500' },
    { id: 7, type: 'db', label: 'MongoDB', x: 900, y: 500, color: 'from-green-600 to-green-500' }
  ];

  const connections = [
    [0, 1], [0, 2], [0, 6], [1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [3, 4], [4, 7], [6, 5]
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
          `
        }}
      />

      <div className="relative z-10 w-full px-8">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white">System Topology</h1>
          <motion.button
            onClick={() => setShowConnections(!showConnections)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Network className="w-5 h-5" />
            {showConnections ? 'Hide' : 'Show'} Connections
          </motion.button>
        </motion.div>

        {/* SVG visualization */}
        <svg viewBox="0 0 1200 650" className="w-full max-w-6xl h-auto mx-auto">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1200" height="650" fill="url(#grid)" />

          {/* Connections */}
          {showConnections && connections.map((conn, idx) => {
            const from = nodes[conn[0]];
            const to = nodes[conn[1]];

            return (
              <g key={`conn-${idx}`}>
                {/* Animated line */}
                <motion.line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="2"
                  animate={{
                    strokeDashoffset: [100, 0],
                    stroke: ['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.1)']
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: idx * 0.2
                  }}
                  strokeDasharray="100"
                />

                {/* Flow animation */}
                <motion.circle
                  cx={from.x}
                  cy={from.y}
                  r="4"
                  fill="rgba(59, 130, 246, 0.8)"
                  animate={{
                    cx: [from.x, to.x],
                    cy: [from.y, to.y],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1,
                    repeat: Infinity,
                    delay: idx * 0.25
                  }}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node, idx) => (
            <g key={`node-${node.id}`}>
              {/* Pulse background */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="45"
                fill="rgba(59, 130, 246, 0.05)"
                animate={{
                  r: [45, 65, 45],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 3,
                  delay: idx * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Main circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="30"
                fill={`url(#grad-${node.id})`}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                animate={{
                  r: [30, 33, 30],
                  filter: ['drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))', 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))', 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))']
                }}
                transition={{
                  duration: 2 + Math.random() * 1,
                  delay: idx * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Icon */}
              <foreignObject x={node.x - 15} y={node.y - 15} width="30" height="30">
                <Zap className="w-full h-full text-white" />
              </foreignObject>

              {/* Label background */}
              <motion.rect
                x={node.x - 45}
                y={node.y + 45}
                width="90"
                height="28"
                rx="6"
                fill="rgba(30, 41, 59, 0.9)"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="1"
                animate={{
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  delay: idx * 0.1,
                  repeat: Infinity
                }}
              />

              {/* Label text */}
              <motion.text
                x={node.x}
                y={node.y + 66}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill="white"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  delay: idx * 0.1,
                  repeat: Infinity
                }}
              >
                {node.label}
              </motion.text>

              {/* Gradient definition */}
              <defs>
                <linearGradient id={`grad-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={node.color.split(' ')[0]} />
                  <stop offset="100%" stopColor={node.color.split(' ')[1]} />
                </linearGradient>
              </defs>
            </g>
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-400 text-lg">
            This is just <span className="font-bold text-blue-400">one possible topology</span>. Your system likely has <span className="font-bold text-orange-400">many more databases</span> we haven't visualized.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide10_Visualization;