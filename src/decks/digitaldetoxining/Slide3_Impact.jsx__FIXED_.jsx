'use client';

import { motion } from 'framer-motion';
import { Activity, Brain, Heart } from 'lucide-react';

const ImpactCard = ({ icon: Icon, title, description, delay, color }) => {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration: 0.8,
        type: 'tween',
        ease: 'easeOut',
      }}
      className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center"
    >
      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.6, type: 'spring', stiffness: 100 }}
        className="mx-auto mb-4"
      >
        <Icon size={56} className={`mx-auto ${color}`} />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.6, type: 'tween', ease: 'easeOut' }}
        className="font-black text-3xl text-white mb-3"
      >
        {title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.6, type: 'tween', ease: 'easeOut' }}
        className="text-gray-300 text-lg leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default function Slide3_Impact() {
  const impacts = [
    {
      icon: Brain,
      title: 'Mental Clarity',
      description: 'Your brain rewires for focus and deep work',
      color: 'text-blue-400',
    },
    {
      icon: Heart,
      title: 'Better Relationships',
      description: 'Presence with people who matter most',
      color: 'text-red-400',
    },
    {
      icon: Activity,
      title: 'Healthier Habits',
      description: 'Sleep improves, stress decreases',
      color: 'text-green-400',
    },
  ];

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center px-20 overflow-hidden gap-12">
      {/* Title */}
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'tween', ease: 'easeOut' }}
        className="font-black text-8xl text-white text-center"
      >
        The Impact
      </motion.h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-8 w-full">
        {impacts.map((impact, i) => (
          <ImpactCard
            key={i}
            icon={impact.icon}
            title={impact.title}
            description={impact.description}
            delay={0.4 + i * 0.2}
            color={impact.color}
          />
        ))}
      </div>
    </div>
  );
}