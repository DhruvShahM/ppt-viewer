import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Slide6_DataFlowSimulation = () => {
  const [phase, setPhase] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 10);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const isUnbufferedPhase = phase < 5;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white"
        >
          Data Flow: What Happens Inside?
        </motion.h1>

        {/* Unbuffered simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-lg border border-purple-500/50 bg-purple-600/10"
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Unbuffered Channel</h2>

          <div className="space-y-4">
            {/* Timeline */}
            <div className="relative h-32 bg-slate-800/50 rounded-lg p-6">
              {/* Sender arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isUnbufferedPhase ? 1 : 0.3 }}
                className="absolute left-0 top-4 h-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-semibold flex items-center px-4 rounded"
                style={{
                  width: `${(phase % 5) * 20}%`,
                  minWidth: '60px',
                  maxWidth: '90%',
                }}
              >
                Sender
              </motion.div>

              {/* Receiver arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isUnbufferedPhase ? 1 : 0.3 }}
                className="absolute left-0 bottom-4 h-8 bg-gradient-to-r from-green-600 to-green-400 text-white text-sm font-semibold flex items-center px-4 rounded"
                style={{
                  width: `${(phase % 5) * 20}%`,
                  minWidth: '60px',
                  maxWidth: '90%',
                }}
              >
                Receiver
              </motion.div>

              {/* Handshake zone */}
              <motion.div
                animate={{
                  left: isUnbufferedPhase ? '50%' : '0%',
                  opacity: isUnbufferedPhase ? 0.5 : 0,
                }}
                className="absolute top-0 w-16 h-full bg-yellow-500 rounded-lg opacity-20"
              />
            </div>

            <p className="text-slate-300 text-sm">
              {phase % 5 === 0 && '⏳ Waiting for both goroutines to sync...'}
              {phase % 5 === 1 && '🤝 Sender and receiver are rendezvous-ing...'}
              {phase % 5 === 2 && '📤 Data is being passed directly...'}
              {phase % 5 === 3 && '📥 Receiver gets the data...'}
              {phase % 5 === 4 && '✓ Both goroutines can now proceed'}
            </p>
          </div>
        </motion.div>

        {/* Buffered simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-lg border border-cyan-500/50 bg-cyan-600/10"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Buffered Channel (Capacity: 3)</h2>

          <div className="space-y-4">
            {/* Buffer visualization */}
            <div className="flex gap-2 items-end h-24">
              {[0, 1, 2].map((idx) => {
                const bufferLevel = !isUnbufferedPhase
                  ? ((phase - 5) % 3) === idx
                    ? 100
                    : (phase - 5) > idx
                      ? 100
                      : 0
                  : 0;

                return (
                  <motion.div
                    key={idx}
                    className="flex-1 rounded-lg border-2 border-cyan-500 bg-cyan-600/10 relative overflow-hidden"
                    style={{ height: '100%' }}
                  >
                    <motion.div
                      animate={{ height: `${bufferLevel}%` }}
                      transition={{ duration: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-600 to-cyan-400"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {bufferLevel > 0 && '📦'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-slate-300 text-sm">
              {(phase - 5) % 3 === 0 && !isUnbufferedPhase && '📤 Sender writes to buffer slot 1 (no block)'}
              {(phase - 5) % 3 === 1 && !isUnbufferedPhase && '📤 Sender writes to buffer slot 2 (no block)'}
              {(phase - 5) % 3 === 2 && !isUnbufferedPhase && '📤 Sender writes to buffer slot 3 (no block)'}
              {(phase - 5) >= 3 && !isUnbufferedPhase && '⚠️ Buffer full - Sender blocks until receiver reads'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_DataFlowSimulation;