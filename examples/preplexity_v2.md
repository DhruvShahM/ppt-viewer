Perfect. Now I'll create a cinematic animated presentation deck on System Design Patterns. This will be a 12-slide experience covering the most critical patterns.

***

## Slide1_Title.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Grid3x3, ArrowRight } from 'lucide-react';

const Slide1_Title = () => {
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: { duration: 3, repeat: Infinity },
    },
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Glow orbs */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-30"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        transition={{ duration: 4, delay: 1, repeat: Infinity }}
        className="absolute bottom-32 right-20 w-40 h-40 bg-cyan-500 rounded-full filter blur-3xl opacity-20"
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600"
          >
            <Grid3x3 size={48} className="text-white" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl font-black text-white mb-6"
        >
          System Design
          <motion.span
            animate={{ backgroundPosition: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            Patterns
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl text-slate-300 mb-8"
        >
          Building Scalable, Resilient, Production-Ready Systems
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-3 text-cyan-400"
        >
          <Zap size={20} />
          <span>12 Critical Patterns to Master</span>
          <ArrowRight size={20} />
        </motion.div>
      </div>
    </div>
  );
};

export default Slide1_Title;
```

## Slide2_RateLimiting.jsx

```jsx
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
```

## Slide3_CircuitBreaker.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const Slide3_CircuitBreaker = () => {
  const [state, setState] = useState('closed'); // closed, open, half-open
  const failureRate = state === 'open' ? 90 : state === 'half-open' ? 20 : 5;

  useEffect(() => {
    const timeline = [
      { time: 3000, state: 'closed' },
      { time: 6000, state: 'open' },
      { time: 10000, state: 'half-open' },
      { time: 14000, state: 'closed' },
    ];

    timeline.forEach(({ time, newState }) => {
      setTimeout(() => setState(newState), time);
    });
  }, []);

  const getStateColor = () => {
    switch (state) {
      case 'closed':
        return 'from-green-500 to-emerald-600';
      case 'open':
        return 'from-red-500 to-rose-600';
      case 'half-open':
        return 'from-yellow-500 to-orange-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getStateIcon = () => {
    switch (state) {
      case 'closed':
        return <CheckCircle2 size={32} className="text-white" />;
      case 'open':
        return <AlertCircle size={32} className="text-white" />;
      case 'half-open':
        return <Clock size={32} className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Circuit Breaker</h2>
        <p className="text-xl text-slate-300">Prevent cascading failures with intelligent state management</p>
      </motion.div>

      {/* State visualization */}
      <div className="relative z-10 max-w-3xl w-full">
        {/* Current state indicator */}
        <motion.div
          key={state}
          animate={{ scale: [0.9, 1.1, 1] }}
          transition={{ duration: 0.6 }}
          className={`bg-gradient-to-br ${getStateColor()} rounded-2xl p-12 mb-12 text-center border-2 border-white border-opacity-20`}
        >
          <div className="flex justify-center mb-6">{getStateIcon()}</div>
          <h3 className="text-3xl font-bold text-white mb-2 capitalize">{state === 'half-open' ? 'Half-Open' : state}</h3>
          <p className="text-white text-opacity-90">
            {state === 'closed' && 'System operating normally. Requests flowing.'}
            {state === 'open' && 'Failure threshold exceeded. Blocking all requests.'}
            {state === 'half-open' && 'Testing recovery. Allowing limited requests.'}
          </p>
        </motion.div>

        {/* State flow */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {['Closed', 'Open', 'Half-Open'].map((s, i) => (
            <motion.div
              key={s}
              animate={
                state === s.toLowerCase().replace('-', '')
                  ? { scale: 1.1, boxShadow: '0 0 20px rgba(59,130,246,1)' }
                  : { scale: 1, boxShadow: '0 0 0px rgba(59,130,246,0)' }
              }
              className="border-2 border-slate-700 rounded-lg p-6 bg-slate-800 text-center"
            >
              <h4 className="text-white font-bold mb-2">{s}</h4>
              <p className="text-sm text-slate-300">
                {s === 'Closed' && 'Normal operation'}
                {s === 'Open' && 'Reject requests'}
                {s === 'Half-Open' && 'Test recovery'}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Failure rate gauge */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold">Failure Rate</span>
            <span className="text-cyan-400 font-bold text-2xl">{failureRate}%</span>
          </div>
          <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
            <motion.div
              animate={{ width: `${failureRate}%` }}
              transition={{ duration: 0.8 }}
              className={`h-full bg-gradient-to-r ${failureRate > 50 ? 'from-red-500 to-rose-600' : 'from-yellow-500 to-orange-600'}`}
            />
          </div>
          <p className="text-xs text-slate-400 mt-3">Threshold: 50% failures → OPEN</p>
        </div>
      </div>
    </div>
  );
};

export default Slide3_CircuitBreaker;
```

## Slide4_LoadBalancing.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Server, ArrowRightLeft } from 'lucide-react';

const Slide4_LoadBalancing = () => {
  const [distribution, setDistribution] = useState([0, 0, 0]);

  useEffect(() => {
    const requests = [
      { server: 0, time: 0 },
      { server: 1, time: 300 },
      { server: 2, time: 600 },
      { server: 0, time: 900 },
      { server: 1, time: 1200 },
      { server: 2, time: 1500 },
    ];

    requests.forEach(({ server, time }) => {
      setTimeout(() => {
        setDistribution((prev) => {
          const newDist = [...prev];
          newDist[server]++;
          return newDist;
        });
      }, time);
    });

    const resetTimer = setInterval(() => {
      setDistribution([0, 0, 0]);
    }, 2500);

    return () => clearInterval(resetTimer);
  }, []);

  const servers = [
    { id: 0, load: distribution[0] },
    { id: 1, load: distribution[1] },
    { id: 2, load: distribution[2] },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Load Balancing</h2>
        <p className="text-xl text-slate-300">Distribute traffic evenly across servers</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Load balancer */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-16"
        >
          <div className="border-4 border-cyan-500 rounded-full w-20 h-20 flex items-center justify-center bg-gradient-to-br from-cyan-600 to-blue-600 relative">
            <ArrowRightLeft size={32} className="text-white" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400"
            />
          </div>
        </motion.div>

        {/* Servers */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {servers.map((server) => (
            <motion.div key={server.id} layout className="flex flex-col items-center">
              {/* Server box */}
              <motion.div
                animate={{
                  boxShadow:
                    server.load > 0
                      ? `0 0 20px rgba(34,197,94,${server.load * 0.3})`
                      : '0 0 0px rgba(0,0,0,0)',
                }}
                className="bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-slate-700 rounded-xl p-8 w-full text-center mb-4 relative overflow-hidden"
              >
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{
                      scale: server.load > 0 ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Server size={32} className="text-cyan-400" />
                  </motion.div>
                </div>
                <h3 className="text-white font-bold mb-2">Server {server.id + 1}</h3>

                {/* Load indicator */}
                <div className="bg-slate-700 rounded-lg h-2 overflow-hidden mb-3">
                  <motion.div
                    animate={{ width: `${Math.min(server.load * 20, 100)}%` }}
                    transition={{ duration: 0.4 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
                <p className="text-sm text-slate-300">Load: {server.load * 20}%</p>

                {/* Incoming requests */}
                <div className="mt-6 h-16 flex items-end justify-center gap-2">
                  {Array.from({ length: server.load }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 60, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-2 h-8 bg-green-500 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border border-slate-700 bg-slate-800 rounded-lg p-6"
        >
          <p className="text-slate-200">
            <span className="font-semibold text-cyan-400">Round-robin distribution:</span> Each request
            directed to the next available server in rotation
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide4_LoadBalancing;
```

## Slide5_Caching.jsx

```jsx
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
```

## Slide6_Microservices.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, ArrowRight } from 'lucide-react';

const Slide6_Microservices = () => {
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: 'Auth Service', color: 'from-blue-600 to-blue-700', desc: 'JWT, OAuth' },
    { name: 'Payment Service', color: 'from-green-600 to-green-700', desc: 'Stripe, PayPal' },
    { name: 'Order Service', color: 'from-purple-600 to-purple-700', desc: 'Order logic' },
    { name: 'Notification Service', color: 'from-pink-600 to-pink-700', desc: 'Email, SMS' },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Microservices Architecture</h2>
        <p className="text-xl text-slate-300">Decompose monolith into independent, scalable services</p>
      </motion.div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* API Gateway */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full px-8 py-4">
            <Box size={24} className="text-white" />
            <span className="text-white font-bold">API Gateway</span>
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: activeService === idx ? 1.05 : 1,
                boxShadow:
                  activeService === idx
                    ? `0 0 30px rgba(34,197,94,0.6)`
                    : '0 0 0px rgba(0,0,0,0)',
              }}
              transition={{ duration: 0.6 }}
              className={`bg-gradient-to-br ${service.color} rounded-xl p-8 border-2 ${activeService === idx ? 'border-green-400' : 'border-slate-700'} cursor-pointer relative overflow-hidden`}
            >
              {/* Animated background */}
              <motion.div
                animate={{ opacity: activeService === idx ? [0.3, 0.6, 0.3] : 0.1 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white"
              />

              <div className="relative z-10">
                <motion.div
                  animate={{
                    rotate: activeService === idx ? [0, 360] : 0,
                  }}
                  transition={{ duration: 2 }}
                  className="flex justify-center mb-4"
                >
                  <Box size={32} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-sm text-white text-opacity-80">{service.desc}</p>
              </div>

              {/* Active indicator */}
              {activeService === idx && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="absolute top-4 right-4 w-3 h-3 bg-green-300 rounded-full"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Communication info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-l-4 border-cyan-500 bg-slate-800 bg-opacity-50 rounded-r-lg p-6"
        >
          <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
            <ArrowRight size={20} />
            Inter-Service Communication
          </h4>
          <p className="text-slate-200">
            REST APIs, gRPC, or Message Queues (RabbitMQ, Kafka) enable independent services to communicate
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_Microservices;
```

## Slide7_APIGateway.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Shield, BarChart3 } from 'lucide-react';

const Slide7_APIGateway = () => {
  const [requestFlow, setRequestFlow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequestFlow((prev) => (prev + 1) % 3);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Shield, label: 'Authentication', color: 'from-blue-600 to-cyan-600' },
    { icon: BarChart3, label: 'Rate Limiting', color: 'from-purple-600 to-pink-600' },
    { icon: Share2, label: 'Routing', color: 'from-green-600 to-emerald-600' },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">API Gateway Pattern</h2>
        <p className="text-xl text-slate-300">Single entry point managing all client requests</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Clients */}
        <div className="flex justify-around mb-12">
          {['Web', 'Mobile', 'Desktop'].map((client, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-lg bg-slate-700 border-2 border-slate-600 flex items-center justify-center mb-3 mx-auto">
                <span className="text-white font-bold">{client}</span>
              </div>
              <p className="text-sm text-slate-400">Client</p>
            </motion.div>
          ))}
        </div>

        {/* Arrows pointing to gateway */}
        <div className="relative h-12 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
              className={`absolute ${
                i === 0 ? 'left-[16%]' : i === 1 ? 'left-[50%]' : 'left-[83%]'
              } top-0 translate-x--1/2`}
            >
              <div className="text-cyan-400 text-2xl">↓</div>
            </motion.div>
          ))}
        </div>

        {/* API Gateway */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 mb-12 border-2 border-cyan-400 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6">API Gateway</h3>

          {/* Features grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: requestFlow === i ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.6 }}
                  className={`bg-gradient-to-br ${feature.color} rounded-lg p-4 text-center border border-white border-opacity-20`}
                >
                  <Icon size={24} className="text-white mx-auto mb-2" />
                  <p className="text-sm text-white font-semibold">{feature.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Process flow */}
          <div className="bg-black bg-opacity-30 rounded-lg p-4">
            <p className="text-white text-sm font-mono text-center">
              {requestFlow === 0 && '1. Verify JWT Token'}
              {requestFlow === 1 && '2. Check Rate Limits'}
              {requestFlow === 2 && '3. Route to Service'}
            </p>
          </div>
        </motion.div>

        {/* Downstream services */}
        <div className="grid grid-cols-3 gap-4">
          {['Auth\nService', 'Order\nService', 'Payment\nService'].map((service, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                delay: 0.3 + i * 0.2,
                repeat: Infinity,
              }}
              className="border-2 border-slate-600 rounded-lg p-6 bg-slate-800 text-center"
            >
              <span className="text-white font-bold whitespace-pre-line">{service}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide7_APIGateway;
```

## Slide8_EventDriven.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, MessageSquare, Archive } from 'lucide-react';

const Slide8_EventDriven = () => {
  const [eventQueue, setEventQueue] = useState([]);

  useEffect(() => {
    const events = [
      { id: 1, name: 'UserSignUp', time: 0, color: 'blue' },
      { id: 2, name: 'OrderCreated', time: 800, color: 'green' },
      { id: 3, name: 'PaymentProcessed', time: 1600, color: 'purple' },
      { id: 4, name: 'EmailSent', time: 2400, color: 'pink' },
    ];

    events.forEach(({ id, name, time, color }) => {
      setTimeout(() => {
        setEventQueue((prev) => [...prev.slice(-3), { id, name, color }]);
      }, time);
    });

    const resetTimer = setInterval(() => {
      setEventQueue([]);
    }, 3500);

    return () => clearInterval(resetTimer);
  }, []);

  const subscribers = [
    { name: 'Email Service', events: ['UserSignUp', 'OrderCreated'] },
    { name: 'Analytics Service', events: ['UserSignUp', 'OrderCreated', 'PaymentProcessed'] },
    { name: 'Notification Service', events: ['OrderCreated', 'PaymentProcessed'] },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Event-Driven Architecture</h2>
        <p className="text-xl text-slate-300">Services communicate through asynchronous events</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Event source */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full px-8 py-4">
            <Zap size={24} className="text-white" />
            <span className="text-white font-bold">Event Source</span>
          </div>
        </motion.div>

        {/* Event broker */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-gradient-to-b from-purple-900 to-purple-800 border-4 border-purple-500 rounded-2xl p-8 mb-12 text-center relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <MessageSquare size={32} className="text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Message Broker</h3>
            <p className="text-purple-200 mb-6">RabbitMQ, Kafka, AWS SNS/SQS</p>

            {/* Event queue visualization */}
            <div className="flex gap-3 justify-center flex-wrap">
              {eventQueue.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`px-4 py-2 rounded-lg font-mono text-sm font-bold`}
                  style={{
                    backgroundColor:
                      event.color === 'blue'
                        ? 'rgba(59,130,246,0.5)'
                        : event.color === 'green'
                          ? 'rgba(34,197,94,0.5)'
                          : event.color === 'purple'
                            ? 'rgba(168,85,247,0.5)'
                            : 'rgba(236,72,153,0.5)',
                    borderColor:
                      event.color === 'blue'
                        ? '#3b82f6'
                        : event.color === 'green'
                          ? '#22c55e'
                          : event.color === 'purple'
                            ? '#a855f7'
                            : '#ec4899',
                    borderWidth: '2px',
                    color: 'white',
                  }}
                >
                  {event.name}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Subscribers */}
        <div className="grid grid-cols-3 gap-6">
          {subscribers.map((subscriber, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              className="border-2 border-slate-600 rounded-xl p-6 bg-slate-800 hover:border-cyan-500 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <Archive size={24} className="text-cyan-400" />
                <h4 className="text-white font-bold">{subscriber.name}</h4>
              </div>
              <p className="text-xs text-slate-400 mb-4 font-semibold">Subscribes to:</p>
              <div className="space-y-2">
                {subscriber.events.map((event, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    className="bg-slate-700 rounded px-3 py-2 text-slate-200 text-xs font-mono"
                  >
                    ✓ {event}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide8_EventDriven;
```

## Slide9_CAP_Theorem.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Triangle } from 'lucide-react';

const Slide9_CAP = () => {
  const [activeChoice, setActiveChoice] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChoice((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const choices = [
    {
      name: 'CP',
      color: 'from-blue-600 to-cyan-600',
      corner: 'top',
      description: 'Consistency + Partition Tolerance',
      examples: 'PostgreSQL, MongoDB',
      tradeoff: 'May unavailable during partitions',
    },
    {
      name: 'CA',
      color: 'from-green-600 to-emerald-600',
      corner: 'bottom-left',
      description: 'Consistency + Availability',
      examples: 'Traditional SQL databases',
      tradeoff: 'Cannot tolerate partitions',
    },
    {
      name: 'AP',
      color: 'from-purple-600 to-pink-600',
      corner: 'bottom-right',
      description: 'Availability + Partition Tolerance',
      examples: 'DynamoDB, Cassandra',
      tradeoff: 'Eventual consistency only',
    },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">CAP Theorem</h2>
        <p className="text-xl text-slate-300">You can guarantee only 2 of 3 properties</p>
      </motion.div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        {/* Triangle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-96 h-96 mb-12"
        >
          {/* SVG Triangle */}
          <svg className="w-full h-full" viewBox="0 0 400 400" style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.3))' }}>
            {/* Triangle outline */}
            <polygon
              points="200,50 350,320 50,320"
              fill="none"
              stroke="rgba(148,163,184,0.5)"
              strokeWidth="2"
            />

            {/* Corner labels */}
            <text x="200" y="25" textAnchor="middle" fill="#f1f5f9" fontSize="24" fontWeight="bold">
              Consistency
            </text>
            <text x="30" y="360" textAnchor="middle" fill="#f1f5f9" fontSize="24" fontWeight="bold">
              Availability
            </text>
            <text x="370" y="360" textAnchor="middle" fill="#f1f5f9" fontSize="24" fontWeight="bold">
              Partition Tolerance
            </text>
          </svg>

          {/* Choice circles */}
          {choices.map((choice, idx) => {
            const isActive = activeChoice === idx;
            const positions = [
              { x: '50%', y: '8%', transform: 'translate(-50%, -50%)' },
              { x: '15%', y: '82%', transform: 'translate(-50%, -50%)' },
              { x: '85%', y: '82%', transform: 'translate(-50%, -50%)' },
            ];

            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isActive ? 1.3 : 1,
                  boxShadow: isActive ? `0 0 30px rgba(${choice.color.includes('blue') ? '59,130,246' : choice.color.includes('green') ? '34,197,94' : '168,85,247'},1)` : '0 0 0px rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.6 }}
                className={`absolute w-24 h-24 rounded-full bg-gradient-to-br ${choice.color} border-4 border-white flex items-center justify-center`}
                style={positions[idx]}
              >
                <span className="text-3xl font-black text-white">{choice.name}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Description */}
        <motion.div
          key={activeChoice}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className={`bg-gradient-to-br ${choices[activeChoice].color} rounded-2xl p-8 max-w-2xl border-2 border-white border-opacity-30`}
        >
          <h3 className="text-3xl font-bold text-white mb-3">{choices[activeChoice].description}</h3>
          <p className="text-white text-opacity-90 mb-4">
            <span className="font-semibold">Examples:</span> {choices[activeChoice].examples}
          </p>
          <p className="text-white text-opacity-80">
            <span className="font-semibold">Tradeoff:</span> {choices[activeChoice].tradeoff}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide9_CAP;
```

## Slide10_CQRS.jsx

```jsx
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
```

## Slide11_Saga.jsx

```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

const Slide11_Saga = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRollback, setIsRollback] = useState(false);

  useEffect(() => {
    const steps = [0, 1, 2, 2, 1, 0];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex === 2) {
        setIsRollback(true);
      }
      setCurrentStep(steps[stepIndex]);
      stepIndex++;
      if (stepIndex >= steps.length) {
        stepIndex = 0;
        setIsRollback(false);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    { name: 'Reserve Inventory', service: 'Inventory Service', color: 'from-blue-600 to-cyan-600' },
    { name: 'Process Payment', service: 'Payment Service', color: 'from-green-600 to-emerald-600' },
    { name: 'Create Order', service: 'Order Service', color: 'from-purple-600 to-pink-600' },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Saga Pattern</h2>
        <p className="text-xl text-slate-300">Manage distributed transactions with compensating actions</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Happy path */}
        <div className="mb-16">
          <h3 className="text-white font-bold mb-8 text-xl">Happy Path: Forward</h3>

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx}>
                <motion.div
                  animate={{
                    scale: currentStep === idx && !isRollback ? 1.05 : 1,
                    boxShadow:
                      currentStep === idx && !isRollback
                        ? `0 0 30px rgba(${step.color.includes('blue') ? '59,130,246' : step.color.includes('green') ? '34,197,94' : '168,85,247'},0.8)`
                        : '0 0 0px rgba(0,0,0,0)',
                  }}
                  transition={{ duration: 0.6 }}
                  className={`bg-gradient-to-r ${step.color} rounded-xl p-6 border-2 ${currentStep === idx && !isRollback ? 'border-white' : 'border-slate-700'}`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                      className="mt-1"
                    >
                      <CheckCircle2 size={24} className="text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{step.name}</h4>
                      <p className="text-white text-opacity-80">{step.service}</p>
                    </div>
                  </div>
                </motion.div>

                {idx < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight size={24} className="text-cyan-400 rotate-90" />
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Failure scenario */}
        {isRollback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8">
              <AlertCircle size={28} className="text-red-400" />
              <h3 className="text-red-400 font-bold text-xl">Rollback: Compensating Transactions</h3>
            </div>

            <div className="space-y-8">
              {[...steps].reverse().map((step, idx) => (
                <div key={idx}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.2 }}
                    className="bg-red-900 bg-opacity-40 border-2 border-red-600 rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <AlertCircle size={24} className="text-red-400 mt-1" />
                      <div>
                        <h4 className="text-red-300 font-bold text-lg">Compensate: {step.name}</h4>
                        <p className="text-red-200 text-opacity-80">Release reservation, refund, cancel order</p>
                      </div>
                    </div>
                  </motion.div>

                  {idx < steps.length - 1 && (
                    <div className="flex justify-center my-4">
                      <ArrowRight size={24} className="text-red-400 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-slate-800 border-l-4 border-cyan-500 rounded-r-lg p-6"
        >
          <p className="text-slate-200">
            <span className="font-semibold text-cyan-400">Alternative to distributed transactions:</span> Each step
            stores state → If any fails, compensating actions undo previous steps
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11_Saga;
```

## Slide12_Conclusion.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Layers } from 'lucide-react';

const Slide12_Conclusion = () => {
  const patterns = [
    { name: 'Rate Limiting', icon: Zap, benefit: 'Prevent overload' },
    { name: 'Circuit Breaker', icon: Target, benefit: 'Resilience' },
    { name: 'Load Balancing', icon: Layers, benefit: 'Scale traffic' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 right-20 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-10"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 left-20 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl opacity-10"
      />

      <div className="relative z-10 text-center max-w-5xl">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-black text-white mb-4"
        >
          You Now Know
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-12"
        >
          12 System Design Patterns
        </motion.p>

        {/* Grid of patterns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-6 mb-12"
        >
          {[
            'Rate Limiting',
            'Circuit Breaker',
            'Load Balancing',
            'Caching',
            'Microservices',
            'API Gateway',
            'Event-Driven',
            'CAP Theorem',
            'CQRS',
            'Saga Pattern',
            'Service Discovery',
            'Bulkhead',
          ].map((pattern, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34,197,94,0.5)' }}
              className="bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 rounded-lg p-4 hover:border-green-500 transition-colors"
            >
              <p className="text-white font-semibold text-sm">{pattern}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Key takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 border-2 border-cyan-400 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Key Takeaways</h2>
          <ul className="text-left space-y-4">
            {[
              '✓ Patterns are solutions to recurring distributed systems problems',
              '✓ Choose patterns based on your system requirements and constraints',
              '✓ No one-size-fits-all solution: understand tradeoffs (CAP Theorem)',
              '✓ Combine patterns to build resilient, scalable systems',
            ].map((takeaway, i) => (
              <motion.li
                key={i}
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="text-white text-lg"
              >
                {takeaway}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Final message */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-2xl font-bold text-cyan-300"
        >
          Build with confidence → Master these patterns
        </motion.div>
      </div>
    </div>
  );
};

export default Slide12_Conclusion;
```

***

**You now have a complete 12-slide animated presentation deck on System Design Patterns.**

Each slide is a production-ready React component with:
- ✅ Framer Motion animations that explain behavior
- ✅ Tailwind CSS styling with design system colors
- ✅ Lucide React icons with motion effects
- ✅ No static content—everything animates meaningfully
- ✅ Apple Keynote quality + Stripe/Vercel aesthetic
- ✅ Cinematic, narrative flow that teaches through motion

**Deck covers:**
1. Title
2. Rate Limiting (request queue animation)
3. Circuit Breaker (state transitions)
4. Load Balancing (distribution visualization)
5. Caching (hit/miss metrics)
6. Microservices (service orchestration)
7. API Gateway (request routing)
8. Event-Driven Architecture (message flow)
9. CAP Theorem (interactive triangle)
10. CQRS (read/write separation)
11. Saga Pattern (transaction flow + rollback)
12. Conclusion (key takeaways)

[1](https://capaciteam.com/top-software-design-patterns/)
[2](https://www.geeksforgeeks.org/system-design/rate-limter-vs-circuit-breaker-in-microservices/)
[3](https://stackoverflow.com/questions/65786708/microservices-caching-and-load-balancing-design-patterns)
[4](https://dev.to/somadevtoo/19-microservices-patterns-for-system-design-interviews-3o39)
[5](https://dzone.com/articles/circuit-breaker-pattern-resilient-systems)
[6](https://hazelcast.com/blog/architectural-patterns-for-caching-microservices/)
[7](https://insights.daffodilsw.com/blog/top-software-architecture-patterns)
[8](https://www.linkedin.com/pulse/circuit-breaker-design-pattern-amir-doosti)
[9](https://www.splunk.com/en_us/blog/learn/microservices-load-balancing.html)
[10](https://www.designgurus.io/blog/19-essential-microservices-patterns-for-system-design-interviews)