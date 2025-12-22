import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Slide4_HasPrefixSuffix() {
  const examples = [
    {
      title: 'HasPrefix',
      icon: ArrowLeft,
      items: [
        { code: 'HasPrefix("golang", "go")', result: 'true' },
        { code: 'HasPrefix("hello", "hi")', result: 'false' },
      ],
    },
    {
      title: 'HasSuffix',
      icon: ArrowRight,
      items: [
        { code: 'HasSuffix("test.go", ".go")', result: 'true' },
        { code: 'HasSuffix("main.py", ".go")', result: 'false' },
      ],
    },
  ];

  const blobVariants = {
    animate: {
      x: [0, 40, -40, 0],
      y: [0, -30, 30, 0],
      transition: { duration: 10, ease: 'easeInOut', repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Background orbs */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-400 to-red-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute -bottom-32 right-1/4 w-96 h-96 bg-gradient-to-br from-red-500 to-pink-600 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-8"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12 text-center"
        >
          HasPrefix & HasSuffix
        </motion.h2>

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-8">
          {examples.map((section, sIdx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: sIdx * 0.2, duration: 0.8 }}
              >
                {/* Section header */}
                <div className="flex items-center gap-3 mb-6">
                  <Icon
                    size={40}
                    className="text-orange-400"
                    style={{
                      filter: 'drop-shadow(0 0 12px rgba(251, 146, 60, 0.7))',
                    }}
                  />
                  <h3 className="text-2xl font-bold text-white">
                    {section.title}
                  </h3>
                </div>

                {/* Examples */}
                <div className="space-y-3">
                  {section.items.map((item, iIdx) => (
                    <motion.div
                      key={iIdx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + iIdx * 0.1, duration: 0.6 }}
                      className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 hover:border-orange-400/50 transition-all"
                      style={{
                        boxShadow: '0 0 15px rgba(251, 146, 60, 0.2)',
                      }}
                    >
                      <div className="flex justify-between items-center gap-3">
                        <code className="text-orange-300 font-mono text-sm flex-1">
                          {item.code}
                        </code>
                        <span className="text-orange-400 font-mono whitespace-nowrap">
                          {item.result}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(251, 146, 60, 0.2)',
            '0 0 150px rgba(251, 146, 60, 0.35)',
            '0 0 100px rgba(251, 146, 60, 0.2)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}