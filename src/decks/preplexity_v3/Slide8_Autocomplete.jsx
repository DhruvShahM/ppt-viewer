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