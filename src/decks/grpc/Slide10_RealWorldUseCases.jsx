import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Smartphone,
  Cloud,
  Zap,
  Users,
  ShoppingCart,
} from 'lucide-react';

const Slide10_RealWorldUseCases = () => {
  const useCases = [
    {
      icon: Cloud,
      title: 'Microservices',
      desc: 'Google, Netflix, Uber use gRPC for inter-service communication',
      color: 'text-blue-400',
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      desc: 'Low latency, low bandwidth consumption for mobile clients',
      color: 'text-purple-400',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      desc: 'Stream large volumes of data efficiently',
      color: 'text-cyan-400',
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      desc: 'Fast product catalog updates and inventory sync',
      color: 'text-emerald-400',
    },
    {
      icon: Users,
      title: 'Chat Applications',
      desc: 'Bidirectional streaming for real-time messaging',
      color: 'text-pink-400',
    },
    {
      icon: Zap,
      title: 'IoT Networks',
      desc: 'Millions of device connections with minimal overhead',
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {/* Background orbs */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-slate-700/20"
          initial={{
            width: 300 + i * 150,
            height: 300 + i * 150,
            opacity: 0.1,
          }}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 30 + i * 10,
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

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Real-World Use Cases
          </h2>
          <p className="text-xl text-slate-400">
            Industries and companies using gRPC in production
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
          {useCases.map((useCase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.1, duration: 0.8 }}
              whileHover={{
                y: -10,
                boxShadow:
                  '0 20px 40px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                transition: { duration: 0.3 },
              }}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
            >
              <motion.div
                className="mb-4"
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.2,
                }}
              >
                <useCase.icon
                  className={`w-12 h-12 ${useCase.color}`}
                />
              </motion.div>

              <h3 className="text-lg font-bold text-white mb-2">
                {useCase.title}
              </h3>
              <p className="text-sm text-slate-400">{useCase.desc}</p>

              {/* Animated corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-500 rounded-tr-xl opacity-0 group-hover:opacity-100 transition"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: idx * 0.2,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Companies section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-6 font-semibold">
            Trusted by industry leaders:
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[
              'Google',
              'Netflix',
              'Uber',
              'Spotify',
              'Square',
              'Slack',
            ].map((company, idx) => (
              <motion.div
                key={company}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 + idx * 0.1 }}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 font-semibold text-sm"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide10_RealWorldUseCases;