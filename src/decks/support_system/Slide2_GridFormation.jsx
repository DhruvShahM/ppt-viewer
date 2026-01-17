import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Hand, Brain, Heart } from 'lucide-react';

export default function Slide2_GridFormation() {
  const [animateIn, setAnimateIn] = useState(false);

  React.useEffect(() => {
    setAnimateIn(true);
  }, []);

  const cards = [
    {
      id: 1,
      title: 'Emotional',
      description: 'Being heard and validated',
      iconName: 'Heart',
      color: 'from-red-500 to-pink-500',
      textColor: 'text-white'
    },
    {
      id: 2,
      title: 'Practical',
      description: 'Tangible help and assistance',
      iconName: 'Hand',
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-white'
    },
    {
      id: 3,
      title: 'Informational',
      description: 'Advice and knowledge sharing',
      iconName: 'Brain',
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-white'
    },
    {
      id: 4,
      title: 'Social',
      description: 'Connection and belonging',
      iconName: 'Users',
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-white'
    }
  ];

  const iconMap = {
    Heart: Heart,
    Hand: Hand,
    Brain: Brain,
    Users: Users
  };

  const gridPositions = [
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1'
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-8">
      <motion.h2
        className="text-5xl font-bold text-white mb-16"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What is a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Support System?</span>
      </motion.h2>

      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        <AnimatePresence>
          {cards.map((card, idx) => {
            const Icon = iconMap[card.iconName];
            return (
              <motion.div
                key={card.id}
                layout
                layoutId={`card-${card.id}`}
                className={`rounded-2xl p-8 cursor-pointer group relative h-48 flex flex-col items-center justify-center bg-gradient-to-br ${card.color}`}
                initial={{
                  opacity: 0,
                  x: Math.random() * 200 - 100,
                  y: Math.random() * 200 - 100
                }}
                animate={animateIn ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.15,
                  type: 'spring',
                  stiffness: 200,
                  damping: 25
                }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Add overlay for better text readability */}
                <div className="absolute inset-0 rounded-2xl bg-black/20 pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 text-center">
                  <motion.div
                    className="flex justify-center mb-4"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: idx * 0.3 }}
                  >
                    <Icon size={48} className={`${card.textColor} drop-shadow-lg`} />
                  </motion.div>

                  <h3 className={`text-2xl font-bold ${card.textColor} text-center mb-2 drop-shadow-md`}>
                    {card.title}
                  </h3>

                  <p className={`text-sm ${card.textColor} text-center drop-shadow-md`}>
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-12 text-center text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        ↑ Four pillars that hold strong relationships together
      </motion.div>
    </div>
  );
}
