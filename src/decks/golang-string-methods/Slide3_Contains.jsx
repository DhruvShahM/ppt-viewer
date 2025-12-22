import React from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle } from 'lucide-react';

export default function Slide3_Contains() {
  const examples = [
    { code: 'strings.Contains("hello", "ell")', result: 'true' },
    { code: 'strings.Contains("golang", "xyz")', result: 'false' },
    { code: 'strings.Contains("", "")', result: 'true' },
  ];

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Animated background orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-green-400 to-blue-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Search
            size={48}
            className="text-green-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(74, 222, 128, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">strings.Contains()</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-green-200 mb-10"
        >
          Reports whether the substring is within the string.
        </motion.p>

        {/* Function signature */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="backdrop-blur-md bg-white/5 border border-green-400/30 rounded-lg p-6 mb-8"
          style={{
            boxShadow: '0 0 20px rgba(74, 222, 128, 0.3)',
          }}
        >
          <code className="text-green-300 font-mono text-sm">
            func Contains(s, substr string) bool
          </code>
        </motion.div>

        {/* Examples */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {examples.map((example, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 hover:border-green-400/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <code className="text-green-300 font-mono text-sm flex-1">
                  {example.code}
                </code>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <CheckCircle size={20} className="text-green-400" />
                  <span className="text-green-400 font-mono">{example.result}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 80px rgba(74, 222, 128, 0.25)',
            '0 0 120px rgba(74, 222, 128, 0.4)',
            '0 0 80px rgba(74, 222, 128, 0.25)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}