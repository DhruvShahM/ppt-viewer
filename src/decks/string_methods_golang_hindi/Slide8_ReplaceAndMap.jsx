import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Replace, Code } from 'lucide-react';

const Slide8_ReplaceAndMap = () => {
  const [activeExample, setActiveExample] = useState(0);

  const replaceExamples = [
    {
      method: 'Replace()',
      before: 'hello hello hello',
      search: 'hello',
      replace: 'hi',
      after: 'hi hi hi',
      desc: 'पहली occurrence को बदलें (limit = 1)',
    },
    {
      method: 'ReplaceAll()',
      before: 'apple, apple, apple',
      search: 'apple',
      replace: 'orange',
      after: 'orange, orange, orange',
      desc: 'सभी occurrences को बदलें (limit = -1)',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-y-auto p-8">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <Replace className="w-full h-full text-pink-400" />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-6xl h-full flex flex-col">
        {/* Header - Better positioned */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <Replace className="w-10 h-10 text-pink-400 flex-shrink-0" />
            <div>
              <h2 className="text-4xl font-bold text-white leading-tight">
                Replace & Map Methods
              </h2>
              <p className="text-pink-300 text-sm mt-1">
                स्ट्रिंग में replacements और character transformations
              </p>
            </div>
          </div>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mt-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.div>

        {/* Tabs for switching between examples */}
        <div className="flex gap-4 mb-8">
          {replaceExamples.map((example, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveExample(idx)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeExample === idx
                ? 'bg-pink-500/30 border-2 border-pink-400 text-pink-300'
                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-pink-400'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {example.method}
            </motion.button>
          ))}
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto space-y-6 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExample}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Description */}
              <motion.div
                className="text-slate-300 text-sm italic bg-slate-800/30 border-l-4 border-pink-400 pl-4 py-3 rounded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {replaceExamples[activeExample].desc}
              </motion.div>

              {/* Input */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                  Input String
                </p>
                <motion.div
                  className="font-mono text-white bg-slate-800 p-4 rounded-lg border border-slate-700 text-lg"
                  whileHover={{ borderColor: 'rgba(244, 63, 94, 0.5)' }}
                >
                  "{replaceExamples[activeExample].before}"
                </motion.div>
              </motion.div>

              {/* Search and Replace - Side by side */}
              <div className="grid grid-cols-2 gap-6">
                {/* Search */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-red-400 uppercase tracking-wider mb-2 font-semibold">
                    🔍 खोजें
                  </p>
                  <motion.div
                    className="font-mono text-red-300 bg-red-500/15 p-4 rounded-lg border-2 border-red-400/40 text-lg font-bold"
                    animate={{ boxShadow: ['0 0 0 rgba(239, 68, 68, 0)', '0 0 15px rgba(239, 68, 68, 0.3)', '0 0 0 rgba(239, 68, 68, 0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    "{replaceExamples[activeExample].search}"
                  </motion.div>
                </motion.div>

                {/* Replace with */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-green-400 uppercase tracking-wider mb-2 font-semibold">
                    ✨ से बदलें
                  </p>
                  <motion.div
                    className="font-mono text-green-300 bg-green-500/15 p-4 rounded-lg border-2 border-green-400/40 text-lg font-bold"
                    animate={{ boxShadow: ['0 0 0 rgba(34, 197, 94, 0)', '0 0 15px rgba(34, 197, 94, 0.3)', '0 0 0 rgba(34, 197, 94, 0)'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    "{replaceExamples[activeExample].replace}"
                  </motion.div>
                </motion.div>
              </div>

              {/* Arrow animation */}
              <motion.div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 8, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-pink-400 text-4xl"
                >
                  ↓
                </motion.div>
              </motion.div>

              {/* Output */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-cyan-400 uppercase tracking-wider mb-2 font-semibold">
                  📤 Output String
                </p>
                <motion.div
                  className="font-mono text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 p-4 rounded-lg border-2 border-cyan-400/40 text-lg font-bold"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  "{replaceExamples[activeExample].after}"
                </motion.div>
              </motion.div>

              {/* Code example */}
              <motion.div
                className="bg-slate-900/80 rounded-lg p-6 border border-slate-700 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-300 font-semibold text-sm">Go Code Example</span>
                </div>
                <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
                  {`${activeExample === 0 ? `result := strings.Replace("hello hello", "hello", "hi", 1)
// "hi hello" (पहली occurrence ही बदली)` : `result := strings.ReplaceAll("apple, apple, apple", "apple", "orange")
// "orange, orange, orange" (सभी occurrences बदलीं)`}`}
                </pre>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Map() section - at bottom */}
          <motion.div
            className="bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-lg p-6 border border-purple-400/40 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              Map() - हर character को बदलें
            </h3>

            <motion.div className="bg-slate-800/50 rounded p-4 border border-slate-700">
              <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider">
                Uppercase Conversion Example:
              </p>
              <pre className="text-slate-300 text-xs font-mono overflow-x-auto">
                {`upper := strings.Map(func(r rune) rune {
  return unicode.ToUpper(r)
}, "hello world")
// Result: "HELLO WORLD"`}
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide8_ReplaceAndMap;
