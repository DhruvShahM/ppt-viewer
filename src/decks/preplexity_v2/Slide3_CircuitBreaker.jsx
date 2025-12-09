import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const Slide3_CircuitBreaker = () => {
  const [state, setState] = useState('closed'); // closed, open, half-open
  const failureRate = state === 'open' ? 90 : state === 'half-open' ? 20 : 5;

  useEffect(() => {
    const timeline = [
      { time: 3000, state: 'closed' },
      { time: 6000, state: 'open' },
      { time: 10000, state: 'half-open' },
      { time: 14000, state: 'closed' },
    ];

    timeline.forEach(({ time, newState }) => {
      setTimeout(() => setState(newState), time);
    });
  }, []);

  const getStateColor = () => {
    switch (state) {
      case 'closed':
        return 'from-green-500 to-emerald-600';
      case 'open':
        return 'from-red-500 to-rose-600';
      case 'half-open':
        return 'from-yellow-500 to-orange-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getStateIcon = () => {
    switch (state) {
      case 'closed':
        return <CheckCircle2 size={32} className="text-white" />;
      case 'open':
        return <AlertCircle size={32} className="text-white" />;
      case 'half-open':
        return <Clock size={32} className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Circuit Breaker</h2>
        <p className="text-xl text-slate-300">Prevent cascading failures with intelligent state management</p>
      </motion.div>

      {/* State visualization */}
      <div className="relative z-10 max-w-3xl w-full">
        {/* Current state indicator */}
        <motion.div
          key={state}
          animate={{ scale: [0.9, 1.1, 1] }}
          transition={{ duration: 0.6 }}
          className={`bg-gradient-to-br ${getStateColor()} rounded-2xl p-12 mb-12 text-center border-2 border-white border-opacity-20`}
        >
          <div className="flex justify-center mb-6">{getStateIcon()}</div>
          <h3 className="text-3xl font-bold text-white mb-2 capitalize">{state === 'half-open' ? 'Half-Open' : state}</h3>
          <p className="text-white text-opacity-90">
            {state === 'closed' && 'System operating normally. Requests flowing.'}
            {state === 'open' && 'Failure threshold exceeded. Blocking all requests.'}
            {state === 'half-open' && 'Testing recovery. Allowing limited requests.'}
          </p>
        </motion.div>

        {/* State flow */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {['Closed', 'Open', 'Half-Open'].map((s, i) => (
            <motion.div
              key={s}
              animate={
                state === s.toLowerCase().replace('-', '')
                  ? { scale: 1.1, boxShadow: '0 0 20px rgba(59,130,246,1)' }
                  : { scale: 1, boxShadow: '0 0 0px rgba(59,130,246,0)' }
              }
              className="border-2 border-slate-700 rounded-lg p-6 bg-slate-800 text-center"
            >
              <h4 className="text-white font-bold mb-2">{s}</h4>
              <p className="text-sm text-slate-300">
                {s === 'Closed' && 'Normal operation'}
                {s === 'Open' && 'Reject requests'}
                {s === 'Half-Open' && 'Test recovery'}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Failure rate gauge */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold">Failure Rate</span>
            <span className="text-cyan-400 font-bold text-2xl">{failureRate}%</span>
          </div>
          <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
            <motion.div
              animate={{ width: `${failureRate}%` }}
              transition={{ duration: 0.8 }}
              className={`h-full bg-gradient-to-r ${failureRate > 50 ? 'from-red-500 to-rose-600' : 'from-yellow-500 to-orange-600'}`}
            />
          </div>
          <p className="text-xs text-slate-400 mt-3">Threshold: 50% failures → OPEN</p>
        </div>
      </div>
    </div>
  );
};

export default Slide3_CircuitBreaker;