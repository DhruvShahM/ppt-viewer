

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, Users } from 'lucide-react';

const Slide2_CurrentChallenge = () => {
  const stats = [
    { label: "Gen Z at high risk", value: "66%", icon: AlertCircle, color: "from-red-500 to-pink-500" },
    { label: "Diagnosed with condition", value: "46%", icon: Users, color: "from-orange-500 to-red-500" },
    { label: "With anxiety diagnosis", value: "61%", icon: TrendingUp, color: "from-yellow-500 to-orange-500" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center p-12">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          className="text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Current Challenge
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-red-500 to-pink-500 mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.div
          className="grid grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative overflow-hidden rounded-2xl bg-slate-800/50 border border-slate-700 p-8"
              >
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0`}
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="mb-4 inline-block"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Icon className="w-10 h-10 text-gray-300" />
                  </motion.div>

                  <motion.div
                    className="text-5xl font-bold text-white mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
                  >
                    {stat.value}
                  </motion.div>

                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>

                {/* Counter animation */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-pink-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom insight */}
        <motion.div
          className="mt-12 bg-slate-800/30 border border-slate-700 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-gray-300">
            <span className="text-red-400 font-semibold">Key drivers:</span> Social media comparison (39%), uncertain future (22%), economic anxiety (11%)
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide2_CurrentChallenge;