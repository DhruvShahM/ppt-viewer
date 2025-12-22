import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

export default function Slide6_Split() {
  const blobVariants = {
    animate: {
      rotate: [0, 360],
      transition: { duration: 15, ease: 'linear', repeat: Infinity },
    },
  };

  const codeExample = `s := "apple,banana,cherry"
fruits := strings.Split(s, ",")
// Result: []string{"apple", "banana", "cherry"}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Rotating background */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full blur-3xl opacity-15"
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
          <GitBranch
            size={48}
            className="text-teal-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(20, 184, 166, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">strings.Split()</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-teal-200 mb-10"
        >
          Splits a string into substrings separated by a delimiter.
        </motion.p>

        {/* Function signature */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="backdrop-blur-md bg-white/5 border border-teal-400/30 rounded-lg p-6 mb-8"
          style={{
            boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)',
          }}
        >
          <code className="text-teal-300 font-mono text-sm">
            func Split(s, sep string) []string
          </code>
        </motion.div>

        {/* Code example */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="backdrop-blur-sm bg-white/5 border border-teal-400/30 rounded-lg p-6 mb-8"
          style={{
            boxShadow: '0 0 20px rgba(20, 184, 166, 0.25)',
          }}
        >
          <motion.code
            variants={itemVariants}
            className="text-teal-300 font-mono text-sm block whitespace-pre-wrap"
          >
            {codeExample}
          </motion.code>
        </motion.div>

        {/* Benefits list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {[
            'CSV/TSV data parsing',
            'URL query string splitting',
            'Command-line argument parsing',
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-center gap-3 text-teal-200"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              {benefit}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(20, 184, 166, 0.25)',
            '0 0 150px rgba(20, 184, 166, 0.4)',
            '0 0 100px rgba(20, 184, 166, 0.25)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}