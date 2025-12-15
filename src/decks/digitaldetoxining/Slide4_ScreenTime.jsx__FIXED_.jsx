'use client';

import { motion } from 'framer-motion';

const CharacterReveal = ({ text, delay = 0 }) => {
  const characters = text.split('');
  return (
    <motion.div className="inline-block">
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: delay + i * 0.05,
            duration: 0.4,
            type: 'tween',
            ease: 'easeOut',
          }}
          className={char === ' ' ? 'inline-block w-4' : ''}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Slide4_ScreenTime() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-slate-950 to-blue-950 flex items-center justify-center flex-col gap-16 px-20 overflow-hidden">
      {/* Main stat */}
      <motion.div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 50 }}
          className="text-9xl font-black text-blue-400 mb-4"
        >
          8 Hours
        </motion.div>
        <CharacterReveal
          text="is what the average person loses per day to digital distraction"
          delay={0.8}
        />
      </motion.div>

      {/* Breakdown */}
      <div className="grid grid-cols-3 gap-12 w-full mt-12">
        <BreakdownItem time="3h 20m" label="Social Media" delay={1.4} />
        <BreakdownItem time="2h 30m" label="Work Email" delay={1.7} />
        <BreakdownItem time="2h 10m" label="Random Browsing" delay={2.0} />
      </div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.8, type: 'tween', ease: 'easeOut' }}
        className="text-2xl text-gray-300 italic font-light tracking-wide"
      >
        That's a lifetime. Don't waste it.
      </motion.div>
    </div>
  );
}

function BreakdownItem({ time, label, delay }) {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay,
        duration: 0.7,
        type: 'tween',
        ease: 'easeOut',
      }}
      className="text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ delay: delay + 0.5, duration: 2, repeat: Infinity }}
        className="text-5xl font-black text-cyan-400 mb-2"
      >
        {time}
      </motion.div>
      <div className="text-xl text-gray-400">{label}</div>
    </motion.div>
  );
}