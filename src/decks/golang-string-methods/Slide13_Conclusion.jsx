import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Code2 } from 'lucide-react';

export default function Slide13_Conclusion() {
  const floatVariants = {
    animate: {
      y: [0, -25, 0],
      transition: { duration: 7, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const keyPoints = [
    'Master Contains, Split, Join for daily tasks',
    'Leverage Index/LastIndex for searching',
    'Use case-changing methods (ToUpper/ToLower) wisely',
    'Always trim user input for cleaner data',
    'Prefer strings package methods over manual loops',
    'Handle Unicode properly in production code',
  ];

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Floating orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-700 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Code2
            size={64}
            className="text-cyan-400 mx-auto mb-6"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0, 188, 212, 0.8))',
            }}
          />
          <h2 className="text-5xl font-bold text-white mb-2">
            Powerful String Tools
          </h2>
          <p className="text-cyan-300 text-lg">Master string manipulation in Go</p>
        </motion.div>

        {/* Key points */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-12"
        >
          {keyPoints.map((point, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-center gap-4 group"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="flex-shrink-0"
              >
                <CheckSquare
                  size={24}
                  className="text-emerald-400"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.6))',
                  }}
                />
              </motion.div>
              <p className="text-white group-hover:text-cyan-300 transition-colors">
                {point}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="backdrop-blur-md bg-white/5 border border-cyan-400/30 rounded-lg p-8 text-center"
          style={{
            boxShadow: '0 0 30px rgba(0, 188, 212, 0.35)',
          }}
        >
          <p className="text-white text-lg leading-relaxed">
            Go's <code className="bg-white/10 px-2 py-1 rounded text-cyan-300 font-mono">strings</code> package
            provides everything you need for efficient, elegant string manipulation.
            Happy coding!
          </p>
        </motion.div>
      </motion.div>

      {/* Ambient glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(0, 188, 212, 0.3)',
            '0 0 150px rgba(0, 188, 212, 0.5)',
            '0 0 100px rgba(0, 188, 212, 0.3)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}