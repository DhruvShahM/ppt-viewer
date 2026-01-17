

import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Brain, Zap, Activity, Cpu } from 'lucide-react';

const Slide4_DigitalToolsFlow = () => {
  const tools = [
    {
      icon: Smartphone,
      title: "AI Chatbots",
      desc: "24/7 mental health support",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Brain,
      title: "Emotion Recognition",
      desc: "AI detects emotional patterns",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Activity,
      title: "Wearables",
      desc: "Monitor stress & sleep real-time",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "VR Therapy",
      desc: "Safe exposure & stress relief",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Cpu,
      title: "Predictive AI",
      desc: "Prevent crises before they happen",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="w-full h-screen  flex items-center justify-center p-12 relative overflow-hidden">
      {/* Background animated grid */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "linear-gradient(45deg, #60a5fa 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.h2
          className="text-5xl font-bold text-white mb-2 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Technology as Enabler
        </motion.h2>

        <motion.div
          className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-12"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <motion.p
          className="text-center text-gray-400 mb-12 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Emerging innovations transforming mental healthcare delivery
        </motion.p>

        {/* Flow diagram */}
        <div className="relative">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: 400 }}>
            <defs>
              <motion.linearGradient
                id="flowGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
                animate={{
                  x1: ["0%", "100%"],
                  x2: ["100%", "200%"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
              </motion.linearGradient>
            </defs>

            {/* Central to branches */}
            {[0, 1, 2, 3, 4].map((i) => {
              const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + 35 * Math.cos(angle);
              const y = 50 + 35 * Math.sin(angle);
              return (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${x}%`}
                  y2={`${y}%`}
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                />
              );
            })}
          </svg>

          {/* Central node */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1], rotate: 360 }}
              transition={{ scale: { duration: 2, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
          </div>

          {/* Tool nodes */}
          <div className="relative" style={{ height: 400 }}>
            {tools.map((tool, i) => {
              const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + 35 * Math.cos(angle);
              const y = 50 + 35 * Math.sin(angle);

              const Icon = tool.icon;

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    className={`bg-gradient-to-br ${tool.color} p-6 rounded-2xl shadow-lg cursor-pointer min-w-max`}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Icon className="w-8 h-8 text-white mb-2" />
                    </motion.div>
                    <h4 className="text-white font-bold text-sm mb-1">{tool.title}</h4>
                    <p className="text-white/80 text-xs">{tool.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide4_DigitalToolsFlow;