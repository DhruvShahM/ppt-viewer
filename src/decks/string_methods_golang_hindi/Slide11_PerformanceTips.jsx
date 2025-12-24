import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertCircle, CheckCircle } from 'lucide-react';

const Slide11_PerformanceTips = () => {
  const [selectedTip, setSelectedTip] = useState(0);

  const tips = [
    {
      title: 'StringBuilder का उपयोग करें',
      problem: 'बार-बार += से strings बनाने से inefficient है',
      solution: 'StringBuilder में WriteString() का उपयोग करें',
      impact: '10x तेज़',
    },
    {
      title: 'सही method चुनें',
      problem: 'Contains() हर बार full scan करता है',
      solution: 'Index() या Contains() select करें based on use case',
      impact: '5x तेज़',
    },
    {
      title: 'Batch replacements',
      problem: 'कई Replace() calls inefficient हैं',
      solution: 'NewReplacer() का उपयोग करें',
      impact: '3x तेज़',
    },
    {
      title: 'Regex से बचें',
      problem: 'Simple cases में regex overhead होता है',
      solution: 'strings package functions का उपयोग करें',
      impact: '20x तेज़',
    },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-y-auto p-12">
      {/* Lightning background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Zap className="w-full h-full text-yellow-400" />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Zap className="w-12 h-12 text-yellow-400" />
          <h2 className="text-5xl font-bold text-white">
            Performance Tips - प्रदर्शन सुधारें
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {tips.map((tip, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedTip(idx)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex-shrink-0 ${selectedTip === idx
                ? 'bg-yellow-500/30 border-2 border-yellow-400 text-yellow-300'
                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {idx + 1}. {tip.title.split(' ')[0]}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={selectedTip}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Title */}
          <motion.h3
            className="text-3xl font-bold text-yellow-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {tips[selectedTip].title}
          </motion.h3>

          {/* Problem section */}
          <motion.div
            className="bg-red-500/10 border-l-4 border-red-400 rounded p-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-red-300 mb-2">समस्या:</p>
                <p className="text-slate-300">{tips[selectedTip].problem}</p>
              </div>
            </div>
          </motion.div>

          {/* Solution section */}
          <motion.div
            className="bg-green-500/10 border-l-4 border-green-400 rounded p-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-green-300 mb-2">समाधान:</p>
                <p className="text-slate-300">{tips[selectedTip].solution}</p>
              </div>
            </div>
          </motion.div>

          {/* Impact */}
          <motion.div
            className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded p-6 border border-cyan-400/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-sm text-slate-400 mb-2">प्रभाव:</p>
            <motion.p
              className="text-4xl font-bold text-cyan-300"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {tips[selectedTip].impact}
            </motion.p>
          </motion.div>

          {/* Code example */}
          <motion.div
            className="bg-slate-900/80 rounded-lg p-6 border border-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
              {`// ❌ Slow
result := ""
for _, word := range words {
  result += word + " "
}

// ✅ Fast
var builder strings.Builder
for _, word := range words {
  builder.WriteString(word)
  builder.WriteString(" ")
}
result := builder.String()`}
            </pre>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide11_PerformanceTips;
