import React from 'react';
import { motion } from 'framer-motion';
import { Paintbrush, Leaf, Hammer } from 'lucide-react';

export default function Slide3_CreativeActivities() {
  const activities = [
    { icon: Paintbrush, label: 'Arts & Crafts', benefit: 'Boost life satisfaction' },
    { icon: Leaf, label: 'Gardening', benefit: 'Reduce anxiety & depression' },
    { icon: Hammer, label: 'DIY Projects', benefit: 'Sense of accomplishment' },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden  from-slate-950 via-emerald-950 to-slate-950">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.35) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
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
          className="mb-16"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-bold text-white mb-2">Creative Activities</h2>
          <p className="text-xl text-white/60">Express yourself, feel better</p>
        </motion.div>

        {/* Layout: Left Text, Right Cards */}
        <div className="grid grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div
              className="rounded-2xl p-8 backdrop-blur-md h-full"
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.15)',
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Why It Works</h3>
              <ul className="space-y-4">
                <motion.li
                  className="flex items-start gap-3 text-white/80"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <span className="text-emerald-400 font-bold mt-1">✦</span>
                  <span>Engages your mind fully</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3 text-white/80"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <span className="text-emerald-400 font-bold mt-1">✦</span>
                  <span>Provides sense of control</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3 text-white/80"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <span className="text-emerald-400 font-bold mt-1">✦</span>
                  <span>Creates visible results</span>
                </motion.li>
                <motion.li
                  className="flex items-start gap-3 text-white/80"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <span className="text-emerald-400 font-bold mt-1">✦</span>
                  <span>Boosts dopamine through novelty</span>
                </motion.li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Stacked Cards */}
          <motion.div className="flex flex-col gap-6">
            {activities.map((activity, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl p-6 backdrop-blur-md flex items-center gap-4"
                style={{
                  background: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.25)',
                }}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + idx * 0.15, duration: 0.8 }}
                whileHover={{
                  boxShadow: '0 8px 32px rgba(34, 197, 94, 0.2)',
                }}
              >
                <motion.div
                  className="p-3 rounded-lg"
                  style={{
                    background: 'rgba(34, 197, 94, 0.2)',
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
                  }}
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ delay: idx * 0.2, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <activity.icon size={24} className="text-white" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{activity.label}</p>
                  <p className="text-xs text-white/60">{activity.benefit}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}