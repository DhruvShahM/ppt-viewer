import React from 'react';
import { motion } from 'framer-motion';
import { CaseSensitive } from 'lucide-react';

export default function Slide8_ToUpperToLower() {
  const examples = [
    {
      method: 'ToUpper',
      color: 'text-red-400',
      glowColor: 'rgba(239, 68, 68, 0.3)',
      items: [
        { code: 'ToUpper("hello")', result: '"HELLO"' },
        { code: 'ToUpper("Go 2024")', result: '"GO 2024"' },
      ],
    },
    {
      method: 'ToLower',
      color: 'text-blue-400',
      glowColor: 'rgba(59, 130, 246, 0.3)',
      items: [
        { code: 'ToLower("HELLO")', result: '"hello"' },
        { code: 'ToLower("Go 2024")', result: '"go 2024"' },
      ],
    },
  ];

  const blobVariants = {
    animate: {
      x: [0, 30, -30, 0],
      y: [0, -30, 30, 0],
      transition: { duration: 12, ease: 'easeInOut', repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Background orbs */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-red-500 to-orange-600 rounded-full blur-3xl opacity-12"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-3xl opacity-12"
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
          <CaseSensitive
            size={48}
            className="text-orange-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(251, 146, 60, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">ToUpper & ToLower</h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-8">
          {examples.map((section, sIdx) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: sIdx * 0.2, duration: 0.8 }}
            >
              {/* Method title */}
              <h3 className={`text-2xl font-bold mb-6 ${section.color}`}>
                {section.method}
              </h3>

              {/* Examples */}
              <div className="space-y-4">
                {section.items.map((item, iIdx) => (
                  <motion.div
                    key={iIdx}
                    whileHover={{ scale: 1.02 }}
                    className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 hover:border-opacity-50 transition-all"
                    style={{
                      boxShadow: `0 0 15px ${section.glowColor}`,
                    }}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <code className="font-mono text-sm flex-1 text-white">
                        {item.code}
                      </code>
                      <code className={`${section.color} font-mono font-bold whitespace-nowrap`}>
                        {item.result}
                      </code>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Glow */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(251, 146, 60, 0.15)',
            '0 0 150px rgba(251, 146, 60, 0.3)',
            '0 0 100px rgba(251, 146, 60, 0.15)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}