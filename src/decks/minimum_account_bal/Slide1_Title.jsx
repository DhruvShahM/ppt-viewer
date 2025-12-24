import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

const Slide1_Title = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const walletVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 1.2, ease: 'backOut' },
    },
  };

  const pulseVariants = {
    pulse: {
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0.7)',
        '0 0 0 40px rgba(59, 130, 246, 0)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col items-center justify-center overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-transparent"></div>
      </div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          initial={{ x: Math.random() * 1920, y: -20, opacity: 0 }}
          animate={{
            y: 1080,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon */}
        <motion.div variants={walletVariants} className="relative">
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="w-28 h-28 bg-blue-500 rounded-full flex items-center justify-center"
          >
            <Wallet className="w-16 h-16 text-white" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={itemVariants} className="text-7xl font-bold text-white text-center">
          भारतीय बैंकों में
        </motion.h1>

        <motion.h2 variants={itemVariants} className="text-6xl font-bold text-blue-300 text-center">
          न्यूनतम बैलेंस
        </motion.h2>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-2xl text-blue-200 text-center max-w-2xl">
          आपके खाते में कितना पैसा रखना जरूरी है?
        </motion.p>

        {/* Decorative line */}
        <motion.div
          variants={itemVariants}
          className="w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        />
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600 to-transparent opacity-20"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
};

export default Slide1_Title;