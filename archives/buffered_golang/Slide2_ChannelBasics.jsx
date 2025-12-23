import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radio } from 'lucide-react';

const Slide2_ChannelBasics = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-12"
        >
          What is a Channel?
        </motion.h1>

        <div className="grid grid-cols-2 gap-12">
          {/* Left: Definition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-2xl text-blue-400 font-semibold">A channel is:</p>
              <ul className="space-y-3 text-lg text-slate-300">
                <li className="flex items-start gap-4">
                  <span className="text-blue-400 font-bold mt-1">→</span>
                  <span>A <span className="text-green-400">communication mechanism</span> between goroutines</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-400 font-bold mt-1">→</span>
                  <span>Enables <span className="text-green-400">safe data passing</span> across goroutines</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-400 font-bold mt-1">→</span>
                  <span>Built-in <span className="text-green-400">synchronization primitive</span></span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right: Visual representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-80 h-64">
              {/* Goroutine 1 */}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-0 top-1/4 w-20 h-20 rounded-lg bg-purple-600/30 border border-purple-500 flex items-center justify-center"
              >
                <span className="text-white font-semibold text-sm">Sender</span>
              </motion.div>

              {/* Channel */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-1/4 top-1/2 w-40 h-16 rounded-lg bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center"
              >
                <Radio className="text-blue-400" size={32} />
                <span className="text-blue-400 font-semibold ml-2">Channel</span>
              </motion.div>

              {/* Goroutine 2 */}
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute right-0 top-1/4 w-20 h-20 rounded-lg bg-cyan-600/30 border border-cyan-500 flex items-center justify-center"
              >
                <span className="text-white font-semibold text-sm">Receiver</span>
              </motion.div>

              {/* Animated data packet */}
              <motion.div
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 160, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 w-6 h-6 rounded-full bg-yellow-400 transform -translate-y-1/2"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide2_ChannelBasics;