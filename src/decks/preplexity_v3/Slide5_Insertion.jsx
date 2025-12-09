import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, RotateCcw } from 'lucide-react';

const Slide5_Insertion = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);
  const word = 'CAT';
  const totalSteps = word.length * 2 + 3;

  const steps = [
    { label: 'Start at ROOT', description: 'Initialize from root node' },
    { label: `Insert 'C'`, description: 'Create child C with big impact' },
    { label: `Move to C`, description: 'Traverse to node C' },
    { label: `Insert 'A'`, description: 'Expand to child A' },
    { label: `Move to A`, description: 'Traverse to node A' },
    { label: `Insert 'T'`, description: 'Finalize with child T' },
    { label: `Move to T`, description: 'Traverse to node T' },
    { label: `Mark End`, description: 'Set isEndOfWord = true' },
  ];

  useEffect(() => {
    let timer;
    if (isAnimating && step < steps.length) {
      timer = setTimeout(() => setStep(step + 1), 800);
    }
    return () => clearTimeout(timer);
  }, [isAnimating, step]);

  const currentNodeIndex = Math.floor((step - 1) / 2);
  const currentNode = ['ROOT', 'C', 'A', 'T'][Math.min(currentNodeIndex, 3)];

  const nodePositions = {
    ROOT: { x: 100, y: 30 },
    C: { x: 50, y: 100 },
    A: { x: 100, y: 180 },
    T: { x: 150, y: 260 },
  };

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-12 overflow-hidden'>
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-5xl font-bold text-white mb-2 text-center relative z-10'
      >
        Inserting a Word: "{word}"
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-lg text-slate-300 mb-8 text-center relative z-10'
      >
        Step-by-step insertion process
      </motion.p>

      <div className='flex gap-12 w-full max-w-6xl relative z-10'>
        {/* Visualization */}
        <motion.div
          className='flex-1 flex items-center justify-center'
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <svg width='100%' height='350' viewBox='0 0 200 350' className='overflow-visible'>
            {/* Edges */}
            {['C', 'A', 'T'].map((char, idx) => {
              const fromPos = nodePositions[['ROOT', 'C', 'A'][idx]];
              const toPos = nodePositions[char];
              return (
                <motion.line
                  key={`edge-${char}`}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke='#64748b'
                  strokeWidth='2'
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: step >= (idx + 1) * 2 ? 1 : 0.2,
                  }}
                  transition={{ duration: 0.4 }}
                />
              );
            })}

            {/* Nodes */}
            {['ROOT', 'C', 'A', 'T'].map((node, idx) => {
              const pos = nodePositions[node];
              const isActive = node === currentNode;
              const isCompleted =
                step > (idx === 0 ? 1 : (idx) * 2 + 1);

              return (
                <g key={node}>
                  {/* Node circle */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r='18'
                    fill={
                      isActive
                        ? '#3b82f6'
                        : isCompleted
                          ? '#10b981'
                          : '#475569'
                    }
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.3 }}
                  />

                  {/* Node label */}
                  <motion.text
                    x={pos.x}
                    y={pos.y}
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fill='white'
                    fontSize='14'
                    fontWeight='bold'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.3 + 0.1 }}
                  >
                    {node}
                  </motion.text>

                  {/* Active glow */}
                  {isActive && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r='18'
                      fill='none'
                      stroke='#3b82f6'
                      strokeWidth='2'
                      animate={{
                        r: [18, 30, 18],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                      }}
                    />
                  )}

                  {/* Completed check */}
                  {isCompleted && !isActive && (
                    <motion.text
                      x={pos.x + 12}
                      y={pos.y - 12}
                      fill='#10b981'
                      fontSize='16'
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓
                    </motion.text>
                  )}
                </g>
              );
            })}

            {/* End of word flag */}
            {step === steps.length - 1 && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.circle
                  cx={nodePositions.T.x}
                  cy={nodePositions.T.y - 35}
                  r='8'
                  fill='#f59e0b'
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                <text
                  x={nodePositions.T.x}
                  y={nodePositions.T.y - 50}
                  textAnchor='middle'
                  fill='#f59e0b'
                  fontSize='11'
                  fontWeight='bold'
                >
                  isEndOfWord
                </text>
              </motion.g>
            )}
          </svg>
        </motion.div>

        {/* Steps panel */}
        <motion.div
          className='flex-1 space-y-4'
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Current step */}
          <motion.div
            className='bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-500/50 rounded-xl p-6 mb-6'
            key={`step-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className='text-2xl font-bold text-blue-300 mb-2'>
              {steps[step]?.label}
            </h3>
            <p className='text-slate-300'>{steps[step]?.description}</p>
            <p className='text-sm text-slate-400 mt-2'>
              Step {step + 1} / {steps.length}
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div className='bg-slate-800 rounded-full h-2 overflow-hidden'>
            <motion.div
              className='h-full bg-gradient-to-r from-blue-500 to-purple-500'
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Controls */}
          <div className='flex gap-4 mt-8'>
            <motion.button
              onClick={() => {
                setIsAnimating(!isAnimating);
              }}
              className='flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayCircle size={18} />
              {isAnimating ? 'Pause' : 'Play'}
            </motion.button>

            <motion.button
              onClick={() => {
                setStep(0);
                setIsAnimating(false);
              }}
              className='flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={18} />
              Reset
            </motion.button>
          </div>

          {/* Time complexity */}
          <motion.div
            className='bg-slate-800 border border-slate-700 rounded-lg p-4 mt-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className='text-xs text-slate-400 mb-1'>Time Complexity</p>
            <p className='font-mono text-lg text-green-400'>O(m) - m = word length</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5_Insertion;