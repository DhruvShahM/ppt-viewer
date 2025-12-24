import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Copy } from 'lucide-react';

const Slide6_JoinAndRepeat = () => {
  const joinExample = ['hello', 'world', 'go'];
  const repeatExample = 'OK';

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-y-auto p-12">
      {/* Animated dots background */}
      <motion.div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link2 className="w-12 h-12 text-blue-400" />
          <h2 className="text-5xl font-bold text-white">
            Join & Repeat - जोड़ना और दोहराना
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-12">
          {/* Join section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
              <Link2 className="w-8 h-8" />
              Join()
            </h3>

            {/* Input slices */}
            <div className="space-y-3 mb-6">
              {joinExample.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <motion.div
                    className="px-4 py-2 bg-cyan-500/20 border border-cyan-400 rounded font-mono text-cyan-300"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
                  >
                    "{item}"
                  </motion.div>
                  {idx < joinExample.length - 1 && (
                    <motion.div
                      className="mx-3 text-cyan-400"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      +
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Joining animation */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-cyan-400 text-2xl">↓</div>
            </motion.div>

            {/* Result */}
            <motion.div
              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-6 border border-cyan-400/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-sm text-slate-400 mb-2">परिणाम:</p>
              <code className="text-cyan-300 font-mono text-lg">
                "hello world go"
              </code>
            </motion.div>

            {/* Code */}
            <motion.div
              className="mt-6 bg-slate-900/80 rounded p-4 border border-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <pre className="text-slate-300 text-xs font-mono">
                {`arr := []string{"hello", "world", "go"}
result := strings.Join(arr, " ")
// "hello world go"`}
              </pre>
            </motion.div>
          </motion.div>

          {/* Repeat section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-purple-300 mb-6 flex items-center gap-2">
              <Copy className="w-8 h-8" />
              Repeat()
            </h3>

            {/* Repeat visualization */}
            <div className="space-y-4">
              {[1, 2, 3].map((count, idx) => (
                <motion.div
                  key={idx}
                  className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.15 }}
                  whileHover={{ borderColor: 'rgba(168, 85, 247, 0.6)' }}
                >
                  <p className="text-xs text-slate-400 mb-2">
                    Repeat({count}x):
                  </p>
                  <motion.div
                    className="flex flex-wrap gap-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3,
                    }}
                  >
                    {[...Array(count)].map((_, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-500/20 border border-purple-400 rounded font-mono text-purple-300"
                      >
                        {repeatExample}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Code */}
            <motion.div
              className="mt-6 bg-slate-900/80 rounded p-4 border border-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <pre className="text-slate-300 text-xs font-mono">
                {`result := strings.Repeat("OK", 3)
// "OKOKOK"`}
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Slide6_JoinAndRepeat;