'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const BenefitRow = ({ benefit, delay }) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        delay,
        duration: 0.7,
        type: 'tween',
        ease: 'easeOut',
      }}
      className="flex items-center gap-6 mb-8"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: delay + 0.2,
          duration: 0.6,
          type: 'spring',
          stiffness: 120,
        }}
      >
        <CheckCircle size={48} className="text-green-400" strokeWidth={3} />
      </motion.div>

      <motion.span className="text-5xl font-black text-white">{benefit}</motion.span>
    </motion.div>
  );
};

export default function Slide5_Benefits() {
  const benefits = [
    '↑ Productivity increases by 40%',
    '↑ Sleep quality improves dramatically',
    '↑ Anxiety and depression fade',
    '↑ Real relationships deepen',
    '↑ Creativity explodes',
  ];

  return (
    <div className="w-screen h-screen bg-slate-950 flex flex-col items-center justify-center px-20 overflow-hidden">
      {/* Title */}
      <motion.h1
        initial={{ y: -60, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          delay: 0,
          duration: 0.8,
          type: 'tween',
          ease: 'easeOut',
        }}
        className="font-black text-8xl text-white text-center mb-16"
      >
        The Benefits Are Real
      </motion.h1>

      {/* Benefits List */}
      <div className="w-full">
        {benefits.map((benefit, i) => (
          <BenefitRow key={i} benefit={benefit} delay={0.4 + i * 0.15} />
        ))}
      </div>
    </div>
  );
}