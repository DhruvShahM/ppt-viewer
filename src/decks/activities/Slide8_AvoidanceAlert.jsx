import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Tv, Smartphone } from 'lucide-react';

export default function Slide8_AvoidanceAlert() {
  const avoidances = [
    { icon: Tv, label: 'Passive TV/Films', impact: 'Increases depressive symptoms' },
    { icon: Smartphone, label: 'Endless Scrolling', impact: 'Creates dopamine deficit' },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden  from-slate-950 via-red-950 to-slate-950">
      {/* Warm Warning Orbs */}
      <motion.div
        className="absolute top-0 right-1/3 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-8"
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
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertCircle
                size={64}
                className="text-white"
                style={{ filter: 'drop-shadow(0 0 30px rgba(239, 68, 68, 0.6))' }}
              />
            </motion.div>
          </div>
          <h2 className="text-6xl font-bold text-white mb-3">Things to Avoid</h2>
          <p className="text-xl text-white/60">When you're down, these make it worse</p>
        </motion.div>

        {/* Two Cards */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {avoidances.map((item, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl p-8 backdrop-blur-md relative overflow-hidden"
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '2px solid rgba(239, 68, 68, 0.4)',
                boxShadow: '0 8px 32px rgba(239, 68, 68, 0.2)',
              }}
              initial={{ x: idx === 0 ? -40 : 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
            >
              {/* Icon */}
              <motion.div
                className="inline-block p-4 rounded-lg mb-6"
                style={{
                  background: 'rgba(239, 68, 68, 0.25)',
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)',
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ delay: idx * 0.2, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <item.icon size={32} className="text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-3">{item.label}</h3>
              <p className="text-white/70">{item.impact}</p>

              {/* Pulsing Border */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.8), transparent)',
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)',
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ delay: idx * 0.2, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Critical Message */}
        <motion.div
          className="p-8 rounded-2xl text-center backdrop-blur-md"
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            boxShadow: 'inset 0 0 40px rgba(239, 68, 68, 0.1)',
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-xl text-white mb-3">
            💡 <span className="font-bold">The research is clear:</span> Passive consumption deepens the slump
          </p>
          <p className="text-white/70">
            Active engagement (even mildly) is always better than passive scrolling
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}