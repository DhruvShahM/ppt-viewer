import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Zap, Sun } from 'lucide-react';

const Slide10_Conclusion = () => {
  const keyPoints = [
    {
      icon: Brain,
      text: "Stress is normal—it's chronic, unmanaged stress that causes harm",
      color: 'text-blue-400',
    },
    {
      icon: Heart,
      text: "Your body and mind need regular recovery periods to thrive",
      color: 'text-pink-400',
    },
    {
      icon: Zap,
      text: "Multiple coping strategies work better than one single approach",
      color: 'text-yellow-400',
    },
    {
      icon: Sun,
      text: "Small, consistent actions create sustainable long-term change",
      color: 'text-orange-400',
    },
  ];

  // Floating elements
  const floatingElements = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
  }));

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated particles */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 to-green-400"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${el.x}%`,
            top: `${el.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: el.delay,
          }}
        />
      ))}

      {/* Glow background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl"
      >
        {/* Title */}
        <motion.h2 className="text-6xl font-bold text-white mb-4">
          Your Stress Matters
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-400 mb-12"
        >
          You now understand where stress comes from, how it affects you, and what you can do about it
        </motion.p>
      </motion.div>

      {/* Key points */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl w-full relative z-10 mb-12">
        {keyPoints.map((point, idx) => {
          const Icon = point.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="p-6 bg-slate-800/40 border border-slate-700 rounded-2xl hover:border-green-500/50 transition group"
            >
              <div className="flex gap-4 items-start">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="flex-shrink-0 mt-1"
                >
                  <Icon className={`w-6 h-6 ${point.color}`} />
                </motion.div>
                <p className="text-slate-200 text-sm leading-relaxed">{point.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 text-center"
      >
        <p className="text-slate-300 mb-6">
          You have the tools. You have the knowledge.
        </p>

        <motion.div
          className="inline-flex gap-4"
          whileHover={{ scale: 1.05 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-lg transition shadow-lg"
          >
            Start Your Journey
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-slate-500 text-sm mt-6"
        >
          Remember: Progress over perfection. Be kind to yourself. 🌱
        </motion.p>
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-blue-600 to-green-600"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default Slide10_Conclusion;
