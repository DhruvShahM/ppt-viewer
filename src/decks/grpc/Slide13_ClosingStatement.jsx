import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Globe } from 'lucide-react';

const Slide13_ClosingStatement = () => {
  const floatingEmojis = ['⚡', '🚀', '💡', '🔥', '✨', '🎯'];

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: Math.random() * 1920,
            y: Math.random() * 1080,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [Math.random() * 1080, Math.random() * 200],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Floating emojis */}
      {floatingEmojis.map((emoji, idx) => (
        <motion.div
          key={idx}
          className="absolute text-4xl"
          initial={{
            x: -200 + idx * 70,
            y: 400,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: idx * 0.3,
            ease: 'easeOut',
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
            <Zap className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-7xl font-black text-white mb-6 leading-tight"
        >
          The Future is
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            gRPC-Powered
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-2xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          High-performance communication is no longer optional. It's essential
          for building the next generation of distributed systems.
        </motion.p>

        {/* Key takeaways */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: '⚡', text: '7-10x Faster' },
            { icon: '💾', text: 'Smaller Payloads' },
            { icon: '🔒', text: 'Type-Safe' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4 backdrop-blur-sm"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.2,
              }}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-cyan-300 font-semibold">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg flex items-center gap-2"
          >
            Start Building Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2 text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Globe className="w-5 h-5" />
          <span>Connect the world with gRPC</span>
        </motion.div>
      </div>

      {/* Animated bottom line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        animate={{
          x: [-1920, 1920],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default Slide13_ClosingStatement;