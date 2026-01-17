import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const Slide9_PerformanceComparison = () => {
  const metrics = [
    {
      name: 'Latency',
      restValue: 150,
      grpcValue: 20,
      unit: 'ms',
      color: 'from-red-500 to-orange-500',
    },
    {
      name: 'Throughput',
      restValue: 5000,
      grpcValue: 50000,
      unit: 'req/s',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Payload Size',
      restValue: 5000,
      grpcValue: 500,
      unit: 'bytes',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'CPU Usage',
      restValue: 80,
      grpcValue: 15,
      unit: '%',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const maxValue = 50000;

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(34, 197, 94, 0.1) 35px, rgba(34, 197, 94, 0.1) 70px)',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 70px'],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-14 h-14 text-green-400" />
            </motion.div>
            Performance Comparison
          </h2>
          <p className="text-xl text-slate-400">
            REST API vs gRPC in real-world scenarios
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {metrics.map((metric, idx) => {
            const restPercent = (metric.restValue / maxValue) * 100;
            const grpcPercent = (metric.grpcValue / maxValue) * 100;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-6">
                  {metric.name}
                </h3>

                {/* REST Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-red-400 font-semibold">
                      REST API
                    </span>
                    <motion.span
                      className="text-sm font-bold text-red-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                    >
                      {metric.restValue} {metric.unit}
                    </motion.span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(restPercent, 100)}%` }}
                      transition={{
                        delay: 0.3 + idx * 0.1,
                        duration: 1,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                </div>

                {/* gRPC Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-green-400 font-semibold">
                      gRPC
                    </span>
                    <motion.span
                      className="text-sm font-bold text-green-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                    >
                      {metric.grpcValue} {metric.unit}
                    </motion.span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(grpcPercent, 100)}%` }}
                      transition={{
                        delay: 0.4 + idx * 0.1,
                        duration: 1,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                </div>

                {/* Improvement percentage */}
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                >
                  <span className="text-sm font-bold text-cyan-300">
                    {Math.round(
                      ((metric.restValue - metric.grpcValue) /
                        metric.restValue) *
                        100
                    )}
                    % faster/better
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-xl p-8 text-center max-w-2xl mx-auto"
        >
          <p className="text-xl text-green-300 font-semibold">
            🚀 gRPC is 7-10x faster and 5-10x more efficient than REST APIs
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide9_PerformanceComparison;