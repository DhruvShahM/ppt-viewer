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