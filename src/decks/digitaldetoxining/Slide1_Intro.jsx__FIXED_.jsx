'use client';

import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

const SplitText = ({ text, delay = 0 }) => {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.15,
            duration: 0.8,
            type: 'tween',
            ease: 'easeOut',
          }}
          className="font-black text-8xl"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default function Slide1_Intro() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center flex-col gap-8 overflow-hidden">
      {/* Animated Title */}
      <SplitText text="Have You Tried Digital Detoxing?" delay={0} />

      {/* Animated Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, type: 'tween', ease: 'easeOut' }}
        className="text-white text-2xl font-light tracking-widest"
      >
        Reclaim your mind, one moment at a time.
      </motion.div>

      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.8, duration: 1, type: 'spring', stiffness: 100 }}
        className="mt-8"
      >
        <Smartphone size={80} className="text-red-500" strokeWidth={1.5} />
      </motion.div>

      {/* Animated Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-12 text-gray-500 text-sm tracking-widest"
      >
        Swipe or press space to continue →
      </motion.div>
    </div>
  );
}