import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Slide9_CommonPitfalls = () => {
  const [selectedPitfall, setSelectedPitfall] = useState(0);

  const pitfalls = [
    {
      title: 'Deadlock with Unbuffered',
      wrong: 'ch := make(chan int)\nch <- 42      // Blocks forever!\n<- ch',
      right: 'go func() { ch <- 42 }()\nvalue := <-ch',
      explanation: 'Both send and receive must happen in different goroutines',
    },
    {
      title: 'Unbuffered in Loop',
      wrong: 'for i := 0; i < 10; i++ {\n  ch <- i  // Blocks each iteration\n}',
      right: 'for i := 0; i < 10; i++ {\n  go func(v int) { ch <- v }(i)\n}',
      explanation: 'Send in goroutine to avoid blocking the loop',
    },
    {
      title: 'Wrong Buffer Size',
      wrong: 'ch := make(chan int, 1) // Too small for 10 senders',
      right: 'ch := make(chan int, 10) // Match expected volume',
      explanation: 'Buffer size should accommodate expected burst rate',
    },
  ];

  const current = pitfalls[selectedPitfall];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white"
        >
          Common Pitfalls & Deadlocks
        </motion.h1>

        {/* Pitfall selector */}
        <div className="flex gap-4">
          {pitfalls.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedPitfall(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedPitfall === idx
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {idx + 1}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={selectedPitfall}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-red-400">{current.title}</h2>

          {/* Wrong way */}
          <div className="grid grid-cols-2 gap-8">
            {/* Wrong */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg border-2 border-red-500/50 bg-red-600/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={24} className="text-red-400" />
                <h3 className="text-xl font-bold text-red-400">❌ Wrong</h3>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 overflow-auto max-h-32">
                {current.wrong.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg border-2 border-green-500/50 bg-green-600/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={24} className="text-green-400" />
                <h3 className="text-xl font-bold text-green-400">✓ Right</h3>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 overflow-auto max-h-32">
                {current.right.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-lg border border-blue-500/50 bg-blue-600/10"
          >
            <p className="text-lg text-blue-300">
              <span className="font-bold">Why:</span> {current.explanation}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide9_CommonPitfalls;