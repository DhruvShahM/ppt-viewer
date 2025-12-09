import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Triangle } from 'lucide-react';

const Slide9_CAP = () => {
  const [activeChoice, setActiveChoice] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChoice((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const choices = [
    {
      name: 'CP',
      color: 'from-blue-600 to-cyan-600',
      corner: 'top',
      description: 'Consistency + Partition Tolerance',
      examples: 'PostgreSQL, MongoDB',
      tradeoff: 'May unavailable during partitions',
    },
    {
      name: 'CA',
      color: 'from-green-600 to-emerald-600',
      corner: 'bottom-left',
      description: 'Consistency + Availability',
      examples: 'Traditional SQL databases',
      tradeoff: 'Cannot tolerate partitions',
    },
    {
      name: 'AP',
      color: 'from-purple-600 to-pink-600',
      corner: 'bottom-right',
      description: 'Availability + Partition Tolerance',
      examples: 'DynamoDB, Cassandra',
      tradeoff: 'Eventual consistency only',
    },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">CAP Theorem</h2>
        <p className="text-xl text-slate-300">You can guarantee only 2 of 3 properties</p>
      </motion.div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        {/* Triangle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative w-96 h-96 mb-12"
        >
          {/* SVG Triangle */}
          <svg className="w-full h-full" viewBox="0 0 400 400" style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.3))' }}>
            {/* Triangle outline */}
            <polygon
              points="200,50 350,320 50,320"
              fill="none"
              stroke="rgba(148,163,184,0.5)"
              strokeWidth="2"
            />

            {/* Corner labels */}
            <text x="200" y="25" textAnchor="middle" fill="#f1f5f9" fontSize="24" fontWeight="bold">
              Consistency
            </text>
            <text x="30" y="360" textAnchor="middle" fill="#f1f5f9" fontSize="24" fontWeight="bold">
              Availability
            </text>
            <text x="370" y="360" textAnchor="middle" fill="#f1f5f9" fontSize="24" fontWeight="bold">
              Partition Tolerance
            </text>
          </svg>

          {/* Choice circles */}
          {choices.map((choice, idx) => {
            const isActive = activeChoice === idx;
            const positions = [
              { x: '50%', y: '8%', transform: 'translate(-50%, -50%)' },
              { x: '15%', y: '82%', transform: 'translate(-50%, -50%)' },
              { x: '85%', y: '82%', transform: 'translate(-50%, -50%)' },
            ];

            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isActive ? 1.3 : 1,
                  boxShadow: isActive ? `0 0 30px rgba(${choice.color.includes('blue') ? '59,130,246' : choice.color.includes('green') ? '34,197,94' : '168,85,247'},1)` : '0 0 0px rgba(0,0,0,0)',
                }}
                transition={{ duration: 0.6 }}
                className={`absolute w-24 h-24 rounded-full bg-gradient-to-br ${choice.color} border-4 border-white flex items-center justify-center`}
                style={positions[idx]}
              >
                <span className="text-3xl font-black text-white">{choice.name}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Description */}
        <motion.div
          key={activeChoice}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className={`bg-gradient-to-br ${choices[activeChoice].color} rounded-2xl p-8 max-w-2xl border-2 border-white border-opacity-30`}
        >
          <h3 className="text-3xl font-bold text-white mb-3">{choices[activeChoice].description}</h3>
          <p className="text-white text-opacity-90 mb-4">
            <span className="font-semibold">Examples:</span> {choices[activeChoice].examples}
          </p>
          <p className="text-white text-opacity-80">
            <span className="font-semibold">Tradeoff:</span> {choices[activeChoice].tradeoff}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Slide9_CAP;