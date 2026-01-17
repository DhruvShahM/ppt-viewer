import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sun, TreePine, Wind } from 'lucide-react';

export default function Slide6_Nature() {
  const benefits = [
    { icon: Sun, label: 'Sunlight', value: 'Increases serotonin' },
    { icon: TreePine, label: 'Fresh Air', value: 'Improves oxygen flow' },
    { icon: Leaf, label: 'Connection', value: 'Reduces mental fatigue' },
    { icon: Wind, label: 'Outdoor Movement', value: 'Boosts endorphins' },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden  from-slate-950 via-teal-950 to-slate-950">
      {/* Lush Animated Background */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -70, 0],
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
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-bold text-white mb-3">Nature's Healing Power</h2>
          <p className="text-xl text-white/60">Step outside, step into peace</p>
        </motion.div>

        {/* Center Image-like Glass Card with Benefits Grid */}
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl p-8 backdrop-blur-md"
              style={{
                background: 'rgba(20, 184, 166, 0.1)',
                border: '1px solid rgba(20, 184, 166, 0.3)',
                boxShadow: '0 8px 32px rgba(20, 184, 166, 0.15)',
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              whileHover={{
                boxShadow: '0 20px 50px rgba(20, 184, 166, 0.3)',
              }}
            >
              {/* Icon */}
              <motion.div
                className="inline-block p-3 rounded-lg mb-4"
                style={{
                  background: 'rgba(20, 184, 166, 0.2)',
                  boxShadow: '0 0 25px rgba(20, 184, 166, 0.4)',
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ delay: idx * 0.15, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <benefit.icon size={28} className="text-white" />
              </motion.div>

              {/* Text */}
              <h3 className="text-xl font-bold text-white mb-2">{benefit.label}</h3>
              <p className="text-white/70 text-sm">{benefit.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.div
            className="inline-block px-10 py-4 rounded-full backdrop-blur-md"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.15), rgba(6, 182, 212, 0.15))',
              border: '2px solid rgba(20, 184, 166, 0.4)',
              boxShadow: '0 0 40px rgba(20, 184, 166, 0.3)',
            }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-white font-semibold">Take a walk. Any walk. Starting now.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}