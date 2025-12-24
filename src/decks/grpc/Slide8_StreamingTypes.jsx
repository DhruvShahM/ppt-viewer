import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radio, GitBranch, MessageCircle } from 'lucide-react';

const Slide8_StreamingTypes = () => {
  const streamTypes = [
    {
      icon: Zap,
      title: 'Unary',
      desc: 'One request, one response',
      example: 'rpc GetUser(id) returns (User)',
      color: 'from-yellow-500 to-orange-500',
      requests: [{ delay: 0, x: -150 }, { delay: 0.5, x: 150 }],
      type: 'simple',
    },
    {
      icon: Radio,
      title: 'Server Streaming',
      desc: 'One request, multiple responses',
      example: 'rpc GetUsers(...) returns (stream User)',
      color: 'from-blue-500 to-cyan-500',
      requests: [
        { delay: 0, x: -150 },
        { delay: 0.3, x: 150 },
        { delay: 0.6, x: 150 },
        { delay: 0.9, x: 150 },
      ],
      type: 'server',
    },
    {
      icon: GitBranch,
      title: 'Client Streaming',
      desc: 'Multiple requests, one response',
      example: 'rpc UploadFiles(stream File) returns (Result)',
      color: 'from-purple-500 to-pink-500',
      requests: [
        { delay: 0, x: -150 },
        { delay: 0.3, x: -150 },
        { delay: 0.6, x: -150 },
        { delay: 0.9, x: 150 },
      ],
      type: 'client',
    },
    {
      icon: MessageCircle,
      title: 'Bidirectional',
      desc: 'Multiple requests & responses',
      example: 'rpc Chat(stream Message) returns (stream Message)',
      color: 'from-rose-500 to-red-500',
      requests: [
        { delay: 0, x: -150 },
        { delay: 0.3, x: 150 },
        { delay: 0.6, x: -150 },
        { delay: 0.9, x: 150 },
      ],
      type: 'bi',
    },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-y-auto p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl font-bold text-white mb-3">
          gRPC Streaming Types
        </h2>
        <p className="text-xl text-slate-400">
          Four powerful communication patterns
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {streamTypes.map((stream, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 relative overflow-hidden group backdrop-blur-sm"
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stream.color} opacity-0 group-hover:opacity-10 transition duration-300`}
            />

            <div className="relative z-10">
              {/* Header */}
              <motion.div
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  <stream.icon className="w-8 h-8 text-cyan-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white">
                  {stream.title}
                </h3>
              </motion.div>

              <p className="text-sm text-slate-400 mb-4">{stream.desc}</p>

              {/* Code example */}
              <div className="bg-slate-900/50 rounded p-3 mb-6 border-l-2 border-cyan-500 backdrop-blur-sm">
                <code className="text-xs text-cyan-300 font-mono break-words">
                  {stream.example}
                </code>
              </div>

              {/* Visual flow */}
              <div className="h-16 bg-slate-700/30 rounded relative flex items-center justify-between px-4">
                <motion.div className="w-4 h-4 bg-blue-500 rounded-full" />
                <motion.div className="flex-1 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-transparent mx-2" />
                <motion.div className="w-4 h-4 bg-emerald-500 rounded-full" />

                {/* Request packets */}
                {stream.requests.map((req, ridx) => (
                  <motion.div
                    key={ridx}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    initial={{ x: req.x, opacity: 0 }}
                    animate={{
                      x: req.x === -150 ? [req.x, 150] : [-150, req.x],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      delay: req.delay,
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="mt-4 flex gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-slate-400">Client</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-slate-400">Server</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Slide8_StreamingTypes;
