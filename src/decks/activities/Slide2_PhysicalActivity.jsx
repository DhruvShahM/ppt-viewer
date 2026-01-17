import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Wind, Flame } from 'lucide-react';

export default function Slide2_PhysicalActivity() {
  const activities = [
    { icon: Flame, label: 'Walking', desc: 'Gentle aerobic activity' },
    { icon: Zap, label: 'Dancing', desc: 'Most effective exercise' },
    { icon: Wind, label: 'Yoga', desc: 'Mind & body balance' },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden  from-slate-950 via-blue-950 to-slate-950">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
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
          className="mb-16"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-bold text-white mb-2">Physical Activity</h2>
          <p className="text-xl text-white/60">Endorphins are your best friend</p>
        </motion.div>

        {/* Activity Cards */}
        <div className="grid grid-cols-3 gap-6">
          {activities.map((activity, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl p-8 backdrop-blur-md relative overflow-hidden group"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              whileHover={{
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
              }}
            >
              {/* Floating Icon */}
              <motion.div
                className="mb-6 inline-block p-4 rounded-xl"
                style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                }}
                animate={{ y: [0, -12, 0] }}
                transition={{ delay: idx * 0.2, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <activity.icon
                  size={32}
                  className="text-white"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))' }}
                />
              </motion.div>

              {/* Text */}
              <h3 className="text-2xl font-semibold text-white mb-2">{activity.label}</h3>
              <p className="text-white/60 text-sm">{activity.desc}</p>

              {/* Animated Bottom Border */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: idx * 0.2 + 0.3, duration: 1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Research Note */}
        <motion.div
          className="mt-12 p-6 rounded-xl backdrop-blur-sm"
          style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-white/80 text-sm">
            💡 Research shows: <span className="font-semibold">Dance is the most effective</span>, followed by walking/jogging, and yoga.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}