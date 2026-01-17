import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function Slide10_ReplaceRepeat() {
  const blobVariants = {
    animate: {
      rotate: [0, 360],
      transition: { duration: 18, ease: 'linear', repeat: Infinity },
    },
  };

  const examples = [
    {
      method: 'Replace',
      items: [
        { code: 'Replace("hello hello", "hello", "hi", -1)', result: '"hi hi"' },
        { code: 'Replace("test", "e", "E", 1)', result: '"tEst"' },
      ],
    },
    {
      method: 'Repeat',
      items: [
        { code: 'Repeat("ab", 3)', result: '"ababab"' },
        { code: 'Repeat("go", 0)', result: '""' },
      ],
    },
  ];

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Rotating background */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full blur-3xl opacity-12"
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
          <RefreshCw
            size={48}
            className="text-sky-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">Replace & Repeat</h2>
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
              <h3 className="text-2xl font-bold text-sky-300 mb-6">
                {section.method}
              </h3>

              {/* Examples */}
              <div className="space-y-4">
                {section.items.map((item, iIdx) => (
                  <motion.div
                    key={iIdx}
                    whileHover={{ scale: 1.02 }}
                    className="backdrop-blur-sm bg-white/5 border border-sky-400/30 rounded-lg p-4"
                    style={{
                      boxShadow: '0 0 15px rgba(56, 189, 248, 0.25)',
                    }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <code className="text-sky-300 font-mono text-sm flex-1">
                        {item.code}
                      </code>
                      <code className="text-sky-400 font-mono font-bold whitespace-nowrap">
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
            '0 0 100px rgba(56, 189, 248, 0.2)',
            '0 0 150px rgba(56, 189, 248, 0.35)',
            '0 0 100px rgba(56, 189, 248, 0.2)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}