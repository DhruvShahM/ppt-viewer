import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertCircle, Lightbulb } from 'lucide-react';

export default function Slide12_BestPractices() {
  const blobVariants = {
    animate: {
      x: [0, 40, -40, 0],
      y: [0, -30, 30, 0],
      transition: { duration: 10, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const practices = [
    {
      icon: Target,
      title: 'Use Appropriate Method',
      desc: 'Choose specific methods (HasPrefix vs Contains) for clarity',
      color: 'text-emerald-400',
      glowColor: 'rgba(52, 211, 153, 0.3)',
    },
    {
      icon: AlertCircle,
      title: 'Watch for Unicode',
      desc: 'Byte-based methods may not handle Unicode correctly',
      color: 'text-amber-400',
      glowColor: 'rgba(251, 191, 36, 0.3)',
    },
    {
      icon: Lightbulb,
      title: 'Prefer strings Package',
      desc: 'Use strings package methods over manual character iteration',
      color: 'text-yellow-400',
      glowColor: 'rgba(250, 204, 21, 0.3)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-3xl opacity-12"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full blur-3xl opacity-12"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-8"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12 text-center"
        >
          Best Practices
        </motion.h2>

        {/* Practices grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-8"
        >
          {practices.map((practice, idx) => {
            const Icon = practice.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all"
                style={{
                  boxShadow: `0 0 20px ${practice.glowColor}`,
                }}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="flex-shrink-0"
                  >
                    <Icon
                      size={40}
                      className={practice.color}
                      style={{
                        filter: `drop-shadow(0 0 10px ${practice.glowColor})`,
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${practice.color}`}>
                      {practice.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {practice.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(52, 211, 153, 0.2)',
            '0 0 150px rgba(52, 211, 153, 0.35)',
            '0 0 100px rgba(52, 211, 153, 0.2)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}