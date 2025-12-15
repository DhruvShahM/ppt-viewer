import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Puzzle, Lightbulb } from 'lucide-react';

export default function Slide7_PlayAndGames() {
  const activities = [
    {
      icon: Gamepad2,
      title: 'Video Games',
      desc: 'Engaging, goal-oriented, progressive',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Puzzle,
      title: 'Puzzles & Problem-Solving',
      desc: 'Stimulates creative thinking',
      color: 'from-purple-400 to-pink-400',
    },
    {
      icon: Lightbulb,
      title: 'Creative Challenges',
      desc: 'Novel experiences boost mood',
      color: 'from-yellow-400 to-orange-400',
    },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden  from-slate-950 via-indigo-950 to-slate-950">
      {/* Energetic Background Orbs */}
      <motion.div
        className="absolute top-1/3 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-8"
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
          <h2 className="text-6xl font-bold text-white mb-3">Play & Engagement</h2>
          <p className="text-xl text-white/60">Fun focuses the mind, lifts the spirit</p>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {activities.map((activity, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl p-8 backdrop-blur-md relative overflow-hidden group"
              style={{
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
              }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.25, duration: 0.8 }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 50px rgba(99, 102, 241, 0.25)',
              }}
            >
              {/* Top Accent Gradient */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.8), transparent)`,
                }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ delay: idx * 0.25, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Icon Container */}
              <motion.div
                className="relative z-10 inline-block p-4 rounded-lg mb-6"
                style={{
                  background: 'rgba(99, 102, 241, 0.2)',
                  boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ delay: idx * 0.25, duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <activity.icon size={32} className="text-white" />
              </motion.div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3">{activity.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{activity.desc}</p>
              </div>

              {/* Floating Particles */}
              {[0, 1, 2].map((particle) => (
                <motion.div
                  key={particle}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    background: 'rgba(99, 102, 241, 0.5)',
                    left: `${20 + particle * 30}%`,
                    top: '50%',
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    delay: idx * 0.25 + particle * 0.3,
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Key Insight */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-lg text-white/80">
            The key: <span className="font-bold text-white">Full engagement</span> redirects your focus away from down feelings.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}