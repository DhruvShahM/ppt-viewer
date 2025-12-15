import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

const Slide7_SelfAssessment = () => {
  const [answers, setAnswers] = useState({});

  const questions = [
    'Does this coping strategy reduce my stress without harming me?',
    'Can I return to normal functioning afterward?',
    'Do my relationships stay strong when I use this?',
    'Do I learn from this experience?',
    'Would I feel proud telling someone about this?',
    'Does the benefit outweigh any negative consequences?',
  ];

  const handleAnswer = (idx, answer) => {
    setAnswers(prev => ({
      ...prev,
      [idx]: answer,
    }));
  };

  const healthyCount = Object.values(answers).filter(v => v === 'yes').length;
  const isHealthy = healthyCount >= 4;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background gradient */}
      <motion.div
        className="absolute w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-5"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="text-5xl font-bold text-white mb-2">Quick Self-Assessment</h2>
        <p className="text-lg text-gray-400">Evaluate your current coping strategy</p>
      </motion.div>

      {/* Assessment Container */}
      <div className="w-full max-w-3xl relative z-10">
        {/* Questions */}
        <div className="space-y-4 mb-12">
          {questions.map((question, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.08, duration: 0.6 }}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                {/* Question number */}
                <motion.div
                  className="mt-1 flex-shrink-0"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
                    {idx + 1}
                  </div>
                </motion.div>

                {/* Question & buttons */}
                <div className="flex-1">
                  <p className="text-white mb-3 font-medium">{question}</p>

                  {/* Answer buttons */}
                  <div className="flex gap-3">
                    {['yes', 'no', 'unsure'].map(answer => (
                      <motion.button
                        key={answer}
                        onClick={() => handleAnswer(idx, answer)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                          answers[idx] === answer
                            ? answer === 'yes'
                              ? 'bg-green-500/80 text-white'
                              : answer === 'no'
                              ? 'bg-red-500/80 text-white'
                              : 'bg-yellow-500/80 text-white'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        <span className="capitalize">{answer}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Result gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-slate-600 rounded-xl p-8 text-center relative overflow-hidden"
        >
          {/* Animated background based on score */}
          <motion.div
            className={`absolute inset-0 opacity-10 ${
              isHealthy ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-orange-500 to-red-500'
            }`}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />

          <div className="relative z-10">
            {/* Score display */}
            <motion.div
              className="mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="text-6xl font-bold">
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className={healthyCount >= 4 ? 'text-green-400' : 'text-orange-400'}
                >
                  {Object.keys(answers).length > 0 ? `${healthyCount}/${questions.length}` : '—'}
                </motion.span>
              </div>
            </motion.div>

            {/* Verdict */}
            <AnimatePresence mode="wait">
              {Object.keys(answers).length === questions.length && (
                <motion.div
                  key="verdict"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4"
                >
                  <p className={`text-2xl font-bold mb-2 ${isHealthy ? 'text-green-400' : 'text-orange-400'}`}>
                    {isHealthy ? '✓ Your Coping is Mostly Healthy' : '⚠ Consider Adjusting Your Approach'}
                  </p>
                  <p className="text-sm text-gray-300">
                    {isHealthy
                      ? 'You\'re using adaptive strategies that serve your wellbeing.'
                      : 'There are opportunities to develop more constructive coping mechanisms.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress bar */}
            {Object.keys(answers).length > 0 && (
              <motion.div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${isHealthy ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gradient-to-r from-orange-400 to-red-400'}`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${(healthyCount / questions.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide7_SelfAssessment;