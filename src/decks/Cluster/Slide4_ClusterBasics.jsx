import React from 'react';
import { motion } from 'framer-motion';
import { Server, Boxes } from 'lucide-react';

const Slide4_ClusterBasics = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden p-20">
      <motion.h2
        className="text-5xl font-bold text-white mb-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        What is a Cluster?
      </motion.h2>

      {/* Cluster diagram */}
      <div className="relative w-full max-w-5xl h-96 mb-12">
        {/* Control Plane */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400 rounded-lg flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Server className="w-8 h-8 text-purple-400 mb-2" />
          <h3 className="text-white font-bold text-lg">Control Plane</h3>
          <p className="text-purple-300 text-xs mt-1">(Master)</p>
        </motion.div>

        {/* Worker nodes */}
        {[0, 1, 2].map((idx) => {
          const positions = [
            'left-0 bottom-0',
            'left-1/2 transform -translate-x-1/2 bottom-0',
            'right-0 bottom-0',
          ];

          return (
            <motion.div
              key={idx}
              className={`absolute ${positions[idx]} w-56 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400 rounded-lg p-4`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + idx * 0.15 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Boxes className="w-6 h-6 text-cyan-400" />
                <span className="text-white font-bold">Worker Node {idx + 1}</span>
              </div>

              {/* Animated pods */}
              <div className="flex gap-2">
                {[0, 1].map((podIdx) => (
                  <motion.div
                    key={podIdx}
                    className="w-12 h-12 bg-slate-700 border border-cyan-400 rounded flex items-center justify-center text-xs text-cyan-300 font-bold"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3 + podIdx * 0.1,
                    }}
                  >
                    Pod
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.line
            x1="50%"
            y1="30%"
            x2="25%"
            y2="60%"
            stroke="url(#gradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.line
            x1="50%"
            y1="30%"
            x2="50%"
            y2="60%"
            stroke="url(#gradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.line
            x1="50%"
            y1="30%"
            x2="75%"
            y2="60%"
            stroke="url(#gradient1)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
          <defs>
            <linearGradient id="gradient1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Definition */}
      <motion.div
        className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-8 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <p className="text-white text-lg text-center">
          A <span className="text-cyan-400 font-bold">Kubernetes Cluster</span> is a set of machines (Control Plane + Worker Nodes) managed together to run containerized applications.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide4_ClusterBasics;