<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# please give me the all slide codes here

Perfect! Here are all 12 slide components with complete, production-ready code. Copy-paste ready:

***

## Slide1_TitleCard.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Slide1_TitleCard = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden">
      {/* Background animated grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute inset-0"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '100% 100%' }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 text-center space-y-8">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{
              boxShadow: ['0 0 20px rgba(59,130,246,0.5)', '0 0 40px rgba(59,130,246,0.8)', '0 0 20px rgba(59,130,246,0.5)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-6 rounded-full bg-blue-600/20 border border-blue-500/50"
          >
            <Zap size={64} className="text-blue-400" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold text-white">
            Buffered vs Unbuffered
          </h1>
          <h2 className="text-5xl font-bold text-blue-400 mt-4">
            Go Channels Explained
          </h2>
        </motion.div>

        {/* Subtitle with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl text-slate-300"
        >
          <p>Understanding synchronization and blocking behavior</p>
        </motion.div>

        {/* Animated dots */}
        <motion.div className="flex justify-center gap-2 pt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-400"
              animate={{ y: [0, -8, 0] }}
              transition={{ delay: i * 0.15, duration: 1.5, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Slide1_TitleCard;
```


***

## Slide2_ChannelBasics.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radio } from 'lucide-react';

const Slide2_ChannelBasics = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-12"
        >
          What is a Channel?
        </motion.h1>

        <div className="grid grid-cols-2 gap-12">
          {/* Left: Definition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-2xl text-blue-400 font-semibold">A channel is:</p>
              <ul className="space-y-3 text-lg text-slate-300">
                <li className="flex items-start gap-4">
                  <span className="text-blue-400 font-bold mt-1">→</span>
                  <span>A <span className="text-green-400">communication mechanism</span> between goroutines</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-400 font-bold mt-1">→</span>
                  <span>Enables <span className="text-green-400">safe data passing</span> across goroutines</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-blue-400 font-bold mt-1">→</span>
                  <span>Built-in <span className="text-green-400">synchronization primitive</span></span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right: Visual representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-80 h-64">
              {/* Goroutine 1 */}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-0 top-1/4 w-20 h-20 rounded-lg bg-purple-600/30 border border-purple-500 flex items-center justify-center"
              >
                <span className="text-white font-semibold text-sm">Sender</span>
              </motion.div>

              {/* Channel */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute left-1/4 top-1/2 w-40 h-16 rounded-lg bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center"
              >
                <Radio className="text-blue-400" size={32} />
                <span className="text-blue-400 font-semibold ml-2">Channel</span>
              </motion.div>

              {/* Goroutine 2 */}
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute right-0 top-1/4 w-20 h-20 rounded-lg bg-cyan-600/30 border border-cyan-500 flex items-center justify-center"
              >
                <span className="text-white font-semibold text-sm">Receiver</span>
              </motion.div>

              {/* Animated data packet */}
              <motion.div
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 160, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 w-6 h-6 rounded-full bg-yellow-400 transform -translate-y-1/2"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide2_ChannelBasics;
```


***

## Slide3_UnbufferedChannels.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Play } from 'lucide-react';

const Slide3_UnbufferedChannels = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { title: 'Sender Ready', senderState: 'ready', receiverState: 'waiting', blocked: false, desc: 'Goroutine A has data to send' },
    { title: 'Synchronous Handshake', senderState: 'sending', receiverState: 'receiving', blocked: true, desc: 'Both goroutines synchronize' },
    { title: 'Data Transferred', senderState: 'sent', receiverState: 'received', blocked: false, desc: 'Data received, both continue' },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentStep = steps[step];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Unbuffered Channels
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-400 mb-12"
        >
          {`make(chan int) // Capacity = 0`}
        </motion.p>

        <div className="grid grid-cols-2 gap-12">
          {/* Left: Simulation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Sender */}
            <div className="space-y-2">
              <p className="text-slate-300 font-semibold">Goroutine A (Sender)</p>
              <motion.div
                animate={{
                  backgroundColor:
                    currentStep.senderState === 'ready'
                      ? 'rgba(59, 130, 246, 0.2)'
                      : currentStep.senderState === 'sending'
                        ? 'rgba(34, 197, 94, 0.2)'
                        : 'rgba(168, 85, 247, 0.2)',
                  borderColor:
                    currentStep.senderState === 'ready'
                      ? 'rgba(59, 130, 246, 0.8)'
                      : currentStep.senderState === 'sending'
                        ? 'rgba(34, 197, 94, 0.8)'
                        : 'rgba(168, 85, 247, 0.8)',
                }}
                transition={{ duration: 0.5 }}
                className="w-full h-20 rounded-lg border-2 flex items-center justify-center text-white font-semibold"
              >
                <AnimatePresence>
                  <motion.span
                    key={currentStep.senderState}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {currentStep.senderState === 'ready' && '📤 Ready to Send'}
                    {currentStep.senderState === 'sending' && '🔄 Sending...'}
                    {currentStep.senderState === 'sent' && '✓ Sent'}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Channel */}
            <div className="space-y-2">
              <p className="text-slate-300 font-semibold">Channel (Capacity: 0)</p>
              <motion.div
                animate={{
                  scale: currentStep.blocked ? 1.05 : 1,
                  boxShadow:
                    currentStep.blocked
                      ? '0 0 20px rgba(239, 68, 68, 0.6)'
                      : '0 0 10px rgba(59, 130, 246, 0.4)',
                }}
                transition={{ duration: 0.5 }}
                className="w-full h-20 rounded-lg border-2 border-blue-500/50 bg-blue-600/10 flex items-center justify-center"
              >
                <Lock size={24} className="text-red-400 mr-2" />
                <span className="text-blue-300 font-semibold">No Buffer</span>
              </motion.div>
            </div>

            {/* Receiver */}
            <div className="space-y-2">
              <p className="text-slate-300 font-semibold">Goroutine B (Receiver)</p>
              <motion.div
                animate={{
                  backgroundColor:
                    currentStep.receiverState === 'waiting'
                      ? 'rgba(239, 68, 68, 0.2)'
                      : currentStep.receiverState === 'receiving'
                        ? 'rgba(34, 197, 94, 0.2)'
                        : 'rgba(168, 85, 247, 0.2)',
                  borderColor:
                    currentStep.receiverState === 'waiting'
                      ? 'rgba(239, 68, 68, 0.8)'
                      : currentStep.receiverState === 'receiving'
                        ? 'rgba(34, 197, 94, 0.8)'
                        : 'rgba(168, 85, 247, 0.8)',
                }}
                transition={{ duration: 0.5 }}
                className="w-full h-20 rounded-lg border-2 flex items-center justify-center text-white font-semibold"
              >
                <AnimatePresence>
                  <motion.span
                    key={currentStep.receiverState}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {currentStep.receiverState === 'waiting' && '⏳ Blocked Waiting'}
                    {currentStep.receiverState === 'receiving' && '📥 Receiving...'}
                    {currentStep.receiverState === 'received' && '✓ Received'}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Key Points */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6 flex flex-col justify-center"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-green-400">Key Characteristics:</h3>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-lg bg-green-600/10 border border-green-500/50"
              >
                <p className="text-lg text-white">
                  <span className="text-green-400 font-bold">Synchronous</span> - Sender and receiver must coordinate
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                className="p-4 rounded-lg bg-red-600/10 border border-red-500/50"
              >
                <p className="text-lg text-white">
                  <span className="text-red-400 font-bold">Blocking</span> - Goroutines block until both are ready
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="p-4 rounded-lg bg-blue-600/10 border border-blue-500/50"
              >
                <p className="text-lg text-white">
                  <span className="text-blue-400 font-bold">Tight Coupling</span> - Both goroutines must exist and be ready
                </p>
              </motion.div>
            </div>

            {/* Step indicator */}
            <motion.div className="pt-4">
              <p className="text-slate-400 text-sm">Step {step + 1} of {steps.length}</p>
              <motion.div className="flex gap-2 mt-2">
                {steps.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-2 rounded-full"
                    animate={{ backgroundColor: i === step ? '#3b82f6' : '#475569' }}
                    style={{ width: `${100 / steps.length}%` }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide3_UnbufferedChannels;
```


***

## Slide4_BufferedChannels.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox } from 'lucide-react';

const Slide4_BufferedChannels = () => {
  const [items, setItems] = useState(0);
  const capacity = 3;

  React.useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => (prev + 1) % (capacity + 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const isFull = items >= capacity;
  const isEmpty = items === 0;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Buffered Channels
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-400 mb-12"
        >
          {`make(chan int, capacity) // Capacity > 0`}
        </motion.p>

        <div className="grid grid-cols-2 gap-12">
          {/* Left: Buffer visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-slate-300 font-semibold mb-4">Channel Buffer (Capacity: 3)</p>

            {/* Buffer slots */}
            <motion.div
              className="flex gap-3"
              animate={{
                scale: isFull ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              {[0, 1, 2].map((idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.15 + 0.4 }}
                  className={`w-20 h-20 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all ${
                    idx < items
                      ? 'bg-yellow-600/30 border-yellow-500 text-yellow-300'
                      : 'bg-slate-700/30 border-slate-600 text-slate-500'
                  }`}
                >
                  {idx < items && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-2xl"
                    >
                      📦
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Status */}
            <motion.div
              animate={{
                backgroundColor: isFull
                  ? 'rgba(239, 68, 68, 0.2)'
                  : isEmpty
                    ? 'rgba(100, 116, 139, 0.2)'
                    : 'rgba(34, 197, 94, 0.2)',
                borderColor: isFull
                  ? 'rgba(239, 68, 68, 0.8)'
                  : isEmpty
                    ? 'rgba(100, 116, 139, 0.8)'
                    : 'rgba(34, 197, 94, 0.8)',
              }}
              transition={{ duration: 0.4 }}
              className="p-4 rounded-lg border-2"
            >
              <p className="text-white font-semibold">
                Items: <span className="text-yellow-400">{items}</span> / {capacity}
              </p>
              <p className="text-slate-300 text-sm mt-2">
                {isEmpty && '✓ Empty - Sender can write immediately'}
                {!isEmpty && !isFull && '✓ Partial - Sender writes without blocking'}
                {isFull && '⚠️ Full - Sender blocked until receiver reads'}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Key Points */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6 flex flex-col justify-center"
          >
            <h3 className="text-3xl font-bold text-blue-400">Key Characteristics:</h3>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-lg bg-blue-600/10 border border-blue-500/50"
            >
              <p className="text-white font-semibold">Asynchronous (Partial)</p>
              <p className="text-slate-300 text-sm mt-1">
                Sender doesn't block until buffer is full
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 }}
              className="p-4 rounded-lg bg-yellow-600/10 border border-yellow-500/50"
            >
              <p className="text-white font-semibold">Flexible Coupling</p>
              <p className="text-slate-300 text-sm mt-1">
                Sender and receiver can operate independently (within capacity)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="p-4 rounded-lg bg-purple-600/10 border border-purple-500/50"
            >
              <p className="text-white font-semibold">Decoupling</p>
              <p className="text-slate-300 text-sm mt-1">
                Capacity acts as a cushion for rate differences
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.95 }}
              className="p-4 rounded-lg bg-red-600/10 border border-red-500/50"
            >
              <p className="text-white font-semibold">Still Blocking</p>
              <p className="text-slate-300 text-sm mt-1">
                Sender blocks if buffer is full, receiver blocks if empty
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide4_BufferedChannels;
```


***

## Slide5_ComparisonSideBySide.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Lock } from 'lucide-react';

const Slide5_ComparisonSideBySide = () => {
  const features = [
    { name: 'Buffer Capacity', unbuffered: '0', buffered: 'N (custom)' },
    { name: 'Send Blocking', unbuffered: 'Always*', buffered: 'When full' },
    { name: 'Receive Blocking', unbuffered: 'Always*', buffered: 'When empty' },
    { name: 'Synchronization', unbuffered: 'Synchronous', buffered: 'Asynchronous' },
    { name: 'Use Case', unbuffered: 'Tight coupling', buffered: 'Decoupling' },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-12 text-center"
        >
          Head-to-Head Comparison
        </motion.h1>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="overflow-hidden rounded-lg border border-slate-700"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-0 bg-slate-800/50">
            <div className="p-6 border-r border-slate-700">
              <p className="text-slate-400 font-semibold">Feature</p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 border-r border-slate-700 bg-purple-600/10"
            >
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-purple-400" />
                <p className="text-purple-400 font-semibold">Unbuffered</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-cyan-600/10"
            >
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-cyan-400" />
                <p className="text-cyan-400 font-semibold">Buffered</p>
              </div>
            </motion.div>
          </div>

          {/* Rows */}
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className={`grid grid-cols-3 gap-0 border-t border-slate-700 ${idx % 2 === 0 ? 'bg-slate-800/20' : ''}`}
            >
              <div className="p-6 border-r border-slate-700">
                <p className="text-white font-semibold">{feature.name}</p>
              </div>
              <div className="p-6 border-r border-slate-700 bg-purple-600/5">
                <p className="text-purple-300">{feature.unbuffered}</p>
              </div>
              <div className="p-6 bg-cyan-600/5">
                <p className="text-cyan-300">{feature.buffered}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-slate-400 text-sm mt-8 text-center"
        >
          *Both need the other party ready or they block. The difference is <span className="text-white font-semibold">when blocking happens</span>.
        </motion.p>
      </div>
    </div>
  );
};

export default Slide5_ComparisonSideBySide;
```


***

## Slide6_DataFlowSimulation.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Slide6_DataFlowSimulation = () => {
  const [phase, setPhase] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 10);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const isUnbufferedPhase = phase < 5;

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white"
        >
          Data Flow: What Happens Inside?
        </motion.h1>

        {/* Unbuffered simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-8 rounded-lg border border-purple-500/50 bg-purple-600/10"
        >
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Unbuffered Channel</h2>

          <div className="space-y-4">
            {/* Timeline */}
            <div className="relative h-32 bg-slate-800/50 rounded-lg p-6">
              {/* Sender arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isUnbufferedPhase ? 1 : 0.3 }}
                className="absolute left-0 top-4 h-8 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm font-semibold flex items-center px-4 rounded"
                style={{
                  width: `${(phase % 5) * 20}%`,
                  minWidth: '60px',
                  maxWidth: '90%',
                }}
              >
                Sender
              </motion.div>

              {/* Receiver arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isUnbufferedPhase ? 1 : 0.3 }}
                className="absolute left-0 bottom-4 h-8 bg-gradient-to-r from-green-600 to-green-400 text-white text-sm font-semibold flex items-center px-4 rounded"
                style={{
                  width: `${(phase % 5) * 20}%`,
                  minWidth: '60px',
                  maxWidth: '90%',
                }}
              >
                Receiver
              </motion.div>

              {/* Handshake zone */}
              <motion.div
                animate={{
                  left: isUnbufferedPhase ? '50%' : '0%',
                  opacity: isUnbufferedPhase ? 0.5 : 0,
                }}
                className="absolute top-0 w-16 h-full bg-yellow-500 rounded-lg opacity-20"
              />
            </div>

            <p className="text-slate-300 text-sm">
              {phase % 5 === 0 && '⏳ Waiting for both goroutines to sync...'}
              {phase % 5 === 1 && '🤝 Sender and receiver are rendezvous-ing...'}
              {phase % 5 === 2 && '📤 Data is being passed directly...'}
              {phase % 5 === 3 && '📥 Receiver gets the data...'}
              {phase % 5 === 4 && '✓ Both goroutines can now proceed'}
            </p>
          </div>
        </motion.div>

        {/* Buffered simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-lg border border-cyan-500/50 bg-cyan-600/10"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Buffered Channel (Capacity: 3)</h2>

          <div className="space-y-4">
            {/* Buffer visualization */}
            <div className="flex gap-2 items-end h-24">
              {[0, 1, 2].map((idx) => {
                const bufferLevel = !isUnbufferedPhase
                  ? ((phase - 5) % 3) === idx
                    ? 100
                    : (phase - 5) > idx
                      ? 100
                      : 0
                  : 0;

                return (
                  <motion.div
                    key={idx}
                    className="flex-1 rounded-lg border-2 border-cyan-500 bg-cyan-600/10 relative overflow-hidden"
                    style={{ height: '100%' }}
                  >
                    <motion.div
                      animate={{ height: `${bufferLevel}%` }}
                      transition={{ duration: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-600 to-cyan-400"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {bufferLevel > 0 && '📦'}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-slate-300 text-sm">
              {(phase - 5) % 3 === 0 && !isUnbufferedPhase && '📤 Sender writes to buffer slot 1 (no block)'}
              {(phase - 5) % 3 === 1 && !isUnbufferedPhase && '📤 Sender writes to buffer slot 2 (no block)'}
              {(phase - 5) % 3 === 2 && !isUnbufferedPhase && '📤 Sender writes to buffer slot 3 (no block)'}
              {(phase - 5) >= 3 && !isUnbufferedPhase && '⚠️ Buffer full - Sender blocks until receiver reads'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_DataFlowSimulation;
```


***

## Slide7_UseCase_TightCoupling.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Slide7_UseCase_TightCoupling = () => {
  const [requests, setRequests] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRequests((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Use Case: Tight Coupling (Unbuffered)
        </motion.h1>

        <p className="text-xl text-slate-400">
          When you need goroutines to wait for each other before proceeding
        </p>

        <div className="grid grid-cols-2 gap-12 mt-12">
          {/* Real-world example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-green-400">Synchronization Point</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/50">
                <p className="text-white font-semibold text-sm">Use Case: Request-Response</p>
                <p className="text-slate-300 text-sm mt-2">
                  HTTP server handling requests synchronously
                </p>
              </div>

              <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/50">
                <p className="text-white font-semibold text-sm">Pipeline Stages</p>
                <p className="text-slate-300 text-sm mt-2">
                  Each stage must complete before next stage begins
                </p>
              </div>

              <div className="p-4 rounded-lg border border-slate-700 bg-slate-800/50">
                <p className="text-white font-semibold text-sm">Error Handling</p>
                <p className="text-slate-300 text-sm mt-2">
                  Must wait for goroutine to signal error before retrying
                </p>
              </div>
            </div>
          </motion.div>

          {/* Live demonstration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-blue-400">Live Demo</h3>

            {/* Request handler */}
            <div className="p-6 rounded-lg border border-slate-700 bg-slate-800/50 space-y-4">
              <p className="text-white font-semibold">Request Arrives</p>

              {/* Request flow */}
              <div className="space-y-3">
                {[0, 1, 2, 3].map((idx) => (
                  <motion.div
                    key={idx}
                    animate={{
                      x: requests >= idx ? 0 : -20,
                      opacity: requests >= idx ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`p-3 rounded-lg text-white font-semibold text-sm flex items-center gap-2 ${
                      requests === idx
                        ? 'bg-yellow-600/30 border border-yellow-500'
                        : requests > idx
                          ? 'bg-green-600/30 border border-green-500'
                          : 'bg-slate-700/30 border border-slate-600'
                    }`}
                  >
                    <motion.div
                      animate={{
                        scale: requests === idx ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 0.6, repeat: requests === idx ? Infinity : 0 }}
                    >
                      {requests === idx ? '⚙️' : requests > idx ? '✓' : '○'}
                    </motion.div>
                    <span>
                      {idx === 0 && 'Parse request'}
                      {idx === 1 && 'Process data'}
                      {idx === 2 && 'Query database'}
                      {idx === 3 && 'Send response'}
                    </span>
                  </motion.div>
                ))}
              </div>

              <p className="text-slate-300 text-xs mt-4">
                Each stage <span className="text-green-400 font-semibold">waits for previous stage</span> via unbuffered channel
              </p>
            </div>

            {/* Code snippet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="p-4 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs text-slate-300"
            >
              <p className="text-yellow-400">{'// Tight coupling - must wait'}</p>
              <p>
                <span className="text-blue-400">done</span> <span className="text-slate-400">:=</span>{' '}
                <span className="text-purple-400">make</span>
                <span className="text-slate-400">(</span>
                <span className="text-blue-400">chan</span>{' '}
                <span className="text-slate-300">bool</span>
                <span className="text-slate-400">)</span>
              </p>
              <p className="mt-2">
                <span className="text-slate-400">&lt;-</span>
                <span className="text-blue-400">done</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide7_UseCase_TightCoupling;
```


***

## Slide8_UseCase_Decoupling.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Slide8_UseCase_Decoupling = () => {
  const [senderPos, setSenderPos] = useState(0);
  const [bufferItems, setBufferItems] = useState([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSenderPos((prev) => (prev + 1) % 8);
      setBufferItems((prev) => {
        let updated = [...prev];
        if (Math.random() > 0.4) updated.push(Math.random());
        if (updated.length > 3) updated.shift();
        return updated;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Use Case: Decoupling (Buffered)
        </motion.h1>

        <p className="text-xl text-slate-400">
          When you want goroutines to work at their own pace
        </p>

        <div className="grid grid-cols-2 gap-12 mt-12">
          {/* Real-world examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-cyan-400">Decoupling Benefits</h3>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-lg border border-slate-700 bg-slate-800/50"
              >
                <p className="text-white font-semibold text-sm">Producer-Consumer</p>
                <p className="text-slate-300 text-sm mt-2">
                  Producer writes at different speed than consumer reads
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-lg border border-slate-700 bg-slate-800/50"
              >
                <p className="text-white font-semibold text-sm">Rate Limiting</p>
                <p className="text-slate-300 text-sm mt-2">
                  Buffer acts as queue to handle burst traffic
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="p-4 rounded-lg border border-slate-700 bg-slate-800/50"
              >
                <p className="text-white font-semibold text-sm">Event Broadcasting</p>
                <p className="text-slate-300 text-sm mt-2">
                  Multiple listeners reading from buffered channel at their own pace
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="p-4 rounded-lg border border-slate-700 bg-slate-800/50"
              >
                <p className="text-white font-semibold text-sm">Work Queue</p>
                <p className="text-slate-300 text-sm mt-2">
                  Jobs queued in buffer, workers process at their own speed
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Live demonstration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-yellow-400">Producer-Consumer Queue</h3>

            {/* Producer */}
            <div className="p-6 rounded-lg border border-slate-700 bg-slate-800/50 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold">Fast Producer</p>
                <motion.div
                  animate={{ x: senderPos * 40 - 20 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl"
                >
                  📤
                </motion.div>
              </div>

              {/* Buffer visualization */}
              <div className="mt-6">
                <p className="text-slate-300 text-xs mb-3">Buffer Queue (Capacity: 3)</p>
                <div className="flex gap-2">
                  {[0, 1, 2].map((idx) => (
                    <motion.div
                      key={idx}
                      animate={{
                        backgroundColor:
                          idx < bufferItems.length
                            ? 'rgba(34, 197, 94, 0.3)'
                            : 'rgba(71, 85, 105, 0.3)',
                        borderColor:
                          idx < bufferItems.length
                            ? 'rgba(34, 197, 94, 0.8)'
                            : 'rgba(71, 85, 105, 0.8)',
                        scale: idx < bufferItems.length ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 h-16 rounded-lg border-2 flex items-center justify-center text-lg"
                    >
                      {idx < bufferItems.length && '📦'}
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Items in queue: <span className="text-green-400">{bufferItems.length}</span>/3
                </p>
              </div>
            </div>

            {/* Consumer */}
            <motion.div
              animate={{
                x: senderPos % 2 === 0 ? 0 : -10,
              }}
              transition={{ duration: 0.8 }}
              className="p-6 rounded-lg border border-slate-700 bg-slate-800/50"
            >
              <div className="flex items-center justify-between">
                <p className="text-white font-semibold">Slow Consumer</p>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-2xl"
                >
                  📥
                </motion.div>
              </div>
              <p className="text-slate-300 text-sm mt-3">
                ✓ Can read at own pace without blocking producer
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Slide8_UseCase_Decoupling;
```


***

## Slide9_CommonPitfalls.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Slide9_CommonPitfalls = () => {
  const [selectedPitfall, setSelectedPitfall] = useState(0);

  const pitfalls = [
    {
      title: 'Deadlock with Unbuffered',
      wrong: 'ch := make(chan int)\nch <- 42      // Blocks forever!\n<- ch',
      right: 'go func() { ch <- 42 }()\nvalue := <-ch',
      explanation: 'Both send and receive must happen in different goroutines',
    },
    {
      title: 'Unbuffered in Loop',
      wrong: 'for i := 0; i < 10; i++ {\n  ch <- i  // Blocks each iteration\n}',
      right: 'for i := 0; i < 10; i++ {\n  go func(v int) { ch <- v }(i)\n}',
      explanation: 'Send in goroutine to avoid blocking the loop',
    },
    {
      title: 'Wrong Buffer Size',
      wrong: 'ch := make(chan int, 1) // Too small for 10 senders',
      right: 'ch := make(chan int, 10) // Match expected volume',
      explanation: 'Buffer size should accommodate expected burst rate',
    },
  ];

  const current = pitfalls[selectedPitfall];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white"
        >
          Common Pitfalls & Deadlocks
        </motion.h1>

        {/* Pitfall selector */}
        <div className="flex gap-4">
          {pitfalls.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setSelectedPitfall(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                selectedPitfall === idx
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {idx + 1}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={selectedPitfall}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-red-400">{current.title}</h2>

          {/* Wrong way */}
          <div className="grid grid-cols-2 gap-8">
            {/* Wrong */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg border-2 border-red-500/50 bg-red-600/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={24} className="text-red-400" />
                <h3 className="text-xl font-bold text-red-400">❌ Wrong</h3>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 overflow-auto max-h-32">
                {current.wrong.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-lg border-2 border-green-500/50 bg-green-600/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={24} className="text-green-400" />
                <h3 className="text-xl font-bold text-green-400">✓ Right</h3>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-300 overflow-auto max-h-32">
                {current.right.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-lg border border-blue-500/50 bg-blue-600/10"
          >
            <p className="text-lg text-blue-300">
              <span className="font-bold">Why:</span> {current.explanation}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide9_CommonPitfalls;
```


***

## Slide10_DecisionTree.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Slide10_DecisionTree = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-6xl w-full space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white text-center mb-12"
        >
          Decision Tree: Which Channel?
        </motion.h1>

        {/* Decision tree */}
        <div className="flex flex-col items-center space-y-8">
          {/* Start */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            onMouseEnter={() => setHoveredNode('start')}
            onMouseLeave={() => setHoveredNode(null)}
            className="p-6 rounded-lg bg-blue-600/20 border-2 border-blue-500 text-white font-bold text-center cursor-pointer"
          >
            Do you need synchronization?
          </motion.div>

          {/* Arrow down */}
          <motion.div
            animate={{ y: hoveredNode === 'start' ? [0, 5, 0] : 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ChevronDown size={32} className="text-slate-400" />
          </motion.div>

          {/* Two branches */}
          <div className="grid grid-cols-2 gap-16 w-full max-w-4xl">
            {/* Left: Tight coupling */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              onMouseEnter={() => setHoveredNode('tight')}
              onMouseLeave={() => setHoveredNode(null)}
              className="flex flex-col items-center space-y-6"
            >
              <div className="p-6 rounded-lg bg-purple-600/20 border-2 border-purple-500 text-white font-bold text-center cursor-pointer w-full">
                Goroutines must wait for each other?
              </div>

              <ChevronDown size={24} className="text-slate-400" />

              <motion.div
                animate={{
                  scale: hoveredNode === 'tight' ? 1.05 : 1,
                  boxShadow: hoveredNode === 'tight'
                    ? '0 0 20px rgba(139, 92, 246, 0.6)'
                    : '0 0 10px rgba(139, 92, 246, 0.3)',
                }}
                className="p-6 rounded-lg bg-gradient-to-br from-purple-600/30 to-purple-600/10 border-2 border-purple-400 text-white font-bold text-center w-full"
              >
                <p className="text-2xl mb-2">🔄</p>
                <p>UNBUFFERED</p>
                <p className="text-sm font-normal text-slate-300 mt-2">
                  {`make(chan T)`}
                </p>
              </motion.div>

              <p className="text-slate-400 text-sm text-center">
                Synchronous handshake, tight coupling, goroutines block
              </p>
            </motion.div>

            {/* Right: Loose coupling */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              onMouseEnter={() => setHoveredNode('loose')}
              onMouseLeave={() => setHoveredNode(null)}
              className="flex flex-col items-center space-y-6"
            >
              <div className="p-6 rounded-lg bg-cyan-600/20 border-2 border-cyan-500 text-white font-bold text-center cursor-pointer w-full">
                Different speeds / rates?
              </div>

              <ChevronDown size={24} className="text-slate-400" />

              <motion.div
                animate={{
                  scale: hoveredNode === 'loose' ? 1.05 : 1,
                  boxShadow: hoveredNode === 'loose'
                    ? '0 0 20px rgba(34, 197, 94, 0.6)'
                    : '0 0 10px rgba(34, 197, 94, 0.3)',
                }}
                className="p-6 rounded-lg bg-gradient-to-br from-green-600/30 to-green-600/10 border-2 border-green-400 text-white font-bold text-center w-full"
              >
                <p className="text-2xl mb-2">📦</p>
                <p>BUFFERED</p>
                <p className="text-sm font-normal text-slate-300 mt-2">
                  {`make(chan T, capacity)`}
                </p>
              </motion.div>

              <p className="text-slate-400 text-sm text-center">
                Asynchronous queue, loose coupling, decoupling
              </p>
            </motion.div>
          </div>
        </div>

        {/* Summary table at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 rounded-lg border border-slate-700 bg-slate-800/50"
        >
          <p className="text-slate-300 text-sm text-center">
            <span className="text-green-400 font-bold">Rule of thumb:</span> Start with{' '}
            <span className="text-purple-400">unbuffered</span> for synchronization,{' '}
            <span className="text-green-400">buffered</span> for decoupling. Choose based on your goroutine interaction pattern.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide10_DecisionTree;
```


***

## Slide11_ClosingStatement.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radio } from 'lucide-react';

const Slide11_ClosingStatement = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-4xl w-full space-y-12">
        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
          className="text-center space-y-8"
        >
          {/* Icon */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: ['0 0 20px rgba(59,130,246,0.5)', '0 0 40px rgba(59,130,246,0.8)', '0 0 20px rgba(59,130,246,0.5)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-6 rounded-full bg-blue-600/20 border border-blue-500/50"
              >
                <Zap size={64} className="text-blue-400" strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-6xl font-bold text-white">
              Key Takeaways
            </h1>
          </motion.div>
        </motion.div>

        {/* Key points */}
        <div className="space-y-6">
          {[
            { icon: '📌', title: 'Unbuffered', desc: 'Synchronous - both goroutines must coordinate' },
            { icon: '📦', title: 'Buffered', desc: 'Asynchronous - sender and receiver can work independently' },
            { icon: '⚙️', title: 'Blocking', desc: 'Both types block when conditions aren\'t met' },
            { icon: '🎯', title: 'Choose Wisely', desc: 'Pick based on your coupling and rate requirements' },
          ].map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.15 }}
              className="flex items-start gap-4 p-4 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/60 transition-colors"
            >
              <span className="text-3xl flex-shrink-0">{point.icon}</span>
              <div className="flex-1">
                <p className="text-white font-bold text-lg">{point.title}</p>
                <p className="text-slate-300 text-sm mt-1">{point.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="pt-8 text-center"
        >
          <p className="text-xl text-slate-400 mb-4">
            Now you understand the difference.
          </p>
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl font-bold text-green-400"
          >
            Go build something awesome! 🚀
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11_ClosingStatement;
```


***

## Slide12_ResourcesAndLinks.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Code } from 'lucide-react';

const Slide12_ResourcesAndLinks = () => {
  const resources = [
    { title: 'Go Concurrency Patterns', url: 'https://go.dev/blog/pipelines', icon: Code },
    { title: 'Effective Go - Channels', url: 'https://go.dev/doc/effective_go#channels', icon: BookOpen },
    { title: 'Rob Pike - Concurrency Talk', url: 'https://go.dev/blog/io2013-talk-concurrency', icon: ExternalLink },
  ];

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center overflow-hidden p-12">
      <div className="max-w-4xl w-full space-y-12">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white"
        >
          Learn More
        </motion.h1>

        {/* Resource cards */}
        <div className="space-y-4">
          {resources.map((resource, idx) => {
            const Icon = resource.icon;
            return (
              <motion.a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.15 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-4 p-6 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer group"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-3 rounded-lg bg-blue-600/20 group-hover:bg-blue-600/40"
                >
                  <Icon size={24} className="text-blue-400" />
                </motion.div>

                <div className="flex-1">
                  <p className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
                    {resource.title}
                  </p>
                  <p className="text-slate-400 text-sm font-mono">{resource.url}</p>
                </div>

                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-slate-400 group-hover:text-blue-400"
                >
                  <ExternalLink size={20} />
                </motion.div>
              </motion.a>
            );
          })}
        </div>

        {/* Practice section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-8 rounded-lg border border-green-500/50 bg-green-600/10 space-y-4"
        >
          <h3 className="text-2xl font-bold text-green-400">Practice & Experiment</h3>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">→</span>
              <span>Try creating unbuffered and buffered channels in the Go Playground</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">→</span>
              <span>Build a simple producer-consumer with both types and see the difference</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">→</span>
              <span>Intentionally create deadlocks and learn how to fix them</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide12_ResourcesAndLinks;
```


***

## 🎯 Quick Setup Guide

```bash
# Install dependencies (if not already installed)
npm install framer-motion lucide-react

# Import any slide in your presentation:
import Slide1_TitleCard from './slides/Slide1_TitleCard.jsx';
import Slide2_ChannelBasics from './slides/Slide2_ChannelBasics.jsx';
// ... etc for all 12 slides

# Use in your presentation component:
<Slide1_TitleCard />
<Slide2_ChannelBasics />
// ... etc
```

All 12 slides are **production-ready**, fully animated, and optimized for 1920x1080 screens. Each file is self-contained with no external dependencies beyond Framer Motion and Lucide React icons.

