import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const Slide7_ServiceDefinition = () => {
  const protoCode = `service UserService {
  rpc GetUser(GetUserRequest) 
    returns (User);
    
  rpc CreateUser(CreateUserRequest) 
    returns (User);
    
  rpc StreamUserUpdates(Empty) 
    returns (stream UserUpdate);
}`;

  const lines = protoCode.split('\n');

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-y-auto p-4 relative">
      {/* Background animation */}
      <motion.div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(59, 130, 246, 0.1) 35px, rgba(59, 130, 246, 0.1) 70px)',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '70px 0px'],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <h2 className="text-5xl font-bold text-white flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Code className="w-14 h-14 text-cyan-400" />
            </motion.div>
            Service Definition
          </h2>
          <p className="text-xl text-slate-400">
            Define RPC services using .proto files
          </p>
        </motion.div>

        {/* Code block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-slate-900/50 border border-cyan-500/30 rounded-xl overflow-hidden mb-8 backdrop-blur-sm"
        >
          <div className="bg-slate-800/80 px-6 py-3 border-b border-slate-700/50 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-400 text-sm ml-3">user_service.proto</span>
          </div>

          <div className="p-8 font-mono text-sm">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                className="flex"
              >
                <span className="text-slate-500 w-8 text-right mr-4">
                  {idx + 1}
                </span>
                <motion.code
                  className="text-cyan-300 flex-1 whitespace-pre"
                  whileHover={{
                    x: 5,
                    color: '#38bdf8',
                  }}
                >
                  {line}
                </motion.code>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
        </motion.div>

        {/* Key points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Strongly Typed',
              desc: 'All requests & responses defined',
              icon: '🔒',
            },
            {
              title: 'Code Generation',
              desc: 'Auto-generate client/server code',
              icon: '⚙️',
            },
            {
              title: 'Language Agnostic',
              desc: 'Works with any language',
              icon: '🌍',
            },
          ].map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + idx * 0.1 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center backdrop-blur-sm"
            >
              <div className="text-3xl mb-2">{point.icon}</div>
              <p className="font-bold text-white text-sm mb-1">{point.title}</p>
              <p className="text-xs text-slate-400">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide7_ServiceDefinition;