import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';

const Slide7_PrefixMatching = () => {
  const [selectedPrefix, setSelectedPrefix] = useState('CA');
  const allWords = ['CAT', 'CAR', 'CAP', 'CAN', 'DOG', 'DO', 'APPLE'];
  const matchingWords = {
    CA: ['CAT', 'CAR', 'CAP', 'CAN'],
    DO: ['DOG', 'DO'],
    AP: ['APPLE'],
    '': allWords,
  };

  const currentMatches = matchingWords[selectedPrefix] || [];

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-12 overflow-hidden'>
      {/* Background */}
      <motion.div
        className='absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10'
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-5xl font-bold text-white mb-2 text-center relative z-10'
      >
        Prefix Matching
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-lg text-slate-300 mb-12 text-center relative z-10'
      >
        Find all words starting with a given prefix
      </motion.p>

      <div className='flex gap-16 w-full max-w-6xl relative z-10'>
        {/* Trie Visualization */}
        <motion.div
          className='flex-1 flex items-center justify-center'
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <svg width='100%' height='450' viewBox='0 0 200 450' className='overflow-visible'>
            {/* Edges */}
            {[
              { from: [100, 50], to: [50, 150] },
              { from: [100, 50], to: [150, 150] },
              { from: [50, 150], to: [30, 250] },
              { from: [150, 150], to: [150, 250] },
              { from: [30, 250], to: [10, 350] },
              { from: [30, 250], to: [30, 350] },
              { from: [30, 250], to: [50, 350] },
              { from: [30, 250], to: [70, 350] },
              { from: [150, 250], to: [150, 350] },
            ].map((edge, idx) => (
              <motion.line
                key={`edge-${idx}`}
                x1={edge.from[0]}
                y1={edge.from[1]}
                x2={edge.to[0]}
                y2={edge.to[1]}
                stroke='#64748b'
                strokeWidth='2'
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: idx * 0.03 }}
              />
            ))}

            {/* Nodes */}
            {[
              { id: 'ROOT', x: 100, y: 50, label: 'ROOT' },
              { id: 'C', x: 50, y: 150, label: 'C', highlight: selectedPrefix[0] === 'C' },
              { id: 'D', x: 150, y: 150, label: 'D', highlight: selectedPrefix[0] === 'D' },
              { id: 'A', x: 30, y: 250, label: 'A', highlight: selectedPrefix === 'CA' },
              { id: 'O', x: 150, y: 250, label: 'O', highlight: selectedPrefix === 'DO' },
              { id: 'T', x: 10, y: 350, label: 'T', isEnd: true },
              { id: 'R', x: 30, y: 350, label: 'R', isEnd: true },
              { id: 'P', x: 50, y: 350, label: 'P', isEnd: true },
              { id: 'N', x: 70, y: 350, label: 'N', isEnd: true },
              { id: 'G', x: 150, y: 350, label: 'G', isEnd: true },
            ].map((node, idx) => (
              <motion.g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r='16'
                  fill={
                    node.highlight
                      ? '#3b82f6'
                      : currentMatches.some(
                        (w) =>
                          w.startsWith(selectedPrefix) &&
                          selectedPrefix.length > 0 &&
                          w.includes(node.label)
                      )
                        ? '#10b981'
                        : '#475569'
                  }
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.04 }}
                />

                <motion.text
                  x={node.x}
                  y={node.y}
                  textAnchor='middle'
                  dominantBaseline='middle'
                  fill='white'
                  fontSize='12'
                  fontWeight='bold'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.04 + 0.15 }}
                >
                  {node.label}
                </motion.text>

                {node.isEnd && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y - 20}
                    r='4'
                    fill='#f59e0b'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.04 + 0.2 }}
                  />
                )}
              </motion.g>
            ))}
          </svg>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className='flex-1 space-y-6'
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Input */}
          <motion.div
            className='bg-slate-800 border border-slate-700 rounded-lg p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className='block text-sm font-bold text-slate-400 mb-3'>
              Enter Prefix:
            </label>
            <div className='flex gap-2'>
              <input
                type='text'
                value={selectedPrefix}
                onChange={(e) => setSelectedPrefix(e.target.value.toUpperCase())}
                maxLength='2'
                placeholder='e.g., CA'
                className='flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500 font-mono font-bold focus:outline-none focus:border-blue-500'
              />
              <motion.button
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded flex items-center gap-2'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPrefix('')}
              >
                <Filter size={16} />
                Clear
              </motion.button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            className='bg-slate-800 border border-slate-700 rounded-lg p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className='text-sm font-bold text-cyan-400 mb-3'>
              Prefix: <span className='text-white'>"{selectedPrefix || 'all'}"</span>
            </h3>

            <div className='space-y-2'>
              <AnimatePresence>
                {currentMatches.length > 0 ? (
                  currentMatches.map((word, idx) => (
                    <motion.div
                      key={word}
                      className='bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded px-3 py-2'
                      initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <p className='text-slate-300 font-mono text-sm'>
                        {selectedPrefix && (
                          <span className='text-cyan-400 font-bold'>{selectedPrefix}</span>
                        )}
                        <span className='text-green-300'>{word.slice(selectedPrefix.length)}</span>
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <motion.p
                    className='text-slate-400 text-sm'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    No matches found
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.div
                className='mt-4 pt-3 border-t border-slate-700'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className='text-slate-400 text-xs'>
                  Found <span className='text-blue-400 font-bold'>{currentMatches.length}</span> result
                  {currentMatches.length !== 1 ? 's' : ''}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Key insight */}
          <motion.div
            className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h4 className='text-xs font-bold text-purple-300 mb-2'>💡 Key Insight</h4>
            <p className='text-xs text-slate-300'>
              Navigate to the prefix node, then get all words from that subtree. This is <span className='text-purple-300 font-bold'>sub-linear</span> performance!
            </p>
          </motion.div>

          {/* Complexity */}
          <motion.div
            className='bg-slate-800 border border-slate-700 rounded-lg p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className='text-xs text-slate-400 mb-1'>Time Complexity</p>
            <p className='font-mono text-sm text-green-400'>
              O(p + n) - p = prefix, n = results
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide7_PrefixMatching;