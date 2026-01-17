'use client';

import { motion } from 'framer-motion';

const TransformationDay = ({ day, before, after, delay }) => {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration: 0.7,
        type: 'tween',
        ease: 'easeOut',
      }}
      className="bg-gradient-to-b from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: delay + 0.2,
          duration: 0.5,
          type: 'spring',
        }}
        className="text-4xl font-black text-blue-400 mb-6 text-center"
      >
        {day}
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.6, type: 'tween', ease: 'easeOut' }}
            className="text-red-400 font-bold text-sm uppercase tracking-widest mb-3"
          >
            Before
          </motion.h4>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4, duration: 0.6, type: 'tween', ease: 'easeOut' }}
            className="text-white text-lg leading-relaxed"
          >
            {before}
          </motion.p>
        </div>

        <div>
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3, duration: 0.6, type: 'tween', ease: 'easeOut' }}
            className="text-green-400 font-bold text-sm uppercase tracking-widest mb-3"
          >
            After
          </motion.h4>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4, duration: 0.6, type: 'tween', ease: 'easeOut' }}
            className="text-white text-lg leading-relaxed"
          >
            {after}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Slide7_Transformation() {
  const days = [
    {
      day: 'Day 1-3',
      before: 'Anxiety, irritability, phantom vibrations',
      after: 'Stress peaks, then slowly subsides',
    },
    {
      day: 'Day 4-7',
      before: 'Constant urge to check phone',
      after: 'Urges fade. Sleep improves.',
    },
    {
      day: 'Day 8-14',
      before: 'Boredom, restlessness, withdrawals',
      after: 'Clarity emerges. Focus returns.',
    },
    {
      day: 'Day 15+',
      before: 'Digital dependency feels normal',
      after: 'Freedom. Real presence. Real life.',
    },
  ];

  return (
    <div className="w-screen h-screen bg-slate-950 flex flex-col items-center justify-center px-20 overflow-hidden gap-12">
      {/* Title */}
      <motion.h1
        initial={{ y: -40, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          delay: 0,
          duration: 0.8,
          type: 'tween',
          ease: 'easeOut',
        }}
        className="font-black text-7xl text-white text-center"
      >
        30-Day Transformation Timeline
      </motion.h1>

      {/* Days Grid */}
      <div className="grid grid-cols-2 gap-8 w-full">
        {days.map((dayObj, i) => (
          <TransformationDay
            key={i}
            day={dayObj.day}
            before={dayObj.before}
            after={dayObj.after}
            delay={0.4 + i * 0.1}
          />
        ))}
      </div>
    </div>
  );
}