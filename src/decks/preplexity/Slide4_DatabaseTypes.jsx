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