'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const WordStagger = ({ words, delay = 0, size = 'text-6xl' }) => {
  return (
    <motion.div className="flex flex-col gap-4">
      {words.map((word, i) => (
        <motion.div
          key={i}
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: delay + i * 0.2,
            duration: 0.7,
            type: 'tween',
            ease: 'easeOut',
          }}
          className={`font-black ${size} text-white`}
        >
          {word}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function Slide2_TheProblem() {
  const problems = [
    'Constant notifications',
    'Anxiety & stress',
    'Sleep disruption',
    'Lost focus',
  ];

  return (
    <div className="w-screen h-screen bg-slate-900 flex items-center justify-center flex-col gap-16 px-20 overflow-hidden">
      {/* Left: Problem Title */}
      <div className="w-full grid grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0, duration: 0.6, type: 'tween', ease: 'easeOut' }}
            className="flex items-center gap-4 mb-8"
          >
            <AlertCircle size={60} className="text-red-500" />
            <h1 className="font-black text-7xl text-white">The Problem</h1>
          </motion.div>

          <WordStagger words={problems} delay={0.4} size="text-5xl" />
        </div>

        {/* Right: Stats Animation */}
        <div className="flex flex-col justify-center gap-8">
          <StatBlock number="7h 42m" label="Daily screen time" delay={0.8} />
          <StatBlock number="96x" label="Phone checks per day" delay={1.2} />
          <StatBlock number="47%" label="With digital anxiety" delay={1.6} />
        </div>
      </div>
    </div>
  );
}

function StatBlock({ number, label, delay }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{
        delay,
        duration: 0.8,
        type: 'tween',
        ease: 'easeOut',
      }}
      className="bg-red-500 bg-opacity-20 border-l-4 border-red-500 p-6 rounded-lg"
    >
      <div className="text-5xl font-black text-red-400">{number}</div>
      <div className="text-xl text-gray-300 mt-2">{label}</div>
    </motion.div>
  );
}