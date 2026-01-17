import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Slide5_IndexLastIndex() {
  const examples = [
    {
      method: 'Index',
      description: 'Returns the first occurrence index',
      items: [
        { code: 'Index("hello world", "o")', result: '4' },
        { code: 'Index("golang", "x")', result: '-1' },
      ],
    },
    {
      method: 'LastIndex',
      description: 'Returns the last occurrence index',
      items: [
        { code: 'LastIndex("hello world", "o")', result: '7' },
        { code: 'LastIndex("golang", "x")', result: '-1' },
      ],
    },
  ];

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 5, ease: 'easeInOut', repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Floating orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-full blur-3xl opacity-15"
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
          <MapPin
            size={48}
            className="text-indigo-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(102, 51, 153, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">Index & LastIndex</h2>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-indigo-200 mb-10"
        >
          Find the position of substrings in a string.
        </motion.p>

        {/* Examples */}
        <div className="space-y-8">
          {examples.map((section, sIdx) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + sIdx * 0.2, duration: 0.8 }}
            >
              {/* Section title */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-indigo-300 mb-1">
                  {section.method}
                </h3>
                <p className="text-sm text-indigo-200">{section.description}</p>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                {section.items.map((item, iIdx) => (
                  <motion.div
                    key={iIdx}
                    whileHover={{ scale: 1.02 }}
                    className="backdrop-blur-sm bg-white/5 border border-indigo-400/30 rounded-lg p-4"
                    style={{
                      boxShadow: '0 0 15px rgba(102, 51, 153, 0.25)',
                    }}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <code className="text-indigo-300 font-mono text-sm flex-1">
                        {item.code}
                      </code>
                      <span className="text-indigo-400 font-mono font-bold">
                        {item.result}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 80px rgba(102, 51, 153, 0.3)',
            '0 0 130px rgba(102, 51, 153, 0.45)',
            '0 0 80px rgba(102, 51, 153, 0.3)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}