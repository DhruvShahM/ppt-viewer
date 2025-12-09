import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Code, Zap, BookOpen } from 'lucide-react';

const Slide10_Outro = () => {
  const keyTakeaways = [
    {
      icon: Code,
      title: 'Efficient String Operations',
      desc: 'O(m) for insert, search, delete operations',
    },
    {
      icon: Zap,
      title: 'Prefix Matching Powerhouse',
      desc: 'Optimal for autocomplete and prefix queries',
    },
    {
      icon: BookOpen,
      title: 'Space-Time Tradeoff',
      desc: 'Requires more memory for faster operations',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, duration: 0.6 },
  };

  return (
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-12 overflow-hidden relative'>
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-1 h-1 bg-blue-400 rounded-full'
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() * 100 - 50],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        className='relative z-10 max-w-4xl text-center'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className='text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent'
        >
          You Mastered Tries!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className='text-2xl text-slate-300 mb-16 font-light'
        >
          From basic structure to real-world applications
        </motion.p>

        {/* Key Takeaways */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'
          variants={containerVariants}
        >
          {keyTakeaways.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className='bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6'
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                }}
              >
                <motion.div
                  className='mb-4 flex justify-center'
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.2,
                  }}
                >
                  <Icon size={40} className='text-blue-400' />
                </motion.div>

                <h3 className='font-bold text-lg text-white mb-2'>{item.title}</h3>
                <p className='text-slate-400 text-sm'>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Learning paths */}
        <motion.div variants={itemVariants} className='mb-16'>
          <h2 className='text-2xl font-bold text-cyan-400 mb-6'>Next Steps</h2>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {[
              {
                title: 'Advanced Techniques',
                items: [
                  'Compressed Tries (Radix Trees)',
                  'Ternary Search Trees',
                  'Suffix Trees & Arrays',
                ],
              },
              {
                title: 'Real-World Applications',
                items: [
                  'IP Routing Tables',
                  'DNS Systems',
                  'Text Search Engines',
                ],
              },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                className='bg-slate-800 border border-slate-700 rounded-lg p-6 text-left'
                variants={itemVariants}
              >
                <h3 className='font-bold text-purple-400 mb-4'>{section.title}</h3>
                <ul className='space-y-2'>
                  {section.items.map((item, itemIdx) => (
                    <motion.li
                      key={itemIdx}
                      className='text-slate-300 flex items-start gap-2'
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 1 + idx * 0.15 + itemIdx * 0.1,
                      }}
                    >
                      <CheckCircle size={16} className='text-green-400 mt-0.5 flex-shrink-0' />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final message */}
        <motion.div
          variants={itemVariants}
          className='bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 rounded-xl p-8'
        >
          <motion.p
            className='text-xl text-slate-200 font-light leading-relaxed'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Tries are a <span className='text-cyan-300 font-bold'>fundamental building block</span> of modern systems.
            Whether you're building search engines, spell checkers, or IP routers,{' '}
            <span className='text-green-300 font-bold'>Tries provide elegant solutions</span> to complex string problems.
          </motion.p>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className='mt-12 space-y-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          <motion.button
            className='px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Implement Your First Trie
          </motion.button>

          <p className='text-slate-500 text-sm'>
            Practice implementing a Trie in your favorite language
          </p>
        </motion.div>
      </motion.div>

      {/* Floating background elements */}
      <motion.div
        className='absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl opacity-5'
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className='absolute bottom-10 right-10 w-40 h-40 bg-cyan-500 rounded-full filter blur-3xl opacity-5'
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
    </div>
  );
};

export default Slide10_Outro;