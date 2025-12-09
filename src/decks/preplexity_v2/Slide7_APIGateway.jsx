import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Shield, BarChart3 } from 'lucide-react';

const Slide7_APIGateway = () => {
  const [requestFlow, setRequestFlow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRequestFlow((prev) => (prev + 1) % 3);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Shield, label: 'Authentication', color: 'from-blue-600 to-cyan-600' },
    { icon: BarChart3, label: 'Rate Limiting', color: 'from-purple-600 to-pink-600' },
    { icon: Share2, label: 'Routing', color: 'from-green-600 to-emerald-600' },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">API Gateway Pattern</h2>
        <p className="text-xl text-slate-300">Single entry point managing all client requests</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Clients */}
        <div className="flex justify-around mb-12">
          {['Web', 'Mobile', 'Desktop'].map((client, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-lg bg-slate-700 border-2 border-slate-600 flex items-center justify-center mb-3 mx-auto">
                <span className="text-white font-bold">{client}</span>
              </div>
              <p className="text-sm text-slate-400">Client</p>
            </motion.div>
          ))}
        </div>

        {/* Arrows pointing to gateway */}
        <div className="relative h-12 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
              className={`absolute ${
                i === 0 ? 'left-[16%]' : i === 1 ? 'left-[50%]' : 'left-[83%]'
              } top-0 translate-x--1/2`}
            >
              <div className="text-cyan-400 text-2xl">↓</div>
            </motion.div>
          ))}
        </div>

        {/* API Gateway */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 mb-12 border-2 border-cyan-400 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-6">API Gateway</h3>

          {/* Features grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: requestFlow === i ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.6 }}
                  className={`bg-gradient-to-br ${feature.color} rounded-lg p-4 text-center border border-white border-opacity-20`}
                >
                  <Icon size={24} className="text-white mx-auto mb-2" />
                  <p className="text-sm text-white font-semibold">{feature.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Process flow */}
          <div className="bg-black bg-opacity-30 rounded-lg p-4">
            <p className="text-white text-sm font-mono text-center">
              {requestFlow === 0 && '1. Verify JWT Token'}
              {requestFlow === 1 && '2. Check Rate Limits'}
              {requestFlow === 2 && '3. Route to Service'}
            </p>
          </div>
        </motion.div>

        {/* Downstream services */}
        <div className="grid grid-cols-3 gap-4">
          {['Auth\nService', 'Order\nService', 'Payment\nService'].map((service, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                delay: 0.3 + i * 0.2,
                repeat: Infinity,
              }}
              className="border-2 border-slate-600 rounded-lg p-6 bg-slate-800 text-center"
            >
              <span className="text-white font-bold whitespace-pre-line">{service}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide7_APIGateway;