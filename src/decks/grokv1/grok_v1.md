## Slide1_Title.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Code, Database } from 'lucide-react';

const Slide1_Title = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <motion.h1
        className="text-6xl font-bold mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Types of Design Patterns in System Design
      </motion.h1>
      <div className="flex space-x-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <Layout size={64} className="text-blue-400" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        >
          <Code size={64} className="text-green-400" />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Database size={64} className="text-purple-400" />
        </motion.div>
      </div>
    </div>
  );
};

export default Slide1_Title;
```

## Slide2_Overview.jsx
```jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Zap, Shield } from 'lucide-react';

const overviewItems = [
  { icon: BookOpen, text: 'Reusable solutions to common problems' },
  { icon: Zap, text: 'Enhance scalability and performance' },
  { icon: Shield, text: 'Improve reliability and security' },
];

const Slide2_Overview = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Overview of Design Patterns
      </motion.h2>
      <AnimatePresence>
        <div className="grid grid-cols-3 gap-8">
          {overviewItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.5, duration: 0.8 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <item.icon size={48} className="text-teal-400 mb-4" />
              </motion.div>
              <p className="text-center">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Slide2_Overview;
```

## Slide3_RateLimiting.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const Slide3_RateLimiting = () => {
  const [requests, setRequests] = useState(0);
  const limit = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setRequests((prev) => (prev < limit + 3 ? prev + 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Rate Limiting Pattern
      </motion.h2>
      <div className="flex items-center space-x-8">
        <div className="flex flex-col items-center">
          <p className="mb-4">Incoming Requests</p>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-8 h-8 bg-blue-500 rounded-full mb-2"
              initial={{ x: -200 }}
              animate={{ x: i < requests ? 0 : -200 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            />
          ))}
        </div>
        <motion.div
          className="flex flex-col items-center bg-gradient-to-r from-red-500 to-yellow-500 p-6 rounded-lg"
          animate={{ scale: requests > limit ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowRight size={48} className="mb-4" />
          <motion.p
            className="text-2xl"
            animate={{ text: `${requests}/${limit}` }}
          >
            {requests}/{limit}
          </motion.p>
          {requests > limit ? (
            <AlertTriangle size={48} className="text-red-300 mt-4" />
          ) : (
            <CheckCircle size={48} className="text-green-300 mt-4" />
          )}
        </motion.div>
      </div>
      <p className="mt-8 text-center">Prevents overload by limiting requests over time</p>
    </div>
  );
};

export default Slide3_RateLimiting;
```

## Slide4_CAPTheorem.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Network, Globe } from 'lucide-react';

const capElements = [
  { icon: Database, label: 'Consistency', color: 'blue' },
  { icon: Network, label: 'Availability', color: 'green' },
  { icon: Globe, label: 'Partition Tolerance', color: 'purple' },
];

const Slide4_CAPTheorem = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        CAP Theorem
      </motion.h2>
      <div className="relative flex justify-around w-full max-w-2xl">
        {capElements.map((el, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center p-4 rounded-lg bg-gradient-to-b from-${el.color}-800 to-${el.color}-600`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              <el.icon size={64} className={`text-${el.color}-300`} />
            </motion.div>
            <p className="mt-4 text-xl">{el.label}</p>
          </motion.div>
        ))}
        <motion.svg
          className="absolute top-1/2 left-0 right-0 mx-auto"
          width="600"
          height="200"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <path d="M100 100 L300 50 L500 100" fill="none" stroke="white" strokeWidth="2" />
        </motion.svg>
      </div>
      <motion.p
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        In distributed systems, you can only guarantee two out of three
      </motion.p>
    </div>
  );
};

export default Slide4_CAPTheorem;
```

## Slide5_OAuth.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRightCircle } from 'lucide-react';

const flowSteps = [
  { icon: User, label: 'User Requests Access' },
  { icon: ArrowRightCircle, label: 'Redirect to Auth Server' },
  { icon: Lock, label: 'Grant Token' },
  { icon: ArrowRightCircle, label: 'Access Resource' },
];

const Slide5_OAuth = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        OAuth 2.0 Pattern
      </motion.h2>
      <div className="flex space-x-8">
        {flowSteps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.5 }}
            >
              <step.icon size={48} className="text-indigo-400 mb-4" />
            </motion.div>
            <p className="text-center">{step.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        Secure authorization framework for delegated access
      </motion.p>
    </div>
  );
};

export default Slide5_OAuth;
```

## Slide6_Microservices.jsx
```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, SplitSquareVertical } from 'lucide-react';

const Slide6_Microservices = () => {
  const [split, setSplit] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Microservices Architecture
      </motion.h2>
      <div className="flex justify-center">
        {!split ? (
          <motion.div
            className="bg-gradient-to-br from-purple-800 to-purple-600 p-8 rounded-lg"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            onClick={() => setSplit(true)}
          >
            <Server size={128} className="text-white" />
            <p className="mt-4 text-center">Monolith</p>
          </motion.div>
        ) : (
          <div className="flex space-x-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-purple-800 to-purple-600 p-4 rounded-lg"
                initial={{ x: 0, y: 0 }}
                animate={{ x: i * 50 - 75, y: (i % 2 === 0 ? -50 : 50) }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <SplitSquareVertical size={64} className="text-white" />
                <p className="mt-2 text-sm">Service {i + 1}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <motion.p
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Decompose application into independently deployable services
      </motion.p>
    </div>
  );
};

export default Slide6_Microservices;
```

## Slide7_AIMLPatterns.jsx
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Zap, Database } from 'lucide-react';

const mlFlow = [
  { icon: Database, label: 'Data Ingestion' },
  { icon: Zap, label: 'Model Training' },
  { icon: BrainCircuit, label: 'Inference' },
];

const Slide7_AIMLPatterns = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        AI/ML Design Patterns
      </motion.h2>
      <div className="flex space-x-12">
        {mlFlow.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-gradient-to-b from-cyan-800 to-cyan-600 p-6 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.5, duration: 0.8 }}
          >
            <motion.div
              animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <step.icon size={64} className="text-cyan-300" />
            </motion.div>
            <p className="mt-4">{step.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Patterns like model serving, pipeline orchestration for scalable AI systems
      </motion.p>
    </div>
  );
};

export default Slide7_AIMLPatterns;
```

## Slide8_Conclusion.jsx
```jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const keyPoints = [
  'Understand core patterns for robust systems',
  'Apply theorems like CAP for trade-offs',
  'Implement security with OAuth',
  'Scale with microservices and AI patterns',
];

const Slide8_Conclusion = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Conclusion
      </motion.h2>
      <AnimatePresence>
        <ul className="space-y-4">
          {keyPoints.map((point, index) => (
            <motion.li
              key={index}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.5, duration: 0.8 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
              >
                <CheckCircle size={24} className="text-green-400" />
              </motion.div>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>
    </div>
  );
};

export default Slide8_Conclusion;
```