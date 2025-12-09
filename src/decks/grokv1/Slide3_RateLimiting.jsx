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