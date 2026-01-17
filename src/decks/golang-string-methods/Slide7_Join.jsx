import React from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

export default function Slide7_Join() {
  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 5, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const codeExample = `fruits := []string{"apple", "banana", "cherry"}
result := strings.Join(fruits, ", ")
// Result: "apple, banana, cherry"`;

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Floating orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-lime-400 to-green-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
        className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full blur-3xl opacity-15"
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
          <Link2
            size={48}
            className="text-lime-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(132, 204, 22, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">strings.Join()</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-lime-200 mb-10"
        >
          Concatenates a slice of strings with a separator. Inverse of Split.
        </motion.p>

        {/* Function signature */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="backdrop-blur-md bg-white/5 border border-lime-400/30 rounded-lg p-6 mb-8"
          style={{
            boxShadow: '0 0 20px rgba(132, 204, 22, 0.3)',
          }}
        >
          <code className="text-lime-300 font-mono text-sm">
            func Join(elems []string, sep string) string
          </code>
        </motion.div>

        {/* Code example */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="backdrop-blur-sm bg-white/5 border border-lime-400/30 rounded-lg p-6 mb-8"
          style={{
            boxShadow: '0 0 20px rgba(132, 204, 22, 0.25)',
          }}
        >
          <code className="text-lime-300 font-mono text-sm block whitespace-pre-wrap">
            {codeExample}
          </code>
        </motion.div>

        {/* Use cases */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-3"
        >
          <h3 className="text-lime-300 font-semibold mb-4">Perfect For:</h3>
          {[
            'Building CSV/TSV formatted output',
            'Creating space-separated lists',
            'Generating file paths',
          ].map((useCase, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 text-lime-200 pl-2"
            >
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              {useCase}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(132, 204, 22, 0.25)',
            '0 0 150px rgba(132, 204, 22, 0.4)',
            '0 0 100px rgba(132, 204, 22, 0.25)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}