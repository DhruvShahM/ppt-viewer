import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, AlertCircle } from 'lucide-react';

const Slide9_Complexity = () => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const complexityData = [
    {
      operation: 'Insert',
      time: 'O(m)',
      space: 'O(1)',
      description: 'm = word length',
      color: 'blue',
    },
    {
      operation: 'Search',
      time: 'O(m)',
      space: 'O(1)',
      description: 'm = word length',
      color: 'green',
    },
    {
      operation: 'Delete',
      time: 'O(m)',
      space: 'O(1)',
      description: 'm = word length',
      color: 'yellow',
    },
    {
      operation: 'Prefix Match',
      time: 'O(p + n)',
      space: 'O(n)',
      description: 'p = prefix, n = results',
      color: 'cyan',
    },
  ];

  const comparisonData = [
    {
      structure: 'Array/HashMap',
      search: 'O(n)',
      prefix: 'O(n)',
      space: 'O(n)',
      advantage: 'Simple to implement',
    },
    {
      structure: 'Binary Search Tree',
      search: 'O(log n)',
      prefix: 'O(log n + k)',
      space: 'O(n)',
      advantage: 'Balanced search',
    },
    {
      structure: 'Trie',
      search: 'O(m)',
      prefix: 'O(p + n)',
      space: 'O(ALPHABET_SIZE × n)',
      advantage: 'Optimal for prefix ops',
      isBest: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, duration: 0.5 },
  };

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-12 overflow-hidden'>
      {/* Background */}
      <motion.div
        className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-500 to-transparent rounded-full filter blur-3xl opacity-5'
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-5xl font-bold text-white mb-4 text-center relative z-10 flex items-center gap-3'
      >
        <BarChart3 size={40} />
        Time & Space Complexity
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-lg text-slate-300 mb-12 text-center relative z-10 max-w-2xl'
      >
        How Tries stack up against other data structures
      </motion.p>

      {/* Operations Complexity */}
      <motion.div
        className='w-full max-w-5xl mb-12'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <h2 className='text-2xl font-bold text-blue-400 mb-6 relative z-10'>
          Trie Operations
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10'>
          {complexityData.map((data, idx) => (
            <motion.div
              key={idx}
              className={`bg-slate-800 border-2 border-${data.color}-500/30 rounded-lg p-6 cursor-pointer transition-all`}
              onMouseEnter={() => setHoveredRow(data.operation)}
              onMouseLeave={() => setHoveredRow(null)}
              variants={itemVariants}
              whileHover={{
                borderColor: `var(--color-${data.color}-500)`,
                backgroundColor: `rgba(var(--color-${data.color}-500-rgb, 0), 0.1)`,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <h3 className={`text-lg font-bold text-${data.color}-400 mb-2`}>
                {data.operation}
              </h3>

              <div className='space-y-3'>
                <div>
                  <p className='text-xs text-slate-500 mb-1'>Time Complexity</p>
                  <motion.p
                    className={`font-mono text-2xl font-bold text-${data.color}-300`}
                    animate={
                      hoveredRow === data.operation
                        ? { scale: [1, 1.1, 1] }
                        : {}
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {data.time}
                  </motion.p>
                </div>

                <div>
                  <p className='text-xs text-slate-500 mb-1'>Space Complexity</p>
                  <p className='font-mono text-lg text-cyan-300'>{data.space}</p>
                </div>

                <motion.p
                  className='text-sm text-slate-400 border-t border-slate-700 pt-3 mt-3'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredRow === data.operation ? 1 : 0.6 }}
                >
                  <span className='text-slate-300'>→</span> {data.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        className='w-full max-w-5xl relative z-10'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h2 className='text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2'>
          <AlertCircle size={24} />
          Comparison with Other Structures
        </h2>

        <motion.div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-700'>
                <th className='text-left px-4 py-3 text-slate-400 font-semibold'>
                  Structure
                </th>
                <th className='text-center px-4 py-3 text-slate-400 font-semibold'>
                  Search
                </th>
                <th className='text-center px-4 py-3 text-slate-400 font-semibold'>
                  Prefix Match
                </th>
                <th className='text-center px-4 py-3 text-slate-400 font-semibold'>
                  Space
                </th>
                <th className='text-left px-4 py-3 text-slate-400 font-semibold'>
                  Strength
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <motion.tr
                  key={idx}
                  className={`border-b border-slate-700/50 ${
                    row.isBest
                      ? 'bg-gradient-to-r from-green-500/10 to-transparent'
                      : 'hover:bg-slate-800/50'
                  }`}
                  onMouseEnter={() => setHoveredRow(row.structure)}
                  onMouseLeave={() => setHoveredRow(null)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + idx * 0.1 }}
                >
                  <td className='px-4 py-4'>
                    <motion.span
                      className={`font-bold ${
                        row.isBest ? 'text-green-400' : 'text-slate-300'
                      }`}
                      animate={
                        hoveredRow === row.structure
                          ? { scale: 1.05 }
                          : { scale: 1 }
                      }
                    >
                      {row.structure}
                      {row.isBest && ' ⭐'}
                    </motion.span>
                  </td>
                  <td className='text-center px-4 py-4 font-mono text-slate-300'>
                    {row.search}
                  </td>
                  <td className='text-center px-4 py-4 font-mono text-cyan-300'>
                    {row.prefix}
                  </td>
                  <td className='text-center px-4 py-4 font-mono text-slate-400'>
                    {row.space}
                  </td>
                  <td className='px-4 py-4 text-slate-400 text-sm'>
                    {row.advantage}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>

      {/* Key Insight */}
      <motion.div
        className='w-full max-w-5xl mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-6 relative z-10'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4 }}
      >
        <h3 className='font-bold text-green-300 mb-2'>💡 When to Use Tries</h3>
        <p className='text-slate-300'>
          Use Tries when you need efficient prefix matching, autocomplete, spell checking, or
          IP routing. The trade-off is higher space complexity for <span className='text-cyan-300 font-bold'>optimal string operations</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default Slide9_Complexity;