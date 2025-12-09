import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, AlertCircle, HelpCircle } from 'lucide-react';

const Slide2_TheProblem = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const questions = [
    { icon: AlertCircle, text: 'How many databases?', color: 'text-red-400' },
    { icon: HelpCircle, text: 'Which ones are active?', color: 'text-yellow-400' },
    { icon: Database, text: 'What are they storing?', color: 'text-blue-400' }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-16 text-center"
        >
          The Visibility Problem
        </motion.h1>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 gap-8">
          {questions.map((q, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.3, duration: 0.6 }}
              onHoverStart={() => setActiveQuestion(idx)}
              className="cursor-pointer"
            >
              <motion.div
                className="p-6 rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur"
                animate={{
                  borderColor: activeQuestion === idx ? ['rgb(59, 130, 246)', 'rgb(59, 130, 246)'] : 'rgb(51, 65, 85)',
                  boxShadow: activeQuestion === idx
                    ? '0 0 30px rgba(59, 130, 246, 0.5)'
                    : '0 0 0px rgba(59, 130, 246, 0)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: activeQuestion === idx ? 12 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <q.icon className={`w-8 h-8 ${q.color}`} />
                  </motion.div>
                  <motion.span
                    className="text-2xl font-semibold text-white"
                    animate={{ x: activeQuestion === idx ? 10 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {q.text}
                  </motion.span>
                </div>

                <AnimatePresence>
                  {activeQuestion === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 text-slate-300"
                    >
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-4" />
                      <p className="text-lg">
                        {idx === 0 && 'Production, caching, analytics, search, backups...'}
                        {idx === 1 && 'Which are critical path? Which are degradable?'}
                        {idx === 2 && 'Users, transactions, logs, metrics, documents...'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-slate-400">
            Without visibility, you can't manage complexity.
          </p>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 text-3xl font-bold text-red-400"
          >
            But how do you discover them?
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide2_TheProblem;