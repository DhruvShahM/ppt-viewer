import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, FileCode, Zap, Terminal } from 'lucide-react';

const Slide12_GettingStarted = () => {
  const steps = [
    {
      icon: FileCode,
      title: 'Define .proto file',
      desc: 'Write your service definition',
      code: 'service MyService { ... }',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Terminal,
      title: 'Generate code',
      desc: 'Use protoc compiler',
      code: 'protoc --go_out=. *.proto',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Implement handlers',
      desc: 'Write server business logic',
      code: 'func (s *Server) GetUser(...) { ... }',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Rocket,
      title: 'Deploy & use',
      desc: 'Run your gRPC server',
      code: 'server := grpc.NewServer()',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-y-auto p-4 relative">
      {/* Animated lines connecting steps */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <motion.line
          x1="25%"
          y1="50%"
          x2="75%"
          y2="50%"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeDasharray="10,5"
          strokeDashoffset="0"
          animate={{ strokeDashoffset: 15 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="hidden md:block"
        />
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Getting Started with gRPC
          </h2>
          <p className="text-xl text-slate-400">
            Four simple steps to build your first gRPC service
          </p>
        </motion.div>

        {/* Steps flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.15, duration: 0.8 }}
              whileHover={{
                y: -15,
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
              }}
              className="relative"
            >
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all backdrop-blur-sm h-full flex flex-col">
                {/* Step number */}
                <motion.div
                  className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center font-bold text-white mx-auto mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.3,
                  }}
                >
                  {idx + 1}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="mb-4 flex justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                >
                  <step.icon className="w-10 h-10 text-cyan-400" />
                </motion.div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 flex-grow">{step.desc}</p>

                {/* Code snippet */}
                <div className="bg-slate-900/50 rounded p-3 text-left border-l-2 border-cyan-500 backdrop-blur-sm">
                  <code className="text-xs text-cyan-300 font-mono break-words">
                    {step.code}
                  </code>
                </div>
              </div>

              {/* Arrow between steps - only show on md+ screens */}
              {idx < steps.length - 1 && (
                <motion.div
                  className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 hidden md:block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: idx * 0.3,
                  }}
                >
                  <div className="text-2xl text-cyan-400">→</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Resources section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8 max-w-4xl mx-auto backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 justify-center">
            <Rocket className="w-6 h-6 text-cyan-400" />
            Quick Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              '📚 grpc.io Documentation',
              '🐍 Protocol Buffer Guide',
              '💻 Code Examples',
            ].map((resource, idx) => (
              <motion.div
                key={idx}
                className="text-center text-cyan-300 text-sm font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 + idx * 0.1 }}
              >
                {resource}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide12_GettingStarted;
