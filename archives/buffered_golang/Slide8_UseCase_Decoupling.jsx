import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Slide8_UseCase_Decoupling = () => {
  const [senderPos, setSenderPos] = useState(0);
  const [bufferItems, setBufferItems] = useState([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSenderPos((prev) => (prev + 1) % 8);
      setBufferItems((prev) => {
        let updated = [...prev];
        if (Math.random() > 0.4) updated.push(Math.random());
        if (updated.length > 3) updated.shift();
        return updated;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Use Case: Decoupling (Buffered)
        </motion.h1>

        <p className="text-xl text-slate-400">
          When you want goroutines to work at their own pace
        </p>

        <div className="grid grid-cols-2 gap-12 mt-12">
          {/* Real-world examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-cyan-400">Decoupling Benefits</h3>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-lg border border-slate-700 bg-slate-800/50"
              >
                <p className="text-white font-semibold text-sm">Producer-Consumer</p>
                <p className="text-slate-300 text-sm mt-2">
                  Producer writes at different speed than consumer reads
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-lg border border-slate-700 bg-slate-800/50"
              >
                <p className="text-white font-semibold text-sm">Rate Limiting</p>
                <p className="text-slate-300 text-sm mt-2">
                  Buffer acts as queue to handle burst traffic
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="p-4 rounded-lg border border-slate-700 bg-slate-800/50"
              >
                <p className="text-white font-semibold text-sm">Event Broadcasting</p>
                <p className="text-slate-300 text-sm mt-2">
                  Multiple listeners reading from buffered channel at their own pace
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="p-4 rounded-lg border border-slate-700 bg-slate-800/50"
              >
                <p className="text-white font-semibold text-sm">Work Queue</p>
                <p className="text-slate-300 text-sm mt-2">
                  Jobs queued in buffer, workers process at their own speed
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Live demonstration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-yellow-400">Producer-Consumer Queue</h3>

            {/* Producer */}
            <div className="p-6 rounded-lg border border-slate-700 bg-slate-800/50 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold">Fast Producer</p>
                <motion.div
                  animate={{ x: senderPos * 40 - 20 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl"
                >
                  📤
                </motion.div>
              </div>

              {/* Buffer visualization */}
              <div className="mt-6">
                <p className="text-slate-300 text-xs mb-3">Buffer Queue (Capacity: 3)</p>
                <div className="flex gap-2">
                  {[0, 1, 2].map((idx) => (
                    <motion.div
                      key={idx}
                      animate={{
                        backgroundColor:
                          idx < bufferItems.length
                            ? 'rgba(34, 197, 94, 0.3)'
                            : 'rgba(71, 85, 105, 0.3)',
                        borderColor:
                          idx < bufferItems.length
                            ? 'rgba(34, 197, 94, 0.8)'
                            : 'rgba(71, 85, 105, 0.8)',
                        scale: idx < bufferItems.length ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 h-16 rounded-lg border-2 flex items-center justify-center text-lg"
                    >
                      {idx < bufferItems.length && '📦'}
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Items in queue: <span className="text-green-400">{bufferItems.length}</span>/3
                </p>
              </div>
            </div>

            {/* Consumer */}
            <motion.div
              animate={{
                x: senderPos % 2 === 0 ? 0 : -10,
              }}
              transition={{ duration: 0.8 }}
              className="p-6 rounded-lg border border-slate-700 bg-slate-800/50"
            >
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold">Slow Consumer</p>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-2xl"
                >
                  📥
                </motion.div>
              </div>
              <p className="text-slate-300 text-sm mt-3">
                ✓ Can read at own pace without blocking producer
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide8_UseCase_Decoupling;