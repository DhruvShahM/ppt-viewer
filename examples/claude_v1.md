// Slide1_Title.jsx
import { motion } from 'framer-motion';
import { Boxes, Network, Layers } from 'lucide-react';

const Slide1_Title = () => {
  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"
            style={{ left: `${(i + 1) * 5}%` }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scaleY: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      <div className="z-10 text-center">
        {/* Floating icons */}
        <div className="flex justify-center gap-12 mb-12">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Boxes className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -25, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.2 }}
          >
            <Network className="w-16 h-16 text-purple-400" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 3.2, repeat: Infinity, delay: 0.4 }}
          >
            <Layers className="w-16 h-16 text-cyan-400" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Title with stagger */}
        <motion.h1
          className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Design Patterns
        </motion.h1>
        
        <motion.h2
          className="text-4xl font-light text-slate-300 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          in System Design
        </motion.h2>

        <motion.div
          className="text-lg text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Proven solutions to recurring architectural challenges
        </motion.div>

        {/* Pulsing glow effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

export default Slide1_Title;

// Slide2_WhatArePatterns.jsx
import { motion } from 'framer-motion';
import { Puzzle, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide2_WhatArePatterns = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((s) => (s + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const problems = [
    { text: 'Handle millions of requests', icon: XCircle, color: 'text-red-400' },
    { text: 'Prevent system overload', icon: XCircle, color: 'text-red-400' },
    { text: 'Scale efficiently', icon: XCircle, color: 'text-red-400' },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden relative">
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20"
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-6xl w-full grid grid-cols-2 gap-16 items-center z-10">
        {/* Left: Problem */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-white mb-8">
              The <span className="text-red-400">Challenge</span>
            </h2>
            
            <div className="space-y-4">
              {problems.map((problem, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-lg border border-slate-700"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 + 0.3 }}
                >
                  <motion.div
                    animate={{
                      scale: stage === 0 ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <problem.icon className={`w-6 h-6 ${problem.color}`} />
                  </motion.div>
                  <span className="text-slate-300 text-lg">{problem.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Solution */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-5xl font-bold text-white mb-8">
              The <span className="text-green-400">Solution</span>
            </h2>

            <motion.div
              className="relative"
              animate={{
                scale: stage === 1 ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-2xl p-8 backdrop-blur">
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  animate={{
                    rotate: stage === 2 ? [0, 360] : 0,
                  }}
                  transition={{ duration: 1 }}
                >
                  <Puzzle className="w-12 h-12 text-green-400" />
                  <span className="text-2xl font-semibold text-white">
                    Design Patterns
                  </span>
                </motion.div>

                <p className="text-slate-300 text-lg leading-relaxed">
                  Reusable, proven solutions to common architectural problems
                  that have been refined over time by the engineering community
                </p>

                <motion.div
                  className="mt-6 flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-400">
                    Battle-tested · Scalable · Industry Standard
                  </span>
                </motion.div>
              </div>

              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-30"
                animate={{
                  opacity: stage === 2 ? [0.3, 0.6, 0.3] : 0.3,
                }}
                transition={{ duration: 1.5 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide2_WhatArePatterns;

// Slide3_CategoryOverview.jsx
import { motion } from 'framer-motion';
import { Shield, Zap, Database, Lock, GitBranch, Cloud } from 'lucide-react';

const Slide3_CategoryOverview = () => {
  const categories = [
    {
      icon: Zap,
      title: 'Performance',
      color: 'from-yellow-500 to-orange-500',
      glowColor: 'bg-yellow-500',
      patterns: ['Caching', 'CDN', 'Load Balancing'],
    },
    {
      icon: Shield,
      title: 'Reliability',
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'bg-blue-500',
      patterns: ['Circuit Breaker', 'Retry', 'Bulkhead'],
    },
    {
      icon: Database,
      title: 'Data Management',
      color: 'from-purple-500 to-pink-500',
      glowColor: 'bg-purple-500',
      patterns: ['Sharding', 'Replication', 'CQRS'],
    },
    {
      icon: Lock,
      title: 'Security',
      color: 'from-green-500 to-emerald-500',
      glowColor: 'bg-green-500',
      patterns: ['Rate Limiting', 'OAuth', 'API Gateway'],
    },
    {
      icon: GitBranch,
      title: 'Architecture',
      color: 'from-red-500 to-rose-500',
      glowColor: 'bg-red-500',
      patterns: ['Microservices', 'Event-Driven', 'Saga'],
    },
    {
      icon: Cloud,
      title: 'Scalability',
      color: 'from-indigo-500 to-violet-500',
      glowColor: 'bg-indigo-500',
      patterns: ['Auto-scaling', 'Partitioning', 'Federation'],
    },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden relative">
      <div className="max-w-7xl w-full z-10">
        <motion.h2
          className="text-6xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Pattern <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Categories</span>
        </motion.h2>

        <div className="grid grid-cols-3 gap-8">
          {categories.map((category, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-slate-800/70 backdrop-blur border border-slate-700 rounded-2xl p-6 h-full relative overflow-hidden">
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  className="mb-4"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {category.title}
                </h3>

                {/* Patterns list */}
                <div className="space-y-2">
                  {category.patterns.map((pattern, j) => (
                    <motion.div
                      key={j}
                      className="text-sm text-slate-400 flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + j * 0.1 + 0.3 }}
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-slate-500"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: j * 0.3,
                        }}
                      />
                      {pattern}
                    </motion.div>
                  ))}
                </div>

                {/* Glow effect */}
                <motion.div
                  className={`absolute -bottom-10 -right-10 w-32 h-32 ${category.glowColor} rounded-full blur-3xl opacity-0 group-hover:opacity-30`}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide3_CategoryOverview;

// Slide4_RateLimiting_Problem.jsx
import { motion } from 'framer-motion';
import { Server, ArrowRight, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide4_RateLimiting_Problem = () => {
  const [requests, setRequests] = useState([]);
  const [overload, setOverload] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRequest = {
        id: Date.now() + Math.random(),
        x: Math.random() * 300 - 150,
      };
      
      setRequests((prev) => [...prev, newRequest]);

      if (requests.length > 15) {
        setOverload(true);
      } else {
        setOverload(false);
      }

      setTimeout(() => {
        setRequests((prev) => prev.filter((r) => r.id !== newRequest.id));
      }, 2000);
    }, 150);

    return () => clearInterval(interval);
  }, [requests.length]);

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden relative">
      <motion.div
        className={`absolute top-20 right-20 ${overload ? 'bg-red-500' : 'bg-blue-500'} rounded-full blur-3xl opacity-30 w-64 h-64`}
        animate={{
          scale: overload ? [1, 1.5, 1] : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="max-w-6xl w-full grid grid-cols-2 gap-16 items-center z-10">
        {/* Left: Title */}
        <div>
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-blue-400 text-sm font-semibold">PATTERN #1</span>
          </motion.div>

          <motion.h2
            className="text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Rate Limiting
          </motion.h2>

          <motion.p
            className="text-xl text-slate-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Without rate limiting, unlimited requests can overwhelm your system
          </motion.p>

          <motion.div
            className={`flex items-center gap-3 p-4 rounded-lg ${
              overload ? 'bg-red-500/20 border-red-500' : 'bg-slate-800 border-slate-700'
            } border-2 transition-all duration-300`}
            animate={{
              scale: overload ? [1, 1.05, 1] : 1,
            }}
          >
            <AlertTriangle className={`w-6 h-6 ${overload ? 'text-red-400' : 'text-yellow-400'}`} />
            <div>
              <div className="text-white font-semibold">System Status</div>
              <div className={`text-sm ${overload ? 'text-red-400' : 'text-slate-400'}`}>
                {overload ? 'OVERLOADED - Requests piling up!' : 'Normal operation'}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Visualization */}
        <div className="relative h-96">
          {/* Server */}
          <motion.div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-2xl flex items-center justify-center ${
              overload ? 'bg-red-500/30 border-red-500' : 'bg-slate-800 border-slate-700'
            } border-2 transition-all duration-300`}
            animate={{
              scale: overload ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Server className={`w-16 h-16 ${overload ? 'text-red-400' : 'text-blue-400'}`} />
          </motion.div>

          {/* Incoming requests */}
          {requests.map((req) => (
            <motion.div
              key={req.id}
              className="absolute top-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-lg"
              initial={{ x: req.x, y: -50, opacity: 0, scale: 0 }}
              animate={{ x: 0, y: 350, opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.5] }}
              transition={{ duration: 2, ease: 'linear' }}
              style={{ left: '50%', marginLeft: '-24px' }}
            >
              <ArrowRight className="w-6 h-6 text-white rotate-90" />
            </motion.div>
          ))}

          {/* Request counter */}
          <motion.div
            className="absolute top-0 right-0 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2"
            animate={{
              borderColor: overload ? '#ef4444' : '#334155',
            }}
          >
            <div className="text-xs text-slate-400 mb-1">Active Requests</div>
            <div className={`text-2xl font-bold ${overload ? 'text-red-400' : 'text-white'}`}>
              {requests.length}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide4_RateLimiting_Problem;

// Slide5_RateLimiting_Solution.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { Server, ArrowRight, Shield, CheckCircle, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide5_RateLimiting_Solution = () => {
  const [requests, setRequests] = useState([]);
  const [allowed, setAllowed] = useState(0);
  const [blocked, setBlocked] = useState(0);
  const RATE_LIMIT = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      const newRequest = {
        id: Date.now() + Math.random(),
        allowed: allowed < RATE_LIMIT,
      };
      
      if (newRequest.allowed) {
        setAllowed((a) => a + 1);
        setTimeout(() => setAllowed((a) => Math.max(0, a - 1)), 1000);
      } else {
        setBlocked((b) => b + 1);
      }

      setRequests((prev) => [...prev, newRequest]);

      setTimeout(() => {
        setRequests((prev) => prev.filter((r) => r.id !== newRequest.id));
      }, 2000);
    }, 300);

    return () => clearInterval(interval);
  }, [allowed]);

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12 overflow-hidden relative">
      <motion.div
        className="absolute top-20 left-20 bg-green-500 rounded-full blur-3xl opacity-20 w-64 h-64"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="max-w-6xl w-full z-10">
        <motion.h2
          className="text-5xl font-bold text-white mb-16 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Rate Limiting <span className="text-green-400">in Action</span>
        </motion.h2>

        <div className="grid grid-cols-3 gap-8 items-center">
          {/* Left: Stats */}
          <div className="space-y-4">
            <motion.div
              className="bg-slate-800 border border-slate-700 rounded-xl p-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-slate-400 text-sm">Rate Limit</spa