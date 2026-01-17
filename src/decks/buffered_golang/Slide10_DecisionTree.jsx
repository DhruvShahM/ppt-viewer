import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Slide10_DecisionTree = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white text-center mb-12"
        >
          Decision Tree: Which Channel?
        </motion.h1>

        {/* Decision tree */}
        <div className="flex flex-col items-center space-y-8">
          {/* Start */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            onMouseEnter={() => setHoveredNode('start')}
            onMouseLeave={() => setHoveredNode(null)}
            className="p-6 rounded-lg bg-blue-600/20 border-2 border-blue-500 text-white font-bold text-center cursor-pointer"
          >
            Do you need synchronization?
          </motion.div>

          {/* Arrow down */}
          <motion.div
            animate={{ y: hoveredNode === 'start' ? [0, 5, 0] : 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ChevronDown size={32} className="text-slate-400" />
          </motion.div>

          {/* Two branches */}
          <div className="grid grid-cols-2 gap-16 w-full max-w-4xl">
            {/* Left: Tight coupling */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              onMouseEnter={() => setHoveredNode('tight')}
              onMouseLeave={() => setHoveredNode(null)}
              className="flex flex-col items-center space-y-6"
            >
              <div className="p-6 rounded-lg bg-purple-600/20 border-2 border-purple-500 text-white font-bold text-center cursor-pointer w-full">
                Goroutines must wait for each other?
              </div>

              <ChevronDown size={24} className="text-slate-400" />

              <motion.div
                animate={{
                  scale: hoveredNode === 'tight' ? 1.05 : 1,
                  boxShadow: hoveredNode === 'tight'
                    ? '0 0 20px rgba(139, 92, 246, 0.6)'
                    : '0 0 10px rgba(139, 92, 246, 0.3)',
                }}
                className="p-6 rounded-lg bg-gradient-to-br from-purple-600/30 to-purple-600/10 border-2 border-purple-400 text-white font-bold text-center w-full"
              >
                <p className="text-2xl mb-2">🔄</p>
                <p>UNBUFFERED</p>
                <p className="text-sm font-normal text-slate-300 mt-2">
                  {`make(chan T)`}
                </p>
              </motion.div>

              <p className="text-slate-400 text-sm text-center">
                Synchronous handshake, tight coupling, goroutines block
              </p>
            </motion.div>

            {/* Right: Loose coupling */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              onMouseEnter={() => setHoveredNode('loose')}
              onMouseLeave={() => setHoveredNode(null)}
              className="flex flex-col items-center space-y-6"
            >
              <div className="p-6 rounded-lg bg-cyan-600/20 border-2 border-cyan-500 text-white font-bold text-center cursor-pointer w-full">
                Different speeds / rates?
              </div>

              <ChevronDown size={24} className="text-slate-400" />

              <motion.div
                animate={{
                  scale: hoveredNode === 'loose' ? 1.05 : 1,
                  boxShadow: hoveredNode === 'loose'
                    ? '0 0 20px rgba(34, 197, 94, 0.6)'
                    : '0 0 10px rgba(34, 197, 94, 0.3)',
                }}
                className="p-6 rounded-lg bg-gradient-to-br from-green-600/30 to-green-600/10 border-2 border-green-400 text-white font-bold text-center w-full"
              >
                <p className="text-2xl mb-2">📦</p>
                <p>BUFFERED</p>
                <p className="text-sm font-normal text-slate-300 mt-2">
                  {`make(chan T, capacity)`}
                </p>
              </motion.div>

              <p className="text-slate-400 text-sm text-center">
                Asynchronous queue, loose coupling, decoupling
              </p>
            </motion.div>
          </div>
        </div>

        {/* Summary table at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 rounded-lg border border-slate-700 bg-slate-800/50"
        >
          <p className="text-slate-300 text-sm text-center">
            <span className="text-green-400 font-bold">Rule of thumb:</span> Start with{' '}
            <span className="text-purple-400">unbuffered</span> for synchronization,{' '}
            <span className="text-green-400">buffered</span> for decoupling. Choose based on your goroutine interaction pattern.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide10_DecisionTree;