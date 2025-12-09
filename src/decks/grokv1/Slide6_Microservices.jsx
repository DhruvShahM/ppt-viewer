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