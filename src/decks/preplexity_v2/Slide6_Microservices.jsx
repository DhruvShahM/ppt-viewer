import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, ArrowRight } from 'lucide-react';

const Slide6_Microservices = () => {
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { name: 'Auth Service', color: 'from-blue-600 to-blue-700', desc: 'JWT, OAuth' },
    { name: 'Payment Service', color: 'from-green-600 to-green-700', desc: 'Stripe, PayPal' },
    { name: 'Order Service', color: 'from-purple-600 to-purple-700', desc: 'Order logic' },
    { name: 'Notification Service', color: 'from-pink-600 to-pink-700', desc: 'Email, SMS' },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-5 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Microservices Architecture</h2>
        <p className="text-xl text-slate-300">Decompose monolith into independent, scalable services</p>
      </motion.div>

      <div className="relative z-10 max-w-5xl w-full">
        {/* API Gateway */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full px-8 py-4">
            <Box size={24} className="text-white" />
            <span className="text-white font-bold">API Gateway</span>
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-2 gap-6 mb-12">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: activeService === idx ? 1.05 : 1,
                boxShadow:
                  activeService === idx
                    ? `0 0 30px rgba(34,197,94,0.6)`
                    : '0 0 0px rgba(0,0,0,0)',
              }}
              transition={{ duration: 0.6 }}
              className={`bg-gradient-to-br ${service.color} rounded-xl p-8 border-2 ${activeService === idx ? 'border-green-400' : 'border-slate-700'} cursor-pointer relative overflow-hidden`}
            >
              {/* Animated background */}
              <motion.div
                animate={{ opacity: activeService === idx ? [0.3, 0.6, 0.3] : 0.1 }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-white"
              />

              <div className="relative z-10">
                <motion.div
                  animate={{
                    rotate: activeService === idx ? [0, 360] : 0,
                  }}
                  transition={{ duration: 2 }}
                  className="flex justify-center mb-4"
                >
                  <Box size={32} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-sm text-white text-opacity-80">{service.desc}</p>
              </div>

              {/* Active indicator */}
              {activeService === idx && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="absolute top-4 right-4 w-3 h-3 bg-green-300 rounded-full"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Communication info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-l-4 border-cyan-500 bg-slate-800 bg-opacity-50 rounded-r-lg p-6"
        >
          <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2">
            <ArrowRight size={20} />
            Inter-Service Communication
          </h4>
          <p className="text-slate-200">
            REST APIs, gRPC, or Message Queues (RabbitMQ, Kafka) enable independent services to communicate
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_Microservices;