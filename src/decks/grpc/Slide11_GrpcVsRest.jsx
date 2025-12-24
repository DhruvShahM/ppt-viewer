import React from 'react';
import { motion } from 'framer-motion';
import { Scale, CheckCircle, XCircle } from 'lucide-react';

const Slide11_GrpcVsRest = () => {
  const comparison = [
    {
      aspect: 'Protocol',
      rest: 'HTTP/1.1, HTTP/2',
      grpc: 'HTTP/2 only',
    },
    {
      aspect: 'Data Format',
      rest: 'JSON, XML, Text',
      grpc: 'Protocol Buffers (Binary)',
    },
    {
      aspect: 'Performance',
      rest: 'Slower (text parsing)',
      grpc: 'Faster (binary, compact)',
    },
    {
      aspect: 'Streaming',
      rest: 'Limited',
      grpc: 'Full bidirectional',
    },
    {
      aspect: 'Type Safety',
      rest: 'Not guaranteed',
      grpc: 'Strongly typed',
    },
    {
      aspect: 'Browser Support',
      rest: 'Native',
      grpc: 'Requires gRPC-Web',
    },
    {
      aspect: 'Debugging',
      rest: 'Easy (human readable)',
      grpc: 'Requires tools',
    },
    {
      aspect: 'Learning Curve',
      rest: 'Easier',
      grpc: 'Steeper',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-y-auto p-4 relative">
      {/* Background animation */}
      <motion.div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 60%)',
          backgroundSize: '100px 100px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '100px 100px'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Scale className="w-14 h-14 text-cyan-400" />
            </motion.div>
            gRPC vs REST
          </h2>
          <p className="text-xl text-slate-400">
            Detailed feature comparison
          </p>
        </motion.div>

        {/* Comparison table */}
        <div className="space-y-3">
          {comparison.map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + idx * 0.08, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 items-center"
              whileHover={{ scale: 1.02 }}
            >
              {/* Aspect */}
              <motion.div className="bg-slate-700/80 rounded-lg p-4 font-semibold text-white text-center backdrop-blur-sm">
                {row.aspect}
              </motion.div>

              {/* REST */}
              <motion.div
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm"
                whileHover={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  borderColor: 'rgba(239, 68, 68, 0.5)',
                }}
              >
                <div className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-200 text-sm">{row.rest}</p>
                </div>
              </motion.div>

              {/* gRPC */}
              <motion.div
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm"
                whileHover={{
                  backgroundColor: 'rgba(16, 185, 129, 0.15)',
                  borderColor: 'rgba(16, 185, 129, 0.5)',
                }}
              >
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-green-200 text-sm">{row.grpc}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Verdict */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center backdrop-blur-sm">
            <p className="font-bold text-red-300 mb-2">Use REST when:</p>
            <ul className="text-sm text-red-200 space-y-2">
              <li>✓ Browser-based applications</li>
              <li>✓ Public APIs</li>
              <li>✓ Simple CRUD operations</li>
              <li>✓ Quick prototyping</li>
            </ul>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center backdrop-blur-sm">
            <p className="font-bold text-green-300 mb-2">Use gRPC when:</p>
            <ul className="text-sm text-green-200 space-y-2">
              <li>✓ Microservices architecture</li>
              <li>✓ High-performance needs</li>
              <li>✓ Real-time streaming</li>
              <li>✓ Mobile applications</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11_GrpcVsRest;