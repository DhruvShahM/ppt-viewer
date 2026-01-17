'use client';

import { motion } from 'framer-motion';
import { Phone, RotateCcw } from 'lucide-react';

const WordScale = ({ text, delay = 0 }) => {
  const words = text.split(' ');
  return (
    <motion.div className="flex flex-wrap gap-4 justify-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: delay + i * 0.2,
            duration: 0.6,
            type: 'spring',
            stiffness: 80,
          }}
          className="font-black text-6xl text-white"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Slide8_Closing() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-black via-slate-900 to-black flex flex-col items-center justify-center overflow-hidden gap-12 px-20">
      {/* Main CTA */}
      <WordScale text="Start Your Detox Today" delay={0} />

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8, type: 'tween', ease: 'easeOut' }}
        className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      />

      {/* Three action points */}
      <div className="grid grid-cols-3 gap-12 w-full mt-8">
        <ActionPoint
          icon={Phone}
          text="Put your phone away"
          delay={1.8}
        />
        <ActionPoint
          icon={RotateCcw}
          text="Reset your mind"
          delay={2.1}
        />
        <ActionPoint
          icon={Phone}
          text="Reclaim your time"
          delay={2.4}
        />
      </div>

      {/* Final message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.7, duration: 0.8, type: 'tween', ease: 'easeOut' }}
        className="text-center mt-12"
      >
        <p className="text-2xl text-gray-400 leading-relaxed font-light">
          Your future self will thank you.
        </p>
        <p className="text-xl text-gray-600 mt-6 font-light tracking-widest">
          The question isn't "why detox?"
          <br />
          It's "why wait?"
        </p>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.3, duration: 0.8 }}
        className="absolute bottom-12 text-gray-600 text-sm tracking-widest"
      >
        © Digital Detox • Start now.
      </motion.div>
    </div>
  );
}

function ActionPoint({ icon: Icon, text, delay }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay,
        duration: 0.7,
        type: 'tween',
        ease: 'easeOut',
      }}
      className="flex flex-col items-center gap-4"
    >
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ delay: delay + 0.4, duration: 2, repeat: Infinity }}
      >
        <Icon size={56} className="text-purple-400" strokeWidth={1.5} />
      </motion.div>
      <p className="text-xl font-bold text-white text-center">{text}</p>
    </motion.div>
  );
}