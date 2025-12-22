import React from 'react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';

export default function Slide9_Trim() {
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const methods = [
    {
      name: 'Trim',
      desc: 'Removes whitespace from both ends',
      example: 'Trim("  hello  ")',
      result: '"hello"',
    },
    {
      name: 'TrimSpace',
      desc: 'Same as Trim, for common case',
      example: 'TrimSpace("  hello\\n")',
      result: '"hello"',
    },
    {
      name: 'TrimPrefix',
      desc: 'Removes prefix if present',
      example: 'TrimPrefix("go.mod", "go.")',
      result: '"mod"',
    },
    {
      name: 'TrimSuffix',
      desc: 'Removes suffix if present',
      example: 'TrimSuffix("test.go", ".go")',
      result: '"test"',
    },
  ];

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Floating orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-purple-500 to-violet-700 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
          <Scissors
            size={48}
            className="text-violet-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">Trim Methods</h2>
        </motion.div>

        {/* Methods grid */}
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
              className="backdrop-blur-sm bg-white/5 border border-violet-400/30 rounded-lg p-5"
              style={{
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.25)',
              }}
            >
              {/* Method name */}
              <h3 className="text-lg font-bold text-violet-300 mb-2">
                {method.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-violet-200 mb-3 leading-relaxed">
                {method.desc}
              </p>

              {/* Example */}
              <div className="bg-white/5 rounded p-2 mb-2 border border-violet-400/20">
                <code className="text-violet-300 font-mono text-xs">
                  {method.example}
                </code>
              </div>

              {/* Result */}
              <div className="text-violet-400 font-mono text-sm">
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
            '0 0 100px rgba(139, 92, 246, 0.25)',
            '0 0 150px rgba(139, 92, 246, 0.4)',
            '0 0 100px rgba(139, 92, 246, 0.25)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}