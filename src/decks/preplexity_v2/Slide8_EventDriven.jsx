import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, MessageSquare, Archive } from 'lucide-react';

const Slide8_EventDriven = () => {
  const [eventQueue, setEventQueue] = useState([]);

  useEffect(() => {
    const events = [
      { id: 1, name: 'UserSignUp', time: 0, color: 'blue' },
      { id: 2, name: 'OrderCreated', time: 800, color: 'green' },
      { id: 3, name: 'PaymentProcessed', time: 1600, color: 'purple' },
      { id: 4, name: 'EmailSent', time: 2400, color: 'pink' },
    ];

    events.forEach(({ id, name, time, color }) => {
      setTimeout(() => {
        setEventQueue((prev) => [...prev.slice(-3), { id, name, color }]);
      }, time);
    });

    const resetTimer = setInterval(() => {
      setEventQueue([]);
    }, 3500);

    return () => clearInterval(resetTimer);
  }, []);

  const subscribers = [
    { name: 'Email Service', events: ['UserSignUp', 'OrderCreated'] },
    { name: 'Analytics Service', events: ['UserSignUp', 'OrderCreated', 'PaymentProcessed'] },
    { name: 'Notification Service', events: ['OrderCreated', 'PaymentProcessed'] },
  ];

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col items-center justify-center overflow-hidden relative px-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-5xl font-bold text-white mb-4">Event-Driven Architecture</h2>
        <p className="text-xl text-slate-300">Services communicate through asynchronous events</p>
      </motion.div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Event source */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full px-8 py-4">
            <Zap size={24} className="text-white" />
            <span className="text-white font-bold">Event Source</span>
          </div>
        </motion.div>

        {/* Event broker */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-gradient-to-b from-purple-900 to-purple-800 border-4 border-purple-500 rounded-2xl p-8 mb-12 text-center relative overflow-hidden"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <MessageSquare size={32} className="text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Message Broker</h3>
            <p className="text-purple-200 mb-6">RabbitMQ, Kafka, AWS SNS/SQS</p>

            {/* Event queue visualization */}
            <div className="flex gap-3 justify-center flex-wrap">
              {eventQueue.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`px-4 py-2 rounded-lg font-mono text-sm font-bold`}
                  style={{
                    backgroundColor:
                      event.color === 'blue'
                        ? 'rgba(59,130,246,0.5)'
                        : event.color === 'green'
                          ? 'rgba(34,197,94,0.5)'
                          : event.color === 'purple'
                            ? 'rgba(168,85,247,0.5)'
                            : 'rgba(236,72,153,0.5)',
                    borderColor:
                      event.color === 'blue'
                        ? '#3b82f6'
                        : event.color === 'green'
                          ? '#22c55e'
                          : event.color === 'purple'
                            ? '#a855f7'
                            : '#ec4899',
                    borderWidth: '2px',
                    color: 'white',
                  }}
                >
                  {event.name}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Subscribers */}
        <div className="grid grid-cols-3 gap-6">
          {subscribers.map((subscriber, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              className="border-2 border-slate-600 rounded-xl p-6 bg-slate-800 hover:border-cyan-500 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <Archive size={24} className="text-cyan-400" />
                <h4 className="text-white font-bold">{subscriber.name}</h4>
              </div>
              <p className="text-xs text-slate-400 mb-4 font-semibold">Subscribes to:</p>
              <div className="space-y-2">
                {subscriber.events.map((event, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                    className="bg-slate-700 rounded px-3 py-2 text-slate-200 text-xs font-mono"
                  >
                    ✓ {event}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide8_EventDriven;