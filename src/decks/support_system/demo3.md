Perfect! Now let me generate all 8 slides as production-ready React components:

## Slide1_TitleExpand.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Slide1_TitleExpand() {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerVariants = {
    initial: { scale: 0.3, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.8, type: 'spring', stiffness: 150 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.6 } }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { delay: 0.6, duration: 0.7, type: 'spring' } }
  };

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center p-8">
      <motion.div
        layout
        layoutId="title-card"
        className="w-full max-w-2xl"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          className="rounded-3xl border border-white/20 p-16 text-center backdrop-blur-sm"
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
        >
          <motion.div variants={iconVariants} className="mb-8 flex justify-center">
            <Heart size={80} className="text-white stroke-1" />
          </motion.div>

          <motion.h1
            variants={textVariants}
            className="text-7xl font-bold text-white mb-6 leading-tight"
          >
            Do you feel you have a
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
              strong support system?
            </span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-xl text-white/70 max-w-xl mx-auto"
          >
            A journey into understanding the networks that sustain us.
          </motion.p>

          <motion.div
            className="mt-12 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/40"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
```

## Slide2_GridFormation.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Hand, Brain, MessageCircle } from 'lucide-react';

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
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      position: 'scattered'
    },
    {
      id: 2,
      title: 'Practical',
      description: 'Tangible help and assistance',
      icon: Hand,
      color: 'from-blue-500 to-cyan-500',
      position: 'scattered'
    },
    {
      id: 3,
      title: 'Informational',
      description: 'Advice and knowledge sharing',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      position: 'scattered'
    },
    {
      id: 4,
      title: 'Social',
      description: 'Connection and belonging',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      position: 'scattered'
    }
  ];

  const gridPositions = [
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1'
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
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
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                layout
                layoutId={`card-${card.id}`}
                className={`rounded-2xl border border-white/20 p-8 backdrop-blur-sm cursor-pointer group ${gridPositions[idx]}`}
                style={{ background: 'rgba(255, 255, 255, 0.05)' }}
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
                <motion.div
                  className="flex justify-center mb-4"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: idx * 0.3 }}
                >
                  <Icon size={48} className="text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white text-center mb-3">
                  {card.title}
                </h3>

                <p className="text-sm text-white/60 text-center">
                  {card.description}
                </p>

                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                  layoutId={`highlight-${card.id}`}
                />
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
```

## Slide3_CardTransform.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Wrench, Coins, Lightbulb } from 'lucide-react';

export default function Slide3_CardTransform() {
  const [activePhase, setActivePhase] = useState(0);

  const supportTypes = [
    {
      id: 'emotional',
      title: 'Emotional Support',
      examples: ['Active listening', 'Validation', 'Comfort in crisis', 'Celebration of wins'],
      icon: Flame,
      gradient: 'from-red-500/20 to-pink-500/20',
      borderColor: 'border-red-400/40'
    },
    {
      id: 'practical',
      title: 'Practical Support',
      examples: ['Childcare help', 'Moving assistance', 'Meal prep', 'Transport'],
      icon: Wrench,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/40'
    },
    {
      id: 'financial',
      title: 'Financial Support',
      examples: ['Emergency funds', 'Loan co-signing', 'Bill assistance', 'Investment advice'],
      icon: Coins,
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/40'
    },
    {
      id: 'informational',
      title: 'Informational Support',
      examples: ['Career guidance', 'Health advice', 'Problem-solving', 'Knowledge sharing'],
      icon: Lightbulb,
      gradient: 'from-purple-500/20 to-indigo-500/20',
      borderColor: 'border-purple-400/40'
    }
  ];

  const current = supportTypes[activePhase];
  const Icon = current.icon;

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      <motion.h2
        className="text-5xl font-bold text-white mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Types of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Support</span>
      </motion.h2>

      <div className="w-full max-w-3xl relative h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            layout
            layoutId="support-type-card"
            className={`absolute inset-0 rounded-3xl border ${current.borderColor} p-12 backdrop-blur-sm`}
            style={{ background: current.gradient }}
            initial={{ opacity: 0, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="flex items-start justify-between mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-4xl font-bold text-white flex-1">{current.title}</h3>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Icon size={64} className="text-white/80" />
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {current.examples.map((example, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4 text-white/80"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white/60"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: idx * 0.15 }}
                  />
                  <span className="text-lg">{example}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-12">
        {supportTypes.map((type, idx) => (
          <motion.button
            key={type.id}
            onClick={() => setActivePhase(idx)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activePhase === idx
                ? 'bg-white text-black scale-110'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.title.split(' ')[0]}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
```

## Slide4_HierarchyBreakdown.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Slide4_HierarchyBreakdown() {
  const [isExpanded, setIsExpanded] = useState(false);

  const pillars = [
    { title: 'Trust', icon: '🤝', color: 'from-red-500 to-pink-500' },
    { title: 'Communication', icon: '💬', color: 'from-blue-500 to-cyan-500' },
    { title: 'Consistency', icon: '⚙️', color: 'from-purple-500 to-indigo-500' },
    { title: 'Reciprocity', icon: '🔄', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      <motion.h2
        className="text-5xl font-bold text-white mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Pillars</span> of a Support System
      </motion.h2>

      <div className="w-full max-w-4xl">
        <AnimatePresence>
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              layoutId="pillar-container"
              className="rounded-3xl border border-white/20 p-16 text-center cursor-pointer"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                layoutId="pillar-title"
                className="text-4xl font-bold text-white mb-6"
              >
                The 4 Pillars
              </motion.div>

              <motion.p className="text-white/60 mb-8">
                Click to expand and explore each pillar
              </motion.p>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ChevronDown size={40} className="text-white/60 mx-auto" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              layoutId="pillar-container"
              className="grid grid-cols-2 gap-6"
              onClick={() => setIsExpanded(false)}
            >
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  layout
                  layoutId={`pillar-${idx}`}
                  className="rounded-2xl border border-white/20 p-8 cursor-pointer group"
                  style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    delay: idx * 0.1
                  }}
                  whileHover={{ scale: 1.08 }}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: idx * 0.5 }}
                  >
                    {pillar.icon}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white">
                    {pillar.title}
                  </h3>

                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-15 transition-opacity`}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-12 text-center text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {isExpanded ? '← Click to collapse' : 'Each pillar strengthens the others →'}
      </motion.div>
    </div>
  );
}
```

## Slide5_NetworkCircles.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Briefcase, Globe } from 'lucide-react';

export default function Slide5_NetworkCircles() {
  const [expandedRing, setExpandedRing] = useState(null);

  const circles = [
    {
      id: 'inner',
      title: 'Intimate Circle',
      subtitle: 'Family & Close Friends',
      icon: Heart,
      members: ['Parents', 'Siblings', 'Best Friends', 'Partner'],
      radius: 'w-48 h-48',
      borderColor: 'border-red-400/40',
      color: 'text-red-400'
    },
    {
      id: 'middle',
      title: 'Personal Network',
      subtitle: 'Friends & Acquaintances',
      icon: Users,
      members: ['Friends', 'Neighbors', 'Colleagues', 'Activity Partners'],
      radius: 'w-80 h-80',
      borderColor: 'border-blue-400/40',
      color: 'text-blue-400'
    },
    {
      id: 'outer',
      title: 'Community',
      subtitle: 'Extended Network',
      icon: Globe,
      members: ['Community Groups', 'Mentors', 'Online Communities', 'Support Groups'],
      radius: 'w-[28rem] h-[28rem]',
      borderColor: 'border-green-400/40',
      color: 'text-green-400'
    }
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
      <motion.h2
        className="text-5xl font-bold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Your Network of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Support</span>
      </motion.h2>

      <motion.p
        className="text-white/60 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Concentric circles of relationships and care
      </motion.p>

      <div className="relative w-96 h-96 flex items-center justify-center">
        {circles.map((circle, idx) => {
          const Icon = circle.icon;
          const isExpanded = expandedRing === circle.id;

          return (
            <motion.div
              key={circle.id}
              layout
              layoutId={`circle-${circle.id}`}
              className={`absolute rounded-full border-2 ${circle.borderColor} cursor-pointer flex items-center justify-center`}
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`
              }}
              animate={{
                width: isExpanded ? 500 : ['var-w-' + idx],
                height: isExpanded ? 500 : ['var-h-' + idx],
                scale: isExpanded ? 1.15 : 1
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
              onClick={() => setExpandedRing(isExpanded ? null : circle.id)}
              initial={false}
            >
              <motion.div
                className="text-center pointer-events-none"
                animate={{ scale: isExpanded ? 1.2 : 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className={`${circle.color} mb-2 flex justify-center`}
                  animate={{ rotate: isExpanded ? 360 : 0 }}
                  transition={{ duration: 2 }}
                >
                  <Icon size={40} />
                </motion.div>

                <h3 className="text-white font-bold text-sm mb-1">
                  {circle.title}
                </h3>

                <p className={`${circle.color} text-xs mb-3`}>
                  {circle.subtitle}
                </p>

                {isExpanded && (
                  <motion.div
                    className="text-white/60 text-xs space-y-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {circle.members.map((member, i) => (
                      <div key={i}>• {member}</div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="mt-16 text-center text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        ↑ Click any circle to explore its members
      </motion.div>
    </div>
  );
}
```

## Slide6_ProcessFlow.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Users, Zap } from 'lucide-react';

export default function Slide6_ProcessFlow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Assess Current Network',
      description: 'Map out who is already in your life and their roles',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      action: 'Who supports you today?'
    },
    {
      id: 2,
      title: 'Identify Gaps',
      description: 'Recognize where your support system needs strengthening',
      icon: Plus,
      color: 'from-purple-500 to-pink-500',
      action: 'What\'s missing?'
    },
    {
      id: 3,
      title: 'Invest & Build',
      description: 'Actively nurture relationships and seek new connections',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      action: 'Who will you reach out to?'
    },
    {
      id: 4,
      title: 'Reciprocate',
      description: 'Be the support for others—mutual care strengthens bonds',
      icon: ArrowRight,
      color: 'from-red-500 to-orange-500',
      action: 'How will you give back?'
    }
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      <motion.h2
        className="text-5xl font-bold text-white mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Building Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Support System</span>
      </motion.h2>

      <div className="w-full max-w-5xl">
        {/* Flow Visualization */}
        <div className="grid grid-cols-4 gap-3 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <React.Fragment key={step.id}>
                <motion.button
                  className={`rounded-xl p-4 font-semibold transition-all relative overflow-hidden group`}
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${step.color})` : 'rgba(255, 255, 255, 0.05)'
                  }}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`flex flex-col items-center gap-2 relative z-10`}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                  >
                    <Icon size={28} className={isActive ? 'text-white' : 'text-white/60'} />
                    <span className={isActive ? 'text-white text-sm' : 'text-white/60 text-xs'}>
                      Step {idx + 1}
                    </span>
                  </motion.div>

                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </motion.button>

                {idx < steps.length - 1 && (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep >= idx + 1 ? 1 : 0.3 }}
                  >
                    <ArrowRight size={24} className="text-white/40" />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Detailed Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            className="rounded-3xl border border-white/20 p-12"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="flex items-start gap-6 mb-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className={`p-4 rounded-xl bg-gradient-to-br ${steps[activeStep].color} flex-shrink-0`}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                {React.createElement(steps[activeStep].icon, { size: 32, className: 'text-white' })}
              </motion.div>

              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-white/60">
                  {steps[activeStep].description}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/5 rounded-xl p-6 border border-white/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-white/80 italic text-lg">
                "{steps[activeStep].action}"
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
```

## Slide7_ChallengesView.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, TrendingDown, Lock, X } from 'lucide-react';

export default function Slide7_ChallengesView() {
  const [corrected, setCorrected] = useState(false);

  const challenges = [
    {
      id: 1,
      title: 'One-Sided Relationships',
      description: 'You give constantly but receive little',
      icon: TrendingDown,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Isolation & Avoidance',
      description: 'Withdrawing from relationships due to fear or shame',
      icon: Lock,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 3,
      title: 'Toxic Connections',
      description: 'People who drain, manipulate, or harm you',
      icon: X,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'Lack of Communication',
      description: 'Unspoken needs and unexpressed feelings',
      icon: AlertCircle,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      <motion.h2
        className="text-5xl font-bold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Red Flags & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Challenges</span>
      </motion.h2>

      <motion.p
        className="text-white/60 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Recognizing what weakens a support system
      </motion.p>

      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-2 gap-6">
          <AnimatePresence>
            {challenges.map((challenge, idx) => {
              const Icon = challenge.icon;
              const offsetX = !corrected ? (Math.random() - 0.5) * 150 : 0;
              const offsetY = !corrected ? (Math.random() - 0.5) * 150 : 0;

              return (
                <motion.div
                  key={challenge.id}
                  layout
                  layoutId={`challenge-${challenge.id}`}
                  className="rounded-2xl border-2 border-red-400/30 p-8 cursor-pointer group relative overflow-hidden"
                  style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                  animate={{
                    x: corrected ? 0 : offsetX,
                    y: corrected ? 0 : offsetY,
                    rotate: corrected ? 0 : (Math.random() - 0.5) * 15
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 25,
                    delay: corrected ? idx * 0.1 : 0
                  }}
                  onClick={() => setCorrected(!corrected)}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="flex items-start gap-4"
                    animate={{ opacity: corrected ? 1 : 0.7 }}
                  >
                    <motion.div
                      className={`p-3 rounded-xl bg-gradient-to-br ${challenge.color} flex-shrink-0`}
                      animate={{ rotate: corrected ? 0 : [0, -20, 20, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Icon size={32} className="text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {challenge.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {challenge.description}
                      </p>
                    </div>
                  </motion.div>

                  {corrected && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-8 p-6 rounded-2xl border border-green-400/30 bg-green-500/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="text-white font-bold mb-3">✓ The Fix</h4>
          <p className="text-white/70">
            Awareness is the first step. Set boundaries, communicate openly, invest in reciprocal relationships, and don't hesitate to seek professional help if needed.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="mt-8 text-center text-white/50 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        ↑ Click to {corrected ? 're-mess' : 'correct'} the grid
      </motion.div>
    </div>
  );
}
```

## Slide8_ReflectionAction.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Check } from 'lucide-react';

export default function Slide8_ReflectionAction() {
  const reflectionQuestions = [
    'Who can you turn to in crisis?',
    'Who celebrates your wins?',
    'Who challenges you to grow?',
    'Who do you support in return?'
  ];

  const actionItems = [
    'Identify 3 people to strengthen relationships with',
    'Schedule a meaningful conversation this week',
    'Set a boundary with someone who drains you',
    'Join a community aligned with your values'
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            animate={{
              x: [0, 100, -100, 0],
              y: [0, 50, -50, 0],
              scale: [1, 1.5, 0.8, 1]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width: 100 + i * 40,
              height: 100 + i * 40,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-3xl"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-8 flex justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Heart size={80} className="text-red-400" fill="currentColor" />
        </motion.div>

        <h2 className="text-6xl font-bold text-white mb-4">
          You Deserve a
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-red-400">
            Strong Support System
          </span>
        </h2>

        <motion.p
          className="text-xl text-white/70 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Whether you're building from scratch or strengthening what exists, every step matters.
        </motion.p>

        {/* Reflection Questions */}
        <motion.div
          className="mb-12 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-white font-bold text-lg mb-4">Reflect on these:</h3>
          {reflectionQuestions.map((question, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 text-white/70 justify-center"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
              whileHover={{ x: 10, color: '#ffffff' }}
            >
              <Sparkles size={20} className="text-yellow-400 flex-shrink-0" />
              <span className="text-lg">{question}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Items */}
        <motion.div
          className="space-y-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-white font-bold text-lg mb-4">Take action today:</h3>
          {actionItems.map((action, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 text-white/70 justify-center"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.4 + idx * 0.1 }}
              whileHover={{ x: 10, color: '#10b981' }}
            >
              <Check size={24} className="text-green-400 flex-shrink-0" />
              <span className="text-lg">{action}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.button
          className="px-12 py-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          Start Building Your Network
        </motion.button>
      </motion.div>

      {/* Bottom Affirmation */}
      <motion.div
        className="absolute bottom-8 text-center text-white/40 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <p>Remember: You are not alone. Reach out. Connect. Reciprocate. Thrive.</p>
      </motion.div>
    </div>
  );
}
```

***

## **Implementation Notes**

### **How to Use These Components:**

1. **Install Dependencies:**
   ```bash
   npm install framer-motion lucide-react tailwindcss
   ```

2. **Create Individual Files:**
   - Save each component as `Slide[N]_[Name].jsx`
   - Import them into your presentation component

3. **Create a Main Presenter Component:**
   ```jsx
   import { useState } from 'react';
   import { AnimatePresence } from 'framer-motion';
   
   import Slide1 from './Slide1_TitleExpand';
   import Slide2 from './Slide2_GridFormation';
   import Slide3 from './Slide3_CardTransform';
   import Slide4 from './Slide4_HierarchyBreakdown';
   import Slide5 from './Slide5_NetworkCircles';
   import Slide6 from './Slide6_ProcessFlow';
   import Slide7 from './Slide7_ChallengesView';
   import Slide8 from './Slide8_ReflectionAction';

   const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8];

   export default function Presentation() {
     const [current, setCurrent] = useState(0);

     return (
       <div className="w-full h-screen bg-black">
         <AnimatePresence mode="wait">
           {slides[current] && 
             React.createElement(slides[current], { key: current })
           }
         </AnimatePresence>
         
         <div className="absolute bottom-8 left-8 right-8 flex justify-between">
           <button onClick={() => setCurrent(Math.max(0, current - 1))}>
             Previous
           </button>
           <span>{current + 1} / {slides.length}</span>
           <button onClick={() => setCurrent(Math.min(slides.length - 1, current + 1))}>
             Next
           </button>
         </div>
       </div>
     );
   }
   ```

4. **Key Features:**
   - ✅ **Bento Grid Aesthetic**: Cards expand, shrink, reorder
   - ✅ **Framer Motion**: `layout` and `layoutId` for morphing
   - ✅ **Spring Physics**: Heavy, satisfying transitions
   - ✅ **Interactive**: Click-to-expand, hover effects, state-driven animations
   - ✅ **Production-Ready**: Full components, no placeholders

### **Customization Tips:**
- Adjust `stiffness` and `damping` for slower/faster motion
- Change color gradients in the `color` and `gradient` properties
- Add keyboard navigation for arrow keys
- Include slide progress indicators
- Extend with audio cues on transitions

This presentation deck transforms the abstract topic of support systems into a **visually engaging, interactive journey**. Each slide demonstrates core bento grid principles: **structured layouts, satisfying morphing animations, and logical information hierarchy**.