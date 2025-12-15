import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Brain, Smile, Users, Sun } from 'lucide-react';

const Slide10_Closing = () => {
  const finalMessages = [
    { icon: Heart, text: 'Your mental health matters', color: 'text-red-400' },
    { icon: Brain, text: 'Coping skills can be learned', color: 'text-blue-400' },
    { icon: Smile, text: 'Progress over perfection', color: 'text-yellow-400' },
    { icon: Users, text: 'You don\'t have to do it alone', color: 'text-green-400' },
    { icon: Zap, text: 'Small changes create impact', color: 'text-purple-400' },
    { icon: Sun, text: 'Better days are possible', color: 'text-cyan-400' },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-10"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-br from-cyan-500 via-green-500 to-blue-500 rounded-full blur-3xl opacity-10"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '10%' }}
      />

      <div className="relative z-10 text-center">
        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.h2
            className="text-6xl font-bold text-white mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            Your Mental Health Matters
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-300 mb-2"
          >
            It's never too late to build healthier coping skills
          </motion.p>
        </motion.div>

        {/* Key takeaways in circular arrangement */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 max-w-5xl">
          {finalMessages.map((msg, idx) => {
            const Icon = msg.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
                className="group"
              >
                <motion.div
                  className="flex flex-col items-center gap-3 p-4 bg-slate-800/40 border border-slate-700 rounded-xl backdrop-blur-sm hover:border-gray-500 transition-colors"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: idx * 0.1,
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 20, scale: 1.2 }}
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.15 }}
                  >
                    <Icon className={`w-7 h-7 ${msg.color}`} strokeWidth={1.5} />
                  </motion.div>
                  <p className="text-sm text-gray-200 text-center font-medium">
                    {msg.text}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-sm max-w-3xl mx-auto">
            <p className="text-lg text-gray-200 leading-relaxed mb-4">
              <span className="text-cyan-300 font-semibold">Start small.</span> Choose one healthy coping strategy today. Build from there. Change happens gradually, and <span className="text-green-300 font-semibold">every step matters</span>.
            </p>
          </div>

          {/* Animated closing line */}
          <motion.p
            className="text-2xl font-bold text-white"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            💙 You've got this 💙
          </motion.p>

          {/* Pulse effect */}
          <motion.div
            className="flex justify-center gap-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide10_Closing;
