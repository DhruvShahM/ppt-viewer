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