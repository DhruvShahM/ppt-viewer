import React from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

const Slide5_HTTP2Revolution = () => {
  const renderConnection = (label, count, delay) => (
    <div key={label} className="flex flex-col items-center">
      <p className="text-sm text-slate-400 mb-4 font-semibold">{label}</p>
      <div className="flex flex-col gap-2 h-32 justify-center">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            className="w-8 h-2 bg-cyan-500 rounded-full"
            animate={{
              x: [0, 100, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              delay: delay + i * 0.1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Network className="w-16 h-16 text-cyan-400" />
            </motion.div>
            HTTP/2: The Game Changer
          </h2>
          <p className="text-xl text-slate-400">
            Multiplexing: Send & receive multiple streams simultaneously
          </p>
        </motion.div>

        {/* HTTP/1.1 vs HTTP/2 Comparison */}
        <div className="grid grid-cols-2 gap-12 mb-12 max-w-4xl mx-auto">
          {/* HTTP/1.1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-slate-800 rounded-xl p-8 border border-red-500/30"
          >
            <h3 className="text-2xl font-bold text-red-300 mb-6 text-center">
              HTTP/1.1
            </h3>
            <p className="text-sm text-slate-400 text-center mb-8">
              Sequential connections (slow waterfall effect)
            </p>
            {renderConnection('6 connections', 6, 0)}
            <motion.div
              className="mt-4 text-center text-red-300 font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              ❌ One request at a time
            </motion.div>
          </motion.div>

          {/* HTTP/2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-slate-800 rounded-xl p-8 border border-green-500/30"
          >
            <h3 className="text-2xl font-bold text-green-300 mb-6 text-center">
              HTTP/2
            </h3>
            <p className="text-sm text-slate-400 text-center mb-8">
              Single connection with multiplexed streams
            </p>
            {renderConnection('100+ streams', 6, 0.5)}
            <motion.div
              className="mt-4 text-center text-green-300 font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              ✅ Concurrent requests
            </motion.div>
          </motion.div>
        </div>

        {/* Key benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 rounded-xl p-8"
        >
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { title: 'Multiplexing', desc: 'Send 100+ requests at once' },
              { title: 'Server Push', desc: 'Push data proactively' },
              { title: 'Header Compression', desc: 'Reduce overhead' },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 + idx * 0.1 }}
              >
                <p className="font-bold text-cyan-300 text-lg mb-2">
                  {benefit.title}
                </p>
                <p className="text-sm text-slate-400">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5_HTTP2Revolution;