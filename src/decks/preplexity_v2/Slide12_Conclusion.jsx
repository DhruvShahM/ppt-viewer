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