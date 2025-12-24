import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch } from 'lucide-react';

const Slide5_SplitMethods = () => {
  const [activeExample, setActiveExample] = useState(0);

  const splitExamples = [
    {
      title: 'Split()',
      code: 'strings.Split("a,b,c", ",")',
      result: '["a", "b", "c"]',
      color: 'cyan',
    },
    {
      title: 'Fields()',
      code: 'strings.Fields("hello world go")',
      result: '["hello", "world", "go"]',
      color: 'blue',
    },
    {
      title: 'SplitN()',
      code: 'strings.SplitN("a,b,c", ",", 2)',
      result: '["a", "b,c"]',
      color: 'purple',
    },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-y-auto p-12">
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <GitBranch className="w-full h-full text-cyan-400" />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GitBranch className="w-12 h-12 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">
            Split Methods - विभाजित करना
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {splitExamples.map((example, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveExample(idx)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${activeExample === idx
                ? `bg-${example.color}-500/30 border-${example.color}-400 border-2 text-${example.color}-300`
                : 'bg-slate-800/50 border border-slate-700 text-slate-400'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {example.title}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExample}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Input visualization */}
            <motion.div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
              <p className="text-sm text-slate-400 mb-4">String को कैसे विभाजित करें:</p>
              <div className="bg-slate-900/50 rounded p-4 font-mono text-slate-300 text-lg">
                {splitExamples[activeExample].code}
              </div>
            </motion.div>

            {/* Animation of split process */}
            <motion.div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                {splitExamples[activeExample].result.match(/"[^"]*"/g)?.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.15 }}
                    className={`p-6 rounded-lg border-2 border-${splitExamples[activeExample].color}-400/50 bg-${splitExamples[activeExample].color}-500/10`}
                  >
                    <motion.p
                      className={`text-center font-mono text-lg text-${splitExamples[activeExample].color}-300 font-bold`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    >
                      {item}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Result */}
            <motion.div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-6 border border-cyan-400/30">
              <p className="text-sm text-slate-400 mb-2">परिणाम (Result):</p>
              <code className="text-cyan-300 font-mono text-lg">
                {splitExamples[activeExample].result}
              </code>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Code block */}
        <motion.div
          className="mt-12 bg-slate-900/80 rounded-lg p-6 border border-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
            {`str := "apple,banana,orange"
result := strings.Split(str, ",")
// result = ["apple", "banana", "orange"]`}
          </pre>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide5_SplitMethods;