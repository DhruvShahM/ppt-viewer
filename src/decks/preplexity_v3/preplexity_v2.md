Now I'll generate all the animated React components:

## Slide1_Title.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tree } from 'lucide-react';

const Slide1_Title = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.5, rotateZ: -180 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    }),
  };

  const title = 'TRIE'.split('');

  return (
    <div className='relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden'>
      {/* Animated background grid */}
      <motion.div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage:
            'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
        }}
        animate={{
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-2 h-2 bg-blue-400 rounded-full'
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        className='relative z-10 text-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Icon with glow */}
        <motion.div
          className='mb-12 flex justify-center'
          animate={{
            scale: [1, 1.1, 1],
            filter: [
              'drop-shadow(0 0 20px rgba(59, 130, 246, 0))',
              'drop-shadow(0 0 40px rgba(59, 130, 246, 0.6))',
              'drop-shadow(0 0 20px rgba(59, 130, 246, 0))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Tree size={80} className='text-blue-400' strokeWidth={1.5} />
        </motion.div>

        {/* Title with letter animation */}
        <div className='flex justify-center gap-4 mb-6'>
          {title.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial='hidden'
              animate='visible'
              className='text-9xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className='text-2xl text-slate-300 font-light tracking-widest mb-8'
        >
          Data Structure in Depth
        </motion.p>

        {/* Tagline */}
        <motion.div
          variants={itemVariants}
          className='flex items-center justify-center gap-2 text-slate-400'
        >
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className='w-2 h-2 bg-green-400 rounded-full'
          />
          <span>Efficient String Search & Prefix Matching</span>
        </motion.div>
      </motion.div>

      {/* Cursor glow effect */}
      <motion.div
        className='fixed w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 pointer-events-none'
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          mass: 0.2,
        }}
      />
    </div>
  );
};

export default Slide1_Title;
```

## Slide2_Problem.jsx
```jsx
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
```

## Slide3_TrieStructure.jsx
```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Slide3_TrieStructure = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Visual representation of trie nodes
  const nodes = [
    { id: 'root', label: 'ROOT', x: 50, y: 10, children: ['a', 'b', 'c'] },
    { id: 'a', label: 'A', x: 25, y: 35, parent: 'root', children: ['ap', 'at'] },
    { id: 'b', label: 'B', x: 50, y: 35, parent: 'root', children: ['bat'] },
    { id: 'c', label: 'C', x: 75, y: 35, parent: 'root', children: ['cat'] },
    { id: 'ap', label: 'P', x: 15, y: 60, parent: 'a', children: ['app'] },
    { id: 'at', label: 'T', x: 35, y: 60, parent: 'a', children: [] },
    { id: 'bat', label: 'T', x: 50, y: 60, parent: 'b', children: [] },
    { id: 'cat', label: 'T', x: 75, y: 60, parent: 'c', children: [] },
    { id: 'app', label: 'P', x: 15, y: 85, parent: 'ap', children: [] },
  ];

  const edges = [
    { from: 'root', to: 'a' },
    { from: 'root', to: 'b' },
    { from: 'root', to: 'c' },
    { from: 'a', to: 'ap' },
    { from: 'a', to: 'at' },
    { from: 'b', to: 'bat' },
    { from: 'c', to: 'cat' },
    { from: 'ap', to: 'app' },
  ];

  const words = ['app', 'apple', 'bat', 'cat', 'at'];

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-12 overflow-hidden'>
      {/* Animated background */}
      <motion.div
        className='absolute inset-0 opacity-5'
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-5xl font-bold text-white mb-2 text-center relative z-10'
      >
        Trie Structure
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-xl text-slate-300 mb-12 text-center relative z-10'
      >
        A tree of characters, one character per node
      </motion.p>

      <div className='flex gap-16 relative z-10 w-full max-w-6xl'>
        {/* Left: Visual Tree */}
        <motion.div
          className='flex-1 flex items-center justify-center'
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <svg width='100%' height='500' viewBox='0 0 300 500' className='overflow-visible'>
            {/* Edges */}
            {edges.map((edge, idx) => {
              const fromNode = nodes.find((n) => n.id === edge.from);
              const toNode = nodes.find((n) => n.id === edge.to);
              return (
                <motion.line
                  key={`edge-${idx}`}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke='#64748b'
                  strokeWidth='2'
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.05, duration: 0.5 }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node, idx) => (
              <g key={node.id}>
                <motion.circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r='20'
                  fill={
                    hoveredNode === node.id
                      ? '#3b82f6'
                      : node.id === 'root'
                        ? '#8b5cf6'
                        : '#0ea5e9'
                  }
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 + idx * 0.08 }}
                  whileHover={{
                    scale: 1.3,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
                  }}
                  className='cursor-pointer'
                  style={{
                    filter:
                      hoveredNode === node.id ? 'drop-shadow(0 0 10px #3b82f6)' : 'none',
                  }}
                />
                <motion.text
                  x={`${node.x}%`}
                  y={`${node.y}%`}
                  textAnchor='middle'
                  dominantBaseline='middle'
                  fill='white'
                  fontSize='12'
                  fontWeight='bold'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + idx * 0.08 }}
                >
                  {node.label}
                </motion.text>
              </g>
            ))}
          </svg>
        </motion.div>

        {/* Right: Properties & Examples */}
        <motion.div
          className='flex-1 space-y-6'
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Properties */}
          <div className='bg-slate-800/50 border border-slate-700 rounded-lg p-6'>
            <h3 className='text-xl font-bold text-blue-400 mb-4'>Key Properties</h3>
            <motion.ul className='space-y-2'>
              {[
                'Root node represents empty string',
                'Each node has up to 26 children (a-z)',
                'Edges labeled with characters',
                'Leaf nodes mark word endings',
                'Can share prefixes efficiently',
              ].map((prop, idx) => (
                <motion.li
                  key={idx}
                  className='text-slate-300 flex gap-3'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                >
                  <motion.span
                    className='text-green-400 font-bold flex-shrink-0'
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                  >
                    ✓
                  </motion.span>
                  <span>{prop}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Example words */}
          <div className='bg-slate-800/50 border border-slate-700 rounded-lg p-6'>
            <h3 className='text-xl font-bold text-cyan-400 mb-4'>Words Stored</h3>
            <div className='space-y-2'>
              {words.map((word, idx) => (
                <motion.div
                  key={word}
                  className='bg-slate-700/50 p-2 rounded text-slate-300 font-mono text-sm'
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + idx * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                >
                  {word}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide3_TrieStructure;
```

## Slide4_NodeComponents.jsx
```jsx
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
```

## Slide5_Insertion.jsx
```jsx
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
    { label: `Insert 'C'`, description: 'Create child C if not exists' },
    { label: `Move to C`, description: 'Traverse to node C' },
    { label: `Insert 'A'`, description: 'Create child A from C' },
    { label: `Move to A`, description: 'Traverse to node A' },
    { label: `Insert 'T'`, description: 'Create child T from A' },
    { label: `Move to T`, description: 'Traverse to node T' },
    { label: `Mark End`, description: 'Set isEndOfWord = true' },
    { label: 'Complete!', description: 'Word "CAT" inserted' },
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
    ROOT: { x: 50, y: 20 },
    C: { x: 30, y: 45 },
    A: { x: 50, y: 45 },
    T: { x: 70, y: 45 },
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
```

## Slide6_Search.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle } from 'lucide-react';

const Slide6_Search = () => {
  const [searchWord, setSearchWord] = useState('CAT');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [searchResult, setSearchResult] = useState(null);

  const words = ['CAT', 'CAR', 'DOG', 'CAP'];
  const searchableWords = ['CAT', 'CAR', 'CAP'];

  useEffect(() => {
    if (!isSearching) return;

    let timer;
    const maxSteps = searchWord.length * 2 + 2;

    if (searchStep < maxSteps) {
      timer = setTimeout(() => {
        setSearchStep(searchStep + 1);
      }, 600);
    } else {
      // Search complete
      const found = searchableWords.includes(searchWord);
      setSearchResult(found ? 'FOUND' : 'NOT FOUND');
    }

    return () => clearTimeout(timer);
  }, [isSearching, searchStep, searchWord]);

  const handleSearch = (word) => {
    setSearchWord(word);
    setSearchStep(0);
    setSearchResult(null);
    setIsSearching(true);
  };

  const nodePositions = {
    ROOT: { x: 50, y: 15 },
    C: { x: 25, y: 40 },
    D: { x: 75, y: 40 },
    A: { x: 12, y: 65 },
    A2: { x: 38, y: 65 },
    O: { x: 75, y: 65 },
    T: { x: 5, y: 90 },
    R: { x: 19, y: 90 },
    P: { x: 45, y: 90 },
    G: { x: 75, y: 90 },
  };

  const edges = [
    { from: 'ROOT', to: 'C' },
    { from: 'ROOT', to: 'D' },
    { from: 'C', to: 'A' },
    { from: 'C', to: 'A2' },
    { from: 'D', to: 'O' },
    { from: 'A', to: 'T' },
    { from: 'A2', to: 'R' },
    { from: 'A2', to: 'P' },
    { from: 'O', to: 'G' },
  ];

  const getTraversalPath = () => {
    const paths = {
      CAT: ['ROOT', 'C', 'A', 'T'],
      CAR: ['ROOT', 'C', 'A2', 'R'],
      CAP: ['ROOT', 'C', 'A2', 'P'],
      DOG: ['ROOT', 'D', 'O', 'G'],
    };
    return paths[searchWord] || [];
  };

  const path = getTraversalPath();
  const currentNodeIndex = Math.floor(searchStep / 2);
  const currentNode = path[Math.min(currentNodeIndex, path.length - 1)];

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-12 overflow-hidden'>
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-5xl font-bold text-white mb-2 text-center relative z-10'
      >
        Searching for a Word
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-lg text-slate-300 mb-8 text-center relative z-10'
      >
        Traversal through nodes, character by character
      </motion.p>

      <div className='flex gap-12 w-full max-w-6xl relative z-10'>
        {/* Visualization */}
        <motion.div
          className='flex-1 flex items-center justify-center'
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <svg width='100%' height='400' viewBox='0 0 200 400' className='overflow-visible'>
            {/* Edges */}
            {edges.map((edge, idx) => {
              const fromPos = nodePositions[edge.from];
              const toPos = nodePositions[edge.to];
              const isInPath = path.includes(edge.from) && path.includes(edge.to);

              return (
                <motion.line
                  key={`edge-${idx}`}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={isInPath ? '#3b82f6' : '#64748b'}
                  strokeWidth='2'
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: isInPath && isSearching ? 1 : 0.3,
                    strokeWidth: isInPath && isSearching ? 3 : 2,
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}

            {/* Nodes */}
            {Object.entries(nodePositions).map(([node, pos], idx) => {
              const isInPath = path.includes(node);
              const isActive = node === currentNode && isSearching;
              const isVisited =
                isInPath && path.indexOf(node) < currentNodeIndex + 1 && isSearching;

              return (
                <g key={node}>
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r='14'
                    fill={
                      isActive
                        ? '#3b82f6'
                        : isVisited
                          ? '#10b981'
                          : isInPath && isSearching
                            ? '#6b7280'
                            : '#374151'
                    }
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  />

                  <motion.text
                    x={pos.x}
                    y={pos.y}
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fill='white'
                    fontSize='11'
                    fontWeight='bold'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 + 0.2 }}
                  >
                    {node.replace(/([A-Z]\d?)/, '$1')}
                  </motion.text>

                  {isActive && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r='14'
                      fill='none'
                      stroke='#3b82f6'
                      strokeWidth='2'
                      animate={{
                        r: [14, 24, 14],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Right panel */}
        <motion.div
          className='flex-1 space-y-6'
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search input */}
          <div className='bg-slate-800 border border-slate-700 rounded-lg p-4'>
            <label className='block text-sm font-bold text-slate-400 mb-3'>
              Search for:
            </label>
            <div className='flex gap-2 flex-wrap'>
              {words.map((word) => {
                const isValid = searchableWords.includes(word);
                return (
                  <motion.button
                    key={word}
                    onClick={() => handleSearch(word)}
                    className={`px-3 py-2 rounded font-bold transition-all ${
                      searchWord === word
                        ? 'bg-blue-500 text-white'
                        : isValid
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    }`}
                    whileHover={isValid ? { scale: 1.05 } : {}}
                    whileTap={isValid ? { scale: 0.95 } : {}}
                  >
                    {word}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Search status */}
          <motion.div
            className={`rounded-lg p-6 border-2 ${
              searchResult === 'FOUND'
                ? 'border-green-500/50 bg-green-500/10'
                : searchResult === 'NOT FOUND'
                  ? 'border-red-500/50 bg-red-500/10'
                  : 'border-blue-500/50 bg-blue-500/10'
            }`}
            key={`result-${searchResult}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className='flex items-center gap-3'>
              {searchResult === 'FOUND' ? (
                <>
                  <CheckCircle size={28} className='text-green-400' />
                  <div>
                    <p className='text-green-300 font-bold text-lg'>Found!</p>
                    <p className='text-green-200 text-sm'>
                      Word "{searchWord}" exists in Trie
                    </p>
                  </div>
                </>
              ) : searchResult === 'NOT FOUND' ? (
                <>
                  <XCircle size={28} className='text-red-400' />
                  <div>
                    <p className='text-red-300 font-bold text-lg'>Not Found</p>
                    <p className='text-red-200 text-sm'>
                      Path blocked at some point
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Search size={28} className='text-blue-400' />
                  <div>
                    <p className='text-blue-300 font-bold text-lg'>
                      Searching... {currentNodeIndex + 1}/{path.length}
                    </p>
                    <p className='text-blue-200 text-sm'>
                      Click a word to search
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Algorithm explanation */}
          <motion.div
            className='bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-2'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className='text-sm font-bold text-cyan-400 mb-3'>Algorithm</h4>
            {[
              'Start at root node',
              'For each character in word:',
              '  Check if child exists',
              '  If no → return false',
              '  Move to child node',
              'Check isEndOfWord flag',
            ].map((line, idx) => (
              <motion.p
                key={idx}
                className='text-xs text-slate-300 font-mono'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.08 }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>

          {/* Complexity */}
          <motion.div
            className='bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-lg p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className='text-xs text-slate-400 mb-1'>Time Complexity</p>
            <p className='font-mono text-lg text-green-300'>O(m) - m = word length</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_Search;
```

## Slide7_PrefixMatching.jsx
```jsx
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
            {/* Nodes */}
            {[
              { id: 'ROOT', x: 100, y: 20, label: 'ROOT' },
              { id: 'C', x: 50, y: 80, label: 'C', highlight: selectedPrefix[0] === 'C' },
              { id: 'D', x: 150, y: 80, label: 'D', highlight: selectedPrefix[0] === 'D' },
              { id: 'A', x: 30, y: 140, label: 'A', highlight: selectedPrefix === 'CA' },
              { id: 'O', x: 150, y: 140, label: 'O', highlight: selectedPrefix === 'DO' },
              { id: 'T', x: 10, y: 200, label: 'T', isEnd: true },
              { id: 'R', x: 30, y: 200, label: 'R', isEnd: true },
              { id: 'P', x: 50, y: 200, label: 'P', isEnd: true },
              { id: 'N', x: 70, y: 200, label: 'N', isEnd: true },
              { id: 'G', x: 150, y: 200, label: 'G', isEnd: true },
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

            {/* Edges */}
            {[
              { from: [100, 20], to: [50, 80] },
              { from: [100, 20], to: [150, 80] },
              { from: [50, 80], to: [30, 140] },
              { from: [150, 80], to: [150, 140] },
              { from: [30, 140], to: [10, 200] },
              { from: [30, 140], to: [30, 200] },
              { from: [30, 140], to: [50, 200] },
              { from: [30, 140], to: [70, 200] },
              { from: [150, 140], to: [150, 200] },
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
```

## Slide8_Autocomplete.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Type } from 'lucide-react';

const Slide8_Autocomplete = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const dictionary = [
    'apple',
    'application',
    'apply',
    'app',
    'api',
    'append',
    'autocomplete',
    'abstract',
    'array',
  ];

  useEffect(() => {
    if (input.length === 0) {
      setSuggestions([]);
      setActiveIndex(-1);
    } else {
      const filtered = dictionary
        .filter((word) => word.startsWith(input.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setActiveIndex(-1);
    }
  }, [input]);

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-12 overflow-hidden'>
      {/* Animated background */}
      <motion.div
        className='absolute inset-0 opacity-5'
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 30, repeat: Infinity }}
        style={{
          backgroundImage:
            'linear-gradient(45deg, #3b82f6 1px, transparent 1px, transparent 50px, #3b82f6 50px, #3b82f6 51px, transparent 51px, transparent 100px)',
          backgroundSize: '141px 141px',
        }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-5xl font-bold text-white mb-2 text-center relative z-10'
      >
        Real-World: Autocomplete
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='text-lg text-slate-300 mb-12 text-center relative z-10 max-w-2xl'
      >
        Instant suggestions as you type - Powered by Trie Data Structure
      </motion.p>

      {/* Main demo area */}
      <motion.div
        className='w-full max-w-2xl mx-auto relative z-10'
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Search Input */}
        <div className='relative mb-8'>
          <motion.div
            className='absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 blur'
            animate={{
              opacity: input.length > 0 ? 0.5 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          <div className='relative bg-slate-800 border-2 border-slate-700 rounded-xl p-4 flex items-center gap-3'>
            <Type size={20} className='text-blue-400' />
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Try typing "ap"...'
              className='flex-1 bg-transparent text-white text-lg font-medium placeholder-slate-500 focus:outline-none'
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  setActiveIndex(Math.min(activeIndex + 1, suggestions.length - 1));
                } else if (e.key === 'ArrowUp') {
                  setActiveIndex(Math.max(activeIndex - 1, -1));
                } else if (e.key === 'Enter' && activeIndex >= 0) {
                  setInput(suggestions[activeIndex]);
                }
              }}
            />
            {input.length > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Zap size={20} className='text-yellow-400' />
              </motion.div>
            )}
          </div>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              className='absolute top-full left-0 right-0 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl'
              initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'top' }}
            >
              {suggestions.map((suggestion, idx) => (
                <motion.div
                  key={suggestion}
                  className={`px-4 py-3 border-b border-slate-700 cursor-pointer transition-all last:border-0 ${
                    activeIndex === idx
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-700 text-slate-300'
                  }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setInput(suggestion)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{
                    paddingLeft: '24px',
                    backgroundColor: activeIndex === idx ? '#1e40af' : '#1e293b',
                  }}
                >
                  <div className='flex items-center gap-3'>
                    <motion.span
                      className='text-blue-400 font-bold'
                      animate={activeIndex === idx ? { scale: 1.2 } : { scale: 1 }}
                    >
                      {input}
                    </motion.span>
                    <span className='text-slate-400'>
                      {suggestion.slice(input.length)}
                    </span>
                    {activeIndex === idx && (
                      <motion.span
                        className='ml-auto text-yellow-400'
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        ↵
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          className='grid grid-cols-3 gap-4 mt-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: 'Input Length', value: input.length, color: 'blue' },
            { label: 'Suggestions', value: suggestions.length, color: 'green' },
            { label: 'Time (ms)', value: '<1', color: 'cyan' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className={`bg-gradient-to-br from-${stat.color}-500/20 to-transparent border border-${stat.color}-500/30 rounded-lg p-4 text-center`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <p className={`text-3xl font-bold text-${stat.color}-400`}>
                {stat.value}
              </p>
              <p className='text-xs text-slate-400 mt-1'>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How it works */}
        <motion.div
          className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            {
              step: '1',
              title: 'Traverse Trie',
              desc: 'Navigate to the input prefix node',
            },
            {
              step: '2',
              title: 'Get Subtree',
              desc: 'Collect all valid words below node',
            },
            {
              step: '3',
              title: 'Return Results',
              desc: 'Instant suggestions to user',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className='bg-slate-800 border border-slate-700 rounded-lg p-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              whileHover={{
                borderColor: 'rgba(59, 130, 246, 0.5)',
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
              }}
            >
              <motion.div
                className='text-2xl font-bold text-blue-400 mb-2'
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              >
                {item.step}
              </motion.div>
              <h4 className='font-bold text-white mb-1'>{item.title}</h4>
              <p className='text-xs text-slate-400'>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide8_Autocomplete;
```

## Slide9_Complexity.jsx
```jsx
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
```

## Slide10_Outro.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Code, Zap, BookOpen } from 'lucide-react';

const Slide10_Outro = () => {
  const keyTakeaways = [
    {
      icon: Code,
      title: 'Efficient String Operations',
      desc: 'O(m) for insert, search, delete operations',
    },
    {
      icon: Zap,
      title: 'Prefix Matching Powerhouse',
      desc: 'Optimal for autocomplete and prefix queries',
    },
    {
      icon: BookOpen,
      title: 'Space-Time Tradeoff',
      desc: 'Requires more memory for faster operations',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, duration: 0.6 },
  };

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-12 overflow-hidden relative'>
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-1 h-1 bg-blue-400 rounded-full'
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * 100 - 50],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        className='relative z-10 max-w-4xl text-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className='text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent'
        >
          You Mastered Tries!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className='text-2xl text-slate-300 mb-16 font-light'
        >
          From basic structure to real-world applications
        </motion.p>

        {/* Key Takeaways */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'
          variants={containerVariants}
        >
          {keyTakeaways.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className='bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6'
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                }}
              >
                <motion.div
                  className='mb-4 flex justify-center'
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                >
                  <Icon size={40} className='text-blue-400' />
                </motion.div>

                <h3 className='font-bold text-lg text-white mb-2'>{item.title}</h3>
                <p className='text-slate-400 text-sm'>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Learning paths */}
        <motion.div variants={itemVariants} className='mb-16'>
          <h2 className='text-2xl font-bold text-cyan-400 mb-6'>Next Steps</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[
              {
                title: 'Advanced Techniques',
                items: [
                  'Compressed Tries (Radix Trees)',
                  'Ternary Search Trees',
                  'Suffix Trees & Arrays',
                ],
              },
              {
                title: 'Real-World Applications',
                items: [
                  'IP Routing Tables',
                  'DNS Systems',
                  'Text Search Engines',
                ],
              },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                className='bg-slate-800 border border-slate-700 rounded-lg p-6 text-left'
                variants={itemVariants}
              >
                <h3 className='font-bold text-purple-400 mb-4'>{section.title}</h3>
                <ul className='space-y-2'>
                  {section.items.map((item, itemIdx) => (
                    <motion.li
                      key={itemIdx}
                      className='text-slate-300 flex items-start gap-2'
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 1 + idx * 0.15 + itemIdx * 0.1,
                      }}
                    >
                      <CheckCircle size={16} className='text-green-400 mt-0.5 flex-shrink-0' />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final message */}
        <motion.div
          variants={itemVariants}
          className='bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 rounded-xl p-8'
        >
          <motion.p
            className='text-xl text-slate-200 font-light leading-relaxed'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Tries are a <span className='text-cyan-300 font-bold'>fundamental building block</span> of modern systems.
            Whether you're building search engines, spell checkers, or IP routers,{' '}
            <span className='text-green-300 font-bold'>Tries provide elegant solutions</span> to complex string problems.
          </motion.p>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className='mt-12 space-y-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          <motion.button
            className='px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Implement Your First Trie
          </motion.button>

          <p className='text-slate-500 text-sm'>
            Practice implementing a Trie in your favorite language
          </p>
        </motion.div>
      </motion.div>

      {/* Floating background elements */}
      <motion.div
        className='absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-5'
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className='absolute bottom-10 right-10 w-40 h-40 bg-cyan-500 rounded-full filter blur-3xl opacity-5'
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
    </div>
  );
};

export default Slide10_Outro;
```