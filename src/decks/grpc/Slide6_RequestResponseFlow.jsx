import React from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';

const Slide6_RequestResponseFlow = () => {
  const Message = ({ direction, delay, label }) => {
    const isRequest = direction === 'right';
    return (
      <motion.div
        initial={{
          x: isRequest ? -300 : 300,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          delay,
          duration: 0.8,
          ease: 'easeOut',
        }}
        exit={{
          x: isRequest ? 300 : -300,
          opacity: 0,
          transition: { duration: 0.5 },
        }}
        className={`flex items-center gap-4 ${isRequest ? 'flex-row' : 'flex-row-reverse'
          }`}
      >
        <motion.div
          className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${isRequest
              ? 'bg-blue-600/80 text-blue-100 ml-auto backdrop-blur-sm'
              : 'bg-emerald-600/80 text-emerald-100 mr-auto backdrop-blur-sm'
            }`}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 0.5,
            delay: delay + 0.3,
          }}
        >
          {isRequest && <Send className="w-5 h-5" />}
          {label}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-y-auto p-4 relative">
      {/* Side glow effects */}
      <motion.div
        className="fixed left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, 50, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="fixed right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-4 text-center"
        >
          Request ↔ Response
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-400 text-center mb-16"
        >
          Bidirectional streaming in real-time
        </motion.p>

        {/* Server-Client diagram */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex-1 text-center">
            <motion.div
              className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(37, 99, 235, 0.5)',
                  '0 0 40px rgba(37, 99, 235, 0.8)',
                  '0 0 20px rgba(37, 99, 235, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Send className="w-10 h-10 text-blue-100" />
            </motion.div>
            <p className="font-bold text-blue-300">Client</p>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="w-8 h-8 text-slate-500" />
          </motion.div>

          <div className="flex-1 text-center">
            <motion.div
              className="w-20 h-20 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(16, 185, 129, 0.5)',
                  '0 0 40px rgba(16, 185, 129, 0.8)',
                  '0 0 20px rgba(16, 185, 129, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Send className="w-10 h-10 text-emerald-100 rotate-180" />
            </motion.div>
            <p className="font-bold text-emerald-300">Server</p>
          </div>
        </div>

        {/* Message flow */}
        <div className="space-y-6">
          <Message direction="right" delay={0.5} label="GetUser(id=42)" />
          <Message
            direction="left"
            delay={1.2}
            label='{"id": 42, "name": "Alice"}'
          />
          <Message direction="right" delay={1.9} label="UpdateProfile(...)" />
          <Message direction="left" delay={2.6} label="✅ Success" />
          <Message direction="right" delay={3.3} label="SubscribeToUpdates()" />
          <Message direction="left" delay={4} label="📡 Stream opened..." />
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="mt-12 grid grid-cols-2 gap-4 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded" />
            <span className="text-blue-300">Client → Server</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-600 rounded" />
            <span className="text-emerald-300">Server → Client</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_RequestResponseFlow;