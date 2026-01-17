import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Wifi } from 'lucide-react';

const Slide2_ProblemContext = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center px-12 relative overflow-hidden">
      {/* Background accent */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={itemVariants}
          className="text-6xl font-bold text-white mb-12 text-center"
        >
          The Challenge: Traditional APIs
        </motion.h2>

        <div className="grid grid-cols-2 gap-8 mb-8">
          {[
            {
              icon: Globe,
              title: 'JSON over HTTP/1.1',
              problem:
                'Text-heavy, verbose, loses data meaning',
              color: 'text-red-400',
            },
            {
              icon: Wifi,
              title: 'Inefficient Serialization',
              problem:
                'Large payloads, slow parsing, high bandwidth',
              color: 'text-orange-400',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              >
                <item.icon className={`w-12 h-12 ${item.color} mb-4`} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400">{item.problem}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/40 rounded-xl p-8 text-center"
        >
          <p className="text-lg text-red-300 font-semibold">
            💔 Result: Latency, Scalability Issues, Developer Friction
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide2_ProblemContext;