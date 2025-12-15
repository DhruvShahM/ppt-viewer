import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Moon } from 'lucide-react';

export default function Slide4_MindfulnessConnection() {
  const practices = [
    {
      icon: Brain,
      title: 'Meditation',
      points: ['Calm nervous system', 'Boost dopamine', 'Mindfulness focus'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Deep Connection',
      points: ['Real conversations', 'Sustainable dopamine', 'Emotional support'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Moon,
      title: 'Quality Sleep',
      points: ['Regulate dopamine', 'Mental clarity', 'Energy restore'],
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden  from-slate-950 via-pink-950 to-slate-950">
      {/* Multiple Animated Orbs */}
      <motion.div
        className="absolute top-1/4 left-0 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 70, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-bold text-white mb-3">Mindfulness & Connection</h2>
          <p className="text-xl text-white/60">Inner peace meets outer warmth</p>
        </motion.div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-3 gap-8">
          {practices.map((practice, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl p-8 backdrop-blur-md relative overflow-hidden group h-full"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.25, duration: 1 }}
              whileHover={{
                y: -5,
                boxShadow: '0 20px 50px rgba(236, 72, 153, 0.25)',
              }}
            >
              {/* Animated Gradient Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl p-0.5 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, rgba(236, 72, 153, 0.5), rgba(168, 85, 247, 0.5), transparent)`,
                }}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Floating Icon */}
              <motion.div
                className="relative z-10 mb-6 inline-block p-4 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))`,
                  boxShadow: '0 0 30px rgba(236, 72, 153, 0.3)',
                }}
                animate={{ y: [0, -15, 0] }}
                transition={{ delay: idx * 0.25, duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <practice.icon size={32} className="text-white" />
              </motion.div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">{practice.title}</h3>
                <ul className="space-y-3">
                  {practice.points.map((point, pidx) => (
                    <motion.li
                      key={pidx}
                      className="flex items-center gap-2 text-white/80 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.25 + pidx * 0.1 + 0.3, duration: 0.6 }}
                    >
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: 'rgba(236, 72, 153, 0.8)',
                          boxShadow: '0 0 10px rgba(236, 72, 153, 0.6)',
                        }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ delay: idx * 0.25 + pidx * 0.15, duration: 2, repeat: Infinity }}
                      />
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}