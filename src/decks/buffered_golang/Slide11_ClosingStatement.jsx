import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radio } from 'lucide-react';

const Slide11_ClosingStatement = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-4xl w-full space-y-12">
        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="text-center space-y-8"
        >
          {/* Icon */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: ['0 0 20px rgba(59,130,246,0.5)', '0 0 40px rgba(59,130,246,0.8)', '0 0 20px rgba(59,130,246,0.5)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-6 rounded-full bg-blue-600/20 border border-blue-500/50"
              >
                <Zap size={64} className="text-blue-400" strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-6xl font-bold text-white">
              Key Takeaways
            </h1>
          </motion.div>
        </motion.div>

        {/* Key points */}
        <div className="space-y-6">
          {[
            { icon: '📌', title: 'Unbuffered', desc: 'Synchronous - both goroutines must coordinate' },
            { icon: '📦', title: 'Buffered', desc: 'Asynchronous - sender and receiver can work independently' },
            { icon: '⚙️', title: 'Blocking', desc: 'Both types block when conditions aren\'t met' },
            { icon: '🎯', title: 'Choose Wisely', desc: 'Pick based on your coupling and rate requirements' },
          ].map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.15 }}
              className="flex items-start gap-4 p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 transition-colors"
            >
              <span className="text-3xl flex-shrink-0">{point.icon}</span>
              <div className="flex-1">
                <p className="text-white font-bold text-lg">{point.title}</p>
                <p className="text-slate-300 text-sm mt-1">{point.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="pt-8 text-center"
        >
          <p className="text-xl text-slate-400 mb-4">
            Now you understand the difference.
          </p>
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl font-bold text-green-400"
          >
            Go build something awesome! 🚀
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11_ClosingStatement;