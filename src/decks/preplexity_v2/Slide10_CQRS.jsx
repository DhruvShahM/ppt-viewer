import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Eye } from 'lucide-react';

const Slide10_CQRS = () => {
  const [writeCount, setWriteCount] = useState(0);
  const [readCount, setReadCount] = useState(0);

  useEffect(() => {
    const operations = [
      { type: 'write', time: 0 },
      { type: 'read', time: 500 },
      { type: 'read', time: 800 },
      { type: 'write', time: 1200 },
      { type: 'read', time: 1500 },
      { type: 'read', time: 1800 },
      { type: 'read', time: 2100 },
    ];

    operations.forEach(({ type, time }) => {
      setTimeout(() => {
        if (type === 'write') setWriteCount((p) => p + 1);
        else setReadCount((p) => p + 1);
      }, time);
    });

    const resetTimer = setInterval(() => {
      setWriteCount(0);
      setReadCount(0);
    }, 3000);

    return () => clearInterval(resetTimer);
  }, []);

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">CQRS Pattern</h2>
        <p className="text-xl text-slate-300">Separate read and write models for scalability</p>
      </motion.div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* Client layer */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* Write side */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="border-2 border-blue-500 rounded-xl p-8 bg-gradient-to-br from-slate-800 to-slate-900"
          >
            <div className="flex items-center gap-3 mb-4">
              <Edit3 size={28} className="text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Command (Write)</h3>
            </div>
            <p className="text-slate-300 mb-6">CreateUser, UpdateOrder, ProcessPayment</p>

            {/* Write operations */}
            <div className="space-y-2">
              {Array.from({ length: writeCount }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-blue-600 bg-opacity-30 border border-blue-500 rounded px-3 py-2 text-blue-300 text-sm font-mono"
                >
                  ✓ Write {i + 1}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Read side */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-2 border-green-500 rounded-xl p-8 bg-gradient-to-br from-slate-800 to-slate-900"
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye size={28} className="text-green-400" />
              <h3 className="text-2xl font-bold text-white">Query (Read)</h3>
            </div>
            <p className="text-slate-300 mb-6">GetUser, ListOrders, GetDashboard</p>

            {/* Read operations */}
            <div className="space-y-2">
              {Array.from({ length: readCount }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-green-600 bg-opacity-30 border border-green-500 rounded px-3 py-2 text-green-300 text-sm font-mono"
                >
                  ✓ Read {i + 1}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Separation layer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-xl p-6 mb-12 border-2 border-purple-500"
        >
          <h3 className="text-xl font-bold text-white text-center mb-3">Event Store / Event Bus</h3>
          <p className="text-center text-purple-200">
            Writes persist events → Reads built from event projections (eventual consistency)
          </p>
        </motion.div>

        {/* Data stores */}
        <div className="grid grid-cols-2 gap-8">
          {/* Write store */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="border-2 border-blue-600 rounded-lg p-6 bg-slate-800 text-center"
          >
            <h4 className="text-blue-400 font-bold mb-2">Write Database</h4>
            <p className="text-slate-300 text-sm">Optimized for writes (normalized)</p>
          </motion.div>

          {/* Read store */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
            className="border-2 border-green-600 rounded-lg p-6 bg-slate-800 text-center"
          >
            <h4 className="text-green-400 font-bold mb-2">Read Database</h4>
            <p className="text-slate-300 text-sm">Optimized for reads (denormalized)</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide10_CQRS;