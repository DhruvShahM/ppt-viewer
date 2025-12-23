import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Slide7_UseCase_TightCoupling = () => {
  const [requests, setRequests] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRequests((prev) => (prev + 1) % 4);
    }, 2000);
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
          Use Case: Tight Coupling (Unbuffered)
        </motion.h1>

        <p className="text-xl text-slate-400">
          When you need goroutines to wait for each other before proceeding
        </p>

        <div className="grid grid-cols-2 gap-12 mt-12">
          {/* Real-world example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-green-400">Synchronization Point</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/50">
                <p className="text-white font-semibold text-sm">Use Case: Request-Response</p>
                <p className="text-slate-300 text-sm mt-2">
                  HTTP server handling requests synchronously
                </p>
              </div>

              <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/50">
                <p className="text-white font-semibold text-sm">Pipeline Stages</p>
                <p className="text-slate-300 text-sm mt-2">
                  Each stage must complete before next stage begins
                </p>
              </div>

              <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/50">
                <p className="text-white font-semibold text-sm">Error Handling</p>
                <p className="text-slate-300 text-sm mt-2">
                  Must wait for goroutine to signal error before retrying
                </p>
              </div>
            </div>
          </motion.div>

          {/* Live demonstration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-blue-400">Live Demo</h3>

            {/* Request handler */}
            <div className="p-6 rounded-lg border border-slate-700 bg-slate-800/50 space-y-4">
              <p className="text-white font-semibold">Request Arrives</p>

              {/* Request flow */}
              <div className="space-y-3">
                {[0, 1, 2, 3].map((idx) => (
                  <motion.div
                    key={idx}
                    animate={{
                      x: requests >= idx ? 0 : -20,
                      opacity: requests >= idx ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`p-3 rounded-lg text-white font-semibold text-sm flex items-center gap-2 ${
                      requests === idx
                        ? 'bg-yellow-600/30 border border-yellow-500'
                        : requests > idx
                          ? 'bg-green-600/30 border border-green-500'
                          : 'bg-slate-700/30 border border-slate-600'
                    }`}
                  >
                    <motion.div
                      animate={{
                        scale: requests === idx ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.6, repeat: requests === idx ? Infinity : 0 }}
                    >
                      {requests === idx ? '⚙️' : requests > idx ? '✓' : '○'}
                    </motion.div>
                    <span>
                      {idx === 0 && 'Parse request'}
                      {idx === 1 && 'Process data'}
                      {idx === 2 && 'Query database'}
                      {idx === 3 && 'Send response'}
                    </span>
                  </motion.div>
                ))}
              </div>

              <p className="text-slate-300 text-xs mt-4">
                Each stage <span className="text-green-400 font-semibold">waits for previous stage</span> via unbuffered channel
              </p>
            </div>

            {/* Code snippet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="p-4 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-slate-300"
            >
              <p className="text-yellow-400">{'// Tight coupling - must wait'}</p>
              <p>
                <span className="text-blue-400">done</span> <span className="text-slate-400">:=</span>{' '}
                <span className="text-purple-400">make</span>
                <span className="text-slate-400">(</span>
                <span className="text-blue-400">chan</span>{' '}
                <span className="text-slate-300">bool</span>
                <span className="text-slate-400">)</span>
              </p>
              <p className="mt-2">
                <span className="text-slate-400">&lt;-</span>
                <span className="text-blue-400">done</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide7_UseCase_TightCoupling;