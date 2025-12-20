// Slide_12.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Brain } from 'lucide-react';

const Slide12_Conclusion = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center p-12 relative overflow-hidden">
      {/* Animated gradient orb (optional – remove if you want zero background visuals) */}
      {/* <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="w-96 h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: 360
          }}
          transition={{
            scale: { duration: 4, repeat: Infinity, repeatType: 'reverse' },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' }
          }}
        />
      </motion.div> */}

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        {/* Icons trio */}
        <motion.div
          className="flex justify-center gap-8 mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {[
            { icon: Heart, color: 'text-pink-400' },
            { icon: Brain, color: 'text-purple-400' },
            { icon: Sparkles, color: 'text-blue-400' }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                animate={{ y: [0, -15, 0] }}
                transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
              >
                <Icon className={`w-12 h-12 ${item.color}`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Yes, Your Generation
          <br />
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
            animate={{ backgroundPosition: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Will Be Healthier
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-gray-300 text-2xl mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Not because the challenges disappear.
          <br />
          Because the tools, understanding, and community will finally catch up.
        </motion.p>

        {/* Key statistics callout */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[
            { value: '54%', label: 'Already improving' },
            { value: '24/7', label: 'Support availability' },
            { value: '87%', label: 'Intervention success' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-4"
              whileHover={{ scale: 1.05, borderColor: 'rgba(148, 163, 184, 1)' }}
            >
              <motion.div
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-400 text-xs mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final reflection */}
        <motion.div
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/50 rounded-2xl p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-gray-200 text-lg italic leading-relaxed">
            "A positive future isn't determined by the absence of challenges, but by our willingness
            to imagine one, and the tools we build to make it real."
          </p>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div
            className="inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white text-2xl font-bold">
              The future is not decided.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
                It's being built right now.
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide12_Conclusion;