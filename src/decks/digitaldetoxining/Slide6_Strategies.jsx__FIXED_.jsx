'use client';

import { motion } from 'framer-motion';

const StrategyStep = ({ number, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.7,
        type: 'tween',
        ease: 'easeOut',
      }}
      className="border-l-4 border-purple-500 pl-8 py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: delay + 0.2,
          duration: 0.5,
          type: 'spring',
          stiffness: 100,
        }}
        className="inline-block text-6xl font-black text-purple-400 mb-3"
      >
        {number}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.6, type: 'tween', ease: 'easeOut' }}
        className="text-4xl font-black text-white mb-2"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.6, type: 'tween', ease: 'easeOut' }}
        className="text-xl text-gray-400 leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default function Slide6_Strategies() {
  const strategies = [
    {
      number: '01',
      title: 'Delete the apps',
      description: 'Start radical. Remove social media apps from your phone.',
    },
    {
      number: '02',
      title: 'Disable notifications',
      description: 'Turn off ALL notifications. Check messages on your schedule.',
    },
    {
      number: '03',
      title: 'Create tech-free zones',
      description: 'Bedroom, dinner table, and first 1 hour after waking.',
    },
    {
      number: '04',
      title: 'Replace the habit',
      description: 'When you reach for your phone, read, walk, or meditate.',
    },
  ];

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center px-20 overflow-hidden gap-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, type: 'tween', ease: 'easeOut' }}
        className="font-black text-8xl text-white text-center"
      >
        How to Detox
      </motion.h1>

      {/* Strategy Steps */}
      <div className="w-full space-y-8">
        {strategies.map((strategy, i) => (
          <StrategyStep
            key={i}
            number={strategy.number}
            title={strategy.title}
            description={strategy.description}
            delay={0.4 + i * 0.15}
          />
        ))}
      </div>
    </div>
  );
}