I'll create a cinematic presentation deck on "How Many Databases Exist in the System?" with animated React slides that visualize different database types, architectures, and discovery patterns.

## Slide1_Title.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

const Slide1_Title = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const floatingDatabases = [
    { delay: 0, x: -150, y: -100 },
    { delay: 0.3, x: 150, y: -80 },
    { delay: 0.6, x: -100, y: 100 },
    { delay: 0.9, x: 120, y: 120 }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-slate-900 to-purple-900/20"
        animate={{
          background: [
            'linear-gradient(to bottom right, rgb(37, 99, 235, 0.2), rgb(15, 23, 42), rgb(88, 28, 135, 0.2))',
            'linear-gradient(to bottom right, rgb(88, 28, 135, 0.2), rgb(15, 23, 42), rgb(37, 99, 235, 0.2))'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating database icons */}
      {floatingDatabases.map((db, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          initial={{ opacity: 0, x: db.x, y: db.y }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [db.y, db.y - 30, db.y]
          }}
          transition={{
            duration: 6,
            delay: db.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Database className="w-24 h-24 text-blue-400 blur-sm" />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <motion.div
            className="mb-6 flex justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Database className="w-32 h-32 text-blue-400" />
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent"
        >
          How Many Databases
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Exist in the System?
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-300 max-w-2xl"
        >
          A deep dive into database architectures, discovery patterns, and system complexity
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center gap-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-blue-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ delay: i * 0.3, duration: 2, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Slide1_Title;
```

## Slide2_TheProblem.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, AlertCircle, HelpCircle } from 'lucide-react';

const Slide2_TheProblem = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const questions = [
    { icon: AlertCircle, text: 'How many databases?', color: 'text-red-400' },
    { icon: HelpCircle, text: 'Which ones are active?', color: 'text-yellow-400' },
    { icon: Database, text: 'What are they storing?', color: 'text-blue-400' }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-white mb-16 text-center"
        >
          The Visibility Problem
        </motion.h1>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 gap-8">
          {questions.map((q, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.3, duration: 0.6 }}
              onHoverStart={() => setActiveQuestion(idx)}
              className="cursor-pointer"
            >
              <motion.div
                className="p-6 rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur"
                animate={{
                  borderColor: activeQuestion === idx ? ['rgb(59, 130, 246)', 'rgb(59, 130, 246)'] : 'rgb(51, 65, 85)',
                  boxShadow: activeQuestion === idx
                    ? '0 0 30px rgba(59, 130, 246, 0.5)'
                    : '0 0 0px rgba(59, 130, 246, 0)'
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: activeQuestion === idx ? 12 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <q.icon className={`w-8 h-8 ${q.color}`} />
                  </motion.div>
                  <motion.span
                    className="text-2xl font-semibold text-white"
                    animate={{ x: activeQuestion === idx ? 10 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {q.text}
                  </motion.span>
                </div>

                <AnimatePresence>
                  {activeQuestion === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 text-slate-300"
                    >
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-4" />
                      <p className="text-lg">
                        {idx === 0 && 'Production, caching, analytics, search, backups...'}
                        {idx === 1 && 'Which are critical path? Which are degradable?'}
                        {idx === 2 && 'Users, transactions, logs, metrics, documents...'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-slate-400">
            Without visibility, you can't manage complexity.
          </p>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 text-3xl font-bold text-red-400"
          >
            But how do you discover them?
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide2_TheProblem;
```

## Slide3_DiscoveryMethods.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Zap, Code, Network } from 'lucide-react';

const Slide3_DiscoveryMethods = () => {
  const [activeMethod, setActiveMethod] = useState(null);

  const methods = [
    {
      id: 0,
      icon: Eye,
      title: 'Code Review',
      color: 'from-blue-500 to-cyan-500',
      items: ['Parse connection strings', 'Scan import statements', 'Manual effort', 'Error prone']
    },
    {
      id: 1,
      icon: Zap,
      title: 'Runtime Instrumentation',
      color: 'from-purple-500 to-pink-500',
      items: ['Hook into drivers', 'Trace connections', 'Real data', 'Overhead']
    },
    {
      id: 2,
      icon: Network,
      title: 'Network Scanning',
      color: 'from-green-500 to-emerald-500',
      items: ['Monitor traffic', 'Find endpoints', 'Passive discovery', 'Infrastructure']
    },
    {
      id: 3,
      icon: Code,
      title: 'Configuration Files',
      color: 'from-orange-500 to-red-500',
      items: ['Parse configs', 'Environment vars', 'Static analysis', 'May be stale']
    }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background */}
      <motion.div className="absolute inset-0 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-slate-600"
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width: `${150 + i * 100}px`,
              height: `${150 + i * 100}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-16"
        >
          Discovery Methods
        </motion.h1>

        <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
          {methods.map((method) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: method.id * 0.15, duration: 0.6 }}
              onHoverStart={() => setActiveMethod(method.id)}
              onHoverEnd={() => setActiveMethod(null)}
              className="cursor-pointer"
            >
              <motion.div
                className={`p-8 rounded-xl bg-gradient-to-br ${method.color} opacity-10 border border-slate-700 h-full`}
                animate={{
                  opacity: activeMethod === method.id ? 0.2 : 0.1,
                  scale: activeMethod === method.id ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    animate={{
                      rotate: activeMethod === method.id ? [0, 10, -10, 0] : 0,
                      scale: activeMethod === method.id ? 1.2 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <method.icon className={`w-12 h-12 bg-gradient-to-br ${method.color} bg-clip-text text-transparent`} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">{method.title}</h3>
                </div>

                <motion.div
                  animate={{
                    opacity: activeMethod === method.id ? 1 : 0.6
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {method.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: activeMethod === method.id ? 1 : 0.7,
                        x: activeMethod === method.id ? 0 : -10
                      }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      className="text-slate-300 text-sm mb-2 flex items-center gap-2"
                    >
                      <motion.span
                        className="w-2 h-2 rounded-full bg-white"
                        animate={{ scale: activeMethod === method.id ? [1, 1.5, 1] : 1 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center text-slate-400 text-lg"
        >
          Hover to explore each approach
        </motion.div>
      </div>
    </div>
  );
};

export default Slide3_DiscoveryMethods;
```

## Slide4_DatabaseTypes.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, FileJson, BarChart3, Lock, Zap } from 'lucide-react';

const Slide4_DatabaseTypes = () => {
  const [hoveredType, setHoveredType] = useState(null);

  const dbTypes = [
    {
      id: 0,
      name: 'SQL',
      icon: Database,
      color: 'from-blue-500 to-blue-600',
      examples: ['PostgreSQL', 'MySQL', 'Oracle'],
      y: -80
    },
    {
      id: 1,
      name: 'NoSQL',
      icon: FileJson,
      color: 'from-green-500 to-green-600',
      examples: ['MongoDB', 'DynamoDB', 'Cassandra'],
      y: 80
    },
    {
      id: 2,
      name: 'Cache',
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600',
      examples: ['Redis', 'Memcached', 'Varnish'],
      y: -80
    },
    {
      id: 3,
      name: 'Search',
      icon: Server,
      color: 'from-purple-500 to-purple-600',
      examples: ['Elasticsearch', 'Solr', 'Algolia'],
      y: 80
    },
    {
      id: 4,
      name: 'Analytics',
      icon: BarChart3,
      color: 'from-pink-500 to-pink-600',
      examples: ['Redshift', 'BigQuery', 'Snowflake'],
      y: 0
    },
    {
      id: 5,
      name: 'Graph',
      icon: Lock,
      color: 'from-cyan-500 to-cyan-600',
      examples: ['Neo4j', 'ArangoDB', 'JanusGraph'],
      y: 0
    }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated mesh background */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      />

      <div className="relative z-10 w-full">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-20"
        >
          Database Types in Modern Systems
        </motion.h1>

        {/* Hexagonal grid layout */}
        <div className="flex justify-center items-center">
          <svg viewBox="0 0 1000 600" className="w-full max-w-6xl h-auto">
            {/* Invisible connection lines that animate */}
            {dbTypes.map((type1, i) => {
              const type2 = dbTypes[(i + 1) % dbTypes.length];
              const isHovered = hoveredType === type1.id || hoveredType === type2.id;
              
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={200 + (i % 3) * 250}
                  y1={150 + Math.floor(i / 3) * 200}
                  x2={200 + ((i + 1) % 3) * 250}
                  y2={150 + Math.floor((i + 1) / 3) * 200}
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="2"
                  animate={{
                    strokeOpacity: isHovered ? 0.6 : 0.2
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}

            {/* Database type cards */}
            {dbTypes.map((dbType, idx) => {
              const x = idx < 3 ? 200 + (idx % 3) * 250 : 200 + (idx % 3) * 250;
              const y = Math.floor(idx / 3) * 220 + 150;
              const isHovered = hoveredType === dbType.id;

              return (
                <g key={dbType.id}>
                  {/* Card background */}
                  <motion.rect
                    x={x - 80}
                    y={y - 70}
                    width="160"
                    height="140"
                    rx="12"
                    fill="rgba(30, 41, 59, 0.8)"
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="2"
                    animate={{
                      fill: isHovered ? 'rgba(30, 41, 59, 1)' : 'rgba(30, 41, 59, 0.6)',
                      stroke: isHovered ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.2)'
                    }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHoveredType(dbType.id)}
                    onMouseLeave={() => setHoveredType(null)}
                  />

                  {/* Icon container */}
                  <motion.g
                    animate={{
                      transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                      y: isHovered ? -10 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <foreignObject x={x - 24} y={y - 50} width="48" height="48">
                      <dbType.icon className={`w-full h-full bg-gradient-to-br ${dbType.color} text-white p-1 rounded-lg`} />
                    </foreignObject>
                  </motion.g>

                  {/* Title */}
                  <motion.text
                    x={x}
                    y={y + 15}
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="bold"
                    fill="white"
                    animate={{
                      fill: isHovered ? '#60a5fa' : 'white'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {dbType.name}
                  </motion.text>

                  {/* Examples (shown on hover) */}
                  {isHovered && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {dbType.examples.map((example, exIdx) => (
                        <motion.text
                          key={exIdx}
                          x={x}
                          y={y + 50 + exIdx * 18}
                          textAnchor="middle"
                          fontSize="12"
                          fill="rgba(203, 213, 225, 0.8)"
                          initial={{ opacity: 0, y: y + 40 }}
                          animate={{ opacity: 1, y: y + 50 + exIdx * 18 }}
                          transition={{ delay: exIdx * 0.1, duration: 0.3 }}
                        >
                          {example}
                        </motion.text>
                      ))}
                    </motion.g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-slate-400"
        >
          Hover over each type to see examples
        </motion.div>
      </div>
    </div>
  );
};

export default Slide4_DatabaseTypes;
```

## Slide5_ComplexityGrowth.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';

const Slide5_ComplexityGrowth = () => {
  const stages = [
    { id: 0, db: 1, label: 'MVP', y: 450 },
    { id: 1, db: 3, label: 'Growth', y: 350 },
    { id: 2, db: 8, label: 'Scale', y: 200 },
    { id: 3, db: 15, label: 'Enterprise', y: 80 }
  ];

  const icons = ['🛢️', '🔄', '📊', '🔐', '⚡', '🔍', '📈', '🌐', '🧠', '📝', '🎯', '🔗', '💾', '🚀', '🔔'];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-4"
        >
          Complexity Grows Exponentially
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-slate-400 mb-20 text-lg"
        >
          Each stage introduces new data needs
        </motion.p>

        {/* SVG Chart */}
        <svg viewBox="0 0 1200 600" className="w-full max-w-6xl h-auto mx-auto">
          {/* Grid lines */}
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={`grid-${i}`}
              x1={100}
              y1={450 - (i * 75)}
              x2={1100}
              y2={450 - (i * 75)}
              stroke="rgba(100, 116, 139, 0.1)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}

          {/* Y-axis labels */}
          {[...Array(6)].map((_, i) => (
            <motion.text
              key={`label-${i}`}
              x="50"
              y={450 - (i * 75) + 5}
              textAnchor="end"
              fontSize="14"
              fill="rgba(203, 213, 225, 0.6)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {i * 3}
            </motion.text>
          ))}

          {/* Stage columns */}
          {stages.map((stage) => (
            <g key={stage.id}>
              {/* Column background */}
              <motion.rect
                x={150 + stage.id * 250}
                y={stage.y}
                width="180"
                height={450 - stage.y}
                fill="url(#gradient)"
                rx="8"
                initial={{ height: 0, y: 450 }}
                animate={{ height: 450 - stage.y, y: stage.y }}
                transition={{ delay: stage.id * 0.2, duration: 0.8, ease: 'easeOut' }}
              />

              {/* Database icons flowing up */}
              {[...Array(stage.db)].map((_, iconIdx) => (
                <motion.g
                  key={`icon-${iconIdx}`}
                  initial={{ opacity: 0, y: 450 }}
                  animate={{ opacity: 1, y: stage.y + 20 + (iconIdx * 30) }}
                  transition={{
                    delay: stage.id * 0.2 + iconIdx * 0.1,
                    duration: 0.6,
                    ease: 'easeOut'
                  }}
                >
                  <motion.text
                    x={150 + stage.id * 250 + 90}
                    y={stage.y + 40 + (iconIdx * 30)}
                    textAnchor="middle"
                    fontSize="24"
                    animate={{
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      delay: stage.id * 0.3 + iconIdx * 0.15,
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    {icons[iconIdx % icons.length]}
                  </motion.text>
                </motion.g>
              ))}

              {/* Stage label */}
              <motion.text
                x={150 + stage.id * 250 + 90}
                y="520"
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill="white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: stage.id * 0.2 + 0.5, duration: 0.6 }}
              >
                {stage.label}
              </motion.text>

              {/* Database count */}
              <motion.text
                x={150 + stage.id * 250 + 90}
                y="550"
                textAnchor="middle"
                fontSize="28"
                fontWeight="bold"
                fill="rgba(59, 130, 246, 1)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: stage.id * 0.3 + 0.3, duration: 0.5 }}
              >
                {stage.db}
              </motion.text>
            </g>
          ))}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>

          {/* Axis */}
          <line x1="100" y1="450" x2="1100" y2="450" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
          <line x1="100" y1="80" x2="100" y2="450" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="2" />
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center mt-8 text-slate-400"
        >
          <p className="text-lg">More systems → More data requirements → More databases</p>
          <p className="text-sm mt-2 text-slate-500">Discovery becomes a critical DevOps concern</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide5_ComplexityGrowth;
```

## Slide6_InteractionPatterns.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Clock, AlertCircle } from 'lucide-react';

const Slide6_InteractionPatterns = () => {
  const [activeFlow, setActiveFlow] = useState(0);

  const flows = [
    {
      id: 0,
      name: 'Read Heavy',
      color: 'from-blue-500 to-cyan-500',
      pattern: [
        { label: 'Write', size: 1, x: 0 },
        { label: 'Cache', size: 8, x: 100 },
        { label: 'Read', size: 8, x: 200 }
      ],
      description: 'Heavy reads served from cache'
    },
    {
      id: 1,
      name: 'Write Heavy',
      color: 'from-orange-500 to-red-500',
      pattern: [
        { label: 'Write', size: 8, x: 0 },
        { label: 'Queue', size: 6, x: 100 },
        { label: 'Store', size: 8, x: 200 }
      ],
      description: 'Writes buffered through queue'
    },
    {
      id: 2,
      name: 'Polyglot',
      color: 'from-purple-500 to-pink-500',
      pattern: [
        { label: 'SQL', size: 5, x: 0 },
        { label: 'Search', size: 5, x: 100 },
        { label: 'Graph', size: 5, x: 200 }
      ],
      description: 'Different engines for different needs'
    }
  ];

  const activeFlowData = flows[activeFlow];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400"
            animate={{
              x: [Math.random() * 1200, Math.random() * 1200],
              y: [Math.random() * 600, Math.random() * 600],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-20"
        >
          Interaction Patterns
        </motion.h1>

        {/* Flow selector */}
        <div className="flex justify-center gap-4 mb-16">
          {flows.map((flow) => (
            <motion.button
              key={flow.id}
              onClick={() => setActiveFlow(flow.id)}
              className="px-6 py-3 rounded-lg font-semibold transition-all"
              animate={{
                background: activeFlow === flow.id
                  ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                  : 'rgba(30, 41, 59, 0.6)',
                color: activeFlow === flow.id ? 'white' : 'rgba(203, 213, 225, 0.7)',
                scale: activeFlow === flow.id ? 1.05 : 1
              }}
              style={{
                '--tw-gradient-stops': activeFlow === flow.id
                  ? `rgb(59, 130, 246), rgb(34, 211, 238)`
                  : undefined
              }}
              transition={{ duration: 0.3 }}
            >
              {flow.name}
            </motion.button>
          ))}
        </div>

        {/* Visualization */}
        <motion.div
          className="max-w-4xl mx-auto"
          key={activeFlowData.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Flow diagram */}
          <div className="flex items-center justify-around mb-16 relative h-40">
            {activeFlowData.pattern.map((stage, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                {/* Database visualization */}
                <motion.div
                  className={`p-6 rounded-xl bg-gradient-to-br ${activeFlowData.color} mb-4 relative`}
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                      '0 0 40px rgba(59, 130, 246, 0.6)',
                      '0 0 20px rgba(59, 130, 246, 0.3)'
                    ]
                  }}
                  transition={{
                    delay: idx * 0.15,
                    duration: 2.5,
                    repeat: Infinity
                  }}
                >
                  <div
                    className="text-2xl font-bold text-white text-center"
                    style={{ width: `${stage.size * 8}px`, height: `${stage.size * 8}px` }}
                  >
                    {stage.size}
                  </div>
                </motion.div>

                {/* Label */}
                <p className="text-white font-semibold text-sm">{stage.label}</p>

                {/* Arrow */}
                {idx < activeFlowData.pattern.length - 1 && (
                  <motion.div
                    className="absolute"
                    style={{ left: `${35 + idx * 33}%` }}
                    animate={{ x: [0, 10, 0] }}
                    transition={{ delay: idx * 0.2, duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <motion.div
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-xl text-slate-200">{activeFlowData.description}</p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-3 bg-slate-700/50 rounded-lg"
              >
                <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Throughput</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="p-3 bg-slate-700/50 rounded-lg"
              >
                <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Latency</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="p-3 bg-slate-700/50 rounded-lg"
              >
                <AlertCircle className="w-5 h-5 text-orange-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Complexity</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide6_InteractionPatterns;
```

## Slide7_CriticalityLevels.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, Shield } from 'lucide-react';

const Slide7_CriticalityLevels = () => {
  const [hoveredLevel, setHoveredLevel] = useState(1);

  const levels = [
    {
      id: 0,
      name: 'Critical Path',
      icon: AlertTriangle,
      color: 'from-red-600 to-red-700',
      textColor: 'text-red-300',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-700',
      percentage: 95,
      examples: ['User DB', 'Order DB', 'Payment System'],
      sla: '99.95%'
    },
    {
      id: 1,
      name: 'Important',
      icon: AlertCircle,
      color: 'from-yellow-600 to-yellow-700',
      textColor: 'text-yellow-300',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-700',
      percentage: 75,
      examples: ['Cache Layer', 'Session Store', 'Analytics'],
      sla: '99.9%'
    },
    {
      id: 2,
      name: 'Nice to Have',
      icon: Info,
      color: 'from-blue-600 to-blue-700',
      textColor: 'text-blue-300',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-700',
      percentage: 50,
      examples: ['Logs', 'Metrics', 'Backups'],
      sla: '99%'
    },
    {
      id: 3,
      name: 'Degradable',
      icon: Shield,
      color: 'from-green-600 to-green-700',
      textColor: 'text-green-300',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-700',
      percentage: 25,
      examples: ['Search Index', 'Recommendations', 'Testing DB'],
      sla: 'Best Effort'
    }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background */}
      <motion.div className="absolute inset-0 opacity-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              width: '400px',
              height: '400px',
              left: `${20 + i * 30}%`,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-4"
        >
          Database Criticality Levels
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-400 mb-16"
        >
          Not all databases are equally important
        </motion.p>

        {/* Criticality bars */}
        <div className="max-w-5xl mx-auto space-y-6">
          {levels.map((level) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: level.id * 0.15, duration: 0.6 }}
              onMouseEnter={() => setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(1)}
            >
              <motion.div
                className={`p-6 rounded-xl border ${level.borderColor} ${level.bgColor} cursor-pointer`}
                animate={{
                  scale: hoveredLevel === level.id ? 1.02 : 1,
                  boxShadow: hoveredLevel === level.id
                    ? '0 0 30px rgba(59, 130, 246, 0.5)'
                    : 'none'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        scale: hoveredLevel === level.id ? 1.2 : 1,
                        rotate: hoveredLevel === level.id ? 12 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <level.icon className={`w-8 h-8 ${level.textColor}`} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{level.name}</h3>
                      <p className={`text-sm ${level.textColor}`}>SLA: {level.sla}</p>
                    </div>
                  </div>
                </div>

                {/* Percentage bar */}
                <div className="mb-4">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${level.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${level.percentage}%` }}
                    transition={{ delay: level.id * 0.15 + 0.3, duration: 0.8, ease: 'easeOut' }}
                  />
                  <motion.p
                    className="text-sm text-slate-400 mt-2"
                    animate={{ opacity: hoveredLevel === level.id ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  >
                    Importance: {level.percentage}%
                  </motion.p>
                </div>

                {/* Examples */}
                <motion.div
                  animate={{
                    maxHeight: hoveredLevel === level.id ? 'auto' : 0,
                    opacity: hoveredLevel === level.id ? 1 : 0,
                    marginTop: hoveredLevel === level.id ? 16 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-slate-300 mb-2 font-semibold">Examples:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {level.examples.map((example, idx) => (
                      <motion.div
                        key={idx}
                        className={`px-3 py-2 rounded-lg ${level.bgColor} border ${level.borderColor}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1, duration: 0.3 }}
                      >
                        <p className={`text-xs ${level.textColor}`}>{example}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 text-lg">
            Categorizing databases helps prioritize monitoring, backups, and redundancy
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide7_CriticalityLevels;
```

## Slide8_DataFlow.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Server, BarChart3 } from 'lucide-react';

const Slide8_DataFlow = () => {
  const [animatingStep, setAnimatingStep] = useState(0);

  const steps = [
    { id: 0, icon: Server, label: 'Application', color: 'from-blue-500 to-cyan-500', x: 150 },
    { id: 1, icon: Database, label: 'Primary DB', color: 'from-green-500 to-emerald-500', x: 400 },
    { id: 2, icon: Database, label: 'Replica', color: 'from-purple-500 to-pink-500', x: 650 },
    { id: 3, icon: BarChart3, label: 'Data Warehouse', color: 'from-orange-500 to-red-500', x: 900 }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimatingStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .05) 25%, rgba(59, 130, 246, .05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .05) 75%, rgba(59, 130, 246, .05) 76%, transparent 77%, transparent),
            linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .05) 25%, rgba(59, 130, 246, .05) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .05) 75%, rgba(59, 130, 246, .05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-20"
        >
          Data Flow Through Databases
        </motion.h1>

        {/* Main flow diagram */}
        <div className="max-w-6xl mx-auto">
          <svg viewBox="0 0 1100 400" className="w-full h-auto">
            {/* Connection lines */}
            {steps.map((step, idx) => {
              if (idx === steps.length - 1) return null;
              const nextStep = steps[idx + 1];

              return (
                <motion.line
                  key={`line-${idx}`}
                  x1={step.x + 60}
                  y1="200"
                  x2={nextStep.x - 60}
                  y2="200"
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="3"
                  animate={{
                    strokeDashoffset: animatingStep === idx ? 0 : 100,
                    stroke: animatingStep === idx ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 0.3)',
                    strokeWidth: animatingStep === idx ? 4 : 3
                  }}
                  transition={{ duration: 0.5 }}
                  strokeDasharray="100"
                />
              );
            })}

            {/* Step nodes */}
            {steps.map((step) => {
              const isActive = animatingStep === step.id || animatingStep === step.id - 1;

              return (
                <g key={step.id}>
                  {/* Pulsing background */}
                  <motion.circle
                    cx={step.x}
                    cy="200"
                    r="50"
                    fill="rgba(59, 130, 246, 0.1)"
                    animate={{
                      r: isActive ? [50, 70, 50] : 50,
                      opacity: isActive ? [0.3, 0.6, 0.3] : 0.1
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />

                  {/* Main circle */}
                  <motion.circle
                    cx={step.x}
                    cy="200"
                    r="40"
                    fill={`url(#gradient-${step.id})`}
                    animate={{
                      r: isActive ? 45 : 40
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon */}
                  <foreignObject x={step.x - 20} y="180" width="40" height="40">
                    <motion.div
                      className="w-full h-full flex items-center justify-center"
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        rotate: isActive ? 12 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="w-6 h-6 text-white" />
                    </motion.div>
                  </foreignObject>

                  {/* Label */}
                  <motion.text
                    x={step.x}
                    y="280"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="bold"
                    fill="white"
                    animate={{
                      fill: isActive ? 'rgba(59, 130, 246)' : 'white'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.label}
                  </motion.text>

                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id={`gradient-${step.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={step.color.split(' ')[0]} />
                      <stop offset="100%" stopColor={step.color.split(' ')[1]} />
                    </linearGradient>
                  </defs>
                </g>
              );
            })}
          </svg>

          {/* Data packets flowing */}
          {[0, 1, 2, 3].map((packet) => (
            <motion.div
              key={`packet-${packet}`}
              className="absolute w-8 h-8 rounded-lg bg-blue-400 opacity-70"
              animate={{
                left: ['10%', '90%'],
                top: '200px'
              }}
              transition={{
                duration: 4,
                delay: packet * 1,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <motion.div
                className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 max-w-4xl mx-auto bg-slate-800/50 border border-slate-700 rounded-xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Typical Flow:</h3>
          <div className="space-y-2 text-slate-300">
            <p>1. <span className="font-semibold">Application</span> reads/writes to primary database</p>
            <p>2. <span className="font-semibold">Replica</span> stays in sync for failover & reads</p>
            <p>3. <span className="font-semibold">Data Warehouse</span> gets batch/streaming updates for analytics</p>
            <p className="text-slate-400 text-sm mt-4">Each stage introduces latency, consistency, and failure points</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide8_DataFlow;
```

## Slide9_ServiceRegistry.jsx

```jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Search, CheckCircle, AlertCircle } from 'lucide-react';

const Slide9_ServiceRegistry = () => {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      id: 0,
      name: 'Service Discovery',
      icon: Search,
      color: 'from-blue-500 to-cyan-500',
      databases: [
        { name: 'PostgreSQL', version: '14.5', status: 'healthy', health: 95 },
        { name: 'Redis', version: '7.0', status: 'healthy', health: 98 },
        { name: 'MongoDB', version: '5.0', status: 'warning', health: 72 }
      ]
    },
    {
      id: 1,
      name: 'Configuration Center',
      icon: Cloud,
      color: 'from-purple-500 to-pink-500',
      databases: [
        { name: 'Etcd', version: '3.5', status: 'healthy', health: 99 },
        { name: 'Consul', version: '1.12', status: 'healthy', health: 96 },
        { name: 'ZooKeeper', version: '3.8', status: 'degraded', health: 45 }
      ]
    },
    {
      id: 2,
      name: 'Observability Layer',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      databases: [
        { name: 'Prometheus', version: '2.35', status: 'healthy', health: 94 },
        { name: 'Elasticsearch', version: '8.2', status: 'healthy', health: 91 },
        { name: 'ClickHouse', version: '22.7', status: 'healthy', health: 97 }
      ]
    }
  ];

  const activeService = services[selectedService];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated connections */}
      <svg className="absolute inset-0 w-full h-full opacity-10" style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" />
            <stop offset="100%" stopColor="rgb(34, 211, 238)" />
          </linearGradient>
        </defs>
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={i}
            x1={Math.random() * 1200}
            y1={Math.random() * 600}
            x2={Math.random() * 1200}
            y2={Math.random() * 600}
            stroke="url(#lineGrad)"
            strokeWidth="2"
            animate={{
              x1: Math.random() * 1200,
              x2: Math.random() * 1200,
              y1: Math.random() * 600,
              y2: Math.random() * 600,
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </svg>

      <div className="relative z-10 w-full px-8">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-white mb-4"
        >
          Service Registry for Discovery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-slate-400 mb-16"
        >
          Dynamic systems need dynamic service discovery
        </motion.p>

        {/* Service selector */}
        <div className="flex justify-center gap-4 mb-12">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className="px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
              animate={{
                background: selectedService === service.id
                  ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                  : 'rgba(30, 41, 59, 0.6)',
                color: selectedService === service.id ? 'white' : 'rgba(203, 213, 225, 0.7)',
                scale: selectedService === service.id ? 1.05 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <service.icon className="w-5 h-5" />
              {service.name}
            </motion.button>
          ))}
        </div>

        {/* Service details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            {/* Databases grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeService.databases.map((db, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className={`p-6 rounded-xl border ${
                    db.status === 'healthy'
                      ? 'border-green-700/50 bg-green-900/20'
                      : db.status === 'warning'
                      ? 'border-yellow-700/50 bg-yellow-900/20'
                      : 'border-red-700/50 bg-red-900/20'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{db.name}</h3>
                      <p className="text-xs text-slate-400">v{db.version}</p>
                    </div>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 2 + idx * 0.2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      {db.status === 'healthy' ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : db.status === 'warning' ? (
                        <AlertCircle className="w-6 h-6 text-yellow-400" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-400" />
                      )}
                    </motion.div>
                  </div>

                  {/* Health bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-slate-300">Health</p>
                      <p className="text-sm font-bold text-white">{db.health}%</p>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${
                          db.status === 'healthy'
                            ? 'from-green-500 to-green-400'
                            : db.status === 'warning'
                            ? 'from-yellow-500 to-yellow-400'
                            : 'from-red-500 to-red-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${db.health}%` }}
                        transition={{ delay: idx * 0.1, duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Status badge */}
                  <motion.div
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      db.status === 'healthy'
                        ? 'bg-green-900/60 text-green-200'
                        : db.status === 'warning'
                        ? 'bg-yellow-900/60 text-yellow-200'
                        : 'bg-red-900/60 text-red-200'
                    }`}
                    animate={{
                      boxShadow: [
                        'none',
                        '0 0 12px rgba(74, 222, 128, 0.5)',
                        'none'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    {db.status.charAt(0).toUpperCase() + db.status.slice(1)}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 bg-slate-800/50 border border-slate-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-bold text-white mb-3">Key Insight:</h3>
              <p className="text-slate-300">
                A service registry enables automatic discovery of database endpoints, versions, and health status. This is essential when you have more databases than you can manage manually.
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Slide9_ServiceRegistry;
```

## Slide10_Visualization.jsx

```jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Zap } from 'lucide-react';

const Slide10_Visualization = () => {
  const [showConnections, setShowConnections] = useState(true);

  // Generate random nodes
  const nodes = [
    { id: 0, type: 'app', label: 'API', x: 200, y: 150, color: 'from-blue-500 to-cyan-500' },
    { id: 1, type: 'db', label: 'PostgreSQL', x: 600, y: 100, color: 'from-green-500 to-emerald-500' },
    { id: 2, type: 'cache', label: 'Redis', x: 600, y: 250, color: 'from-yellow-500 to-orange-500' },
    { id: 3, type: 'search', label: 'Elasticsearch', x: 900, y: 180, color: 'from-purple-500 to-pink-500' },
    { id: 4, type: 'analytics', label: 'BigQuery', x: 900, y: 350, color: 'from-red-500 to-red-600' },
    { id: 5, type: 'cache', label: 'Memcached', x: 600, y: 400, color: 'from-pink-500 to-rose-500' },
    { id: 6, type: 'queue', label: 'Kafka', x: 300, y: 350, color: 'from-indigo-500 to-blue-500' },
    { id: 7, type: 'db', label: 'MongoDB', x: 900, y: 500, color: 'from-green-600 to-green-500' }
  ];

  const connections = [
    [0, 1], [0, 2], [0, 6], [1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [3, 4], [4, 7], [6, 5]
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
          `
        }}
      />

      <div className="relative z-10 w-full px-8">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-white">System Topology</h1>
          <motion.button
            onClick={() => setShowConnections(!showConnections)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Network className="w-5 h-5" />
            {showConnections ? 'Hide' : 'Show'} Connections
          </motion.button>
        </motion.div>

        {/* SVG visualization */}
        <svg viewBox="0 0 1200 650" className="w-full max-w-6xl h-auto mx-auto">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1200" height="650" fill="url(#grid)" />

          {/* Connections */}
          {showConnections && connections.map((conn, idx) => {
            const from = nodes[conn[0]];
            const to = nodes[conn[1]];

            return (
              <g key={`conn-${idx}`}>
                {/* Animated line */}
                <motion.line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="2"
                  animate={{
                    strokeDashoffset: [100, 0],
                    stroke: ['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.1)']
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: idx * 0.2
                  }}
                  strokeDasharray="100"
                />

                {/* Flow animation */}
                <motion.circle
                  cx={from.x}
                  cy={from.y}
                  r="4"
                  fill="rgba(59, 130, 246, 0.8)"
                  animate={{
                    cx: [from.x, to.x],
                    cy: [from.y, to.y],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1,
                    repeat: Infinity,
                    delay: idx * 0.25
                  }}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node, idx) => (
            <g key={`node-${node.id}`}>
              {/* Pulse background */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="45"
                fill="rgba(59, 130, 246, 0.05)"
                animate={{
                  r: [45, 65, 45],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 3,
                  delay: idx * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Main circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="30"
                fill={`url(#grad-${node.id})`}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="2"
                animate={{
                  r: [30, 33, 30],
                  filter: ['drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))', 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))', 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))']
                }}
                transition={{
                  duration: 2 + Math.random() * 1,
                  delay: idx * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              {/* Icon */}
              <foreignObject x={node.x - 15} y={node.y - 15} width="30" height="30">
                <Zap className="w-full h-full text-white" />
              </foreignObject>

              {/* Label background */}
              <motion.rect
                x={node.x - 45}
                y={node.y + 45}
                width="90"
                height="28"
                rx="6"
                fill="rgba(30, 41, 59, 0.9)"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="1"
                animate={{
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  delay: idx * 0.1,
                  repeat: Infinity
                }}
              />

              {/* Label text */}
              <motion.text
                x={node.x}
                y={node.y + 66}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill="white"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  delay: idx * 0.1,
                  repeat: Infinity
                }}
              >
                {node.label}
              </motion.text>

              {/* Gradient definition */}
              <defs>
                <linearGradient id={`grad-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={node.color.split(' ')[0]} />
                  <stop offset="100%" stopColor={node.color.split(' ')[1]} />
                </linearGradient>
              </defs>
            </g>
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-400 text-lg">
            This is just <span className="font-bold text-blue-400">one possible topology</span>. Your system likely has <span className="font-bold text-orange-400">many more databases</span> we haven't visualized.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide10_Visualization;
```

## Slide11_Conclusion.jsx

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Database, Zap } from 'lucide-react';

const Slide11_Conclusion = () => {
  const keyPoints = [
    { icon: AlertCircle, text: 'You have more databases than you think' },
    { icon: Database, text: 'They serve different purposes' },
    { icon: Zap, text: 'Discovery requires infrastructure and discipline' },
    { icon: CheckCircle, text: 'Visibility is your first step' }
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
            'linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400"
            animate={{
              x: [Math.random() * 1200, Math.random() * 1200],
              y: [Math.random() * 600, Math.random() * 600],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-bold text-white mb-8"
        >
          How Many Databases?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl text-blue-400 font-bold mb-16"
        >
          More Than You Can Count Manually
        </motion.p>

        {/* Key points */}
        <div className="space-y-6 mb-16">
          {keyPoints.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.15, duration: 0.6 }}
              className="flex items-center justify-center gap-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  delay: 0.8 + idx * 0.15,
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <point.icon className="w-8 h-8 text-blue-400" />
              </motion.div>
              <p className="text-2xl text-white font-semibold">{point.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-2xl p-10 mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4">The Answer:</h2>
          <p className="text-xl text-slate-200 leading-relaxed mb-6">
            You need a <span className="font-bold text-cyan-400">discovery system</span>, not a manual count. Implement:
          </p>
          <div className="text-lg text-slate-300 space-y-2">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              ✓ Service discovery & registry
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              ✓ Observability & monitoring
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              ✓ Configuration management
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              ✓ Data lineage & mapping
            </motion.p>
          </div>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 30px rgba(59, 130, 246, 0.3)',
              '0 0 60px rgba(59, 130, 246, 0.6)',
              '0 0 30px rgba(59, 130, 246, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-2xl text-white font-bold"
        >
          Without visibility, you can't govern.
        </motion.div>
      </div>
    </div>
  );
};

export default Slide11_Conclusion;
```

***

**Complete 11-slide animated presentation deck on "How Many Databases Exist in the System?"**

Each slide features:
- ✅ **Meaningful animations** (not decorative—they explain concepts)
- ✅ **Framer Motion** for motion and state
- ✅ **Tailwind CSS** for styling
- ✅ **lucide-react icons** with animated interactions
- ✅ **Interactive elements** (hover states, toggles, dynamic content)
- ✅ **No static text slides**—every slide has visual storytelling
- ✅ **Production-ready** React functional components
- ✅ **Apple Keynote + Stripe/Vercel** aesthetic with depth, gradients, and glow

The narrative flows from problem → discovery methods → database types → complexity growth → interaction patterns → criticality → data flow → service registry → visualization → conclusion.