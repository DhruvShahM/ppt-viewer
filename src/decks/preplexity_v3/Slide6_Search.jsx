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
    ROOT: { x: 100, y: 50 },
    C: { x: 60, y: 120 },
    D: { x: 140, y: 120 },
    A: { x: 40, y: 190 },
    A2: { x: 80, y: 190 },
    O: { x: 140, y: 190 },
    T: { x: 20, y: 260 },
    R: { x: 70, y: 260 },
    P: { x: 90, y: 260 },
    G: { x: 140, y: 260 },
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
    <div className='w-full h-screen  from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-12 overflow-hidden'>
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
                    className={`px-3 py-2 rounded font-bold transition-all ${searchWord === word
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
            className={`rounded-lg p-6 border-2 ${searchResult === 'FOUND'
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