<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# All 13 slide components (copy-paste ready) give me the code here

Here are all **13 slide components** in individual code blocks, ready to copy-paste:

***

## **Slide1_TitleCard.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function Slide1_TitleCard() {
  // Animated gradient blobs
  const blobVariants = {
    animate: {
      x: [0, 30, -20, 0],
      y: [0, -40, 30, 0],
      scale: [1, 1.1, 0.95, 1],
      transition: { duration: 8, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, ease: 'easeInOut', repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Context Layer: Animated gradient orbs */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-700 rounded-full blur-3xl opacity-20"
      />

      {/* Glass Layer: Content container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-12 max-w-2xl mx-auto"
        style={{
          boxShadow: '0 0 40px rgba(0, 188, 212, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Floating icon */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="flex justify-center mb-8"
        >
          <Code2
            size={80}
            className="text-cyan-400"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0, 188, 212, 0.8))',
            }}
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl font-bold text-white mb-4"
        >
          Go String Methods
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl text-cyan-300 mb-6"
        >
          Master the String Manipulation Toolkit
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto w-32"
        />
      </motion.div>

      {/* Ambient glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 80px rgba(0, 188, 212, 0.3)',
            '0 0 120px rgba(0, 188, 212, 0.5)',
            '0 0 80px rgba(0, 188, 212, 0.3)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide2_StringPackageOverview.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Sparkles } from 'lucide-react';

export default function Slide2_StringPackageOverview() {
  const methods = [
    'Contains',
    'HasPrefix / HasSuffix',
    'Index / LastIndex',
    'Split / Join',
    'ToUpper / ToLower',
    'Trim / TrimSpace',
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
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const blobVariants = {
    animate: {
      rotate: [0, 360],
      transition: { duration: 20, ease: 'linear', repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Rotating gradient blob background */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-full blur-3xl opacity-15"
      />

      {/* Content container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Header with icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Package
            size={48}
            className="text-cyan-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(0, 188, 212, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">strings Package</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-cyan-200 mb-10 leading-relaxed"
        >
          The <code className="bg-white/10 px-3 py-1 rounded text-cyan-300 font-mono">strings</code> package provides powerful utilities for string manipulation in Go. These methods are essential for text processing, parsing, and data transformation.
        </motion.p>

        {/* Methods grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4"
        >
          {methods.map((method, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 hover:border-cyan-400/50 transition-all"
              style={{
                boxShadow: '0 0 15px rgba(0, 188, 212, 0.2)',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <Sparkles size={20} className="text-purple-400" />
                <code className="text-white font-mono">{method}</code>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(168, 85, 247, 0.2)',
            '0 0 150px rgba(168, 85, 247, 0.4)',
            '0 0 100px rgba(168, 85, 247, 0.2)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide3_Contains.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle } from 'lucide-react';

export default function Slide3_Contains() {
  const examples = [
    { code: 'strings.Contains("hello", "ell")', result: 'true' },
    { code: 'strings.Contains("golang", "xyz")', result: 'false' },
    { code: 'strings.Contains("", "")', result: 'true' },
  ];

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Animated background orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-green-400 to-blue-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Search
            size={48}
            className="text-green-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(74, 222, 128, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">strings.Contains()</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-green-200 mb-10"
        >
          Reports whether the substring is within the string.
        </motion.p>

        {/* Function signature */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="backdrop-blur-md bg-white/5 border border-green-400/30 rounded-lg p-6 mb-8"
          style={{
            boxShadow: '0 0 20px rgba(74, 222, 128, 0.3)',
          }}
        >
          <code className="text-green-300 font-mono text-sm">
            func Contains(s, substr string) bool
          </code>
        </motion.div>

        {/* Examples */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {examples.map((example, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 hover:border-green-400/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <code className="text-green-300 font-mono text-sm flex-1">
                  {example.code}
                </code>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <CheckCircle size={20} className="text-green-400" />
                  <span className="text-green-400 font-mono">{example.result}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 80px rgba(74, 222, 128, 0.25)',
            '0 0 120px rgba(74, 222, 128, 0.4)',
            '0 0 80px rgba(74, 222, 128, 0.25)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide4_HasPrefixSuffix.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Slide4_HasPrefixSuffix() {
  const examples = [
    {
      title: 'HasPrefix',
      icon: ArrowLeft,
      items: [
        { code: 'HasPrefix("golang", "go")', result: 'true' },
        { code: 'HasPrefix("hello", "hi")', result: 'false' },
      ],
    },
    {
      title: 'HasSuffix',
      icon: ArrowRight,
      items: [
        { code: 'HasSuffix("test.go", ".go")', result: 'true' },
        { code: 'HasSuffix("main.py", ".go")', result: 'false' },
      ],
    },
  ];

  const blobVariants = {
    animate: {
      x: [0, 40, -40, 0],
      y: [0, -30, 30, 0],
      transition: { duration: 10, ease: 'easeInOut', repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Background orbs */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-32 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-400 to-red-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute -bottom-32 right-1/4 w-96 h-96 bg-gradient-to-br from-red-500 to-pink-600 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-8"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12 text-center"
        >
          HasPrefix & HasSuffix
        </motion.h2>

        {/* Two column layout */}
        <div className="grid grid-cols-2 gap-8">
          {examples.map((section, sIdx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={sIdx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: sIdx * 0.2, duration: 0.8 }}
              >
                {/* Section header */}
                <div className="flex items-center gap-3 mb-6">
                  <Icon
                    size={40}
                    className="text-orange-400"
                    style={{
                      filter: 'drop-shadow(0 0 12px rgba(251, 146, 60, 0.7))',
                    }}
                  />
                  <h3 className="text-2xl font-bold text-white">
                    {section.title}
                  </h3>
                </div>

                {/* Examples */}
                <div className="space-y-3">
                  {section.items.map((item, iIdx) => (
                    <motion.div
                      key={iIdx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + iIdx * 0.1, duration: 0.6 }}
                      className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 hover:border-orange-400/50 transition-all"
                      style={{
                        boxShadow: '0 0 15px rgba(251, 146, 60, 0.2)',
                      }}
                    >
                      <div className="flex justify-between items-center gap-3">
                        <code className="text-orange-300 font-mono text-sm flex-1">
                          {item.code}
                        </code>
                        <span className="text-orange-400 font-mono whitespace-nowrap">
                          {item.result}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(251, 146, 60, 0.2)',
            '0 0 150px rgba(251, 146, 60, 0.35)',
            '0 0 100px rgba(251, 146, 60, 0.2)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide5_IndexLastIndex.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Slide5_IndexLastIndex() {
  const examples = [
    {
      method: 'Index',
      description: 'Returns the first occurrence index',
      items: [
        { code: 'Index("hello world", "o")', result: '4' },
        { code: 'Index("golang", "x")', result: '-1' },
      ],
    },
    {
      method: 'LastIndex',
      description: 'Returns the last occurrence index',
      items: [
        { code: 'LastIndex("hello world", "o")', result: '7' },
        { code: 'LastIndex("golang", "x")', result: '-1' },
      ],
    },
  ];

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 5, ease: 'easeInOut', repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Floating orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-purple-600 to-indigo-800 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <MapPin
            size={48}
            className="text-indigo-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(102, 51, 153, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">Index & LastIndex</h2>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-indigo-200 mb-10"
        >
          Find the position of substrings in a string.
        </motion.p>

        {/* Examples */}
        <div className="space-y-8">
          {examples.map((section, sIdx) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + sIdx * 0.2, duration: 0.8 }}
            >
              {/* Section title */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-indigo-300 mb-1">
                  {section.method}
                </h3>
                <p className="text-sm text-indigo-200">{section.description}</p>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                {section.items.map((item, iIdx) => (
                  <motion.div
                    key={iIdx}
                    whileHover={{ scale: 1.02 }}
                    className="backdrop-blur-sm bg-white/5 border border-indigo-400/30 rounded-lg p-4"
                    style={{
                      boxShadow: '0 0 15px rgba(102, 51, 153, 0.25)',
                    }}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <code className="text-indigo-300 font-mono text-sm flex-1">
                        {item.code}
                      </code>
                      <span className="text-indigo-400 font-mono font-bold">
                        {item.result}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 80px rgba(102, 51, 153, 0.3)',
            '0 0 130px rgba(102, 51, 153, 0.45)',
            '0 0 80px rgba(102, 51, 153, 0.3)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide6_Split.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

export default function Slide6_Split() {
  const blobVariants = {
    animate: {
      rotate: [0, 360],
      transition: { duration: 15, ease: 'linear', repeat: Infinity },
    },
  };

  const codeExample = `s := "apple,banana,cherry"
fruits := strings.Split(s, ",")
// Result: []string{"apple", "banana", "cherry"}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Rotating background */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <GitBranch
            size={48}
            className="text-teal-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(20, 184, 166, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">strings.Split()</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-teal-200 mb-10"
        >
          Splits a string into substrings separated by a delimiter.
        </motion.p>

        {/* Function signature */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="backdrop-blur-md bg-white/5 border border-teal-400/30 rounded-lg p-6 mb-8"
          style={{
            boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)',
          }}
        >
          <code className="text-teal-300 font-mono text-sm">
            func Split(s, sep string) []string
          </code>
        </motion.div>

        {/* Code example */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="backdrop-blur-sm bg-white/5 border border-teal-400/30 rounded-lg p-6 mb-8"
          style={{
            boxShadow: '0 0 20px rgba(20, 184, 166, 0.25)',
          }}
        >
          <motion.code
            variants={itemVariants}
            className="text-teal-300 font-mono text-sm block whitespace-pre-wrap"
          >
            {codeExample}
          </motion.code>
        </motion.div>

        {/* Benefits list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {[
            'CSV/TSV data parsing',
            'URL query string splitting',
            'Command-line argument parsing',
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-center gap-3 text-teal-200"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              {benefit}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(20, 184, 166, 0.25)',
            '0 0 150px rgba(20, 184, 166, 0.4)',
            '0 0 100px rgba(20, 184, 166, 0.25)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide7_Join.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

export default function Slide7_Join() {
  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 5, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const codeExample = `fruits := []string{"apple", "banana", "cherry"}
result := strings.Join(fruits, ", ")
// Result: "apple, banana, cherry"`;

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Floating orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-lime-400 to-green-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
        className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Link2
            size={48}
            className="text-lime-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(132, 204, 22, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">strings.Join()</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg text-lime-200 mb-10"
        >
          Concatenates a slice of strings with a separator. Inverse of Split.
        </motion.p>

        {/* Function signature */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="backdrop-blur-md bg-white/5 border border-lime-400/30 rounded-lg p-6 mb-8"
          style={{
            boxShadow: '0 0 20px rgba(132, 204, 22, 0.3)',
          }}
        >
          <code className="text-lime-300 font-mono text-sm">
            func Join(elems []string, sep string) string
          </code>
        </motion.div>

        {/* Code example */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="backdrop-blur-sm bg-white/5 border border-lime-400/30 rounded-lg p-6 mb-8"
          style={{
            boxShadow: '0 0 20px rgba(132, 204, 22, 0.25)',
          }}
        >
          <code className="text-lime-300 font-mono text-sm block whitespace-pre-wrap">
            {codeExample}
          </code>
        </motion.div>

        {/* Use cases */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-3"
        >
          <h3 className="text-lime-300 font-semibold mb-4">Perfect For:</h3>
          {[
            'Building CSV/TSV formatted output',
            'Creating space-separated lists',
            'Generating file paths',
          ].map((useCase, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 text-lime-200 pl-2"
            >
              <span className="w-2 h-2 rounded-full bg-lime-400" />
              {useCase}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(132, 204, 22, 0.25)',
            '0 0 150px rgba(132, 204, 22, 0.4)',
            '0 0 100px rgba(132, 204, 22, 0.25)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide8_ToUpperToLower.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CaseSensitive } from 'lucide-react';

export default function Slide8_ToUpperToLower() {
  const examples = [
    {
      method: 'ToUpper',
      color: 'text-red-400',
      glowColor: 'rgba(239, 68, 68, 0.3)',
      items: [
        { code: 'ToUpper("hello")', result: '"HELLO"' },
        { code: 'ToUpper("Go 2024")', result: '"GO 2024"' },
      ],
    },
    {
      method: 'ToLower',
      color: 'text-blue-400',
      glowColor: 'rgba(59, 130, 246, 0.3)',
      items: [
        { code: 'ToLower("HELLO")', result: '"hello"' },
        { code: 'ToLower("Go 2024")', result: '"go 2024"' },
      ],
    },
  ];

  const blobVariants = {
    animate: {
      x: [0, 30, -30, 0],
      y: [0, -30, 30, 0],
      transition: { duration: 12, ease: 'easeInOut', repeat: Infinity },
    },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Background orbs */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-br from-red-500 to-orange-600 rounded-full blur-3xl opacity-12"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-3xl opacity-12"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <CaseSensitive
            size={48}
            className="text-orange-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(251, 146, 60, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">ToUpper & ToLower</h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-8">
          {examples.map((section, sIdx) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: sIdx * 0.2, duration: 0.8 }}
            >
              {/* Method title */}
              <h3 className={`text-2xl font-bold mb-6 ${section.color}`}>
                {section.method}
              </h3>

              {/* Examples */}
              <div className="space-y-4">
                {section.items.map((item, iIdx) => (
                  <motion.div
                    key={iIdx}
                    whileHover={{ scale: 1.02 }}
                    className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-4 hover:border-opacity-50 transition-all"
                    style={{
                      boxShadow: `0 0 15px ${section.glowColor}`,
                    }}
                  >
                    <div className="flex justify-between items-center gap-4">
                      <code className="font-mono text-sm flex-1 text-white">
                        {item.code}
                      </code>
                      <code className={`${section.color} font-mono font-bold whitespace-nowrap`}>
                        {item.result}
                      </code>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Glow */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(251, 146, 60, 0.15)',
            '0 0 150px rgba(251, 146, 60, 0.3)',
            '0 0 100px rgba(251, 146, 60, 0.15)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide9_Trim.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';

export default function Slide9_Trim() {
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 6, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const methods = [
    {
      name: 'Trim',
      desc: 'Removes whitespace from both ends',
      example: 'Trim("  hello  ")',
      result: '"hello"',
    },
    {
      name: 'TrimSpace',
      desc: 'Same as Trim, for common case',
      example: 'TrimSpace("  hello\\n")',
      result: '"hello"',
    },
    {
      name: 'TrimPrefix',
      desc: 'Removes prefix if present',
      example: 'TrimPrefix("go.mod", "go.")',
      result: '"mod"',
    },
    {
      name: 'TrimSuffix',
      desc: 'Removes suffix if present',
      example: 'TrimSuffix("test.go", ".go")',
      result: '"test"',
    },
  ];

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Floating orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-purple-500 to-violet-700 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Scissors
            size={48}
            className="text-violet-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(139, 92, 246, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">Trim Methods</h2>
        </motion.div>

        {/* Methods grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-6"
        >
          {methods.map((method, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 border border-violet-400/30 rounded-lg p-5"
              style={{
                boxShadow: '0 0 15px rgba(139, 92, 246, 0.25)',
              }}
            >
              {/* Method name */}
              <h3 className="text-lg font-bold text-violet-300 mb-2">
                {method.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-violet-200 mb-3 leading-relaxed">
                {method.desc}
              </p>

              {/* Example */}
              <div className="bg-white/5 rounded p-2 mb-2 border border-violet-400/20">
                <code className="text-violet-300 font-mono text-xs">
                  {method.example}
                </code>
              </div>

              {/* Result */}
              <div className="text-violet-400 font-mono text-sm">
                → {method.result}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(139, 92, 246, 0.25)',
            '0 0 150px rgba(139, 92, 246, 0.4)',
            '0 0 100px rgba(139, 92, 246, 0.25)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide10_ReplaceRepeat.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function Slide10_ReplaceRepeat() {
  const blobVariants = {
    animate: {
      rotate: [0, 360],
      transition: { duration: 18, ease: 'linear', repeat: Infinity },
    },
  };

  const examples = [
    {
      method: 'Replace',
      items: [
        { code: 'Replace("hello hello", "hello", "hi", -1)', result: '"hi hi"' },
        { code: 'Replace("test", "e", "E", 1)', result: '"tEst"' },
      ],
    },
    {
      method: 'Repeat',
      items: [
        { code: 'Repeat("ab", 3)', result: '"ababab"' },
        { code: 'Repeat("go", 0)', result: '""' },
      ],
    },
  ];

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Rotating background */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full blur-3xl opacity-12"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <RefreshCw
            size={48}
            className="text-sky-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">Replace & Repeat</h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-8">
          {examples.map((section, sIdx) => (
            <motion.div
              key={sIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: sIdx * 0.2, duration: 0.8 }}
            >
              {/* Method title */}
              <h3 className="text-2xl font-bold text-sky-300 mb-6">
                {section.method}
              </h3>

              {/* Examples */}
              <div className="space-y-4">
                {section.items.map((item, iIdx) => (
                  <motion.div
                    key={iIdx}
                    whileHover={{ scale: 1.02 }}
                    className="backdrop-blur-sm bg-white/5 border border-sky-400/30 rounded-lg p-4"
                    style={{
                      boxShadow: '0 0 15px rgba(56, 189, 248, 0.25)',
                    }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <code className="text-sky-300 font-mono text-sm flex-1">
                        {item.code}
                      </code>
                      <code className="text-sky-400 font-mono font-bold whitespace-nowrap">
                        {item.result}
                      </code>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Glow */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(56, 189, 248, 0.2)',
            '0 0 150px rgba(56, 189, 248, 0.35)',
            '0 0 100px rgba(56, 189, 248, 0.2)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide11_AdvancedMethods.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Slide11_AdvancedMethods() {
  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 5, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const methods = [
    {
      name: 'Count',
      desc: 'Returns the number of non-overlapping occurrences',
      example: 'Count("banana", "a")',
      result: '3',
    },
    {
      name: 'Fields',
      desc: 'Splits string by whitespace (any amount)',
      example: 'Fields("a  b   c")',
      result: '[]string{"a","b","c"}',
    },
    {
      name: 'Contains / ContainsAny',
      desc: 'Check if string contains any character',
      example: 'ContainsAny("hello", "aeiou")',
      result: 'true',
    },
    {
      name: 'ReplaceAll',
      desc: 'Replace all occurrences (convenience)',
      example: 'ReplaceAll("aaa", "a", "b")',
      result: '"bbb"',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Floating orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-fuchsia-400 to-pink-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
        className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-pink-500 to-fuchsia-700 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <Zap
            size={48}
            className="text-fuchsia-400"
            style={{
              filter: 'drop-shadow(0 0 15px rgba(232, 121, 249, 0.7))',
            }}
          />
          <h2 className="text-5xl font-bold text-white">Advanced Methods</h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-6"
        >
          {methods.map((method, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 border border-fuchsia-400/30 rounded-lg p-5"
              style={{
                boxShadow: '0 0 15px rgba(232, 121, 249, 0.2)',
              }}
            >
              {/* Name */}
              <h3 className="text-lg font-bold text-fuchsia-300 mb-2">
                {method.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-fuchsia-200 mb-3 leading-relaxed">
                {method.desc}
              </p>

              {/* Example */}
              <div className="bg-white/5 rounded p-2 mb-2 border border-fuchsia-400/20">
                <code className="text-fuchsia-300 font-mono text-xs break-all">
                  {method.example}
                </code>
              </div>

              {/* Result */}
              <div className="text-fuchsia-400 font-mono text-sm">
                → {method.result}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(232, 121, 249, 0.25)',
            '0 0 150px rgba(232, 121, 249, 0.4)',
            '0 0 100px rgba(232, 121, 249, 0.25)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide12_BestPractices.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Target, AlertCircle, Lightbulb } from 'lucide-react';

export default function Slide12_BestPractices() {
  const blobVariants = {
    animate: {
      x: [0, 40, -40, 0],
      y: [0, -30, 30, 0],
      transition: { duration: 10, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const practices = [
    {
      icon: Target,
      title: 'Use Appropriate Method',
      desc: 'Choose specific methods (HasPrefix vs Contains) for clarity',
      color: 'text-emerald-400',
      glowColor: 'rgba(52, 211, 153, 0.3)',
    },
    {
      icon: AlertCircle,
      title: 'Watch for Unicode',
      desc: 'Byte-based methods may not handle Unicode correctly',
      color: 'text-amber-400',
      glowColor: 'rgba(251, 191, 36, 0.3)',
    },
    {
      icon: Lightbulb,
      title: 'Prefer strings Package',
      desc: 'Use strings package methods over manual character iteration',
      color: 'text-yellow-400',
      glowColor: 'rgba(250, 204, 21, 0.3)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Animated background */}
      <motion.div
        variants={blobVariants}
        animate="animate"
        className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-3xl opacity-12"
      />
      <motion.div
        variants={blobVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full blur-3xl opacity-12"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-8"
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-white mb-12 text-center"
        >
          Best Practices
        </motion.h2>

        {/* Practices grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-8"
        >
          {practices.map((practice, idx) => {
            const Icon = practice.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all"
                style={{
                  boxShadow: `0 0 20px ${practice.glowColor}`,
                }}
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="flex-shrink-0"
                  >
                    <Icon
                      size={40}
                      className={practice.color}
                      style={{
                        filter: `drop-shadow(0 0 10px ${practice.glowColor})`,
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-2 ${practice.color}`}>
                      {practice.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {practice.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(52, 211, 153, 0.2)',
            '0 0 150px rgba(52, 211, 153, 0.35)',
            '0 0 100px rgba(52, 211, 153, 0.2)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **Slide13_Conclusion.jsx**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Code2 } from 'lucide-react';

export default function Slide13_Conclusion() {
  const floatVariants = {
    animate: {
      y: [0, -25, 0],
      transition: { duration: 7, ease: 'easeInOut', repeat: Infinity },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const keyPoints = [
    'Master Contains, Split, Join for daily tasks',
    'Leverage Index/LastIndex for searching',
    'Use case-changing methods (ToUpper/ToLower) wisely',
    'Always trim user input for cleaner data',
    'Prefer strings package methods over manual loops',
    'Handle Unicode properly in production code',
  ];

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden flex items-center justify-center">
      {/* Floating orbs */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-3xl opacity-15"
      />
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-700 rounded-full blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-8"
      >
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Code2
            size={64}
            className="text-cyan-400 mx-auto mb-6"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0, 188, 212, 0.8))',
            }}
          />
          <h2 className="text-5xl font-bold text-white mb-2">
            Powerful String Tools
          </h2>
          <p className="text-cyan-300 text-lg">Master string manipulation in Go</p>
        </motion.div>

        {/* Key points */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mb-12"
        >
          {keyPoints.map((point, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-center gap-4 group"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="flex-shrink-0"
              >
                <CheckSquare
                  size={24}
                  className="text-emerald-400"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.6))',
                  }}
                />
              </motion.div>
              <p className="text-white group-hover:text-cyan-300 transition-colors">
                {point}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="backdrop-blur-md bg-white/5 border border-cyan-400/30 rounded-lg p-8 text-center"
          style={{
            boxShadow: '0 0 30px rgba(0, 188, 212, 0.35)',
          }}
        >
          <p className="text-white text-lg leading-relaxed">
            Go's <code className="bg-white/10 px-2 py-1 rounded text-cyan-300 font-mono">strings</code> package
            provides everything you need for efficient, elegant string manipulation.
            Happy coding!
          </p>
        </motion.div>
      </motion.div>

      {/* Ambient glow pulse */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 100px rgba(0, 188, 212, 0.3)',
            '0 0 150px rgba(0, 188, 212, 0.5)',
            '0 0 100px rgba(0, 188, 212, 0.3)',
          ],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
```


***

## **MainDeck.jsx** (Navigation Controller)

```jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Slide1_TitleCard from './Slide1_TitleCard';
import Slide2_StringPackageOverview from './Slide2_StringPackageOverview';
import Slide3_Contains from './Slide3_Contains';
import Slide4_HasPrefixSuffix from './Slide4_HasPrefixSuffix';
import Slide5_IndexLastIndex from './Slide5_IndexLastIndex';
import Slide6_Split from './Slide6_Split';
import Slide7_Join from './Slide7_Join';
import Slide8_ToUpperToLower from './Slide8_ToUpperToLower';
import Slide9_Trim from './Slide9_Trim';
import Slide10_ReplaceRepeat from './Slide10_ReplaceRepeat';
import Slide11_AdvancedMethods from './Slide11_AdvancedMethods';
import Slide12_BestPractices from './Slide12_BestPractices';
import Slide13_Conclusion from './Slide13_Conclusion';

export default function MainDeck() {
  const slides = [
    Slide1_TitleCard,
    Slide2_StringPackageOverview,
    Slide3_Contains,
    Slide4_HasPrefixSuffix,
    Slide5_IndexLastIndex,
    Slide6_Split,
    Slide7_Join,
    Slide8_ToUpperToLower,
    Slide9_Trim,
    Slide10_ReplaceRepeat,
    Slide11_AdvancedMethods,
    Slide12_BestPractices,
    Slide13_Conclusion,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const CurrentSlide = slides[currentSlide];

  const goNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Slide container */}
      <div className="w-full h-full">
        <CurrentSlide />
      </div>

      {/* Navigation controls */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-50">
        {/* Previous button */}
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/15 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>

        {/* Slide counter */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-2">
          <span className="text-white font-mono">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          disabled={currentSlide === slides.length - 1}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/15 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>

      {/* Keyboard navigation helper */}
      <div className="absolute top-8 right-8 text-white/50 text-sm backdrop-blur-md bg-white/5 border border-white/10 rounded px-4 py-2">
        ← → to navigate
      </div>
    </div>
  );
}
```


***

## **Quick Setup**

```bash
# 1. Install dependencies
npm install framer-motion lucide-react

# 2. Create components folder
mkdir -p src/components

# 3. Copy all slide files into src/components/

# 4. Use in your app
import MainDeck from './components/MainDeck';

export default function App() {
  return <MainDeck />;
}
```

**All 13 slides are ready to copy-paste!** 🚀 Each one is fully self-contained with glassmorphism effects, ambient glow animations, and smooth motion transitions.

