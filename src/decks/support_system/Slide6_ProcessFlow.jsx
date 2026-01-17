import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Users, Zap } from 'lucide-react';

export default function Slide6_ProcessFlow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Assess Current Network',
      description: 'Map out who is already in your life and their roles',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      action: 'Who supports you today?'
    },
    {
      id: 2,
      title: 'Identify Gaps',
      description: 'Recognize where your support system needs strengthening',
      icon: Plus,
      color: 'from-purple-500 to-pink-500',
      action: 'What\'s missing?'
    },
    {
      id: 3,
      title: 'Invest & Build',
      description: 'Actively nurture relationships and seek new connections',
      icon: Zap,
      color: 'from-green-500 to-emerald-500',
      action: 'Who will you reach out to?'
    },
    {
      id: 4,
      title: 'Reciprocate',
      description: 'Be the support for others—mutual care strengthens bonds',
      icon: ArrowRight,
      color: 'from-red-500 to-orange-500',
      action: 'How will you give back?'
    }
  ];

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center p-8">
      <motion.h2
        className="text-5xl font-bold text-white mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Building Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Support System</span>
      </motion.h2>

      <div className="w-full max-w-5xl">
        {/* Flow Visualization */}
        <div className="grid grid-cols-4 gap-3 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <React.Fragment key={step.id}>
                <motion.button
                  className={`rounded-xl p-4 font-semibold transition-all relative overflow-hidden group`}
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${step.color})` : 'rgba(255, 255, 255, 0.05)'
                  }}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`flex flex-col items-center gap-2 relative z-10`}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                  >
                    <Icon size={28} className={isActive ? 'text-white' : 'text-white/60'} />
                    <span className={isActive ? 'text-white text-sm' : 'text-white/60 text-xs'}>
                      Step {idx + 1}
                    </span>
                  </motion.div>

                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </motion.button>

                {idx < steps.length - 1 && (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeStep >= idx + 1 ? 1 : 0.3 }}
                  >
                    <ArrowRight size={24} className="text-white/40" />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Detailed Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            className="rounded-3xl border border-white/20 p-12"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="flex items-start gap-6 mb-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className={`p-4 rounded-xl bg-gradient-to-br ${steps[activeStep].color} flex-shrink-0`}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                {React.createElement(steps[activeStep].icon, { size: 32, className: 'text-white' })}
              </motion.div>

              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {steps[activeStep].title}
                </h3>
                <p className="text-white/60">
                  {steps[activeStep].description}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/5 rounded-xl p-6 border border-white/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-white/80 italic text-lg">
                "{steps[activeStep].action}"
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}