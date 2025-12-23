import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox } from 'lucide-react';

const Slide4_BufferedChannels = () => {
  const [items, setItems] = useState(0);
  const capacity = 3;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => (prev + 1) % (capacity + 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const isFull = items >= capacity;
  const isEmpty = items === 0;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Buffered Channels
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-400 mb-12"
        >
          {`make(chan int, capacity) // Capacity > 0`}
        </motion.p>

        <div className="grid grid-cols-2 gap-12">
          {/* Left: Buffer visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-slate-300 font-semibold mb-4">Channel Buffer (Capacity: 3)</p>

            {/* Buffer slots */}
            <motion.div
              className="flex gap-3"
              animate={{
                scale: isFull ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              {[0, 1, 2].map((idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.15 + 0.4 }}
                  className={`w-20 h-20 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all ${
                    idx < items
                      ? 'bg-yellow-600/30 border-yellow-500 text-yellow-300'
                      : 'bg-slate-700/30 border-slate-600 text-slate-500'
                  }`}
                >
                  {idx < items && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-2xl"
                    >
                      📦
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Status */}
            <motion.div
              animate={{
                backgroundColor: isFull
                  ? 'rgba(239, 68, 68, 0.2)'
                  : isEmpty
                    ? 'rgba(100, 116, 139, 0.2)'
                    : 'rgba(34, 197, 94, 0.2)',
                borderColor: isFull
                  ? 'rgba(239, 68, 68, 0.8)'
                  : isEmpty
                    ? 'rgba(100, 116, 139, 0.8)'
                    : 'rgba(34, 197, 94, 0.8)',
              }}
              transition={{ duration: 0.4 }}
              className="p-4 rounded-lg border-2"
            >
              <p className="text-white font-semibold">
                Items: <span className="text-yellow-400">{items}</span> / {capacity}
              </p>
              <p className="text-slate-300 text-sm mt-2">
                {isEmpty && '✓ Empty - Sender can write immediately'}
                {!isEmpty && !isFull && '✓ Partial - Sender writes without blocking'}
                {isFull && '⚠️ Full - Sender blocked until receiver reads'}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Key Points */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6 flex flex-col justify-center"
          >
            <h3 className="text-3xl font-bold text-blue-400">Key Characteristics:</h3>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-lg bg-blue-600/10 border border-blue-500/50"
            >
              <p className="text-white font-semibold">Asynchronous (Partial)</p>
              <p className="text-slate-300 text-sm mt-1">
                Sender doesn't block until buffer is full
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 }}
              className="p-4 rounded-lg bg-yellow-600/10 border border-yellow-500/50"
            >
              <p className="text-white font-semibold">Flexible Coupling</p>
              <p className="text-slate-300 text-sm mt-1">
                Sender and receiver can operate independently (within capacity)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="p-4 rounded-lg bg-purple-600/10 border border-purple-500/50"
            >
              <p className="text-white font-semibold">Decoupling</p>
              <p className="text-slate-300 text-sm mt-1">
                Capacity acts as a cushion for rate differences
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.95 }}
              className="p-4 rounded-lg bg-red-600/10 border border-red-500/50"
            >
              <p className="text-white font-semibold">Still Blocking</p>
              <p className="text-slate-300 text-sm mt-1">
                Sender blocks if buffer is full, receiver blocks if empty
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide4_BufferedChannels;