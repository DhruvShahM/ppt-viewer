import React from 'react';
import { motion } from 'framer-motion';
import { Package, Sparkles } from 'lucide-react';

export default function Slide2_StringPackageOverview() {
  const methods = [
    'Contains',
    'HasPrefix / HasSuffix',
    'Index / LastIndex',
    'Split / Join',
    'ToUpper / ToLower',
    'Trim / TrimSpace',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const blobVariants = {
    animate: {
      rotate: [0, 360],
      transition: { duration: 20, ease: 'linear', repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Rotating gradient blob background */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full blur-3xl opacity-15"
      />

      {/* Content container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Header with icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Package
            size={48}
            className="text-cyan-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(0, 188, 212, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">strings Package</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-cyan-200 mb-10 leading-relaxed"
        >
          The <code className="bg-white/10 px-3 py-1 rounded text-cyan-300 font-mono">strings</code> package provides powerful utilities for string manipulation in Go. These methods are essential for text processing, parsing, and data transformation.
        </motion.p>

        {/* Methods grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4"
        >
          {methods.map((method, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 hover:border-cyan-400/50 transition-all"
              style={{
                boxShadow: '0 0 15px rgba(0, 188, 212, 0.2)',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <Sparkles size={20} className="text-purple-400" />
                <code className="text-white font-mono">{method}</code>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(168, 85, 247, 0.2)',
            '0 0 150px rgba(168, 85, 247, 0.4)',
            '0 0 100px rgba(168, 85, 247, 0.2)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}