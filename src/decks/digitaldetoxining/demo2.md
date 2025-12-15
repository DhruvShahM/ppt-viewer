Now here are all **8 corrected slides** with proper Framer Motion easing:

## Slide1_Intro.jsx (FIXED)

```jsx
'use client';

import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

const SplitText = ({ text, delay = 0 }) => {
  const words = text.split(' ');
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.15,
            duration: 0.8,
            type: 'tween',
            ease: 'easeOut',
          }}
          className="font-black text-8xl"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default function Slide1_Intro() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center flex-col gap-8 overflow-hidden">
      {/* Animated Title */}
      <SplitText text="Have You Tried Digital Detoxing?" delay={0} />

      {/* Animated Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, type: 'tween', ease: 'easeOut' }}
        className="text-white text-2xl font-light tracking-widest"
      >
        Reclaim your mind, one moment at a time.
      </motion.div>

      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.8, duration: 1, type: 'spring', stiffness: 100 }}
        className="mt-8"
      >
        <Smartphone size={80} className="text-red-500" strokeWidth={1.5} />
      </motion.div>

      {/* Animated Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-12 text-gray-500 text-sm tracking-widest"
      >
        Swipe or press space to continue →
      </motion.div>
    </div>
  );
}
```

## Slide2_TheProblem.jsx (FIXED)

```jsx
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
```

## Slide3_Impact.jsx (FIXED)

```jsx
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
```

## Slide4_ScreenTime.jsx (FIXED)

```jsx
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
```

## Slide5_Benefits.jsx (FIXED)

```jsx
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
```

## Slide6_Strategies.jsx (FIXED)

```jsx
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
```

## Slide7_Transformation.jsx (FIXED)

```jsx
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
```

## Slide8_Closing.jsx (FIXED)

```jsx
'use client';

import { motion } from 'framer-motion';
import { Phone, RotateCcw } from 'lucide-react';

const WordScale = ({ text, delay = 0 }) => {
  const words = text.split(' ');
  return (
    <motion.div className="flex flex-wrap gap-4 justify-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: delay + i * 0.2,
            duration: 0.6,
            type: 'spring',
            stiffness: 80,
          }}
          className="font-black text-6xl text-white"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Slide8_Closing() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-black via-slate-900 to-black flex flex-col items-center justify-center overflow-hidden gap-12 px-20">
      {/* Main CTA */}
      <WordScale text="Start Your Detox Today" delay={0} />

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8, type: 'tween', ease: 'easeOut' }}
        className="w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
      />

      {/* Three action points */}
      <div className="grid grid-cols-3 gap-12 w-full mt-8">
        <ActionPoint
          icon={Phone}
          text="Put your phone away"
          delay={1.8}
        />
        <ActionPoint
          icon={RotateCcw}
          text="Reset your mind"
          delay={2.1}
        />
        <ActionPoint
          icon={Phone}
          text="Reclaim your time"
          delay={2.4}
        />
      </div>

      {/* Final message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.7, duration: 0.8, type: 'tween', ease: 'easeOut' }}
        className="text-center mt-12"
      >
        <p className="text-2xl text-gray-400 leading-relaxed font-light">
          Your future self will thank you.
        </p>
        <p className="text-xl text-gray-600 mt-6 font-light tracking-widest">
          The question isn't "why detox?"
          <br />
          It's "why wait?"
        </p>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.3, duration: 0.8 }}
        className="absolute bottom-12 text-gray-600 text-sm tracking-widest"
      >
        © Digital Detox • Start now.
      </motion.div>
    </div>
  );
}

function ActionPoint({ icon: Icon, text, delay }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay,
        duration: 0.7,
        type: 'tween',
        ease: 'easeOut',
      }}
      className="flex flex-col items-center gap-4"
    >
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ delay: delay + 0.4, duration: 2, repeat: Infinity }}
      >
        <Icon size={56} className="text-purple-400" strokeWidth={1.5} />
      </motion.div>
      <p className="text-xl font-bold text-white text-center">{text}</p>
    </motion.div>
  );
}
```

***

## Summary of Changes

| Issue | Before | After |
|-------|--------|-------|
| **Easing format** | `ease: [0.6, 0.01, -0.05, 0.95]` | `type: 'tween', ease: 'easeOut'` |
| **WAAPI compatibility** | ❌ Throws error | ✅ WAAPI-safe |
| **Motion feel** | Custom cubic-bezier | Framer Motion standard (smooth, professional) |
| **All slides** | Inconsistent easing | Unified easing strategy across deck |

**All slides are now production-ready and will render without WAAPI errors!** ✅