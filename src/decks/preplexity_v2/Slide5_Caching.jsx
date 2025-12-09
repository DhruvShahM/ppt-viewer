import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, RotateCw } from 'lucide-react';

const Slide5_Caching = () => {
  const [requests, setRequests] = useState([]);
  const [cacheHit, setCacheHit] = useState(0);
  const [cacheMiss, setCacheMiss] = useState(0);

  useEffect(() => {
    const cache = new Set();
    let hitCount = 0;
    let missCount = 0;

    const timeline = [
      { id: 1, time: 0, cached: false },
      { id: 2, time: 500, cached: false },
      { id: 1, time: 1000, cached: true },
      { id: 3, time: 1500, cached: false },
      { id: 2, time: 2000, cached: true },
      { id: 1, time: 2500, cached: true },
    ];

    timeline.forEach(({ id, time, cached }) => {
      setTimeout(() => {
        if (cached) {
          hitCount++;
          setCacheHit(hitCount);
        } else {
          missCount++;
          setCacheMiss(missCount);
          cache.add(id);
        }

        setRequests((prev) => [...prev.slice(-4), { id, cached, time: Date.now() }]);
      }, time);
    });

    const resetTimer = setInterval(() => {
      setRequests([]);
      setCacheHit(0);
      setCacheMiss(0);
    }, 4500);

    return () => clearInterval(resetTimer);
  }, []);

  const hitRate = cacheHit + cacheMiss > 0 ? Math.round((cacheHit / (cacheHit + cacheMiss)) * 100) : 0;

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Caching Strategies</h2>
        <p className="text-xl text-slate-300">Reduce latency by storing frequently accessed data</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Cache and Database */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* Cache */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="border-2 border-cyan-500 rounded-xl p-8 bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap size={28} className="text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Cache Layer</h3>
            </div>
            <p className="text-sm text-slate-300 mb-6">In-memory storage (Redis, Memcached)</p>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="bg-cyan-600 bg-opacity-30 border border-cyan-500 rounded px-4 py-2 text-cyan-300 text-sm font-mono"
                >
                  data_{i + 1}: 0.5ms
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Database */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-2 border-slate-600 rounded-xl p-8 bg-gradient-to-br from-slate-800 to-slate-900"
          >
            <div className="flex items-center gap-3 mb-6">
              <Database size={28} className="text-slate-400" />
              <h3 className="text-xl font-bold text-white">Database</h3>
            </div>
            <p className="text-sm text-slate-300 mb-6">Persistent storage (PostgreSQL, MongoDB)</p>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-700 bg-opacity-50 border border-slate-600 rounded px-4 py-2 text-slate-400 text-sm font-mono"
                >
                  record_{i + 1}: 50-200ms
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Request flow */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 mb-12">
          <h4 className="text-white font-bold mb-4">Recent Requests:</h4>
          <div className="space-y-3">
            {requests.map((req, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className={`flex items-center gap-4 p-4 rounded-lg ${
                  req.cached
                    ? 'bg-green-600 bg-opacity-20 border border-green-500'
                    : 'bg-orange-600 bg-opacity-20 border border-orange-500'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-current" />
                <span className="text-white">Request for data_{req.id}</span>
                <span className={`text-sm font-mono ${req.cached ? 'text-green-300' : 'text-orange-300'}`}>
                  {req.cached ? '✓ HIT (cache)' : '✗ MISS (database)'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Cache Hits', value: cacheHit, color: 'green' },
            { label: 'Cache Misses', value: cacheMiss, color: 'orange' },
            { label: 'Hit Rate', value: `${hitRate}%`, color: 'cyan' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`bg-${stat.color}-600 bg-opacity-20 border border-${stat.color}-500 rounded-lg p-6 text-center`}
            >
              <p className={`text-${stat.color}-300 text-sm font-semibold mb-2`}>{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}-400`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide5_Caching;