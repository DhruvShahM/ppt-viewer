import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network } from 'lucide-react';

const Slide1_Title = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.5, rotateZ: -180 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    }),
  };

  const title = 'TRIE'.split('');

  return (
    <div className='relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden'>
      {/* Animated background grid */}
      <motion.div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage:
            'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
        }}
        animate={{
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-2 h-2 bg-blue-400 rounded-full'
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        className='relative z-10 text-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Icon with glow */}
        <motion.div
          className='mb-12 flex justify-center'
          animate={{
            scale: [1, 1.1, 1],
            filter: [
              'drop-shadow(0 0 20px rgba(59, 130, 246, 0))',
              'drop-shadow(0 0 40px rgba(59, 130, 246, 0.6))',
              'drop-shadow(0 0 20px rgba(59, 130, 246, 0))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Network size={80} className='text-blue-400' strokeWidth={1.5} />
        </motion.div>

        {/* Title with letter animation */}
        <div className='flex justify-center gap-4 mb-6'>
          {title.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial='hidden'
              animate='visible'
              className='text-9xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className='text-2xl text-slate-300 font-light tracking-widest mb-8'
        >
          Data Structure in Depth
        </motion.p>

        {/* Tagline */}
        <motion.div
          variants={itemVariants}
          className='flex items-center justify-center gap-2 text-slate-400'
        >
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className='w-2 h-2 bg-green-400 rounded-full'
          />
          <span>Efficient String Search & Prefix Matching</span>
        </motion.div>
      </motion.div>

      {/* Cursor glow effect */}
      <motion.div
        className='fixed w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 pointer-events-none'
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          mass: 0.2,
        }}
      />
    </div>
  );
};

export default Slide1_Title;