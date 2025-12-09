import React from 'react';
import { motion } from 'framer-motion';

const Slide5_ComplexityGrowth = () => {
  const stages = [
    { id: 0, db: 1, label: 'MVP', y: 450 },
    { id: 1, db: 3, label: 'Growth', y: 350 },
    { id: 2, db: 8, label: 'Scale', y: 200 },
    { id: 3, db: 15, label: 'Enterprise', y: 80 }
  ];

  const icons = ['🛢️', '🔄', '📊', '🔐', '⚡', '🔍', '📈', '🌐', '🧠', '📝', '🎯', '🔗', '💾', '🚀', '🔔'];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-4"
        >
          Complexity Grows Exponentially
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-slate-400 mb-20 text-lg"
        >
          Each stage introduces new data needs
        </motion.p>

        {/* SVG Chart */}
        <svg viewBox="0 0 1200 600" className="w-full max-w-6xl h-auto mx-auto">
          {/* Grid lines */}
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={`grid-${i}`}
              x1={100}
              y1={450 - (i * 75)}
              x2={1100}
              y2={450 - (i * 75)}
              stroke="rgba(100, 116, 139, 0.1)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}

          {/* Y-axis labels */}
          {[...Array(6)].map((_, i) => (
            <motion.text
              key={`label-${i}`}
              x="50"
              y={450 - (i * 75) + 5}
              textAnchor="end"
              fontSize="14"
              fill="rgba(203, 213, 225, 0.6)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {i * 3}
            </motion.text>
          ))}

          {/* Stage columns */}
          {stages.map((stage) => (
            <g key={stage.id}>
              {/* Column background */}
              <motion.rect
                x={150 + stage.id * 250}
                y={stage.y}
                width="180"
                height={450 - stage.y}
                fill="url(#gradient)"
                rx="8"
                initial={{ height: 0, y: 450 }}
                animate={{ height: 450 - stage.y, y: stage.y }}
                transition={{ delay: stage.id * 0.2, duration: 0.8, ease: 'easeOut' }}
              />

              {/* Database icons flowing up */}
              {[...Array(stage.db)].map((_, iconIdx) => (
                <motion.g
                  key={`icon-${iconIdx}`}
                  initial={{ opacity: 0, y: 450 }}
                  animate={{ opacity: 1, y: stage.y + 20 + (iconIdx * 30) }}
                  transition={{
                    delay: stage.id * 0.2 + iconIdx * 0.1,
                    duration: 0.6,
                    ease: 'easeOut'
                  }}
                >
                  <motion.text
                    x={150 + stage.id * 250 + 90}
                    y={stage.y + 40 + (iconIdx * 30)}
                    textAnchor="middle"
                    fontSize="24"
                    animate={{
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      delay: stage.id * 0.3 + iconIdx * 0.15,
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    {icons[iconIdx % icons.length]}
                  </motion.text>
                </motion.g>
              ))}

              {/* Stage label */}
              <motion.text
                x={150 + stage.id * 250 + 90}
                y="520"
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill="white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: stage.id * 0.2 + 0.5, duration: 0.6 }}
              >
                {stage.label}
              </motion.text>

              {/* Database count */}
              <motion.text
                x={150 + stage.id * 250 + 90}
                y="550"
                textAnchor="middle"
                fontSize="28"
                fontWeight="bold"
                fill="rgba(59, 130, 246, 1)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: stage.id * 0.3 + 0.3, duration: 0.5 }}
              >
                {stage.db}
              </motion.text>
            </g>
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>

          {/* Axis */}
          <line x1="100" y1="450" x2="1100" y2="450" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
          <line x1="100" y1="80" x2="100" y2="450" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-8 text-slate-400"
        >
          <p className="text-lg">More systems → More data requirements → More databases</p>
          <p className="text-sm mt-2 text-slate-500">Discovery becomes a critical DevOps concern</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5_ComplexityGrowth;