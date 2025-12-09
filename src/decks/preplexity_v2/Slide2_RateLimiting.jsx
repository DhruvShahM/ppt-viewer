import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingDown } from 'lucide-react';

const Slide2_RateLimiting = () => {
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequestCount((prev) => (prev >= 5 ? 0 : prev + 1));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const requests = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Rate Limiting</h2>
        <p className="text-xl text-slate-300">Control request flow to prevent system overload</p>
      </motion.div>

      {/* Animated rate limiter visualization */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Request queue */}
        <div className="mb-12">
          <p className="text-sm text-slate-400 mb-4 font-semibold">Incoming Requests:</p>
          <div className="flex gap-3 flex-wrap justify-center">
            {requests.map((i) => (
              <motion.div
                key={i}
                animate={i < requestCount ? { y: 120, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold"
              >
                {i + 1}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rate limiter box */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-2 border-cyan-500 rounded-xl p-8 bg-slate-800 bg-opacity-50 backdrop-blur-sm mb-12 relative"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Zap size={24} className="text-cyan-400" />
              Rate Limiter: 5 req/sec
            </h3>
            <TrendingDown size={24} className="text-cyan-400" />
          </div>

          {/* Animated bar */}
          <div className="bg-slate-700 rounded-lg h-3 overflow-hidden">
            <motion.div
              animate={{ width: [0, 100, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
            />
          </div>

          <p className="text-sm text-slate-300 mt-4">
            ✓ Allows 5 requests → Queues/Rejects excess
          </p>
        </motion.div>

        {/* Accepted requests */}
        <div>
          <p className="text-sm text-slate-400 mb-4 font-semibold">Processed Requests:</p>
          <div className="flex gap-3 justify-center flex-wrap">
            {Array.from({ length: Math.min(requestCount, 5) }, (_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold"
              >
                ✓
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide2_RateLimiting;