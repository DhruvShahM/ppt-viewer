import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const Slide4_NodeComponents = () => {
  const [activeTab, setActiveTab] = useState('node');

  const nodeStructure = {
    node: {
      code: `class TrieNode {
  children: Map<char, TrieNode>
  isEndOfWord: boolean
  
  constructor() {
    this.children = new Map()
    this.isEndOfWord = false
  }
}`,
      explanation: [
        'children: Hash map (O(1) lookup) for child nodes',
        'isEndOfWord: Flag indicating if this node completes a word',
      ],
    },
    trie: {
      code: `class Trie {
  root: TrieNode
  
  constructor() {
    this.root = new TrieNode()
  }
  
  insert(word: string) { ... }
  search(word: string) { ... }
  startsWith(prefix: string) { ... }
}`,
      explanation: [
        'Root: Empty node serving as entry point',
        'Operations: Insert, search, and prefix matching',
      ],
    },
  };

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
      {/* Background glow */}
      <motion.div
        className='absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-10'
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-5xl font-bold text-white mb-2 text-center relative z-10'
      >
        Node Structure
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-lg text-slate-300 mb-12 text-center relative z-10'
      >
        Building blocks of a Trie
      </motion.p>

      {/* Tabs */}
      <motion.div
        className='flex gap-4 mb-8 relative z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {['node', 'trie'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab === 'node' ? 'TrieNode' : 'Trie Class'}
          </motion.button>
        ))}
      </motion.div>

      {/* Content area */}
      <motion.div
        className='max-w-4xl w-full grid grid-cols-2 gap-8 relative z-10'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Code block */}
        <motion.div
          className='bg-slate-800 border border-slate-700 rounded-xl p-6 overflow-hidden'
          variants={itemVariants}
          key={`code-${activeTab}`}
        >
          <div className='flex items-center gap-2 mb-4'>
            <Code size={20} className='text-purple-400' />
            <h3 className='text-lg font-bold text-purple-400'>
              {activeTab === 'node' ? 'TrieNode Class' : 'Trie Class'}
            </h3>
          </div>

          <motion.pre
            className='text-sm font-mono text-slate-300 overflow-x-auto'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <code>{nodeStructure[activeTab].code}</code>
          </motion.pre>
        </motion.div>

        {/* Explanation */}
        <motion.div
          className='space-y-4'
          variants={itemVariants}
          key={`exp-${activeTab}`}
        >
          {nodeStructure[activeTab].explanation.map((item, idx) => (
            <motion.div
              key={idx}
              className='bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-4'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              whileHover={{
                borderColor: 'rgba(59, 130, 246, 0.8)',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
              }}
            >
              <motion.div
                className='flex gap-3'
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className='text-blue-400 font-bold flex-shrink-0'>→</span>
                <p className='text-slate-300'>{item}</p>
              </motion.div>
            </motion.div>
          ))}

          {/* Memory visualization */}
          <motion.div
            className='bg-slate-800 border border-slate-700 rounded-lg p-4 mt-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h4 className='text-sm font-bold text-cyan-400 mb-3'>Memory Layout</h4>
            <motion.div className='space-y-2'>
              <div className='flex gap-2 items-center'>
                <motion.div
                  className='w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-xs font-bold text-white'
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Map
                </motion.div>
                <span className='text-xs text-slate-400'>children (pointers)</span>
              </div>
              <div className='flex gap-2 items-center'>
                <motion.div
                  className='w-12 h-8 bg-green-500 rounded flex items-center justify-center text-xs font-bold text-white'
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                >
                  Bool
                </motion.div>
                <span className='text-xs text-slate-400'>isEndOfWord flag</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide4_NodeComponents;