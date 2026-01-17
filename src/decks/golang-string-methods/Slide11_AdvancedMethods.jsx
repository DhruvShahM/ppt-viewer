import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Slide11_AdvancedMethods() {
  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 5, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const methods = [
    {
      name: 'Count',
      desc: 'Returns the number of non-overlapping occurrences',
      example: 'Count("banana", "a")',
      result: '3',
    },
    {
      name: 'Fields',
      desc: 'Splits string by whitespace (any amount)',
      example: 'Fields("a  b   c")',
      result: '[]string{"a","b","c"}',
    },
    {
      name: 'Contains / ContainsAny',
      desc: 'Check if string contains any character',
      example: 'ContainsAny("hello", "aeiou")',
      result: 'true',
    },
    {
      name: 'ReplaceAll',
      desc: 'Replace all occurrences (convenience)',
      example: 'ReplaceAll("aaa", "a", "b")',
      result: '"bbb"',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Floating orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-fuchsia-400 to-pink-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
        className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-pink-500 to-fuchsia-700 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Zap
            size={48}
            className="text-fuchsia-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(232, 121, 249, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">Advanced Methods</h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-6"
        >
          {methods.map((method, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 border border-fuchsia-400/30 rounded-lg p-5"
              style={{
                boxShadow: '0 0 15px rgba(232, 121, 249, 0.2)',
              }}
            >
              {/* Name */}
              <h3 className="text-lg font-bold text-fuchsia-300 mb-2">
                {method.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-fuchsia-200 mb-3 leading-relaxed">
                {method.desc}
              </p>

              {/* Example */}
              <div className="bg-white/5 rounded p-2 mb-2 border border-fuchsia-400/20">
                <code className="text-fuchsia-300 font-mono text-xs break-all">
                  {method.example}
                </code>
              </div>

              {/* Result */}
              <div className="text-fuchsia-400 font-mono text-sm">
                → {method.result}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(232, 121, 249, 0.25)',
            '0 0 150px rgba(232, 121, 249, 0.4)',
            '0 0 100px rgba(232, 121, 249, 0.25)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}