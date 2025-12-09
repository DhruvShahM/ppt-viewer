import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, CheckCircle } from 'lucide-react';

const Slide2_Problem = () => {
  const [selectedApproach, setSelectedApproach] = React.useState(null);

  const approaches = [
    {
      id: 'array',
      name: 'Array/Hash Map',
      problem: 'No prefix matching',
      time: 'O(n) to find all',
    },
    {
      id: 'bst',
      name: 'Binary Search Tree',
      problem: 'O(log n) per char',
      time: 'O(m log n) total',
    },
    {
      id: 'trie',
      name: 'Trie',
      problem: 'None!',
      time: 'O(m) - optimal',
      isOptimal: true,
    },
  ];

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-12 overflow-hidden relative'>
      {/* Background elements */}
      <motion.div
        className='absolute top-20 right-20 w-96 h-96 bg-red-500 rounded-full filter blur-3xl opacity-10'
        animate={{
          y: [0, 30, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div
        className='absolute bottom-20 left-20 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-10'
        animate={{
          y: [30, 0, 30],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-5xl font-bold text-white mb-4 text-center'
      >
        🔍 The String Search Problem
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-xl text-slate-300 mb-16 text-center max-w-2xl'
      >
        How do we efficiently search, autocomplete, and match prefixes in massive datasets?
      </motion.p>

      {/* Problem statement */}
      <motion.div
        className='bg-slate-800 border border-slate-700 rounded-lg p-8 mb-16 max-w-4xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className='text-slate-300 text-lg mb-4'>
          <strong className='text-blue-400'>Given:</strong> Dictionary of 1M words
        </p>
        <p className='text-slate-300 text-lg mb-4'>
          <strong className='text-blue-400'>Find all words:</strong> Starting with "pre" (prefix match)
        </p>
        <p className='text-slate-300 text-lg'>
          <strong className='text-blue-400'>Performance requirement:</strong> Sub-millisecond
        </p>
      </motion.div>

      {/* Approaches comparison */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full'>
        {approaches.map((approach, idx) => (
          <motion.div
            key={approach.id}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
              approach.isOptimal
                ? 'border-green-500 bg-gradient-to-br from-green-900/20 to-transparent'
                : 'border-slate-700 hover:border-slate-600 bg-slate-800/40'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.15 }}
            onClick={() => setSelectedApproach(approach.id)}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <h3 className='text-lg font-bold text-white mb-3'>{approach.name}</h3>

            <div className='space-y-3'>
              <div className='flex items-start gap-2'>
                {approach.isOptimal ? (
                  <CheckCircle size={20} className='text-green-400 mt-1 flex-shrink-0' />
                ) : (
                  <X size={20} className='text-red-400 mt-1 flex-shrink-0' />
                )}
                <p
                  className={`text-sm ${
                    approach.isOptimal ? 'text-green-300' : 'text-red-300'
                  }`}
                >
                  {approach.problem}
                </p>
              </div>

              <motion.div
                className={`p-3 rounded-lg ${
                  approach.isOptimal
                    ? 'bg-green-500/20 border border-green-500/50'
                    : 'bg-slate-700/50'
                }`}
                animate={approach.isOptimal ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className={`font-mono text-sm ${approach.isOptimal ? 'text-green-300' : 'text-slate-400'}`}>
                  {approach.time}
                </p>
              </motion.div>
            </div>

            {approach.isOptimal && (
              <motion.div
                className='absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold'
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                OPTIMAL
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className='mt-16 text-center'
      >
        <p className='text-slate-400 text-lg'>
          Meet the solution: A <span className='text-blue-400 font-bold'>Trie</span>
        </p>
        <motion.div
          className='mt-4 inline-block'
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <span className='text-3xl'>↓</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide2_Problem;