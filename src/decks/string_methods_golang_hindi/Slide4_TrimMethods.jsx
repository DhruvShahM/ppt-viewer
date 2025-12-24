import React from 'react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';

const Slide4_TrimMethods = () => {
  const trimExamples = [
    { method: 'TrimSpace()', before: '  hello  ', after: 'hello' },
    { method: 'TrimPrefix()', before: 'prefixHello', after: 'Hello' },
    { method: 'TrimSuffix()', before: 'HelloSuffix', after: 'Hello' },
    { method: 'TrimLeft()', before: '###hello', after: 'hello' },
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-y-auto p-12">
      {/* Animated scissors animation background */}
      <motion.div
        className="absolute top-20 right-20 text-9xl opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Scissors />
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Scissors className="w-12 h-12 text-orange-400" />
          <h2 className="text-5xl font-bold text-white">Trim Methods - काटना</h2>
        </motion.div>

        {/* Grid of trim examples */}
        <div className="grid grid-cols-2 gap-6">
          {trimExamples.map((example, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
            >
              <motion.div
                className="bg-slate-800/50 rounded-lg p-6 border border-orange-500/30"
                whileHover={{
                  borderColor: 'rgba(234, 179, 8, 0.6)',
                  boxShadow: '0 0 20px rgba(234, 179, 8, 0.2)',
                }}
              >
                <h3 className="text-lg font-bold text-orange-300 mb-4">
                  {example.method}
                </h3>

                {/* Before and after animation */}
                <div className="space-y-3">
                  {/* Before */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                  >
                    <p className="text-xs text-slate-400 mb-1">पहले (Before):</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-white font-mono bg-red-500/10 px-3 py-2 rounded text-sm">
                        "{example.before}"
                      </code>
                      <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ✂️
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Arrow */}
                  <motion.div
                    className="flex justify-center"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <div className="text-orange-400 text-xl">↓</div>
                  </motion.div>

                  {/* After */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                  >
                    <p className="text-xs text-slate-400 mb-1">बाद में (After):</p>
                    <code className="block text-orange-300 font-mono bg-green-500/10 px-3 py-2 rounded text-sm">
                      "{example.after}"
                    </code>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom code example */}
        <motion.div
          className="mt-12 bg-slate-900/80 rounded-lg p-6 border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <pre className="text-slate-300 text-sm font-mono overflow-x-auto">
            {`str := "  hello world  "
result := strings.TrimSpace(str)         // "hello world"

str = "prefixHello"
result = strings.TrimPrefix(str, "prefix") // "Hello"`}
          </pre>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide4_TrimMethods;