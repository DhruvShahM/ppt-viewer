import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Target, Zap } from 'lucide-react';

export default function Slide9_ActionPlan() {
  const steps = [
    {
      num: 1,
      title: 'Pick ONE Activity',
      desc: 'Start small. Any activity on these slides works.',
      icon: Target,
    },
    {
      num: 2,
      title: 'Set a Time Limit',
      desc: '5-30 minutes depending on your energy.',
      icon: Zap,
    },
    {
      num: 3,
      title: 'Just Do It',
      desc: 'Motivation follows action, not the reverse.',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden  from-slate-950 via-green-950 to-slate-950">
      {/* Energizing Orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 194, 98, 0.25) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, -90, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
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
          className="text-center mb-20"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-bold text-white mb-3">Your Action Plan</h2>
          <p className="text-xl text-white/60">Three simple steps to feel better</p>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
            style={{
              background: 'linear-gradient(180deg, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0))',
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)',
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.2, duration: 1.2 }}
          />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className={`flex items-center gap-8 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.25, duration: 0.8 }}
              >
                {/* Content Card */}
                <motion.div
                  className="flex-1 rounded-2xl p-8 backdrop-blur-md"
                  style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    boxShadow: '0 8px 32px rgba(34, 197, 94, 0.15)',
                  }}
                  whileHover={{
                    boxShadow: '0 20px 50px rgba(34, 197, 94, 0.3)',
                  }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
                    <step.icon size={28} className="text-emerald-400" />
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-lg">{step.desc}</p>
                </motion.div>

                {/* Number Circle */}
                <motion.div
                  className="flex items-center justify-center w-20 h-20 rounded-full flex-shrink-0 relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(34, 194, 98, 0.3))',
                    border: '2px solid rgba(34, 197, 94, 0.6)',
                    boxShadow: '0 0 40px rgba(34, 197, 94, 0.4)',
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ delay: idx * 0.25 + 0.5, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-3xl font-bold text-white">{step.num}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Reminder */}
        {/* <motion.div
          className="mt-16 text-center p-6 rounded-xl backdrop-blur-sm"
          style={{
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-lg text-white font-semibold">
            🌟 You don't need to feel motivated to start. Action creates motivation.
          </p>
        </motion.div> */}
      </motion.div>
    </div>
  );
}