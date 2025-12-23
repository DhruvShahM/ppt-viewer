<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# please give me the all slide codes here

Here are all 12 slide codes for the Two Pointer DSA presentation:

## Slide1_Hero.jsx

```jsx
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Slide1Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const floatingArrow = {
    animate: {
      x: [0, 10, 0],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Zap className="w-24 h-24 text-blue-400" />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-7xl font-bold text-white mb-6"
        >
          Two Pointer
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-5xl text-blue-300 mb-8 font-light"
        >
          The Art of Convergence
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-2xl text-gray-300 mb-16"
        >
          Master the most elegant technique in DSA
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          variants={floatingArrow}
          className="mt-16 text-gray-400"
        >
          ↓
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide1Hero;
```


## Slide2_Problem.jsx

```jsx
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Slide2Problem = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const target = 11;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <AlertCircle className="w-10 h-10 text-yellow-400" />
            <h2 className="text-5xl font-bold text-white">The Problem</h2>
          </div>
          <p className="text-2xl text-gray-300">
            Find two numbers in a sorted array that sum to a target
          </p>
        </motion.div>

        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <p className="text-xl text-gray-300 mb-4">Array: {JSON.stringify(array)}</p>
          <motion.p
            className="text-3xl font-bold text-blue-400"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Target Sum: {target}
          </motion.p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-300 mb-6">Brute Force Approach (❌ O(n²))</h3>
          <motion.div
            className="flex gap-1 flex-wrap"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {array.map((num, i) => (
              <motion.div
                key={i}
                variants={elementVariants}
                className="flex flex-col items-center"
              >
                <motion.div
                  className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white text-xl font-bold mb-2"
                  animate={{
                    boxShadow: ['0 0 0px rgba(239, 68, 68, 0)', '0 0 20px rgba(239, 68, 68, 0.8)', '0 0 0px rgba(239, 68, 68, 0)'],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {num}
                </motion.div>
                <span className="text-gray-400 text-sm">O(n) checks</span>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-gray-400 text-sm mt-4">Each element compared with all others</p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-xl text-yellow-300 font-semibold">
            Can we do better? ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide2Problem;
```


## Slide3_TwoPointerIntro.jsx

```jsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Slide3TwoPointerIntro = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12"
        >
          Two Pointer Solution (✓ O(n))
        </motion.h2>

        <div className="space-y-12">
          {/* Key Idea */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-blue-900 bg-opacity-30 rounded-lg p-6 border border-blue-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <ArrowRight className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-blue-300">Core Idea</h3>
            </div>
            <p className="text-xl text-gray-200">
              Start from both ends and move pointers toward each other based on the sum
            </p>
          </motion.div>

          {/* Visualization */}
          <div>
            <h3 className="text-xl text-gray-300 mb-6">Initial Setup</h3>
            <motion.div className="flex gap-2 justify-start items-end">
              {array.map((num, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
                      i === 0
                        ? 'bg-green-500'
                        : i === array.length - 1
                          ? 'bg-red-500'
                          : 'bg-gray-700'
                    }`}
                    animate={{
                      scale:
                        i === 0 || i === array.length - 1
                          ? [1, 1.15, 1]
                          : 1,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    {num}
                  </motion.div>
                  {i === 0 && (
                    <motion.span
                      className="text-green-400 text-sm mt-2 font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      LEFT
                    </motion.span>
                  )}
                  {i === array.length - 1 && (
                    <motion.span
                      className="text-red-400 text-sm mt-2 font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      RIGHT
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Key Properties */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-3 gap-4"
          >
            {[
              { label: 'Requires', value: 'Sorted Array' },
              { label: 'Time', value: 'O(n)' },
              { label: 'Space', value: 'O(1)' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-gray-800 rounded-lg p-4 text-center border border-gray-700"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-400 text-sm">{item.label}</p>
                <p className="text-white text-xl font-bold mt-2">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide3TwoPointerIntro;
```


## Slide4_Algorithm.jsx

```jsx
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const Slide4Algorithm = () => {
  const steps = [
    'left = 0, right = n-1',
    'while left < right:',
    '  sum = arr[left] + arr[right]',
    '  if sum == target: return true',
    '  if sum < target: left++',
    '  if sum > target: right--',
    'return false',
  ];

  const highlightLine = (index) => {
    return [0, 2, 3, 4, 5].includes(index);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Code2 className="w-10 h-10 text-purple-400" />
          <h2 className="text-5xl font-bold text-white">The Algorithm</h2>
        </motion.div>

        <div className="bg-gray-950 rounded-lg p-8 border border-purple-500 border-opacity-50 font-mono">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className={`text-lg py-2 ${
                highlightLine(i)
                  ? 'text-green-400 font-bold'
                  : 'text-gray-500'
              }`}
            >
              <motion.span
                className={`inline-block ${
                  highlightLine(i) ? 'bg-green-500 bg-opacity-20' : ''
                } px-2 rounded`}
                whileHover={{ scale: 1.05 }}
              >
                {step}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 gap-6"
        >
          <div className="bg-blue-900 bg-opacity-30 rounded-lg p-6 border border-blue-500">
            <h4 className="text-lg text-blue-300 font-bold mb-3">✓ Conditions</h4>
            <ul className="text-gray-200 space-y-2">
              <li>• Array must be sorted</li>
              <li>• Works left-to-right</li>
              <li>• Single pass solution</li>
            </ul>
          </div>

          <div className="bg-green-900 bg-opacity-30 rounded-lg p-6 border border-green-500">
            <h4 className="text-lg text-green-300 font-bold mb-3">
              ✓ Why It Works
            </h4>
            <ul className="text-gray-200 space-y-2">
              <li>• Sorted array property</li>
              <li>• Sum guides pointer movement</li>
              <li>• Never miss a solution</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide4Algorithm;
```


## Slide5_LiveDemo.jsx

```jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Slide5LiveDemo = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const target = 11;
  const [step, setStep] = useState(0);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [sum, setSum] = useState(array[0] + array[array.length - 1]);
  const [found, setFound] = useState(false);

  const stepsData = [
    { left: 0, right: 8, sum: 10, action: 'Initial: sum < target, move left →' },
    { left: 1, right: 8, sum: 11, action: '✓ Found! sum == target' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (s < stepsData.length - 1) {
          const nextStep = s + 1;
          setLeft(stepsData[nextStep].left);
          setRight(stepsData[nextStep].right);
          setSum(stepsData[nextStep].sum);
          if (stepsData[nextStep].sum === target) {
            setFound(true);
          }
          return nextStep;
        }
        return s;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12"
        >
          Live Demo: Find Pair (Target = {target})
        </motion.h2>

        {/* Array Visualization */}
        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <motion.div className="flex gap-2 justify-center items-end mb-8">
            {array.map((num, i) => {
              const isLeft = i === left;
              const isRight = i === right;
              const isBetween = i > left && i < right;

              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  animate={{ scale: isLeft || isRight ? 1.2 : 1 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl ${
                      isLeft
                        ? 'bg-green-500'
                        : isRight
                          ? 'bg-red-500'
                          : isBetween
                            ? 'bg-blue-500'
                            : 'bg-gray-700'
                    }`}
                    animate={{
                      boxShadow: isLeft || isRight
                        ? ['0 0 0px rgba(0,0,0,0)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 0px rgba(0,0,0,0)']
                        : 'none',
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {num}
                  </motion.div>
                  {isLeft && (
                    <motion.span
                      className="text-green-400 text-sm mt-2 font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      L
                    </motion.span>
                  )}
                  {isRight && (
                    <motion.span
                      className="text-red-400 text-sm mt-2 font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      R
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Status */}
          <div className="text-center space-y-4">
            <motion.div
              className="text-3xl font-bold"
              animate={{ scale: found ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-gray-300">Sum: </span>
              <span className={found ? 'text-green-400' : 'text-blue-400'}>
                {array[left]} + {array[right]} = {sum}
              </span>
            </motion.div>

            <AnimatePresence>
              {found && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl text-green-400 font-bold"
                >
                  ✓ Solution found!
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p
              className="text-xl text-gray-400 italic"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {stepsData[step]?.action}
            </motion.p>
          </div>
        </div>

        {/* Time Complexity */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-green-900 bg-opacity-30 rounded-lg p-6 border border-green-500 text-center"
        >
          <p className="text-lg text-green-300">
            ✓ Single pass - O(n) time complexity
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5LiveDemo;
```


## Slide6_SlidingWindow.jsx

```jsx
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide6SlidingWindow = () => {
  const array = [2, 1, 1, 3, 2, 3];
  const target = 6;
  const [windowStart, setWindowStart] = useState(0);
  const [windowEnd, setWindowEnd] = useState(0);
  const [sum, setSum] = useState(2);
  const [step, setStep] = useState(0);

  const stepsData = [
    { start: 0, end: 0, sum: 2, desc: 'Start with window at index 0' },
    { start: 0, end: 1, sum: 3, desc: 'Expand: sum < target' },
    { start: 0, end: 2, sum: 4, desc: 'Expand: sum < target' },
    { start: 0, end: 3, sum: 7, desc: 'Expand: sum ≥ target, now shrink' },
    { start: 1, end: 3, sum: 5, desc: 'Shrink: found [1, 3] = 4' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (s < stepsData.length - 1) {
          const next = s + 1;
          setWindowStart(stepsData[next].start);
          setWindowEnd(stepsData[next].end);
          setSum(stepsData[next].sum);
          return next;
        }
        return s;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Wind className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">Sliding Window Variant</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-cyan-900 bg-opacity-30 rounded-lg p-6 border border-cyan-500 mb-12"
        >
          <h3 className="text-2xl text-cyan-300 font-bold mb-3">
            Variant: Find Subarray with Sum ≥ K
          </h3>
          <p className="text-gray-200">
            Two pointers move in the same direction, creating a dynamic window
          </p>
        </motion.div>

        {/* Array with sliding window */}
        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <motion.div className="flex gap-2 justify-start mb-8">
            {array.map((num, i) => {
              const inWindow = i >= windowStart && i <= windowEnd;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  animate={{
                    scale: inWindow ? 1.15 : 1,
                  }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold ${
                      inWindow ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}
                    animate={{
                      boxShadow: inWindow
                        ? '0 0 20px rgba(34, 211, 238, 0.8)'
                        : 'none',
                    }}
                  >
                    {num}
                  </motion.div>
                  <span className="text-gray-400 text-xs mt-2">{i}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            className="text-center text-2xl font-bold text-cyan-400 mb-6"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Window Sum: {sum} | Target: ≥{target}
          </motion.p>

          <motion.p
            className="text-center text-lg text-gray-300"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {stepsData[step]?.desc}
          </motion.p>
        </div>

        {/* Key Applications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            'Longest substring without repeating',
            'Minimum window substring',
            'Max consecutive ones',
            'Product of subarray',
          ].map((app, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-300">{app}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6SlidingWindow;
```


## Slide7_FastSlow.jsx

```jsx
import { motion } from 'framer-motion';
import { Zap, Turtle } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide7FastSlow = () => {
  const listLength = 8;
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % 20);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const slowPos = (frame * 1) % listLength;
  const fastPos = (frame * 2) % listLength;

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Fast & Slow Pointers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl text-gray-300 mb-12"
        >
          Detect cycles in linked lists
        </motion.p>

        {/* Concept */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-purple-900 bg-opacity-30 rounded-lg p-6 border border-purple-500 mb-12"
        >
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Turtle className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-yellow-300">Slow Pointer</h3>
              </div>
              <p className="text-gray-300">Moves 1 step at a time</p>
              <p className="text-gray-400 text-sm mt-2">Like the tortoise</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-red-400" />
                <h3 className="text-2xl font-bold text-red-300">Fast Pointer</h3>
              </div>
              <p className="text-gray-300">Moves 2 steps at a time</p>
              <p className="text-gray-400 text-sm mt-2">Like the hare</p>
            </div>
          </div>
        </motion.div>

        {/* Visualization */}
        <div className="bg-gray-900 rounded-lg p-12 mb-12">
          <h3 className="text-gray-300 text-lg mb-8">Linked List with Cycle</h3>

          <motion.div className="space-y-12">
            {/* Slow pointer track */}
            <div>
              <p className="text-yellow-400 font-bold mb-4">Slow (1x speed)</p>
              <motion.div className="flex gap-4 items-center relative">
                {[...Array(listLength)].map((_, i) => (
                  <motion.div
                    key={`slow-${i}`}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      i < 5 ? 'bg-blue-600' : 'bg-purple-600'
                    }`}
                    animate={{
                      scale: i === slowPos ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {i}
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="h-1 bg-yellow-400 mt-4 rounded"
                style={{
                  width: `${((slowPos + 1) / listLength) * 100}%`,
                }}
              />
            </div>

            {/* Fast pointer track */}
            <div>
              <p className="text-red-400 font-bold mb-4">Fast (2x speed)</p>
              <motion.div className="flex gap-4 items-center relative">
                {[...Array(listLength)].map((_, i) => (
                  <motion.div
                    key={`fast-${i}`}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      i < 5 ? 'bg-blue-600' : 'bg-purple-600'
                    }`}
                    animate={{
                      scale: i === fastPos ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    {i}
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                className="h-1 bg-red-400 mt-4 rounded"
                style={{
                  width: `${((fastPos + 1) / listLength) * 100}%`,
                }}
              />
            </div>
          </motion.div>

          {/* Meeting point indicator */}
          {slowPos === fastPos && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center"
            >
              <motion.p
                className="text-2xl font-bold text-green-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ✓ CYCLE DETECTED!
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
        >
          {[
            { title: 'Cycle Detection', icon: '🔄' },
            { title: 'Find Middle Node', icon: '⭐' },
            { title: 'Palindrome LL', icon: '🔁' },
            { title: 'Linked List Length', icon: '📏' },
          ].map((use, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-2xl mb-2">{use.icon}</p>
              <p className="text-gray-300">{use.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide7FastSlow;
```


## Slide8_Palindrome.jsx

```jsx
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide8Palindrome = () => {
  const testCases = ['racecar', 'hello', 'madam', 'world'];
  const [activeCase, setActiveCase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase((a) => (a + 1) % testCases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentStr = testCases[activeCase];
  const isPalindrome = currentStr === [...currentStr].reverse().join('');

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12"
        >
          Use Case: Palindrome Check
        </motion.h2>

        {/* Current Test Case */}
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900 rounded-lg p-8 mb-12 border-2 border-blue-500"
        >
          <p className="text-gray-400 mb-4">String:</p>
          <motion.div className="flex gap-3 justify-center items-center mb-8">
            {currentStr.split('').map((char, i) => {
              const isPointer = i === 0 || i === currentStr.length - 1;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  animate={{ scale: isPointer ? 1.2 : 1 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${
                      isPointer ? 'bg-blue-500' : 'bg-gray-700'
                    }`}
                    animate={{
                      boxShadow: isPointer
                        ? '0 0 15px rgba(59, 130, 246, 0.8)'
                        : 'none',
                    }}
                  >
                    {char}
                  </motion.div>
                  {i === 0 && (
                    <span className="text-blue-400 text-xs mt-2 font-bold">
                      L
                    </span>
                  )}
                  {i === currentStr.length - 1 && (
                    <span className="text-blue-400 text-xs mt-2 font-bold">
                      R
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Result */}
          <motion.div
            className="text-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {isPalindrome ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-3"
              >
                <Check className="w-8 h-8 text-green-400" />
                <p className="text-3xl font-bold text-green-400">
                  IS PALINDROME!
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-3"
              >
                <X className="w-8 h-8 text-red-400" />
                <p className="text-3xl font-bold text-red-400">
                  NOT PALINDROME
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Algorithm Steps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-4"
        >
          <h3 className="text-2xl text-gray-300 font-bold mb-6">Algorithm</h3>
          {[
            'Compare str[left] == str[right]',
            'If not equal → Not palindrome',
            'Move left++, right--',
            'Continue until left >= right',
          ].map((step, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
            >
              <p className="text-gray-200 text-lg">
                <span className="text-blue-400 font-bold">{i + 1}. </span>
                {step}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide8Palindrome;
```


## Slide9_Container.jsx

```jsx
import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide9Container = () => {
  const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  const [highlightLeft, setHighlightLeft] = useState(0);
  const [highlightRight, setHighlightRight] = useState(heights.length - 1);
  const [water, setWater] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const steps = [
      { l: 0, r: 11, w: 0 },
      { l: 1, r: 11, w: 1 },
      { l: 2, r: 10, w: 3 },
      { l: 3, r: 9, w: 2 },
      { l: 4, r: 8, w: 3 },
    ];
    setHighlightLeft(steps[step].l);
    setHighlightRight(steps[step].r);
    setWater(steps[step].w);
  }, [step]);

  const maxHeight = Math.max(...heights);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Droplet className="w-10 h-10 text-cyan-400" />
          <h2 className="text-5xl font-bold text-white">
            Container With Most Water
          </h2>
        </motion.div>

        {/* Problem Description */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-cyan-900 bg-opacity-30 rounded-lg p-6 border border-cyan-500 mb-12"
        >
          <p className="text-gray-200 text-lg">
            Find two lines that form a container with the maximum area
          </p>
        </motion.div>

        {/* Visualization */}
        <div className="bg-gray-950 rounded-lg p-8 mb-12">
          <motion.div className="flex items-end justify-center gap-1 h-64 mb-8">
            {heights.map((h, i) => {
              const isPointer = i === highlightLeft || i === highlightRight;
              const waterLevel = Math.min(
                heights[highlightLeft],
                heights[highlightRight]
              );

              return (
                <motion.div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-end relative"
                  animate={{ scale: isPointer ? 1.1 : 1 }}
                >
                  {/* Water fill */}
                  {i > highlightLeft &&
                    i < highlightRight &&
                    waterLevel > 0 && (
                      <motion.div
                        className="absolute bottom-0 w-full bg-cyan-500 bg-opacity-40 border-t border-cyan-400"
                        initial={{ height: 0 }}
                        animate={{ height: `${(waterLevel / maxHeight) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                  {/* Bar */}
                  <motion.div
                    className={`w-full rounded-t-md ${
                      isPointer ? 'bg-blue-400' : 'bg-gray-600'
                    }`}
                    style={{
                      height: `${(h / maxHeight) * 100}%`,
                      minHeight: h > 0 ? '20px' : '0px',
                    }}
                    animate={{
                      boxShadow: isPointer
                        ? '0 0 15px rgba(59, 130, 246, 0.8)'
                        : 'none',
                    }}
                  />

                  {isPointer && (
                    <motion.span
                      className="text-blue-400 text-xs mt-2 font-bold"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {i === highlightLeft ? 'L' : 'R'}
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Status */}
          <motion.div
            className="text-center space-y-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <p className="text-2xl font-bold text-cyan-400">
              Water Trapped: {water} units
            </p>
            <p className="text-gray-400">
              Area = min({heights[highlightLeft]}, {heights[highlightRight]}) ×
              width
            </p>
          </motion.div>
        </div>

        {/* Complexity */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 gap-6"
        >
          <div className="bg-red-900 bg-opacity-30 rounded-lg p-6 border border-red-500">
            <h4 className="text-lg text-red-300 font-bold mb-2">Brute Force</h4>
            <p className="text-2xl font-bold text-red-400">O(n²)</p>
          </div>
          <div className="bg-green-900 bg-opacity-30 rounded-lg p-6 border border-green-500">
            <h4 className="text-lg text-green-300 font-bold mb-2">
              Two Pointer
            </h4>
            <p className="text-2xl font-bold text-green-400">O(n)</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide9Container;
```


## Slide10_RemovedDuplicates.jsx

```jsx
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Slide10RemovedDuplicates = () => {
  const array = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [result, setResult] = useState([0]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        const next = s + 1;
        if (next >= 6) return 0;

        const steps = [
          { l: 0, r: 0, res: [0] },
          { l: 1, r: 1, res: [0] },
          { l: 2, r: 2, res: [0, 1] },
          { l: 3, r: 3, res: [0, 1] },
          { l: 4, r: 4, res: [0, 1, 2] },
          { l: 5, r: 5, res: [0, 1, 2, 3] },
        ];

        setLeft(steps[next].l);
        setRight(steps[next].r);
        setResult(steps[next].res);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Trash2 className="w-10 h-10 text-orange-400" />
          <h2 className="text-5xl font-bold text-white">
            Remove Duplicates (In-place)
          </h2>
        </motion.div>

        {/* Problem */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-orange-900 bg-opacity-30 rounded-lg p-6 border border-orange-500 mb-12"
        >
          <p className="text-gray-200 text-lg">
            Modify array in-place to remove duplicates with O(1) space
          </p>
        </motion.div>

        {/* Input Array */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h3 className="text-gray-300 text-lg mb-6">Input Array (has duplicates)</h3>
          <motion.div className="flex gap-2 flex-wrap mb-8">
            {array.map((num, i) => {
              const isWrite = i === left;
              const isRead = i === right;

              return (
                <motion.div
                  key={i}
                  className="flex flex-col items-center"
                  animate={{ scale: isWrite || isRead ? 1.2 : 1 }}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold ${
                      isWrite
                        ? 'bg-green-500'
                        : isRead
                          ? 'bg-blue-500'
                          : 'bg-gray-700'
                    }`}
                    animate={{
                      boxShadow:
                        isWrite || isRead
                          ? '0 0 15px rgba(59, 130, 246, 0.8)'
                          : 'none',
                    }}
                  >
                    {num}
                  </motion.div>
                  {isWrite && (
                    <span className="text-green-400 text-xs mt-2 font-bold">
                      WRITE
                    </span>
                  )}
                  {isRead && (
                    <span className="text-blue-400 text-xs mt-2 font-bold">
                      READ
                    </span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Result */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-green-900 bg-opacity-30 rounded-lg p-8 border border-green-500"
        >
          <h3 className="text-green-300 text-lg mb-6">Output (duplicates removed)</h3>
          <motion.div className="flex gap-2 flex-wrap">
            {result.map((num, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold bg-green-500"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(34, 197, 94, 0)',
                      '0 0 20px rgba(34, 197, 94, 0.8)',
                      '0 0 0px rgba(34, 197, 94, 0)',
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {num}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-green-300 text-lg mt-6">
            ✓ Length: {result.length} | Space: O(1)
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide10RemovedDuplicates;
```


## Slide11_Variations.jsx

```jsx
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

const Slide11Variations = () => {
  const variations = [
    {
      title: 'Opposite Direction',
      desc: 'Left and right moving toward each other',
      icon: '↔️',
      color: 'from-blue-500 to-purple-500',
      examples: ['Two Sum', 'Container Max Water', 'Palindrome'],
    },
    {
      title: 'Same Direction',
      desc: 'Both pointers moving right (sliding window)',
      icon: '→→',
      color: 'from-cyan-500 to-blue-500',
      examples: ['Longest Substring', 'Min Window', 'Consecutive Ones'],
    },
    {
      title: 'Fast & Slow',
      desc: 'Different speeds on linked lists',
      icon: '🐢⚡',
      color: 'from-yellow-500 to-red-500',
      examples: ['Cycle Detection', 'Find Middle', 'Palindrome LL'],
    },
    {
      title: 'Multiple Arrays',
      desc: 'Pointers on different sorted arrays',
      icon: '📚',
      color: 'from-green-500 to-emerald-500',
      examples: ['Merge Sorted', 'Intersection', 'Union'],
    },
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="w-11/12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <GitBranch className="w-10 h-10 text-pink-400" />
          <h2 className="text-5xl font-bold text-white">Variations & Patterns</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {variations.map((variant, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`bg-gradient-to-br ${variant.color} bg-opacity-10 rounded-lg p-6 border border-opacity-30 border-white cursor-pointer group`}
            >
              {/* Icon */}
              <motion.p
                className="text-5xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {variant.icon}
              </motion.p>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {variant.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 mb-4 text-sm">{variant.desc}</p>

              {/* Examples */}
              <div className="space-y-2">
                {variant.examples.map((example, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 + j * 0.05 }}
                    className="flex items-center gap-2 text-gray-200 text-sm group-hover:text-white transition"
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-white"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {example}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11Variations;
```


## Slide12_Conclusion.jsx

```jsx
import { motion } from 'framer-motion';
import { Star, Award, Zap } from 'lucide-react';

const Slide12Conclusion = () => {
  const keyPoints = [
    'Sorted arrays enable efficient pointer movement',
    'Single-pass O(n) solution vs brute force O(n²)',
    'Applicable to many DSA problems',
    'Interview favorite pattern',
    'Versatile: arrays, linked lists, strings',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      <div className="w-11/12 max-w-5xl">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-center text-white mb-4"
        >
          Master the Two Pointer
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl text-center text-gray-400 mb-16"
        >
          A timeless technique for efficient algorithms
        </motion.p>

        {/* Key Points */}
        <motion.div
          className="space-y-4 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {keyPoints.map((point, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-gray-800 rounded-lg p-5 border-l-4 border-blue-500 flex items-center gap-4 group hover:bg-gray-700 transition"
            >
              <motion.div
                className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              >
                <span className="text-white font-bold text-sm">{i + 1}</span>
              </motion.div>
              <p className="text-gray-200 text-lg group-hover:text-white transition">
                {point}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: Award, value: '50+', label: 'LeetCode Problems' },
            { icon: Zap, value: 'O(n)', label: 'Time Complexity' },
            { icon: Star, value: '⭐⭐⭐', label: 'Interview Importance' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-6 text-center border border-blue-500 border-opacity-50"
                whileHover={{ scale: 1.1, y: -10 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <Icon className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                </motion.div>
                <p className="text-2xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0px rgba(59, 130, 246, 0)',
                '0 0 40px rgba(59, 130, 246, 0.8)',
                '0 0 0px rgba(59, 130, 246, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block bg-blue-600 hover:bg-blue-500 transition rounded-lg px-12 py-4 mb-8"
          >
            <p className="text-white text-2xl font-bold">
              Practice & Master Today
            </p>
          </motion.div>

          <p className="text-gray-400 text-xl">
            Thank you! 🚀
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide12Conclusion;
```


***

**All 12 slides are now ready to use!** Copy each slide code into its respective file and you'll have a complete, cinematic Two Pointer presentation deck. 🎬✨

