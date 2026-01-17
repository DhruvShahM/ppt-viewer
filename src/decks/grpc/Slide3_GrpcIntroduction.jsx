import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Lock, Layers } from 'lucide-react';

const Slide3_GrpcIntroduction = () => {
  const features = [
    {
      icon: Zap,
      title: 'Protocol Buffers',
      desc: 'Binary serialization format',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Lock,
      title: 'HTTP/2',
      desc: 'Multiplexing & bidirectional streams',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Layers,
      title: 'RPC Framework',
      desc: 'Built for distributed systems',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {/* Animated background elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-slate-700/30"
          initial={{
            width: 200 + i * 100,
            height: 200 + i * 100,
            opacity: 0.1,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-white mb-6 text-center"
        >
          gRPC = Three Pillars
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-slate-400 text-center mb-12 max-w-2xl"
        >
          Google's modern RPC framework combining three powerful technologies
        </motion.p>

        <div className="grid grid-cols-3 gap-8 mb-12">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.2, duration: 0.8 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl opacity-0 blur-xl transition group-hover:opacity-100`}
              />
              <div className="relative bg-slate-800 border border-slate-700 rounded-xl p-8 h-full flex flex-col items-center text-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.3,
                  }}
                >
                  <feature.icon className="w-14 h-14 text-cyan-400 mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 rounded-xl p-6 text-center"
        >
          <p className="text-lg text-cyan-300 font-semibold">
            ⚡ Result: 7-10x faster, type-safe, production-ready
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide3_GrpcIntroduction;